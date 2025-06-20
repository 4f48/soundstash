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
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
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
import { Upload, HardDrive, ArrowUpDown } from "lucide-react";
import { useState, type JSX } from "react";

export default function Account({
	tracks,
}: {
	tracks: App.Track[];
}): JSX.Element {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const columns: ColumnDef<App.Track>[] = [
		{
			accessorKey: "title",
			header: ({ column }) => <Header column={column} title="Title" />,
		},
		{
			accessorKey: "author",
			header: ({ column }) => <Header column={column} title="Author" />,
		},
		{
			accessorKey: "size",
			header: ({ column }) => <Header column={column} title="Size (KB)" />,
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
					<Button>
						<Upload />
						Upload
					</Button>
					<Button variant="outline">
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
