import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CameraView from './components/CameraView';
import ImageUpload from './components/ImageUpload';
import ResultCard from './components/ResultCard';

/**
 * Scan — Desktop layout.
 * Two-column: camera/upload on left, result on right.
 */
export default function ScanDesktop() {
  const { t } = useTranslation();
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
          {t('scan.title')}
        </h1>
        <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">
          {t('scan.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera / Upload Section */}
        <div className="space-y-4">
          <CameraView
            onResult={setResult}
            onImageCapture={setImagePreview}
          />
          <ImageUpload
            onResult={setResult}
            onImageSelect={setImagePreview}
          />
        </div>

        {/* Result Section */}
        <div>
          <ResultCard
            result={result}
            imagePreview={imagePreview}
            onReset={() => {
              setResult(null);
              setImagePreview(null);
            }}
          />
        </div>
      </div>
    </div>
  );
}
