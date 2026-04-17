import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: { environment: 'happy-dom', globals: true, setupFiles: [], passWithNoTests: true },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
