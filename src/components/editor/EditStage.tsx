'use client';
import { useRef, useState } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type Aspect = '1:1' | 'free';

export interface EditStageProps {
  src: string;
  onDone: (dataURL: string) => void;
  onBack: () => void;
}

export function EditStage({ src, onDone, onBack }: EditStageProps) {
  const [aspect, setAspect] = useState<Aspect>('1:1');
  const [crop, setCrop] = useState<Crop>({ unit: '%', x: 10, y: 10, width: 80, height: 80 });
  const imgRef = useRef<HTMLImageElement | null>(null);

  const confirm = () => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) {
      onDone(src);
      return;
    }
    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const px = {
      x: ((crop.x ?? 0) / 100) * img.width,
      y: ((crop.y ?? 0) / 100) * img.height,
      w: ((crop.width ?? 100) / 100) * img.width,
      h: ((crop.height ?? 100) / 100) * img.height,
    };
    canvas.width = Math.round(px.w * scaleX);
    canvas.height = Math.round(px.h * scaleY);
    const ctx = canvas.getContext('2d');
    if (!ctx) { onDone(src); return; }
    ctx.drawImage(img, px.x * scaleX, px.y * scaleY, px.w * scaleX, px.h * scaleY, 0, 0, canvas.width, canvas.height);
    onDone(canvas.toDataURL('image/png'));
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center gap-4 p-6">
      <div className="flex gap-2">
        <button
          className={`rounded px-3 py-1 text-sm ${aspect === '1:1' ? 'bg-zinc-900 text-white' : 'border'}`}
          onClick={() => setAspect('1:1')}
        >
          1:1
        </button>
        <button
          className={`rounded px-3 py-1 text-sm ${aspect === 'free' ? 'bg-zinc-900 text-white' : 'border'}`}
          onClick={() => setAspect('free')}
        >
          自由
        </button>
      </div>
      <ReactCrop crop={crop} onChange={(_, pct) => setCrop(pct)} aspect={aspect === '1:1' ? 1 : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={src} alt="crop source" className="max-h-[60vh] max-w-full" />
      </ReactCrop>
      <div className="flex gap-2">
        <button className="rounded border px-4 py-2 text-sm" onClick={onBack}>返回</button>
        <button className="rounded bg-zinc-900 px-4 py-2 text-sm text-white" onClick={confirm}>确认裁剪</button>
      </div>
    </div>
  );
}
