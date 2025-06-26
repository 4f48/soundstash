import { Music2 } from "lucide-react";
import { useState, type JSX } from "react";

export default function Title({
	artist,
	id,
	title,
}: {
	id: string;
	title: string;
	artist: string;
}): JSX.Element {
	const [ok, setOk] = useState(true);
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
				onLoad={() => setOk(true)}
				onError={() => setOk(false)}
			/>
			<div className="flex flex-col">
				<span>{title}</span>
				<span className="text-sm text-muted-foreground">{artist}</span>
			</div>
		</div>
	);
}
