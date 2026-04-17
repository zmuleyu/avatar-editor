import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@imgly/background-removal', () => ({
  removeBackground: vi.fn(async (_src: unknown, opts?: { progress?: (key: string, current: number, total: number) => void }) => {
    opts?.progress?.('fetch', 1, 2);
    opts?.progress?.('fetch', 2, 2);
    return new Blob(['fake-png'], { type: 'image/png' });
  }),
}));

describe('bg-remover', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('returns transparent PNG dataURL', async () => {
    const { removeBg } = await import('./bg-remover');
    const result = await removeBg('data:image/jpeg;base64,AAA');
    expect(result).toMatch(/^data:image\/png;base64,/);
  });

  it('reports progress via callback', async () => {
    const { removeBg } = await import('./bg-remover');
    const progress = vi.fn();
    await removeBg('data:image/jpeg;base64,AAA', { onProgress: progress });
    expect(progress).toHaveBeenCalled();
    const last = progress.mock.calls.at(-1)![0];
    expect(last).toBeGreaterThanOrEqual(0);
    expect(last).toBeLessThanOrEqual(1);
  });

  it('rejects invalid dataURL', async () => {
    const { removeBg } = await import('./bg-remover');
    await expect(removeBg('not-a-data-url')).rejects.toThrow(/invalid/i);
  });
});
