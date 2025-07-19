<script lang="ts">
	import Actions from "./actions.svelte";
	import Title from "./title.svelte";
	import type { track } from "@/lib/schema";
	import { playlist, index } from "@/lib/stores";
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
	import { Icon, MagnifyingGlass } from "svelte-hero-icons";

	type Track = typeof track.$inferSelect;
	interface Props {
		tracks: Track[];
	}
	const { tracks }: Props = $props();

	const columnHelper = createColumnHelper<Track>();
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
	const fuzzyFilter: FilterFn<Track> = (row, columnId, value, addMeta) => {
		const itemRank = rankItem(row.getValue(columnId), value);
		addMeta({ itemRank });
		return itemRank.passed;
	};

	const options = atom<TableOptions<Track>>({
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

<div class="border-bg2 rounded-md border">
	<table
		class="bg-bg h-full w-full rounded-md [&_td,&_th]:px-3 [&_td,&_th]:py-1"
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
							<div
								class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2"
							>
								<Icon class="text-fg2 size-4" src={MagnifyingGlass} micro />
							</div>
							<input
								bind:value={$globalFilter}
								type="text"
								placeholder="Search..."
								class="bg-bg1 border-bg3 text-fg placeholder:text-fg2 focus-visible:ring-bg4/50 w-32 rounded-sm border py-1 pr-2 pl-7 text-xs font-normal focus-visible:ring-1 focus-visible:outline-none"
							/>
						</div>
					</th>
				</tr>
			{/each}
		</thead>
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
						<Actions track={row.original} />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
