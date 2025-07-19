<script lang="ts">
	import { cn } from "../lib/utils";
	import type { ClassValue } from "clsx";
	import type { HTMLInputAttributes } from "svelte/elements";

	type Props = {
		class?: ClassValue;
		focusSelect?: boolean;
	} & HTMLInputAttributes;
	const { class: className, focusSelect = false, ...props }: Props = $props();

	function select(node: HTMLInputElement): { destroy: () => void } | void {
		if (!focusSelect) return;
		function handleFocus() {
			node.select();
		}
		node.addEventListener("focus", handleFocus);

		return {
			destroy() {
				node.removeEventListener("focus", handleFocus);
			},
		};
	}
</script>

<input
	class={cn(
		"aria-[invalid=true]:bg-destructive/30 aria-[invalid=true]:focus:ring-destructive/75! border-bg3 bg-bg1 placeholder:fg2 disabled:border-fg2 focus-visible:ring-bg4/50 h-8 rounded-sm border px-3 text-sm focus:outline-none focus-visible:ring-[2.5px]",
		className
	)}
	use:select
	{...props}
/>
