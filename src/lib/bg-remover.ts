import { removeBackground } from '@imgly/background-removal';

export interface RemoveBgOptions {
  onProgress?: (ratio: number) => void;
}

export async function removeBg(dataURL: string, opts: RemoveBgOptions = {}): Promise<string> {
  if (!dataURL.startsWith('data:')) {
    throw new Error('invalid dataURL');
  }
  const blob = await removeBackground(dataURL, {
    progress: (_key: string, current: number, total: number) => {
      if (total > 0) opts.onProgress?.(current / total);
    },
  });
  return await blobToDataURL(blob);
}

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error ?? new Error('FileReader failed'));
      reader.readAsDataURL(blob);
    } else {
      // happy-dom fallback
      blob.arrayBuffer().then((buf) => {
        const b64 = Buffer.from(buf).toString('base64');
        resolve(`data:${blob.type};base64,${b64}`);
      }).catch(reject);
    }
  });
}
