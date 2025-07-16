<script lang="ts">
	import type { track as trackTable } from "@/lib/schema";
	import { index, queue } from "@/lib/stores";
	import { cn } from "@/lib/utils";
	import { Avatar } from "bits-ui";
	import { Icon, MusicalNote } from "svelte-hero-icons";

	interface Props {
		track: typeof trackTable.$inferSelect;
	}
	const { track }: Props = $props();

	const current = $derived($queue.at($index));
</script>

<div class="flex items-center gap-1">
	<Avatar.Root>
		<Avatar.Image
			alt="{track.album || track.title} {track.album && 'album'} cover"
			class="size-10 rounded-sm"
			draggable={false}
			src="/api/track/cover/{track.id}"
		/>
		<Avatar.Fallback
			class="bg-bg1 flex size-10 items-center justify-center rounded-sm"
		>
			<Icon class="text-bg5 size-8" src={MusicalNote} />
		</Avatar.Fallback>
	</Avatar.Root>
	<div class="flex min-w-0 flex-col">
		<span
			class={cn(
				"truncate",
				current === track ? "font-semibold" : "font-normal"
			)}>{track.title}</span
		>
		<span class="text-fg2 truncate text-sm">{track.artist}</span>
	</div>
</div>
