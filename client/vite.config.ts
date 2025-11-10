import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: true,
      port: Number(process.env.PORT) || 5173,
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
    define: {
      'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(
        env.VITE_OPENAI_API_KEY
      ),
    },
  };
});
