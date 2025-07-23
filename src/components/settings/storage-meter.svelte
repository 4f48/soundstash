<script lang="ts">
	import { cn } from "@/lib/utils";
	import { Meter, useId } from "bits-ui";
	import byteSize from "byte-size";

	interface Props {
		owned: number;
		used: number;
	}
	const { owned, used }: Props = $props();

	const labelId = useId();

	const usedPercent = Math.round((used / owned) * 100);
</script>

<div class="flex flex-col gap-1">
	<div class="flex items-center justify-between">
		<span class="text-sm font-medium" id={labelId}>Storage Used</span>
		<span
			class={cn(
				"text-sm",
				usedPercent < 75 && "text-fg2",
				usedPercent >= 75 && usedPercent < 90 && "text-primary",
				usedPercent >= 90 && "text-destructive"
			)}>{byteSize(used)} / {byteSize(owned)} ({usedPercent}%)</span
		>
	</div>
	<Meter.Root
		aria-labelledby={labelId}
		aria-valuetext="{used} out of {owned}"
		value={used}
		min={0}
		max={owned}
		class="bg-bg2 relative h-2 overflow-hidden rounded-full"
	>
		<div
			class="bg-primary h-full w-full flex-1 rounded-full"
			style="transform: translateX(-{100 - (100 * (used ?? 0)) / owned}%)"
		></div>
	</Meter.Root>
</div>
