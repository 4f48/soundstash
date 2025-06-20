import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	adapter: vercel(),
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
	prefetch: {
		defaultStrategy: "viewport",
		prefetchAll: true,
	},
	site: "https://soundstash.pirger.eu",
	vite: {
		build: {
			rollupOptions: {
				maxParallelFileOps: 200,
			},
		},
		plugins: [tailwindcss()],
	},
});
