import Actions from "@/components/actions";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { track } from "@/lib/schema";
import { $currentTrack, $playing, $playlist } from "@/lib/stores";
import { formatTime } from "@/lib/utils";
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getFilteredRowModel,
} from "@tanstack/react-table";
import { Play, Clock } from "lucide-react";
import { useState, type JSX } from "react";

export default function AllTracks({
	tracks,
}: {
	tracks: (typeof track.$inferSelect)[];
}): JSX.Element {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const columns: ColumnDef<typeof track.$inferSelect>[] = [
		{
			id: "play",
			header: "#",
			size: 1,
			cell: ({ row }) => {
				return (
					<>
						<Button
							size="icon"
							variant="ghost"
							onClick={async () => {
								$playing.set(false);
								$playlist.set(tracks);
								$currentTrack.set(row.index);
								$playing.set(true);
							}}
						>
							<span className="group-hover:hidden block">{row.index + 1}</span>
							<Play className="group-hover:flex m-0 hidden" />
						</Button>
					</>
				);
			},
		},
		{
			accessorKey: "title",
			header: "Title",
			size: 400,
			cell: ({ row }) => {
				const track = row.original;
				return (
					<Title artist={track.artist} id={track.id} title={track.title} />
				);
			},
		},
		{
			accessorKey: "album",
			header: "Album",
			cell: ({ row }) => {
				const track = row.original;
				return track.album ? track.album : "-";
			},
		},
		{
			accessorKey: "length",
			header: () => <Clock className="size-4" />,
			cell: ({ row }) => {
				const track = row.original;
				return formatTime(track.length);
			},
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const track = row.original;
				return <Actions track={track} />;
			},
		},
	];
	const table = useReactTable({
		columns,
		data: tracks,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: setColumnFilters,
		state: {
			columnFilters,
		},
	});
	return (
		<main>
			<Input
				className="max-w-sm"
				onChange={(event) =>
					table.getColumn("title")?.setFilterValue(event.target.value)
				}
				placeholder="Filter by title..."
				value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
			/>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										style={{ width: header.column.columnDef.size }}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} width={cell.column.columnDef.size}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								You don't have any tracks yet.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</main>
	);
}
