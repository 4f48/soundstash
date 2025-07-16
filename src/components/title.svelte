<script lang="ts">
	import type { track as trackTable } from "@/lib/schema";
	import { index, queue } from "@/lib/stores";

	interface Props {
		track: typeof trackTable.$inferSelect;
	}
	const { track }: Props = $props();

	const current = $derived($queue.at($index));
</script>

<span class={current === track ? "font-semibold" : "font-normal"}
	>{track.title}</span
>
