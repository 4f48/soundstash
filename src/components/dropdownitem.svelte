<script lang="ts">
	import Button from "@/components/button.svelte";
	import { cn } from "@/lib/utils";
	import { DropdownMenu, type DropdownMenuItemProps } from "bits-ui";
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";

	interface Props extends DropdownMenuItemProps {
		children: Snippet;
		class?: string;
	}
	type PropsWithHref = Props & {
		href: string;
		onclick?: never;
	};
	type PropsWithOnclick = Props & {
		href?: never;
		onclick: EventHandler;
	};
	type PropsUnion = PropsWithHref | PropsWithOnclick;
	const {
		children,
		class: className,
		href,
		onclick,
		...props
	}: PropsUnion = $props();
</script>

<DropdownMenu.Item {...props}
	><Button
		class={cn("hover:bg-bg2/50 w-full shrink-0 justify-start", className)}
		{href}
		{onclick}
		variant="ghost">{@render children()}</Button
	></DropdownMenu.Item
>
