// @ts-check
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
	...astro.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		rules: {
			"no-undef": "off",
		},
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: [".svelte"],
				parser: tseslint.parser,
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
