<script lang="ts">
	import { cn } from "@/lib/utils";
	import { Checkbox } from "bits-ui";
	import { Icon, Check } from "svelte-hero-icons";

	interface Props extends Checkbox.RootProps {
		checked: boolean;
		class?: string;
	}
	let { checked = $bindable(), class: className, ...props }: Props = $props();
</script>

<Checkbox.Root
	bind:checked
	class={cn(
		"bg-bg1 data-[state=checked]:bg-fg data-[state=checked]:border-fg2 border-bg3 group flex size-4 items-center justify-center rounded-sm border disabled:opacity-50",
		className
	)}
	{...props}
>
	{#if checked}
		<Icon class="text-bg size-3" src={Check} micro />
	{/if}
</Checkbox.Root>
