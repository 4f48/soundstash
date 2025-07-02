import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	adapter: cloudflare({
		imageService: "cloudflare",
	}),
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
	integrations: [react(), sitemap()],
	output: "server",
	prefetch: {
		defaultStrategy: "viewport",
		prefetchAll: true,
	},
	site: "https://soundstash.pirger.eu",
	vite: {
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
