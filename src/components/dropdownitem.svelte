<script lang="ts">
	import Button from "@/components/button.svelte";
	import { cn } from "@/lib/utils";
	import { DropdownMenu, type DropdownMenuItemProps } from "bits-ui";
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";

	interface Props extends DropdownMenuItemProps {
		children: Snippet;
		class?: string;
		disabled?: boolean;
		href?: string;
		onclick?: EventHandler;
	}
	const {
		children,
		class: className,
		disabled = false,
		href,
		onclick,
		...props
	}: Props = $props();
</script>

<DropdownMenu.Item {disabled} {...props}
	><Button
		class={cn("hover:bg-bg2/50 w-full shrink-0 justify-start", className)}
		{disabled}
		{href}
		{onclick}
		variant="ghost">{@render children()}</Button
	></DropdownMenu.Item
>
