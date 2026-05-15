import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

import scanService from '@/services/scanService';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

/**
 * Image upload alternative to camera — drag & drop or file picker.
 */
export default function ImageUpload({ onResult, onImageSelect }) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  async function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be under 10MB.');
      return;
    }

    onImageSelect?.(URL.createObjectURL(file));
    setAnalyzing(true);

    try {
      const result = await scanService.predictImage(file);
      onResult?.(result);
    } catch (err) {
      toast.error(err.message || 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleInputChange(e) {
    const file = e.target.files[0];
    if (file) handleFile(file);
    e.target.value = ''; // Reset for re-upload
  }

  return (
    <div
      onClick={() => !analyzing && fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`eco-card p-6 cursor-pointer border-2 border-dashed transition-all duration-200 ${
        isDragging
          ? 'border-eco-500 bg-eco-50/50 dark:bg-eco-950/20'
          : 'border-surface-300 dark:border-surface-700 hover:border-eco-400'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-3 text-center">
        {analyzing ? (
          <>
            <LoadingSpinner size="md" />
            <p className="text-sm text-surface-500">{t('scan.analyzing')}</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
              <Upload className="w-6 h-6 text-surface-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-surface-700 dark:text-surface-300">
                {t('scan.upload_image')}
              </p>
              <p className="text-xs text-surface-400 mt-1">
                Drag & drop or click to browse (max 10MB)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
