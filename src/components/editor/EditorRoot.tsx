'use client';
import { useCallback, useState } from 'react';
import { UploadStage } from './UploadStage';
import { RemoveBgStage } from './RemoveBgStage';
import { EditStage } from './EditStage';
import { ResultStage } from './ResultStage';
import { usePostMessageBridge } from '@/hooks/usePostMessageBridge';

type Stage = 'upload' | 'remove-bg' | 'edit' | 'result';

export interface EditorRootProps {
  mode: 'embed' | 'standalone';
  sessionId: string;
  trustedOrigins: string[];
}

export function EditorRoot({ mode, sessionId, trustedOrigins }: EditorRootProps) {
  const [stage, setStage] = useState<Stage>('upload');
  const [src, setSrc] = useState<string>('');
  const [intermediate, setIntermediate] = useState<string>('');

  const onLoadFromParent = useCallback((dataURL: string) => {
    setSrc(dataURL);
    setStage('remove-bg');
  }, []);

  const bridge = usePostMessageBridge({
    trustedOrigins,
    sessionId,
    onLoad: onLoadFromParent,
  });

  const startFromUpload = (dataURL: string) => {
    setSrc(dataURL);
    setStage('remove-bg');
  };

  const afterBgRemove = (out: string) => {
    setIntermediate(out);
    setStage('edit');
  };

  const afterEdit = (out: string) => {
    setIntermediate(out);
    setStage('result');
  };

  const confirmEmbed = (finalURL: string) => {
    bridge.sendResult(finalURL);
    setTimeout(() => window.close(), 50);
  };

  if (stage === 'upload') return <UploadStage mode={mode} onImageReady={startFromUpload} />;
  if (stage === 'remove-bg') return (
    <RemoveBgStage
      src={src}
      onDone={afterBgRemove}
      onSkip={afterBgRemove}
      onError={(msg) => {
        bridge.sendError(msg);
        setIntermediate(src);
        setStage('edit');
      }}
    />
  );
  if (stage === 'edit') return <EditStage src={intermediate} onDone={afterEdit} onBack={() => setStage('remove-bg')} />;
  return <ResultStage dataURL={intermediate} mode={mode} onConfirm={confirmEmbed} onRestart={() => setStage('upload')} />;
}
