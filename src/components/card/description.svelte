<script lang="ts">
	import { cn } from "@/lib/utils";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		class?: string;
	}
	const { children, class: className }: Props = $props();
</script>

<p class={cn("text-fg1 text-sm", className)}>
	{@render children()}
</p>
