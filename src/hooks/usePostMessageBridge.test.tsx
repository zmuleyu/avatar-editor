import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePostMessageBridge } from './usePostMessageBridge';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('usePostMessageBridge', () => {
  it('ignores messages from untrusted origin', () => {
    const onLoad = vi.fn();
    renderHook(() =>
      usePostMessageBridge({
        trustedOrigins: ['https://good.com'],
        sessionId: 's1',
        onLoad,
      })
    );
    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: {
            type: 'editor-load',
            sessionId: 's1',
            dataURL: 'data:,x',
          },
          origin: 'https://evil.com',
        })
      );
    });
    expect(onLoad).not.toHaveBeenCalled();
  });

  it('ignores messages with wrong sessionId', () => {
    const onLoad = vi.fn();
    renderHook(() =>
      usePostMessageBridge({
        trustedOrigins: ['https://good.com'],
        sessionId: 's1',
        onLoad,
      })
    );
    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: {
            type: 'editor-load',
            sessionId: 'different',
            dataURL: 'data:,x',
          },
          origin: 'https://good.com',
        })
      );
    });
    expect(onLoad).not.toHaveBeenCalled();
  });

  it('invokes onLoad for valid editor-load', () => {
    const onLoad = vi.fn();
    renderHook(() =>
      usePostMessageBridge({
        trustedOrigins: ['https://good.com'],
        sessionId: 's1',
        onLoad,
      })
    );
    act(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: {
            type: 'editor-load',
            sessionId: 's1',
            dataURL: 'data:image/png;base64,AAA',
          },
          origin: 'https://good.com',
        })
      );
    });
    expect(onLoad).toHaveBeenCalledWith('data:image/png;base64,AAA');
  });

  it('sendToParent posts editor-result to opener origin', () => {
    const opener = { postMessage: vi.fn() };
    vi.stubGlobal('opener', opener);
    const { result } = renderHook(() =>
      usePostMessageBridge({
        trustedOrigins: ['https://good.com'],
        sessionId: 's1',
        onLoad: vi.fn(),
      })
    );
    act(() => {
      result.current.sendResult('data:image/png;base64,OUT');
    });
    expect(opener.postMessage).toHaveBeenCalledWith(
      {
        type: 'editor-result',
        sessionId: 's1',
        dataURL: 'data:image/png;base64,OUT',
      },
      'https://good.com'
    );
  });
});
