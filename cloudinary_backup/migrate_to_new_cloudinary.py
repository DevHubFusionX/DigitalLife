#!/usr/bin/env python3
"""
Cloudinary Migration Script
Uploads all local backup covers and document files to your new Cloudinary account,
and updates the Firestore records with the new URLs.

Usage:
  python3 migrate_to_new_cloudinary.py <NEW_CLOUD_NAME> <NEW_UNSIGNED_PRESET>
"""

import sys
import os
import json
import urllib.request

BACKUP_DIR = os.path.dirname(os.path.abspath(__file__))
COVERS_DIR = os.path.join(BACKUP_DIR, "covers")
FILES_DIR = os.path.join(BACKUP_DIR, "files")
MANIFEST_PATH = os.path.join(BACKUP_DIR, "manifest.json")
FIREBASE_PROJECT = "digitallife-ehub-resourc-3648e"

def upload_file_to_cloudinary(file_path: str, cloud_name: str, preset: str, folder: str, resource_type="auto") -> str:
    boundary = "----WebKitFormBoundaryMigrateCloudinary7MA4"
    filename = os.path.basename(file_path)
    
    with open(file_path, "rb") as f:
        file_bytes = f.read()

    body = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="upload_preset"\r\n\r\n'
        f"{preset}\r\n"
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="folder"\r\n\r\n'
        f"{folder}\r\n"
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'
        f"Content-Type: application/octet-stream\r\n\r\n"
    ).encode("utf-8") + file_bytes + f"\r\n--{boundary}--\r\n".encode("utf-8")

    url = f"https://api.cloudinary.com/v1_1/{cloud_name}/{resource_type}/upload"
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "User-Agent": "Mozilla/5.0"
        }
    )

    with urllib.request.urlopen(req) as resp:
        res_data = json.loads(resp.read().decode("utf-8"))
        return res_data["secure_url"]

def update_firestore_field(doc_id: str, field_name: str, new_val: str):
    patch_url = (
        f"https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT}/databases/(default)/documents/resources/{doc_id}"
        f"?updateMask.fieldPaths={field_name}"
    )
    body = json.dumps({
        "fields": {
            field_name: {"stringValue": new_val}
        }
    }).encode("utf-8")

    req = urllib.request.Request(
        patch_url,
        data=body,
        headers={"Content-Type": "application/json"},
        method="PATCH"
    )
    with urllib.request.urlopen(req) as resp:
        return resp.status == 200

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 migrate_to_new_cloudinary.py <NEW_CLOUD_NAME> <NEW_UNSIGNED_PRESET>")
        sys.exit(1)

    cloud_name = sys.argv[1].strip()
    preset = sys.argv[2].strip()

    print(f"Starting migration to Cloudinary Cloud: {cloud_name} with Preset: {preset}...")

    with open(MANIFEST_PATH, "r") as f:
        manifest = json.load(f)

    # 1. Upload Covers
    for item in manifest:
        local_file = os.path.join(BACKUP_DIR, item["filename"])
        if not os.path.exists(local_file):
            print(f"Skipping missing file: {local_file}")
            continue

        print(f"Uploading {item['filename']} for doc [{item['res_id']}]...")
        try:
            new_url = upload_file_to_cloudinary(local_file, cloud_name, preset, folder="digitalife/covers", resource_type="image")
            print(f"  -> Uploaded: {new_url}")
            
            # Update Firestore coverImage & coverUrl
            update_firestore_field(item['res_id'], "coverImage", new_url)
            update_firestore_field(item['res_id'], "coverUrl", new_url)
            print(f"  -> Updated Firestore document [{item['res_id']}] cover image")
        except Exception as e:
            print(f"  !! Error uploading {item['filename']}: {e}")

    # 2. Upload PDF Document
    doc_pdf = os.path.join(FILES_DIR, "Business_Clarity_and_Growth_Workbook.pdf")
    if os.path.exists(doc_pdf):
        print("\nUploading PDF Workbook...")
        try:
            pdf_url = upload_file_to_cloudinary(doc_pdf, cloud_name, preset, folder="digitalife/files", resource_type="auto")
            print(f"  -> PDF Uploaded: {pdf_url}")
            update_firestore_field("f4othGCKJ4jOGYSLKOsm", "downloadUrl", pdf_url)
            print(f"  -> Updated Firestore resource f4othGCKJ4jOGYSLKOsm downloadUrl")
        except Exception as e:
            print(f"  !! Error uploading PDF: {e}")

    print("\nMigration completed successfully!")

if __name__ == "__main__":
    main()
