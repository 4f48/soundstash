<script lang="ts">
	import { cn } from "@/lib/utils";
	import { Toggle } from "bits-ui";
	import type { Snippet } from "svelte";

	interface Props extends Toggle.RootProps {
		children: Snippet;
		class?: string;
	}
	let {
		children,
		class: className,
		pressed = $bindable(),
		...props
	}: Props = $props();
</script>

<Toggle.Root
	class={cn(
		"enabled:hover:bg-bg1/60 data-[state=on]:bg-bg1/50 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm",
		className
	)}
	bind:pressed
	{...props}>{@render children()}</Toggle.Root
>
