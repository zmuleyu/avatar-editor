import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditStage } from './EditStage';

describe('EditStage', () => {
  it('renders aspect toggle buttons', () => {
    render(<EditStage src="data:image/png;base64,X" onDone={vi.fn()} onBack={vi.fn()} />);
    expect(screen.getByRole('button', { name: /1:1/ })).toBeDefined();
    expect(screen.getByRole('button', { name: /自由/ })).toBeDefined();
  });

  it('calls onBack when back clicked', async () => {
    const onBack = vi.fn();
    const user = userEvent.setup();
    render(<EditStage src="data:image/png;base64,X" onDone={vi.fn()} onBack={onBack} />);
    await user.click(screen.getByRole('button', { name: /返回/ }));
    expect(onBack).toHaveBeenCalled();
  });

  it('onDone receives a dataURL when confirm clicked', async () => {
    const onDone = vi.fn();
    const user = userEvent.setup();
    render(<EditStage src="data:image/png;base64,X" onDone={onDone} onBack={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /确认裁剪/ }));
    expect(onDone).toHaveBeenCalledWith(expect.stringMatching(/^data:image\//));
  });
});
