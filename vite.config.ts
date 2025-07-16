import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tanstackQueryKeysPlugin from './vite_plugins/tanstackQueryKeysPlugin.js';
import intentEnumPlugin from './vite_plugins/transformIntentEnumPlugin.js';

// Read environment variable
const isProduction = process.env.APP_ENV === 'production';

// Conditionally load custom plugins
const customDevPlugins = isProduction
    ? []
    : [
          // permissionEnumPlugin(),
          //  roleEnumPlugin(),
          intentEnumPlugin(),
          tanstackQueryKeysPlugin(),
      ];

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        ...customDevPlugins,
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
