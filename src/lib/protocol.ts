export type EditorMsg =
  | { type: 'editor-ready'; sessionId: string }
  | { type: 'editor-load'; sessionId: string; dataURL: string }
  | { type: 'editor-result'; sessionId: string; dataURL: string }
  | { type: 'editor-cancel'; sessionId: string }
  | { type: 'editor-error'; sessionId: string; message: string };

const KNOWN_TYPES = new Set([
  'editor-ready', 'editor-load', 'editor-result', 'editor-cancel', 'editor-error',
]);

export function buildEditorMsg(msg: EditorMsg): EditorMsg {
  return msg;
}

export function parseEditorMsg(raw: unknown): EditorMsg | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const m = raw as Record<string, unknown>;
  if (typeof m.type !== 'string' || !KNOWN_TYPES.has(m.type)) return null;
  if (typeof m.sessionId !== 'string' || m.sessionId.length === 0) return null;
  switch (m.type) {
    case 'editor-ready':
    case 'editor-cancel':
      return { type: m.type, sessionId: m.sessionId };
    case 'editor-load':
    case 'editor-result':
      if (typeof m.dataURL !== 'string' || !m.dataURL.startsWith('data:')) return null;
      return { type: m.type, sessionId: m.sessionId, dataURL: m.dataURL };
    case 'editor-error':
      if (typeof m.message !== 'string') return null;
      return { type: 'editor-error', sessionId: m.sessionId, message: m.message };
    default:
      return null;
  }
}

export function isTrustedOrigin(origin: string, whitelist: string[]): boolean {
  return whitelist.includes(origin);
}
