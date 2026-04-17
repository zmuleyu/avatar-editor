'use client';
import { useEffect, useState } from 'react';
import { removeBg } from '@/lib/bg-remover';

export interface RemoveBgStageProps {
  src: string;
  onDone: (dataURL: string) => void;
  onSkip: (originalDataURL: string) => void;
  onError: (message: string) => void;
}

export function RemoveBgStage({ src, onDone, onSkip, onError }: RemoveBgStageProps) {
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    removeBg(src, { onProgress: (p) => { if (!cancelled) setProgress(p); } })
      .then((out) => { if (!cancelled) onDone(out); })
      .catch((err: unknown) => {
        if (cancelled) return;
        setFailed(true);
        onError(err instanceof Error ? err.message : 'unknown');
      });
    return () => { cancelled = true; };
  }, [src, onDone, onError]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8">
      <img src={src} alt="preview" className="max-h-64 rounded-lg shadow" />
      {!failed ? (
        <>
          <div className="h-2 w-64 overflow-hidden rounded-full bg-zinc-200">
            <div className="h-full bg-zinc-900 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          <p className="text-sm text-zinc-500">正在去背景…{Math.round(progress * 100)}%</p>
        </>
      ) : (
        <p className="text-sm text-red-600">去背景失败，可选择跳过使用原图</p>
      )}
      <button className="rounded-md border px-4 py-2 text-sm" onClick={() => onSkip(src)}>
        跳过（使用原图）
      </button>
    </div>
  );
}
