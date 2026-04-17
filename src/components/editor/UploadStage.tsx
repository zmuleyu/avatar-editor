'use client';
import { useCallback } from 'react';

export interface UploadStageProps {
  mode: 'embed' | 'standalone';
  onImageReady: (dataURL: string) => void;
}

async function fileToDataURL(file: File): Promise<string> {
  if (typeof FileReader !== 'undefined') {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error ?? new Error('read failed'));
      reader.readAsDataURL(file);
    });
  }
  // happy-dom fallback
  const buf = await file.arrayBuffer();
  const b64 = Buffer.from(buf).toString('base64');
  return `data:${file.type};base64,${b64}`;
}

export function UploadStage({ mode, onImageReady }: UploadStageProps) {
  const handleFile = useCallback((file: File) => {
    fileToDataURL(file).then(onImageReady).catch(console.error);
  }, [onImageReady]);

  if (mode === 'embed') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-zinc-500">
        等待来自主站的图片…
      </div>
    );
  }

  return (
    <label className="flex min-h-[60vh] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-zinc-300 p-8">
      <span className="text-base">选择图片（standalone 模式）</span>
      <input
        type="file"
        accept="image/*"
        aria-label="选择图片"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <span className="text-xs text-zinc-500">PNG / JPG / WEBP</span>
    </label>
  );
}
