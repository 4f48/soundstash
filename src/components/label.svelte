<script lang="ts">
	import { cn } from "../lib/utils";
	import { Label } from "bits-ui";
	import type { ClassValue } from "clsx";
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		class?: ClassValue;
	} & Label.RootProps;
	const { children, class: className, ...props }: Props = $props();
</script>

<Label.Root class={cn("text-sm", className)} {...props}
	>{@render children()}</Label.Root
>
