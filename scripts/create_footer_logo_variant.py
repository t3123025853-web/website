from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image


def create_footer_variant(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGBA")
    rgba = np.asarray(image).copy()

    # The supplied lockup places the AlonrunLife wordmark in the lower quarter.
    # Recolour only those visible pixels so the pet illustration keeps its
    # original colours while the wordmark remains legible on the dark footer.
    text_region_start = int(rgba.shape[0] * 0.75)
    alpha = rgba[:, :, 3]
    mask = np.zeros(alpha.shape, dtype=bool)
    mask[text_region_start:, :] = alpha[text_region_start:, :] > 0
    rgba[mask, :3] = 255

    destination.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, "RGBA").save(destination, optimize=True)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: create_footer_logo_variant.py SOURCE DESTINATION")
    create_footer_variant(Path(sys.argv[1]), Path(sys.argv[2]))
