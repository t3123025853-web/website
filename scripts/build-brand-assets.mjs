// Re-encode existing artwork only; original product and brand files stay intact.
// Run with the sharp version supplied by Next.js: node scripts/build-brand-assets.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const page = await fs.readFile(path.join(root, 'app/page.tsx'), 'utf8');
const products = JSON.parse(await fs.readFile(path.join(root, 'app/recovered-products.json'), 'utf8'));
const cleaningBlock = page.split('const cleaningPreviewProducts:')[1].split('const featuredProducts')[0];
const extraImages = [...cleaningBlock.matchAll(/image: "([^"]+)"/g)].map(match => match[1]);
const images = [...new Set([...extraImages, ...products.map(product => product.image)])];
const columns = 10;
const rows = Math.ceil(images.length / columns);
const outputDir = path.join(publicDir, 'brand/wall');
await fs.mkdir(outputDir, { recursive: true });

async function atlas(width, height, quality) {
  const tiles = [];
  for (const [index, image] of images.entries()) {
    tiles.push({
      input: await sharp(path.join(publicDir, image)).rotate()
        .resize(width, height, { fit: 'cover' }).png().toBuffer(),
      left: (index % columns) * width,
      top: Math.floor(index / columns) * height,
    });
  }
  return sharp({ create: { width: columns * width, height: rows * height, channels: 4, background: '#00000000' } })
    .composite(tiles).webp({ quality, effort: 6 }).toBuffer();
}

async function saveAtlas(buffer, label) {
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 12);
  const name = `products-${label}-${hash}.webp`;
  await fs.writeFile(path.join(outputDir, name), buffer);
  return `/brand/wall/${name}`;
}

const desktop = await atlas(360, 264, 76);
const mobile = await atlas(180, 132, 72);
const preview = await atlas(30, 22, 40);
const manifest = {
  columns, rows, images,
  desktop: await saveAtlas(desktop, 'desktop'),
  mobile: await saveAtlas(mobile, 'mobile'),
  preview: `data:image/webp;base64,${preview.toString('base64')}`,
};
await fs.writeFile(path.join(root, 'app/brand-wall-atlas.json'), JSON.stringify(manifest, null, 2) + '\n');

// The supplied lockup is 1698 x 1344; this rectangle isolates the cat/dog
// illustration above the lettering, with a small transparent border.
const crop = await sharp(path.join(publicDir, 'brand/alonrunlife-brand-lockup-transparent-v2.png'))
  .extract({ left: 240, top: 36, width: 1230, height: 980 }).png().toBuffer();
const fitted = await sharp(crop).resize(448, 448, { fit: 'contain', background: '#00000000' }).png().toBuffer();
const mark = await sharp({ create: { width: 512, height: 512, channels: 4, background: '#fffdf8' } })
  .composite([{ input: fitted, left: 32, top: 32 }]).png().toBuffer();
for (const size of [32, 48, 180, 192, 512]) {
  await sharp(mark).resize(size, size).png().toFile(path.join(publicDir, `brand/alonrunlife-icon-${size}.png`));
}
// Multi-resolution ICO fallback, also used by browsers requesting /favicon.ico.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(size => sharp(mark).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const entry = 6 + i * 16;
  header[entry] = sizes[i]; header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await fs.writeFile(path.join(publicDir, 'favicon.ico'), Buffer.concat([header, ...pngs]));
// Replace the unused starter icon too, for old bookmarks that request this URL.
const icon48 = await sharp(mark).resize(48, 48).png().toBuffer();
await fs.writeFile(path.join(publicDir, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><image width="48" height="48" href="data:image/png;base64,${icon48.toString('base64')}"/></svg>\n`);
const sourceBytes = (await Promise.all(images.map(image => fs.stat(path.join(publicDir, image))))).reduce((sum, stat) => sum + stat.size, 0);
console.log(JSON.stringify({ products: images.length, sourceBytes, desktopBytes: desktop.length, mobileBytes: mobile.length, inlinePreviewBytes: preview.length }, null, 2));
