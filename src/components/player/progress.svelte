<script lang="ts">
	import { playlist, currentTrack } from "@/lib/stores";
	import { cn, formatTime } from "@/lib/utils";
	import { Slider } from "bits-ui";

	interface Props {
		progress: number;
	}
	const { progress }: Props = $props();

	let value = $state(progress);
	const track = $derived($playlist[$currentTrack]);
	const max = $derived(track ? track.length * 100 : 100);
</script>

<span class="inline-block w-12 tabular-nums"
	>{track ? formatTime(Math.floor(value / 100)) : "0:00"}</span
>
<Slider.Root
	type="single"
	bind:value
	class="group relative flex w-full shrink-0 grow-0 touch-none items-center select-none"
	disabled={!track}
	{max}
	min={0}
>
	<span
		class="bg-bg2 relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full"
	>
		<Slider.Range class="bg-fg1 absolute h-full" />
	</span>
	<Slider.Thumb
		index={0}
		class={cn(
			"bg-bg1 3over:border-fg1 focus-visible:ring-fg data-active:border-fg2 border-fg block size-5 cursor-pointer rounded-full border focus-visible:outline-none disabled:pointer-events-none"
		)}
	/>
</Slider.Root>
<span class="inline-block w-12 tabular-nums"
	>{track ? formatTime(Math.floor(max / 100)) : "0:00"}</span
>
