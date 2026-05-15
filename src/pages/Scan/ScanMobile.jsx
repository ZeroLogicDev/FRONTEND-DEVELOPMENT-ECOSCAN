import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CameraView from './components/CameraView';
import ImageUpload from './components/ImageUpload';
import ResultCard from './components/ResultCard';

/**
 * Scan — Mobile layout.
 * Single-column stacked layout with camera taking priority.
 */
export default function ScanMobile() {
  const { t } = useTranslation();
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center">
        <h1 className="text-xl font-bold text-surface-900 dark:text-surface-50">
          {t('scan.title')}
        </h1>
        <p className="text-surface-500 dark:text-surface-400 text-xs mt-1">
          {t('scan.subtitle')}
        </p>
      </div>

      {/* Show result or camera */}
      {result ? (
        <ResultCard
          result={result}
          imagePreview={imagePreview}
          onReset={() => {
            setResult(null);
            setImagePreview(null);
          }}
        />
      ) : (
        <>
          <CameraView
            onResult={setResult}
            onImageCapture={setImagePreview}
          />
          <ImageUpload
            onResult={setResult}
            onImageSelect={setImagePreview}
          />
        </>
      )}
    </div>
  );
}
