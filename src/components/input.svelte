<script lang="ts">
	import { cn } from "../lib/utils";
	import type { ClassValue } from "clsx";
	import type { HTMLInputAttributes } from "svelte/elements";

	type Props = {
		class?: ClassValue;
	} & HTMLInputAttributes;
	const { class: className, ...props }: Props = $props();
</script>

<input
	class={cn(
		"aria-[invalid=true]:bg-destructive/30 aria-[invalid=true]:focus:ring-destructive/75! border-bg3 bg-bg1 placeholder:text-muted-foreground/80 disabled:border-foreground/50 focus-visible:ring-bg4/50 h-8 rounded-sm border px-3 text-sm focus:outline-none focus-visible:ring-[2.5px]",
		className
	)}
	{...props}
/>
