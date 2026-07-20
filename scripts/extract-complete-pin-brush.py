from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "products" / "pet-grooming-assortment-white.png"
OUTPUT = ROOT / "public" / "products" / "pet-pin-brush-complete.png"

# Isolate the blue-and-white pin brush from the clean white assortment source.
# The crop excludes neighboring products before background classification.
image = Image.open(SOURCE).convert("RGBA").crop((480, 430, 775, 855))
rgb = np.asarray(image)[..., :3]
height, width = rgb.shape[:2]

# Only pixels that are both very bright and nearly neutral can be background.
# This deliberately preserves the pale blue and warm-white brush housing.
bright = rgb.min(axis=2) >= 242
neutral = (rgb.max(axis=2) - rgb.min(axis=2)) <= 14
candidate_background = bright & neutral

background = np.zeros((height, width), dtype=bool)
queue: deque[tuple[int, int]] = deque()

for x in range(width):
    queue.append((x, 0))
    queue.append((x, height - 1))
for y in range(height):
    queue.append((0, y))
    queue.append((width - 1, y))

while queue:
    x, y = queue.popleft()
    if background[y, x] or not candidate_background[y, x]:
        continue
    background[y, x] = True
    if x:
        queue.append((x - 1, y))
    if x + 1 < width:
        queue.append((x + 1, y))
    if y:
        queue.append((x, y - 1))
    if y + 1 < height:
        queue.append((x, y + 1))

foreground = ~background

# Keep the largest connected foreground component, which is the complete brush.
visited = np.zeros_like(foreground)
largest: list[tuple[int, int]] = []
for start_y in range(height):
    for start_x in range(width):
        if visited[start_y, start_x] or not foreground[start_y, start_x]:
            continue
        component: list[tuple[int, int]] = []
        component_queue = deque([(start_x, start_y)])
        visited[start_y, start_x] = True
        while component_queue:
            x, y = component_queue.popleft()
            component.append((x, y))
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < width and 0 <= ny < height and foreground[ny, nx] and not visited[ny, nx]:
                    visited[ny, nx] = True
                    component_queue.append((nx, ny))
        if len(component) > len(largest):
            largest = component

keep = np.zeros_like(foreground)
for x, y in largest:
    keep[y, x] = True

# Include a narrow antialiased edge around the component without classifying
# the pale product shell itself as removable background.
for _ in range(2):
    expanded = keep.copy()
    expanded[1:, :] |= keep[:-1, :]
    expanded[:-1, :] |= keep[1:, :]
    expanded[:, 1:] |= keep[:, :-1]
    expanded[:, :-1] |= keep[:, 1:]
    keep = expanded & ~background

rgba = np.asarray(image).copy()
rgba[..., 3] = np.where(keep, 255, 0).astype(np.uint8)

ys, xs = np.where(keep)
padding = 12
left = max(0, int(xs.min()) - padding)
right = min(width, int(xs.max()) + padding + 1)
top = max(0, int(ys.min()) - padding)
bottom = min(height, int(ys.max()) + padding + 1)

Image.fromarray(rgba, "RGBA").crop((left, top, right, bottom)).save(OUTPUT)
print(OUTPUT)
