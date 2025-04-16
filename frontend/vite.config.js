import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path'; // ✅ ESM-compatible import

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.cjs'), // ✅ tell Vite where to find postcss config
  },
});
