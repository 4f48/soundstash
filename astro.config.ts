import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

import vercel from "@astrojs/vercel";

export default defineConfig({
    adapter: vercel(),
    site: "https://soundstash.pirger.eu",
    experimental: {
        fonts: [
            {
                cssVariable: "--font-inter",
                featureSettings: "'liga' 1, 'calt' 1",
                name: "Inter",
                provider: fontProviders.bunny(),
            },
        ],
    },
    integrations: [react()],
    output: "server",
    vite: {
        build: {
            rollupOptions: {
                maxParallelFileOps: 200,
            },
        },
        plugins: [tailwindcss()],
        resolve: {
            alias: import.meta.env.PROD
                ? {
                        "react-dom/server": "react-dom/server.edge",
                    }
                : undefined,
        },
    },
});
