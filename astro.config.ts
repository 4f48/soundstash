import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import { defineConfig, envField } from "astro/config";
import unocss from "unocss/astro";

export default defineConfig({
	adapter: cloudflare({
		imageService: "cloudflare",
		platformProxy: {
			enabled: true,
			experimental: {
				remoteBindings: true,
			},
		},
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
			GITHUB_CLIENT_ID: envField.string({
				context: "server",
				access: "secret",
				optional: true,
			}),
			GITHUB_CLIENT_SECRET: envField.string({
				context: "server",
				access: "secret",
				optional: true,
			}),
			GOOGLE_CLIENT_ID: envField.string({
				context: "server",
				access: "secret",
				optional: true,
			}),
			GOOGLE_CLIENT_SECRET: envField.string({
				context: "server",
				access: "secret",
				optional: true,
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
	integrations: [
		sitemap(),
		svelte(),
		unocss({
			injectReset: true,
		}),
	],
	output: "server",
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	site: "https://soundstash.pirger.eu",
});
