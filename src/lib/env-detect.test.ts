import { describe, it, expect } from 'vitest';
import { isTouchOnly } from './env-detect';

describe('env-detect', () => {
  it('returns true when ontouchstart in window and no fine pointer', () => {
    const win = { ontouchstart: null, matchMedia: () => ({ matches: false }) } as unknown as Window;
    expect(isTouchOnly(win)).toBe(true);
  });

  it('returns false on desktop (fine pointer)', () => {
    const win = { matchMedia: (q: string) => ({ matches: q.includes('pointer: fine') }) } as unknown as Window;
    expect(isTouchOnly(win)).toBe(false);
  });
});
