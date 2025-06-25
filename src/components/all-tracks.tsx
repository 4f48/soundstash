import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { $currentTrack, $playing, $playlist } from "@/lib/stores";
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getFilteredRowModel,
} from "@tanstack/react-table";
import { MoreHorizontal, Play, ListPlus } from "lucide-react";
import { useState, type JSX } from "react";

export default function AllTracks({
	tracks,
}: {
	tracks: App.Track[];
}): JSX.Element {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const columns: ColumnDef<App.Track>[] = [
		{
			id: "play",
			cell: ({ row }) => {
				const track = row.original;
				return (
					<Button
						size="icon"
						variant="ghost"
						onClick={() => {
							$playing.set(false);
							$currentTrack.set(0);
							$playlist.set([track.blob!]);
							$playing.set(true);
						}}
					>
						<Play />
					</Button>
				);
			},
		},
		{
			accessorKey: "title",
			header: "Title",
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const track = row.original;
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<span className="sr-only">Open actions menu</span>
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									const current = $playlist.get();
									$playlist.set([...current, track.blob!]);
								}}
							>
								<ListPlus />
								Add to queue
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
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
		<main className="m-3">
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
									<TableHead key={header.id}>
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
									<TableCell key={cell.id}>
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
