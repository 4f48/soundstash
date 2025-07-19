<script lang="ts">
	import { cn } from "@/lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		children: Snippet;
		level?: number;
	}
	const { children, class: className, level, ...props }: Props = $props();
</script>

<div
	class={cn(
		"flex flex-col gap-2 rounded-md border p-3",
		`bg-bg${level ? level : ""}`,
		`border-bg${(level ? level : 0) + 2}`,
		className
	)}
	{...props}
>
	{@render children()}
</div>
