<script lang="ts">
	import type { track } from "@/lib/schema";
	import { playlist, index } from "@/lib/stores";
	import SvelteTable, { type TableColumns } from "svelte-table";

	type Track = typeof track.$inferSelect;
	interface Props {
		tracks: Track[];
	}
	const { tracks }: Props = $props();

	const columns: TableColumns<Track> = $state([
		{
			key: "index",
			title: "#",
			value: (_, i) => i || 0,
		},
		{
			key: "title",
			title: "Title",
			value: (v) => v.title,
		},
		{
			key: "album",
			title: "Album",
			value: (v) => v.album || "-",
		},
	]);
</script>

<div class="border-bg2 rounded-md border">
	<SvelteTable
		{columns}
		rows={tracks}
		classNameTable="bg-bg rounded-md"
		classNameCell="px-4 py-2"
		classNameRow="border-t hover:bg-bg1/50 cursor-pointer border-bg2"
		classNameThead="[&_th]:font-normal [&_th]:text-start [&_th]:px-4 [&_th]:py-2"
		on:clickRow={(e) => {
			$index = tracks.findIndex((row) => row.id === e.detail.row.id);
			$playlist = tracks;
		}}
	/>
</div>
