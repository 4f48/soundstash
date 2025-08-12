<script lang="ts">
	import Checkbox from "@/components/checkbox.svelte";

	type Variant = "header" | "row";

	interface Props {
		variant: Variant;
		table?: any;
		row?: any;
		disabled?: boolean;
		stopPropagation?: boolean;
		class?: string;
	}
	let {
		variant,
		table,
		row,
		disabled = false,
		stopPropagation = true,
		class: className,
	}: Props = $props();

	const checked = $derived(
		variant === "header"
			? !!table?.getIsAllRowsSelected?.()
			: !!row?.getIsSelected?.()
	);
	const mixed = $derived(
		variant === "header"
			? !!table?.getIsSomeRowsSelected?.() && !checked
			: !!row?.getIsSomeSelected?.() && !checked
	);

	function getToggleHandler(): (e: MouseEvent | KeyboardEvent) => void {
		if (variant === "header") {
			return table?.getToggleAllRowsSelectedHandler?.() ?? (() => {});
		}
		return row?.getToggleSelectedHandler?.() ?? (() => {});
	}

	function onClick(e: MouseEvent) {
		if (stopPropagation) e.stopPropagation();
		getToggleHandler()(e);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === " " || e.key === "Enter") {
			if (stopPropagation) e.stopPropagation();
			getToggleHandler()(e);
		}
	}
</script>

<span class="relative inline-flex items-center justify-center">
	<Checkbox
		class={className}
		{checked}
		{disabled}
		aria-checked={mixed ? "mixed" : checked ? "true" : "false"}
		aria-label={variant === "header" ? "Select all rows" : "Select row"}
		onclick={onClick}
		onkeydown={onKeydown}
	/>
	{#if mixed}
		<span
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 flex items-center justify-center"
		>
			<span class="bg-fg h-[2px] w-2 rounded-sm"></span>
		</span>
	{/if}
</span>
