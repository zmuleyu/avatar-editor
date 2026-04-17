'use client';

export interface ResultStageProps {
  dataURL: string;
  mode: 'embed' | 'standalone';
  onConfirm: (dataURL: string) => void;
  onRestart: () => void;
}

export function ResultStage({ dataURL, mode, onConfirm, onRestart }: ResultStageProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center gap-6 p-6">
      <div
        className="rounded-lg p-4"
        style={{
          backgroundImage: 'conic-gradient(#eee 25%, #fff 25% 50%, #eee 50% 75%, #fff 75%)',
          backgroundSize: '16px 16px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataURL} alt="结果预览" className="max-h-80 rounded-lg" />
      </div>
      <div className="flex gap-2">
        <button className="rounded border px-4 py-2 text-sm" onClick={onRestart}>
          重新开始
        </button>
        {mode === 'embed' ? (
          <button
            className="rounded bg-zinc-900 px-4 py-2 text-sm text-white"
            onClick={() => onConfirm(dataURL)}
          >
            回传主站
          </button>
        ) : (
          <a
            className="rounded bg-zinc-900 px-4 py-2 text-sm text-white"
            href={dataURL}
            download="avatar.png"
          >
            下载 PNG
          </a>
        )}
      </div>
    </div>
  );
}
