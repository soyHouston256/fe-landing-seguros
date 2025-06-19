import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server', // Cambiado de 'static' a 'server' para API routes
  adapter: undefined, // Para desarrollo local
});
