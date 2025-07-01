import { Checkbox } from "./ui/checkbox";
import { Skeleton } from "./ui/skeleton";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { track as trackTable } from "@/lib/schema";
import { $playlist } from "@/lib/stores";
import { ListPlus, MoreHorizontal, Plus } from "lucide-react";
import React from "react";

type Playlists = { id: string; name: string }[];

export default function Actions({
	track,
}: {
	track: typeof trackTable.$inferSelect;
}): React.JSX.Element {
	const [open, setOpen] = React.useState(false);
	const [playlists, setPlaylists] = React.useState<Playlists>();
	const [inPlaylists, setInPlaylists] = React.useState<string[]>();

	async function fetchPlaylists() {
		const playlistsResult = await fetch("/api/playlist/list");
		const playlistsJson = (await playlistsResult.json()) as Playlists;

		const inPlaylistsResult = await fetch(`/api/playlist/track?id=${track.id}`);
		const inPlaylistsJson = (await inPlaylistsResult.json()) as Playlists;
		setPlaylists(playlistsJson);
		setInPlaylists(inPlaylistsJson.map(({ id }) => id));
	}

	React.useEffect(() => {
		if (!open) return;
		setPlaylists(undefined);
		(async () => await fetchPlaylists())();
	}, [open]);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
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
							$playlist.set([...current, track]);
						}}
					>
						<ListPlus />
						Add to queue
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Plus />
							Add to playlist
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add to playlist</DialogTitle>
					<DialogDescription>
						Add "{track.title}" to a playlist for seamless listening sessions.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="h-[30vh]">
					<Table>
						<TableBody>
							{playlists && inPlaylists
								? playlists.map((playlist) => (
										<TableRow
											key={playlist.id}
											className="flex items-center pr-2 gap-5"
										>
											<TableCell className="flex-1">{playlist.name}</TableCell>
											<td className="flex items-center">
												<Checkbox
													checked={inPlaylists.includes(playlist.id)}
													onClick={async () => {
														const request: App.ModifyPlaylistRequest = {
															playlistId: playlist.id,
															trackId: track.id,
														};
														await fetch(
															inPlaylists.includes(playlist.id)
																? "/api/playlist/remove"
																: "/api/playlist/add",
															{
																body: JSON.stringify(request),
																headers: {
																	"Content-Type": "application/json",
																},
																method: "POST",
															}
														);
														await fetchPlaylists();
													}}
												/>
											</td>
										</TableRow>
									))
								: [...Array(3)].map((_, i) => (
										<TableRow key={i} className="flex items-center gap-5">
											<TableCell className="flex-1">
												<Skeleton className="h-3 rounded-full" />
											</TableCell>
											<td className="flex items-center">
												<Checkbox disabled />
											</td>
										</TableRow>
									))}
						</TableBody>
					</Table>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
