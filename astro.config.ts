import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
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
	},
});
