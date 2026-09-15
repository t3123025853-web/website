from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


def remove_white_background(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGBA")
    draw = ImageDraw.Draw(image)
    for seed in ((0, 0), (image.width - 1, 0), (0, image.height - 1), (image.width - 1, image.height - 1)):
        ImageDraw.floodfill(image, seed, (255, 255, 255, 0), thresh=18)

    rgba = np.asarray(image).copy()
    rgb = rgba[:, :, :3]

    # Logo artwork contains a deliberately white cat. Label white regions so
    # large enclosed artwork stays opaque while the outer canvas and tiny
    # enclosed letter counters become transparent.
    white = (
        (rgba[:, :, 3] > 0)
        & (rgb.min(axis=2) >= 242)
        & ((rgb.max(axis=2) - rgb.min(axis=2)) <= 14)
    )
    small_component_limit = max(180, int(rgba.shape[0] * rgba.shape[1] * 0.0012))
    height, width = white.shape
    seen = np.zeros_like(white, dtype=bool)

    for y, x in zip(*np.where(white & ~seen)):
        if seen[y, x]:
            continue
        queue = deque([(int(y), int(x))])
        seen[y, x] = True
        component: list[tuple[int, int]] = []
        while queue:
            cy, cx = queue.popleft()
            component.append((cy, cx))
            for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
                if 0 <= ny < height and 0 <= nx < width and white[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True
                    queue.append((ny, nx))
        if len(component) < small_component_limit:
            ys, xs = zip(*component)
            rgba[ys, xs, 3] = 0
    destination.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, "RGBA").save(destination, optimize=True)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: remove_logo_background.py SOURCE DESTINATION")
    remove_white_background(Path(sys.argv[1]), Path(sys.argv[2]))
