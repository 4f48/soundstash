<script lang="ts">
	import Actions from "./actions.svelte";
	import Title from "./title.svelte";
	import type { track } from "@/lib/schema";
	import { playlist, index } from "@/lib/stores";
	import {
		createSvelteTable,
		createColumnHelper,
		getCoreRowModel,
		flexRender,
		renderComponent,
	} from "@tanstack/svelte-table";

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
			cell: ({ row }) => row.index,
		}),
		columnHelper.accessor("title", {
			header: "Title",
			cell: ({ row }) => renderComponent(Title, { track: row.original }),
		}),
		columnHelper.accessor("album", {
			header: "Album",
			cell: ({ row }) => row.original.album || "-",
		}),
	];
	const table = createSvelteTable({
		data: tracks,
		columns,
		getCoreRowModel: getCoreRowModel(),
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
					<td>
						<Actions track={row.original} />
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
