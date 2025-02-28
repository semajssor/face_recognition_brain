import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Fix for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "/face_recognition_brain/", // Change this to your repository name
  build: {
    outDir: "dist"
  }
});