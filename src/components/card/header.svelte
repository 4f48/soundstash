<script lang="ts">
	import { cn } from "@/lib/utils";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		class?: string;
	}
	const { children, class: className }: Props = $props();
</script>

<div class={cn("mb-1 grid", className)}>
	{@render children()}
</div>
