<script lang="ts">
	import { cn } from "@/lib/utils";
	import { NavigationMenu } from "bits-ui";
	import type { ClassValue } from "clsx";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		class?: ClassValue;
		href: string;
	}
	const { children, class: className, href }: Props = $props();
</script>

<NavigationMenu.Item>
	<NavigationMenu.Link
		class={cn(
			"focus-visible:ring-offset-primary/20 bg-bg1 focus-visible:ring-muted text-foreground hover:bg-bg1/50 inline-flex h-8 w-full items-center justify-center gap-1.5 text-nowrap rounded-sm px-3 text-sm font-medium duration-150 focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 disabled:opacity-75 sm:w-fit sm:bg-transparent",
			className
		)}
		{href}>{@render children()}</NavigationMenu.Link
	>
</NavigationMenu.Item>
