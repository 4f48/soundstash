import { defineConfig, presetWind4 } from "unocss";

export default defineConfig({
	presets: [presetWind4()],
	theme: {
		font: {
			sans: "var(--font-inter)",
		},
		colors: {
			bg0: "oklch(0.9655 0.0394 100.86)",
			bg: "oklch(0.9555 0.0555 96.15)",
			bg1: "oklch(0.8941 0.0566 89.24)",
			bg2: "oklch(0.8255 0.0507 85.12)",
			bg3: "oklch(0.7564 0.041 82.28)",
			bg4: "oklch(0.6903 0.0346 76.31)",
			bg5: "oklch(0.6192 0.0286 67.26)",
			fg0: "oklch(0.2768 0 0)",
			fg: "oklch(0.3441 0.0066 48.52)",
			fg1: "oklch(0.411 0.0115 51.87)",
			fg2: "oklch(0.4818 0.0181 61.04)",
			destructive: "oklch(0.5458 0.203 28.66)",
			primary: "oklch(0.6176 0.1277 70.67)",
			success: "oklch(0.6564 0.1354 109.12)",
			"success-light": "oklch(0.9764 0.1091 110.83)",
		},
	},
});
