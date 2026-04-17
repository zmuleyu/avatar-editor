import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { EditorRoot } from './EditorRoot';

vi.mock('@/lib/bg-remover', () => ({
  removeBg: vi.fn(async () => 'data:image/png;base64,OUT'),
}));

describe('EditorRoot', () => {
  it('starts at upload stage in standalone mode', () => {
    render(<EditorRoot mode="standalone" sessionId="s1" trustedOrigins={[]} />);
    expect(screen.getByText(/选择图片/)).toBeDefined();
  });

  it('starts at upload stage in embed mode (waiting prompt)', () => {
    render(<EditorRoot mode="embed" sessionId="s1" trustedOrigins={['https://good.com']} />);
    expect(screen.getByText(/等待来自主站的图片/)).toBeDefined();
  });

  it('transitions upload → remove-bg on editor-load postMessage', () => {
    render(<EditorRoot mode="embed" sessionId="s1" trustedOrigins={['https://good.com']} />);
    act(() => {
      window.dispatchEvent(new MessageEvent('message', {
        data: { type: 'editor-load', sessionId: 's1', dataURL: 'data:image/png;base64,IN' },
        origin: 'https://good.com',
      }));
    });
    expect(screen.getByText(/正在去背景/)).toBeDefined();
  });
});
