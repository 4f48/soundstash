import { $currentTrack, $playlist } from "@/lib/stores";
import { useStore } from "@nanostores/react";
import { Music2 } from "lucide-react";
import { useEffect, useState, type JSX } from "react";

export default function Title({
	artist,
	id,
	indicatePlaying,
	title,
}: {
	artist: string;
	id: string;
	indicatePlaying?: boolean;
	title: string;
}): JSX.Element {
	const [ok, setOk] = useState(true);
	const [playing, setPlaying] = useState(false);
	const currentTrack = useStore($currentTrack);
	const playlist = useStore($playlist);
	useEffect(() => {
		if (!playlist[currentTrack] || !indicatePlaying) return;
		if (playlist[currentTrack].id === id) setPlaying(true);
		else setPlaying(false);
	}, [playlist[currentTrack]]);
	return (
		<div className="flex items-center gap-2">
			{!ok && (
				<span className="bg-muted flex items-center justify-center rounded-sm p-2">
					<Music2 className="text-muted-foreground" />
				</span>
			)}
			<img
				src={`/api/cover?id=${id}`}
				className={`size-10 rounded-sm ${ok ? "block" : "hidden"}`}
				alt=""
				loading="lazy"
				onLoad={() => setOk(true)}
				onError={() => setOk(false)}
			/>
			<div className="flex flex-col">
				<span
					className={`truncate ${indicatePlaying && playing && "font-semibold"}`}
				>
					{title}
				</span>
				<span className="text-muted-foreground text-sm">{artist}</span>
			</div>
		</div>
	);
}
