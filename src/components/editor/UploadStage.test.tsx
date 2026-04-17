import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UploadStage } from './UploadStage';

describe('UploadStage', () => {
  it('renders file input for standalone mode', () => {
    render(<UploadStage mode="standalone" onImageReady={vi.fn()} />);
    expect(screen.getByLabelText(/选择图片/i)).toBeDefined();
  });

  it('shows "等待来自主站的图片" for embed mode', () => {
    render(<UploadStage mode="embed" onImageReady={vi.fn()} />);
    expect(screen.getByText(/等待来自主站的图片/i)).toBeDefined();
  });

  it('calls onImageReady with dataURL when file selected', async () => {
    const onImageReady = vi.fn();
    const user = userEvent.setup();
    render(<UploadStage mode="standalone" onImageReady={onImageReady} />);
    const file = new File(['png-data'], 'a.png', { type: 'image/png' });
    const input = screen.getByLabelText(/选择图片/i) as HTMLInputElement;
    await user.upload(input, file);
    await new Promise((r) => setTimeout(r, 200));
    expect(onImageReady).toHaveBeenCalledWith(expect.stringMatching(/^data:image\/png/));
  });
});
