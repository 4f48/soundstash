<script lang="ts">
	import { cn } from "@/lib/utils";
	import { Checkbox } from "bits-ui";
	import { Icon, Check } from "svelte-hero-icons";

	interface Props extends Checkbox.RootProps {
		checked: boolean;
		class?: string;
	}
	let {
		checked = $bindable(),
		class: className,
		onclick,
		onkeydown,
		...rest
	}: Props & {
		onclick?: (e: MouseEvent) => void;
		onkeydown?: (e: KeyboardEvent) => void;
	} = $props();

	function handleClick(e: MouseEvent) {
		// Prevent internal Bits-UI state changes; parent controls "checked"
		e.preventDefault();
		e.stopPropagation();
		if (onclick) onclick(e);
	}

	function handleKeydown(e: KeyboardEvent) {
		// Forward keyboard toggles to parent only
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			e.stopPropagation();
			if (onkeydown) onkeydown(e);
		}
	}
</script>

<Checkbox.Root
	{checked}
	onclick={handleClick}
	onkeydown={handleKeydown}
	class={cn(
		"bg-bg1 data-[state=checked]:bg-fg data-[state=checked]:border-fg2 border-bg3 group flex size-4 items-center justify-center rounded-sm border disabled:opacity-50",
		className
	)}
	{...rest}
>
	{#if checked}
		<Icon class="text-bg size-3" src={Check} micro />
	{/if}
</Checkbox.Root>
