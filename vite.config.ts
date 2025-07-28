import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
  },
  plugins: [dts({ bundleTypes: true })],
});
