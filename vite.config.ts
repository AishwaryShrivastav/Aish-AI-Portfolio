
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Safely expose specific env variables
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
