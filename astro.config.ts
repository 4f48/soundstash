import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	adapter: cloudflare({
		imageService: "cloudflare",
		platformProxy: {
			enabled: true,
		},
	}),
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
