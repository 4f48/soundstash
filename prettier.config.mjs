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
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-astro-organize-imports",
		"prettier-plugin-tailwindcss",
	],
	trailingComma: "es5",
	useTabs: true,
	tailwindFunctions: ["cva", "cn"],
};

export default config;
