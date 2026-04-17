import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResultStage } from './ResultStage';

describe('ResultStage', () => {
  it('renders preview image', () => {
    render(<ResultStage dataURL="data:image/png;base64,AAA" mode="embed" onConfirm={vi.fn()} onRestart={vi.fn()} />);
    expect(screen.getByAltText(/结果预览/)).toBeDefined();
  });

  it('confirm button calls onConfirm with dataURL in embed mode', async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<ResultStage dataURL="data:image/png;base64,AAA" mode="embed" onConfirm={onConfirm} onRestart={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /回传主站/ }));
    expect(onConfirm).toHaveBeenCalledWith('data:image/png;base64,AAA');
  });

  it('shows download link in standalone mode', () => {
    render(<ResultStage dataURL="data:image/png;base64,AAA" mode="standalone" onConfirm={vi.fn()} onRestart={vi.fn()} />);
    const link = screen.getByRole('link', { name: /下载 PNG/ }) as HTMLAnchorElement;
    expect(link.href).toContain('data:image/png');
    expect(link.download).toBe('avatar.png');
  });
});
