import { useRef, useState } from 'react';
import { Upload, X, ImagePlus, Loader2 } from 'lucide-react';
import { uploadCoverImage } from '../../lib/cloudinary';

interface CoverUploadProps {
  currentImageUrl?: string;
  gradientClasses: string;  // Tailwind gradient — shown as preview when no image
  onUploadSuccess: (url: string) => void;
  onRemove: () => void;
}

export default function CoverUpload({
  currentImageUrl,
  gradientClasses,
  onUploadSuccess,
  onRemove,
}: CoverUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (JPG, PNG, WebP).');
      return;
    }
    setUploadError(null);
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadCoverImage(file, setProgress);
      onUploadSuccess(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
        Cover Image
      </label>

      {/* Preview area */}
      <div
        className={`relative w-full h-36 rounded-2xl overflow-hidden border-2 transition-colors ${
          isDragging ? 'border-[#3e4095] border-dashed' : 'border-black/10'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        {/* Background: image or gradient */}
        {currentImageUrl ? (
          <img
            src={currentImageUrl}
            alt="Cover"
            className="w-full h-full object-contain bg-slate-900"
          />
        ) : (
          <div className={`w-full h-full bg-linear-to-br ${gradientClasses} flex items-center justify-center`}>
            <span className="text-white/40 text-xs font-bold">Gradient Fallback</span>
          </div>
        )}

        {/* Upload overlay */}
        {!uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus className="w-6 h-6 text-white" />
            <span className="text-white text-[10px] font-bold">
              {currentImageUrl ? 'Change Image' : 'Upload Image'}
            </span>
            <span className="text-white/60 text-[9px]">or drag & drop</span>
          </div>
        )}

        {/* Progress overlay */}
        {uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
            <Loader2 className="w-6 h-6 text-[#ffd148] animate-spin" />
            <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ffd148] transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white text-[10px] font-bold">{progress}%</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 text-[10px] font-bold text-[#3e4095] hover:text-[#2e3075] transition-colors disabled:opacity-50"
        >
          <Upload className="w-3 h-3" />
          {currentImageUrl ? 'Replace image' : 'Upload image'}
        </button>

        {currentImageUrl && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500 hover:text-rose-700 transition-colors"
          >
            <X className="w-3 h-3" />
            Remove (use gradient)
          </button>
        )}
      </div>

      {uploadError && (
        <p className="text-[10px] font-bold text-rose-500">{uploadError}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
