<script lang="ts">
	import Actions from "./actions.svelte";
	import Clock from "./clock.svelte";
	import Title from "./title.svelte";
	import { formatTime } from "@/lib/utils";
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
	import byteSize from "byte-size";
	import { atom } from "nanostores";
	import { Icon, MagnifyingGlass } from "svelte-hero-icons";

	interface Props {
		tracks: App.Track[];
	}
	const { tracks }: Props = $props();

	const columnHelper = createColumnHelper<App.Track>();
	const columns = [
		columnHelper.accessor("title", {
			header: "Title",
			cell: ({ row }) => renderComponent(Title, { track: row.original }),
			enableGlobalFilter: true,
		}),
		columnHelper.accessor("size", {
			header: "Size",
			cell: ({ row }) => byteSize(row.original.size, { precision: 2 }),
			enableGlobalFilter: false,
		}),
		columnHelper.accessor("length", {
			header: () => renderComponent(Clock, {}),
			cell: ({ row }) => formatTime(row.original.length),
			enableGlobalFilter: false,
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
		class="bg-bg [&_td,&_th]:px-3 [&_td,&_th]:py-1 hidden h-full w-full rounded-md md:table"
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
					<th class="pr-1! w-32">
						<div class="relative inline-block">
							<input
								bind:value={$globalFilter}
								disabled={tracks.length < 1}
								type="text"
								placeholder="Search..."
								class="bg-bg1 border-bg3 text-fg placeholder:text-fg2 focus-visible:ring-bg4/50 disabled:border-bg2 disabled:bg-bg1/50 disabled:placeholder:text-fg2/50 peer w-32 rounded-sm border py-1 pl-7 pr-2 text-xs font-normal focus-visible:outline-none focus-visible:ring-1"
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
					<tr class="border-bg2 odd:bg-bg1/25 border-t">
						{#each row.getVisibleCells() as cell (cell.id)}
							{@const Component = flexRender(
								cell.column.columnDef.cell,
								cell.getContext()
							)}
							<td>
								{#if Component}
									<Component />
								{/if}
							</td>
						{/each}
						<td class="text-end">
							<Actions track={row.original} />
						</td>
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>
	<div class="bg-bg flex flex-col md:hidden">
		{#each tracks as track (track.id)}
			<div
				class="border-bg2 odd:bg-bg1/25 flex items-center border-t p-2 first:border-none"
			>
				<div class="flex-1 text-start">
					<Title {track} />
				</div>
				<Actions {track} />
			</div>
		{/each}
	</div>
	{#if tracks.length < 1}
		<div class="bg-bg border-bg2 border-t py-2 text-center">
			<p>You don't have any files yet.</p>
			<p>
				Head to the <a class="underline" href="/upload">upload page</a> to add some
				to your storage.
			</p>
		</div>
	{/if}
</div>
