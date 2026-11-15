import path from 'node:path';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.VITE_PORT === undefined) {
    throw new Error('VITE_PORT is not defined in the environment variables.');
  }
  const port = Number(env.VITE_PORT);
  console.log(`Server is started in ${mode} mode on port:${port}`);
  return {
    server: {
      port,
      strictPort: true,
    },
    plugins: [
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      tailwindcss(),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    resolve: {
      alias: { '@': path.resolve(import.meta.dirname, './src') },
    },
  };
});
