#!/usr/bin/env python3
"""Render a SMILES string to flat SVG line art for use as a decorative
hero graphic. Output is a bare skeletal wireframe (no atom labels, no
fill) with stroke set to a CSS variable so it can be inlined in a page
and colored via CSS (e.g. to inherit the site accent).

Requires: pip install rdkit

Usage:
    python3 scripts/render_structure_svg.py "<smiles>" assets/structures/name.svg

The output SVG is meant to be inlined directly in HTML (not referenced via
<img>) so the browser resolves --color-accent from the page's own CSS.
"""

import argparse
import re
from pathlib import Path

from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit.Chem.Draw import rdMolDraw2D

STROKE_VAR = "var(--structure-stroke, var(--color-accent))"


def render(smiles, out_path, width=900, height=700, line_width=1.4):
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError(f"Could not parse SMILES: {smiles}")

    Chem.RemoveStereochemistry(mol)
    AllChem.Compute2DCoords(mol)

    drawer = rdMolDraw2D.MolDraw2DSVG(width, height)
    opts = drawer.drawOptions()
    opts.noAtomLabels = True
    opts.bondLineWidth = line_width
    opts.clearBackground = False
    opts.scaleBondWidth = False
    opts.singleColourBonds = True

    rdMolDraw2D.PrepareAndDrawMolecule(drawer, mol)
    drawer.FinishDrawing()
    svg = drawer.GetDrawingText()

    svg = re.sub(r"stroke:#[0-9A-Fa-f]{6}", f"stroke:{STROKE_VAR}", svg)
    svg = re.sub(r"fill:#[0-9A-Fa-f]{6}", "fill:none", svg)

    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(svg)
    print(f"wrote {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("smiles")
    parser.add_argument("out", help="output SVG path")
    parser.add_argument("--width", type=int, default=900)
    parser.add_argument("--height", type=int, default=700)
    parser.add_argument("--line-width", type=float, default=1.4)
    args = parser.parse_args()
    render(args.smiles, args.out, args.width, args.height, args.line_width)
