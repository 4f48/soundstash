<script lang="ts">
	import Button from "@/components/button.svelte";
	import { DropdownMenu, type DropdownMenuItemProps } from "bits-ui";
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";

	interface Props extends DropdownMenuItemProps {
		children: Snippet;
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
	const { children, href, onclick, ...props }: PropsUnion = $props();
</script>

<DropdownMenu.Item {...props}
	><Button
		class="hover:bg-bg2/50 w-full justify-start"
		{href}
		{onclick}
		variant="ghost">{@render children()}</Button
	></DropdownMenu.Item
>
