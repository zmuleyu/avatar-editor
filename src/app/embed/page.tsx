'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EditorRoot } from '@/components/editor/EditorRoot';
import { DEFAULT_TRUSTED_ORIGINS } from '@/config/editor-config';

function EmbedInner() {
  const params = useSearchParams();
  const sessionId = params.get('session') ?? '';
  if (!sessionId) return <p className="p-8 text-red-600">缺少 session 参数</p>;
  return <EditorRoot mode="embed" sessionId={sessionId} trustedOrigins={DEFAULT_TRUSTED_ORIGINS} />;
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<p className="p-8">加载中…</p>}>
      <EmbedInner />
    </Suspense>
  );
}
