interface CloudinaryUploadOptions {
  folder: string;
  endpoint?: 'image/upload' | 'auto/upload';
  onProgress?: (percent: number) => void;
}

/**
 * Generic unsigned upload to Cloudinary using XMLHttpRequest for progress tracking.
 */
function uploadToCloudinary(
  file: File,
  options: CloudinaryUploadOptions
): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

  if (!cloudName || !uploadPreset) {
    return Promise.reject(
      new Error('Cloudinary env vars are not configured. Add them to your .env file.')
    );
  }

  const { folder, endpoint = 'image/upload', onProgress } = options;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText) as { secure_url: string };
          resolve(response.secure_url);
        } catch {
          reject(new Error('Failed to parse Cloudinary response'));
        }
      } else {
        reject(new Error(`Cloudinary upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
    xhr.addEventListener('abort', () => reject(new Error('Upload was aborted')));

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/${endpoint}`);
    xhr.send(formData);
  });
}

/**
 * Uploads an image file to Cloudinary via unsigned upload preset.
 * @param file - The image file to upload
 * @param onProgress - Optional callback receiving upload progress 0–100
 * @returns The Cloudinary secure_url of the uploaded image
 */
export function uploadCoverImage(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  return uploadToCloudinary(file, {
    folder: 'digitalife/covers',
    endpoint: 'image/upload',
    onProgress,
  });
}

/**
 * Uploads an arbitrary resource file (PDF, DOCX, etc.) to Cloudinary.
 * Uses the auto endpoint to support non-image formats.
 */
export function uploadResourceFile(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  return uploadToCloudinary(file, {
    folder: 'digitalife/files',
    endpoint: 'auto/upload',
    onProgress,
  });
}
