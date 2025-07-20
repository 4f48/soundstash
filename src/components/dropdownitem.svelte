<script lang="ts">
	import Button from "@/components/button.svelte";
	import { cn } from "@/lib/utils";
	import { DropdownMenu, type DropdownMenuItemProps } from "bits-ui";
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";

	interface Props extends DropdownMenuItemProps {
		children: Snippet;
		class?: string;
		href?: string;
		onclick?: EventHandler;
	}
	const {
		children,
		class: className,
		href,
		onclick,
		...props
	}: Props = $props();
</script>

<DropdownMenu.Item {...props}
	><Button
		class={cn("hover:bg-bg2/50 w-full shrink-0 justify-start", className)}
		{href}
		{onclick}
		variant="ghost">{@render children()}</Button
	></DropdownMenu.Item
>
