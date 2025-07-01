import { Button } from "./ui/button";
import { playPlaylist, playPlaylistShuffled } from "@/lib/utils";
import { playlist as playlistTable } from "drizzle/schema";
import { MoreHorizontal, Play, Shuffle } from "lucide-react";
import type React from "react";

export default function PlaylistActions({
	playlist,
}: {
	playlist: typeof playlistTable.$inferSelect;
}): React.JSX.Element {
	return (
		<div className="grid grid-cols-3 w-fit border rounded-md shadow-xs">
			<Button
				onClick={() => playPlaylist(playlist)}
				size="icon"
				variant="ghost"
			>
				<Play />
			</Button>
			<Button onClick={() => playPlaylistShuffled(playlist)} size="icon" variant="ghost">
				<Shuffle />
			</Button>
			<Button size="icon" variant="ghost">
				<MoreHorizontal />
			</Button>
		</div>
	);
}
