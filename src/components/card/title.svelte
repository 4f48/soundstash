<script lang="ts">
	import { cn } from "@/lib/utils";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		class?: string;
	}
	const { children, class: className }: Props = $props();
</script>

<h1 class={cn("text-lg font-semibold leading-none tracking-tight", className)}>
	{@render children()}
</h1>
