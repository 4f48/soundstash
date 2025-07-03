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
