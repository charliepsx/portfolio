import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Build-time rewriter to prefix hard-coded "/images/" and "/assets/" paths in emitted files
// so they work under GitHub Pages subpath (e.g. /portfolio/).
function prefixPublicPaths(base: string): Plugin {
  const prefix = /\/$/.test(base) ? base : base + '/';
  return {
    name: 'rewrite-public-paths',
    apply: 'build',
    generateBundle(_, bundle) {
      const re = /(["'])\/(images|assets)\/(.+?)\1/g;
      for (const key in bundle) {
        const file = bundle[key];
        if (file.type === 'chunk') {
          let changed = false;
          file.code = file.code.replace(re, (match, quote, folder, rest) => {
            changed = true;
            return `${quote}${prefix}${folder}/${rest}${quote}`;
          });
          if (changed) this.warn(`Rewrote public paths in chunk: ${file.fileName}`);
        } else if (file.type === 'asset' && typeof file.source === 'string') {
          let changed = false;
          const src = file.source as string;
          const out = src.replace(re, (match, quote, folder, rest) => {
            changed = true;
            return `${quote}${prefix}${folder}/${rest}${quote}`;
          });
          if (changed) {
            file.source = out;
            this.warn(`Rewrote public paths in asset: ${file.fileName}`);
          }
        }
      }
    },
  };
}

// Conditional base: dev/preview at root, production (mode 'gh') under /portfolio/.
export default defineConfig(({ mode }) => {
  const isGh = mode === 'gh';
  const base = isGh ? '/portfolio/' : '/';
  return {
    plugins: [react(), isGh ? prefixPublicPaths(base) : null].filter(Boolean),
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: { input: { main: 'index.html' } },
    },
    server: { open: '/' },
    preview: { open: '/' },
  };
});