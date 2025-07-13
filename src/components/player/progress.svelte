<script lang="ts">
	import { progress, seeking, playlist, index, position } from "@/lib/stores";
	import { cn, formatTime } from "@/lib/utils";
	import { Slider } from "bits-ui";

	const track = $derived($playlist?.[$index] ?? null);
	const max = $derived(track?.length ? track.length * 100 : 100);
</script>

<span class="inline-block w-12 tabular-nums"
	>{track ? formatTime($progress / 100) : "0:00"}</span
>
<Slider.Root
	type="single"
	bind:value={$position}
	class="group relative flex w-full shrink-0 grow-0 touch-none items-center select-none"
	disabled={!track}
	{max}
	min={0}
	onpointerdown={() => track && ($seeking = true)}
	onValueCommit={() => ($seeking = false)}
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
	>{track ? formatTime(track.length) : "0:00"}</span
>
