<script lang="ts">
	import Actions from "./actions.svelte";
	import Clock from "./clock.svelte";
	import Title from "./title.svelte";
	import Button from "@/components/button.svelte";
	import Checkbox from "@/components/checkbox.svelte";
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
	import { navigate } from "astro:transitions/client";
	import byteSize from "byte-size";
	import { atom } from "nanostores";
	import {
		Icon,
		MagnifyingGlass,
		FolderArrowDown,
		Trash,
	} from "svelte-hero-icons";

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
		enableRowSelection: true,
	});

	const table = createSvelteTable($options);

	globalFilter.subscribe((filter) => {
		$table.setGlobalFilter(filter);
	});

	let bulkLoading = $state(false);

	async function bulkDownload() {
		const selectedRows = $table.getSelectedRowModel().flatRows;
		if (selectedRows.length === 0) return;
		bulkLoading = true;
		const ids = selectedRows.map((r) => r.original.id);

		for (const id of ids) {
			try {
				const track = tracks.find((t) => t.id === id);
				if (!track) continue;

				const urlResult = await fetch(`/api/track/${track.id}`);
				if (!urlResult.ok) continue;
				const url = await urlResult.text();
				if (!url) continue;

				const fileResult = await fetch(url);
				if (!fileResult.ok) continue;

				const blob = await fileResult.blob();
				const a = document.createElement("a");

				const artist = track.artist ? `${track.artist} - ` : "";
				const title = track.title ?? track.id;
				a.download = `${artist}${title}`.replace(/[\\/:*?"<>|]+/g, "_");
				a.href = URL.createObjectURL(blob);
				document.body.appendChild(a);
				a.click();
				a.remove();
				URL.revokeObjectURL(a.href);
			} catch (e) {
				console.error("bulk download failed:", e);
			}
		}
		bulkLoading = false;
	}

	async function bulkDelete() {
		const selectedRows = $table.getSelectedRowModel().flatRows;
		if (selectedRows.length === 0) return;
		bulkLoading = true;
		const ids = selectedRows.map((r) => r.original.id);

		for (const id of ids) {
			try {
				await fetch(`/api/track/${id}`, { method: "DELETE" });
			} catch (e) {
				console.error("bulk delete failed:", e);
			}
		}

		await navigate("/storage");
	}
</script>

<div class="border-bg2 overflow-hidden rounded-md border">
	{#if $table.getSelectedRowModel().flatRows.length > 0}
		<div
			class="bg-bg1 border-bg2 hidden items-center justify-between border-b p-2 md:flex"
		>
			<span class="text-sm"
				>{$table.getSelectedRowModel().flatRows.length} selected</span
			>
			<div class="flex items-center gap-2">
				<Button disabled={bulkLoading} onclick={bulkDownload}>
					<Icon src={FolderArrowDown} solid />Download
				</Button>
				<Button
					disabled={bulkLoading}
					onclick={bulkDelete}
					variant="destructive"
				>
					<Icon src={Trash} solid />Delete
				</Button>
				<Button variant="ghost" onclick={() => $table.resetRowSelection()}
					>Clear</Button
				>
			</div>
		</div>
	{/if}
	<table
		class="bg-bg [&_td,&_th]:px-3 [&_td,&_th]:py-1 hidden h-full w-full rounded-md md:table"
	>
		<thead>
			{#each $table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<tr>
					<th class="w-8">
						<span class="relative inline-flex items-center justify-center">
							<Checkbox
								class="size-4"
								checked={$table.getIsAllRowsSelected()}
								disabled={tracks.length < 1}
								aria-checked={$table.getIsSomeRowsSelected() &&
								!$table.getIsAllRowsSelected()
									? "mixed"
									: $table.getIsAllRowsSelected()
										? "true"
										: "false"}
								aria-label="Select all rows"
								onclick={() =>
									$table.toggleAllRowsSelected(!$table.getIsAllRowsSelected())}
								onkeydown={(e) => {
									if (e.key === " " || e.key === "Enter") {
										e.preventDefault();
										$table.toggleAllRowsSelected(
											!$table.getIsAllRowsSelected()
										);
									}
								}}
							/>
							{#if $table.getIsSomeRowsSelected() && !$table.getIsAllRowsSelected()}
								<span
									aria-hidden="true"
									class="pointer-events-none absolute inset-0 flex items-center justify-center"
								>
									<span class="bg-fg h-[2px] w-2 rounded-sm"></span>
								</span>
							{/if}
						</span>
					</th>
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
					<tr
						class={`border-bg2 odd:bg-bg1/25 hover:bg-bg1/50 border-t ${row.getIsSelected() ? "bg-bg2/30" : ""}`}
					>
						<td class="w-8" onclick={(e) => e.stopPropagation()}>
							<span class="relative inline-flex items-center justify-center">
								<Checkbox
									class="size-4"
									checked={row.getIsSelected()}
									aria-checked={row.getIsSomeSelected() && !row.getIsSelected()
										? "mixed"
										: row.getIsSelected()
											? "true"
											: "false"}
									aria-label="Select row"
									onclick={() => row.toggleSelected(!row.getIsSelected())}
									onkeydown={(e) => {
										if (e.key === " " || e.key === "Enter") {
											e.preventDefault();
											row.toggleSelected(!row.getIsSelected());
										}
									}}
								/>
								{#if row.getIsSomeSelected() && !row.getIsSelected()}
									<span
										aria-hidden="true"
										class="pointer-events-none absolute inset-0 flex items-center justify-center"
									>
										<span class="bg-fg h-[2px] w-2 rounded-sm"></span>
									</span>
								{/if}
							</span>
						</td>
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
						<td class="text-end" onclick={(e) => e.stopPropagation()}>
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
