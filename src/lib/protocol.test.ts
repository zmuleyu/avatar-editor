import { describe, it, expect } from 'vitest';
import { parseEditorMsg, buildEditorMsg, isTrustedOrigin } from './protocol';

describe('protocol', () => {
  it('builds and parses editor-ready', () => {
    const msg = buildEditorMsg({ type: 'editor-ready', sessionId: 'abc' });
    const parsed = parseEditorMsg(msg);
    expect(parsed).toEqual({ type: 'editor-ready', sessionId: 'abc' });
  });

  it('parse returns null on unknown type', () => {
    expect(parseEditorMsg({ type: 'garbage' })).toBeNull();
  });

  it('parse returns null on missing sessionId', () => {
    expect(parseEditorMsg({ type: 'editor-ready' })).toBeNull();
  });

  it('parse validates editor-load requires dataURL', () => {
    expect(parseEditorMsg({ type: 'editor-load', sessionId: 'x' })).toBeNull();
    expect(parseEditorMsg({ type: 'editor-load', sessionId: 'x', dataURL: 'data:image/png;base64,AAA' })).not.toBeNull();
  });

  it('isTrustedOrigin exact match only', () => {
    expect(isTrustedOrigin('https://companion-1xa.pages.dev', ['https://companion-1xa.pages.dev'])).toBe(true);
    expect(isTrustedOrigin('https://companion-1xa.pages.dev.evil.com', ['https://companion-1xa.pages.dev'])).toBe(false);
    expect(isTrustedOrigin('null', ['https://companion-1xa.pages.dev'])).toBe(false);
  });
});
