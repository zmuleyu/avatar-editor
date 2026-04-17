import { useCallback, useEffect, useRef } from 'react';
import { parseEditorMsg, isTrustedOrigin, type EditorMsg } from '@/lib/protocol';

export interface BridgeOptions {
  trustedOrigins: string[];
  sessionId: string;
  onLoad?: (dataURL: string) => void;
  onCancel?: () => void;
}

export interface BridgeApi {
  sendReady: () => void;
  sendResult: (dataURL: string) => void;
  sendCancel: () => void;
  sendError: (message: string) => void;
}

function postToParent(msg: EditorMsg, targetOrigin: string) {
  const parent = window.opener ?? window.parent;
  if (!parent || parent === window) return;
  parent.postMessage(msg, targetOrigin);
}

export function usePostMessageBridge(opts: BridgeOptions): BridgeApi {
  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const { trustedOrigins, sessionId, onLoad, onCancel } = optsRef.current;
      if (!isTrustedOrigin(event.origin, trustedOrigins)) return;
      const parsed = parseEditorMsg(event.data);
      if (!parsed || parsed.sessionId !== sessionId) return;
      if (parsed.type === 'editor-load') onLoad?.(parsed.dataURL);
      if (parsed.type === 'editor-cancel') onCancel?.();
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const targetOrigin = opts.trustedOrigins[0] ?? '*';

  const sendReady = useCallback(() => {
    postToParent({ type: 'editor-ready', sessionId: opts.sessionId }, targetOrigin);
  }, [opts.sessionId, targetOrigin]);

  const sendResult = useCallback((dataURL: string) => {
    postToParent({ type: 'editor-result', sessionId: opts.sessionId, dataURL }, targetOrigin);
  }, [opts.sessionId, targetOrigin]);

  const sendCancel = useCallback(() => {
    postToParent({ type: 'editor-cancel', sessionId: opts.sessionId }, targetOrigin);
  }, [opts.sessionId, targetOrigin]);

  const sendError = useCallback((message: string) => {
    postToParent({ type: 'editor-error', sessionId: opts.sessionId, message }, targetOrigin);
  }, [opts.sessionId, targetOrigin]);

  return { sendReady, sendResult, sendCancel, sendError };
}
