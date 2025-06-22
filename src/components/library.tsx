import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
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
import Upload from "@/components/upload";
import {
	type Column,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	getFilteredRowModel,
} from "@tanstack/react-table";
import byteSize from "byte-size";
import {
	HardDrive,
	ArrowUpDown,
	MoreHorizontal,
	Delete,
	ClipboardCopy,
	Trash,
	Trash2,
} from "lucide-react";
import { useState, type JSX } from "react";

export default function Account({
	initialTracks,
}: {
	initialTracks: App.Track[];
}): JSX.Element {
	const [tracks, setTracks] = useState<App.Track[]>(initialTracks);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const fetchTracks = async () => {
		try {
			const response = await fetch("/api/tracks");
			if (response.ok) {
				const updatedTracks = await response.json();
				setTracks(updatedTracks);
			}
		} catch (error) {
			console.error("Failed to fetch tracks:", error);
		}
	};

	const usedBytes = tracks.reduce((total, track) => total + track.size, 0);
	const columns: ColumnDef<App.Track>[] = [
		{
			accessorKey: "title",
			header: ({ column }) => <Header column={column} title="Title" />,
		},
		{
			accessorKey: "artist",
			header: ({ column }) => <Header column={column} title="Artist" />,
		},
		{
			accessorKey: "size",
			header: ({ column }) => <Header column={column} title="Size" />,
			cell: ({ row }) =>
				byteSize(row.getValue("size"), {
					precision: 2,
				}).toString(),
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
								onClick={() => navigator.clipboard.writeText(track.blob!)}
							>
								<ClipboardCopy />
								Copy link
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									const body: App.DeleteTrackRequest = {
										id: track.id,
									};
									fetch("/api/delete", {
										body: JSON.stringify(body),
										headers: {
											"Content-Type": "application/json",
										},
										method: "DELETE",
									}).then(() => fetchTracks());
								}}
							>
								<Trash2 />
								Delete
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
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		state: {
			columnFilters,
			sorting,
		},
	});
	return (
		<Card className="mx-3">
			<CardHeader>
				<CardTitle className="scroll-m-20 text-3xl font-extrabold tracking-tight text-balance">
					Your music library
				</CardTitle>
				<CardDescription>
					Add or remove songs from your library and manage storage.
				</CardDescription>
				<CardAction className="space-x-2">
					<Upload onUploadSuccess={fetchTracks} />
					<Button variant="outline" disabled>
						<HardDrive />
						Get storage
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="flex items-center py-4">
					<Input
						className="max-w-sm"
						onChange={(event) =>
							table.getColumn("title")?.setFilterValue(event.target.value)
						}
						placeholder="Filter by title..."
						value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					/>
					<p className="flex flex-1 text-sm text-muted-foreground justify-end items-center">
						{byteSize(usedBytes, {
							precision: 2,
						}).toString()}{" "}
						of 100 MB used
					</p>
				</div>
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
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									You don't have any tracks yet.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

function Header({
	column,
	title,
}: {
	column: Column<App.Track, unknown>;
	title: string;
}): JSX.Element {
	return (
		<div className="flex items-center">
			{title}
			<div className="flex flex-1 justify-end">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					<ArrowUpDown className="size-4 flex-1" />
				</Button>
			</div>
		</div>
	);
}
