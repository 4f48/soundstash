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
				name: "Inter",
				provider: "local",
				variants: [
					{
						featureSettings: "'liga' 1, 'calt' 1",
						src: ["./src/assets/fonts/InterVariable.woff2"],
						style: "normal",
						weight: "100 900",
					},
				],
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
