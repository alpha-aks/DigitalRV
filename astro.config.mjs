import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// Import the Vercel adapter
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: "https://nx-us-and-co.com",
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel(),
});