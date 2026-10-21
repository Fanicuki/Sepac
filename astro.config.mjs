// @ts-check
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

const site = 'https://sepacagroaereo.com';

/** @returns {import('astro').AstroIntegration} */
function sitemap() {
  return {
    name: 'sepac-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const base = dir.href.endsWith('/') ? dir : new URL(`${dir.href}/`);
        const urls = [...new Set(
          pages
            .map((page) => page.pathname)
            .filter((pathname) => pathname !== '404' && pathname !== '404/')
            .map((pathname) => new URL(pathname === '' ? '/' : pathname, `${site}/`).href)
        )].sort((a, b) => a.localeCompare(b));

        const cuerpo = urls
          .map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`)
          .join('\n');
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${cuerpo}\n</urlset>\n`;

        await writeFile(fileURLToPath(new URL('sitemap.xml', base)), xml);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [react(), sitemap()],
  output: 'static',
  compressHTML: true,
});