import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, FlipHorizontal2, X } from 'lucide-react';
import { toast } from 'sonner';

import { useCamera } from '@/hooks/useCamera';
import scanService from '@/services/scanService';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

/**
 * Camera view component — live camera feed with capture button.
 */
export default function CameraView({ onResult, onImageCapture }) {
  const { t } = useTranslation();
  const {
    videoRef,
    canvasRef,
    isActive,
    error,
    capturedImage,
    startCamera,
    stopCamera,
    capturePhoto,
    toggleCamera,
    resetCapture,
  } = useCamera();

  const [analyzing, setAnalyzing] = useState(false);

  const handleCapture = useCallback(async () => {
    const blob = await capturePhoto();
    if (!blob) return;

    onImageCapture?.(URL.createObjectURL(blob));
    setAnalyzing(true);

    try {
      const result = await scanService.predictImage(blob);
      onResult?.(result);
    } catch (err) {
      toast.error(err.message || 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  }, [capturePhoto, onResult, onImageCapture]);

  const handleRetake = useCallback(() => {
    resetCapture();
    onResult?.(null);
    onImageCapture?.(null);
    startCamera();
  }, [resetCapture, onResult, onImageCapture, startCamera]);

  return (
    <div className="eco-card overflow-hidden">
      {/* Camera preview */}
      <div className="relative aspect-[4/3] bg-surface-900 rounded-t-2xl overflow-hidden">
        {!isActive && !capturedImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <Camera className="w-12 h-12 text-surface-500" />
            <Button onClick={startCamera} variant="primary">
              {t('scan.take_photo')}
            </Button>
            {error && (
              <p className="text-red-400 text-xs text-center px-4 max-w-xs">
                {error}
              </p>
            )}
          </div>
        )}

        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${!isActive ? 'hidden' : ''}`}
          autoPlay
          playsInline
          muted
        />

        {capturedImage && (
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        )}

        {analyzing && (
          <div className="absolute inset-0 bg-surface-900/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
            <LoadingSpinner size="lg" />
            <p className="text-white text-sm font-medium animate-pulse">
              {t('scan.ai_thinking')}
            </p>
          </div>
        )}

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Controls */}
      {isActive && (
        <div className="flex items-center justify-center gap-4 p-4">
          <Button variant="icon" onClick={toggleCamera} title="Switch Camera">
            <FlipHorizontal2 className="w-5 h-5" />
          </Button>
          <button
            onClick={handleCapture}
            disabled={analyzing}
            className="w-16 h-16 rounded-full bg-white dark:bg-surface-200 border-4 border-eco-500 shadow-glow-eco hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
            aria-label="Capture photo"
          />
          <Button variant="icon" onClick={stopCamera} title="Close Camera">
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      {capturedImage && !analyzing && (
        <div className="p-4">
          <Button onClick={handleRetake} variant="ghost" className="w-full">
            {t('scan.retake')}
          </Button>
        </div>
      )}
    </div>
  );
}
