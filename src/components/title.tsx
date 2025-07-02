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
		<div className="flex gap-2 items-center">
			{!ok && (
				<span className="bg-muted rounded-sm flex items-center justify-center p-2">
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
				<span className="text-sm text-muted-foreground">{artist}</span>
			</div>
		</div>
	);
}
