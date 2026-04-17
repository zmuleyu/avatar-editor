import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RemoveBgStage } from './RemoveBgStage';

vi.mock('@/lib/bg-remover', () => ({
  removeBg: vi.fn(async (_src: string, opts?: { onProgress?: (p: number) => void }) => {
    opts?.onProgress?.(0.5);
    opts?.onProgress?.(1);
    return 'data:image/png;base64,BG_REMOVED';
  }),
}));

describe('RemoveBgStage', () => {
  it('calls onDone with transparent PNG', async () => {
    const onDone = vi.fn();
    render(<RemoveBgStage src="data:image/jpeg;base64,IN" onDone={onDone} onSkip={vi.fn()} onError={vi.fn()} />);
    await waitFor(() => expect(onDone).toHaveBeenCalledWith('data:image/png;base64,BG_REMOVED'), { timeout: 2000 });
  });

  it('skip button invokes onSkip with original src', async () => {
    const onSkip = vi.fn();
    const user = userEvent.setup();
    render(<RemoveBgStage src="data:image/jpeg;base64,IN" onDone={vi.fn()} onSkip={onSkip} onError={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /跳过/ }));
    expect(onSkip).toHaveBeenCalledWith('data:image/jpeg;base64,IN');
  });
});
