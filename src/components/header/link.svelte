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
			"focus-visible:ring-offset-primary/20 w-full sm:bg-transparent bg-bg1 sm:w-fit text-nowrap focus-visible:ring-muted inline-flex items-center justify-center rounded-sm text-sm font-medium duration-150 focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 disabled:opacity-75 text-foreground hover:bg-bg1/50 h-8 gap-1.5 px-3",
			className
		)}
		{href}>{@render children()}</NavigationMenu.Link
	>
</NavigationMenu.Item>
