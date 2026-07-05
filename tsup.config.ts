import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/infrastructure/http/server.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  outDir: 'dist',
});
