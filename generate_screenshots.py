#!/usr/bin/env python3
from PIL import Image, ImageDraw
import os, zipfile

# Generate placeholder screenshots
shots = [
    ("storage-map-heatmap.png", "Storage: Heatmap View"),
    ("storage-drive-time.png", "Storage: Drive-Time Polygons"),
    ("storage-geolocation.png", "Storage: Geolocation On"),
    ("storage-deploy-status.png", "Storage: Deploy Status Dashboard"),
]

output_dir = "screenshots"
os.makedirs(output_dir, exist_ok=True)

for fname, label in shots:
    img = Image.new("RGB", (800, 600), (245, 245, 245))
    draw = ImageDraw.Draw(img)
    draw.text((20, 280), label, fill=(30,30,30))
    img.save(os.path.join(output_dir, fname))

# Optionally zip them (you can skip this if you just want the PNGs)
zip_path = "site-selection-screenshots-storage.zip"
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
    for fname, _ in shots:
        zf.write(os.path.join(output_dir, fname), arcname=fname)

print(f"✅ Screenshots generated in ./{output_dir}/ and zipped as {zip_path}")
