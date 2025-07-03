import eslintcss from "@eslint/css";
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
	eslint.configs.recommended,
	tseslint.configs.recommended,
	eslintcss.configs.recommended,
	prettier,
	...astro.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	{
		ignores: [
			"./src/components/ui/*",
			"./dist",
			"./.astro",
			"./src/components/posthog.astro",
			"./src/lib/schema/auth.schema.ts",
			"worker-configuration.d.ts",
		],
	},
]);
