// @ts-check

/** @type {import("prettier").Config}  **/
const config = {
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
	plugins: [
		"prettier-plugin-astro",
		"prettier-plugin-svelte",
		"prettier-plugin-tailwindcss",
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-astro-organize-imports",
	],
	trailingComma: "es5",
	useTabs: true,
};

export default config;
