<script lang="ts">
	import Actions from "./actions.svelte";
	import Title from "./title.svelte";
	import { index, playlist } from "@/lib/stores";
	import { rankItem } from "@tanstack/match-sorter-utils";
	import {
		createSvelteTable,
		createColumnHelper,
		getCoreRowModel,
		getFilteredRowModel,
		flexRender,
		renderComponent,
		type FilterFn,
		type TableOptions,
	} from "@tanstack/svelte-table";
	import { atom } from "nanostores";
	import {
		EllipsisHorizontalCircle,
		Icon,
		MagnifyingGlass,
	} from "svelte-hero-icons";

	interface Props {
		isPlaylist?: boolean;
		playlists: App.Playlist[];
		tracks: App.Track[];
	}
	const { isPlaylist = false, playlists, tracks }: Props = $props();

	const columnHelper = createColumnHelper<App.Track>();
	const columns = [
		columnHelper.display({
			id: "index",
			header: "#",
			cell: ({ row }) => row.index + 1,
		}),
		columnHelper.accessor("title", {
			header: "Title",
			cell: ({ row }) => renderComponent(Title, { track: row.original }),
			enableGlobalFilter: true,
		}),
		columnHelper.accessor("album", {
			header: "Album",
			cell: ({ row }) => row.original.album || "-",
			enableGlobalFilter: true,
		}),
	];

	let globalFilter = atom("");
	const fuzzyFilter: FilterFn<App.Track> = (row, columnId, value, addMeta) => {
		const itemRank = rankItem(row.getValue(columnId), value);
		addMeta({ itemRank });
		return itemRank.passed;
	};

	const options = atom<TableOptions<App.Track>>({
		data: tracks,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		globalFilterFn: fuzzyFilter,
	});

	const table = createSvelteTable($options);

	globalFilter.subscribe((filter) => {
		$table.setGlobalFilter(filter);
	});
</script>

<div class="border-bg2 overflow-hidden rounded-md border">
	<table
		class="bg-bg hidden h-full w-full rounded-md md:table [&_td,&_th]:px-3 [&_td,&_th]:py-1"
	>
		<thead>
			{#each $table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<tr>
					{#each headerGroup.headers as header (header.id)}
						<th class="text-start font-normal">
							{#if !header.isPlaceholder}
								{@const Component = flexRender(
									header.column.columnDef.header,
									header.getContext()
								)}
								{#if Component}
									<Component />
								{/if}
							{/if}
						</th>
					{/each}
					<th class="w-32 pr-1! text-end">
						<div class="relative inline-block">
							<input
								bind:value={$globalFilter}
								disabled={tracks.length < 1}
								type="text"
								placeholder="Search..."
								class="bg-bg1 border-bg3 peer text-fg placeholder:text-fg2 focus-visible:ring-bg4/50 disabled:border-bg2 disabled:bg-bg1/50 disabled:placeholder:text-fg2/50 w-32 rounded-sm border py-1 pr-2 pl-7 text-xs font-normal focus-visible:ring-1 focus-visible:outline-none"
							/>
							<div
								class="[&_svg]:text-fg2 peer-disabled:[&_svg]:text-fg2/50 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 [&_svg]:size-4"
							>
								<Icon src={MagnifyingGlass} micro />
							</div>
						</div>
					</th>
				</tr>
			{/each}
		</thead>
		{#if tracks.length > 0}
			<tbody>
				{#each $table.getRowModel().rows as row (row.id)}
					<tr class="border-bg2 odd:bg-bg1/25 hover:bg-bg1/50 border-t">
						{#each row.getVisibleCells() as cell (cell.id)}
							{@const Component = flexRender(
								cell.column.columnDef.cell,
								cell.getContext()
							)}
							<td
								class="cursor-pointer"
								onclick={() => {
									$index = row.index;
									$playlist = tracks;
								}}
								role="button"
							>
								{#if Component}
									<Component />
								{/if}
							</td>
						{/each}
						<td class="text-end">
							<Actions {playlists} track={row.original} />
						</td>
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>
	<div class="bg-bg flex flex-col md:hidden">
		{#each tracks as track, i (track.id)}
			<div
				class="border-bg2 odd:bg-bg1/25 flex items-center border-t p-2 first:border-none"
			>
				<button
					class="flex-1 text-start"
					onclick={() => {
						$index = i;
						$playlist = tracks;
					}}
				>
					<Title {track} />
				</button>
				<Actions {playlists} {track} />
			</div>
		{/each}
	</div>
	{#if tracks.length < 1}
		<div class="bg-bg border-bg2 border-t py-2 text-center">
			<p>You don't have any tracks yet.</p>
			{#if isPlaylist}
				<p>
					Add some by clicking on <Icon
						class="inline-block size-5"
						src={EllipsisHorizontalCircle}
					/> and selecting "Add to playlist" on tracks found in
					<a href="/" class="underline">your library</a>.
				</p>
			{:else}
				<p>
					Add some by uploading files on the <a
						class="underline"
						href="/storage">storage page</a
					>.
				</p>
			{/if}
		</div>
	{/if}
</div>
