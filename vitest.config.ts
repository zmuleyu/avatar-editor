import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: { environment: 'happy-dom', globals: true, setupFiles: [], passWithNoTests: true },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
