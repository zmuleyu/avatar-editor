'use client';
import { useEffect, useMemo, useState } from 'react';
import { EditorRoot } from '@/components/editor/EditorRoot';
import { isTouchOnly } from '@/lib/env-detect';

export default function StandalonePage() {
  const [warn, setWarn] = useState(false);
  const sessionId = useMemo(() => crypto.randomUUID(), []);
  useEffect(() => { if (isTouchOnly()) setWarn(true); }, []);
  return (
    <main>
      {warn && (
        <div className="bg-amber-100 p-3 text-center text-sm text-amber-800">
          建议在桌面浏览器使用以获得更好性能。
        </div>
      )}
      <EditorRoot mode="standalone" sessionId={sessionId} trustedOrigins={[]} />
    </main>
  );
}
