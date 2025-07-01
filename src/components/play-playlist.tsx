import { playPlaylist } from "@/lib/utils";
import { playlist as playlistTable } from "drizzle/schema";
import { PlayIcon } from "lucide-react";
import type React from "react";

export default function Play({
	playlist,
}: {
	playlist: typeof playlistTable.$inferSelect;
}): React.JSX.Element {
	return (
		<div
			className="bg-background hover:bg-muted invisible absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full duration-100 group-hover:visible hover:drop-shadow-sm"
			onClick={() => playPlaylist(playlist)}
		>
			<PlayIcon className="fill-muted-foreground text-muted-foreground" />
		</div>
	);
}
