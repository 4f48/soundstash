import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
	adapter: cloudflare({
		imageService: "cloudflare",
	}),
	env: {
		schema: {
			BETTER_AUTH_URL: envField.string({
				context: "client",
				access: "public",
				optional: false,
				url: true,
			}),
			BETTER_AUTH_SECRET: envField.string({
				context: "server",
				access: "secret",
				optional: false,
				min: 32,
			}),
			CLOUDFLARE_R2_ENDPOINT: envField.string({
				context: "server",
				access: "public",
				optional: false,
				url: true,
			}),
			CLOUDFLARE_R2_BUCKET: envField.string({
				context: "server",
				access: "public",
				optional: false,
			}),
			CLOUDFLARE_R2_KEY_ID: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
			CLOUDFLARE_R2_SECRET: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
			DATABASE_URL: envField.string({
				context: "server",
				access: "public",
				optional: false,
				url: true,
			}),
			DATABASE_TOKEN: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
			RESEND_KEY: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
		},
		validateSecrets: true,
	},
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
