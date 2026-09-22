# Brand wall and browser icons

The decorative brand wall uses all 99 existing product photos. It renders an
inline low-resolution WebP atlas first, then loads one higher-resolution atlas
when the section is within 1,000px of the viewport. The full atlas is decoded
before replacing the preview and starting motion. A failed request leaves the
complete static preview visible. Reconnecting retries the request.

- Desktop: 360 × 264 pixels per product; 1,070,614 bytes total.
- Mobile (viewport at most 620px): 180 × 132 per product; 355,500 bytes total.
- Inline preview: 17,902 bytes before base64 encoding.
- Original source files: 35,020,519 bytes; these remain available for the catalog.

Animation pauses off screen, in background tabs, and for reduced-motion users.
The original ten-column layout, product ordering, tilt and scrolling speeds are
preserved. Content hashes in the atlas URLs prevent stale asset caching.

After adding/replacing product photos or changing the supplied brand artwork,
regenerate and commit the generated files before building:

```sh
npm ci
node scripts/build-brand-assets.mjs
npm run build:aliyun
```

The generator uses Sharp supplied by the existing Next.js dependency. It reads
`app/recovered-products.json` and the extra cleaning photos in `app/page.tsx`,
then writes `app/brand-wall-atlas.json`, `public/brand/wall/`, brand icon PNGs,
`public/favicon.ico` and `public/favicon.svg`. Generated assets are committed so
normal deployments need no additional generation step. If the product sources
change, check that every `brandDriftItems` image has a non-negative sprite index.

The favicon uses only the cat/dog illustration from the existing transparent
brand lockup. ICO contains 16, 32 and 48px PNG entries; metadata also declares
32/48/192px PNG icons and a 180px Apple touch icon. The icon URLs work with the
Alibaba static export. Browser address-bar security icons remain browser-owned.

Verification for this change: Alibaba static export and TypeScript passed;
exported homepage/catalog icon links and all image formats were checked;
desktop/mobile rendering, blocked atlas fallback, and reduced-motion pause were
verified in the browser.
