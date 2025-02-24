import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SoftballStatsApp/', // Set this to your GitHub repository name
});
