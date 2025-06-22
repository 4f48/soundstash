import { Label } from "./ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { $playlist } from "@/lib/stores";
import { useStore } from "@nanostores/react";
import { Howl, Howler } from "howler";
import { useEffect, useState, type JSX } from "react";

export default function Player(): JSX.Element {
	const [input, setInput] = useState("");
	const playlist = useStore($playlist);
	useEffect(() => console.debug(playlist), [playlist]);
	const player = new Howl({
		src: playlist,
		html5: true,
	});
	return (
		<div className="border absolute bottom-2 w-[calc(100vw-16px)] left-2 p-2 flex flex-col gap-3 border-border bg-card text-card-foreground rounded-xl shadow-sm">
			<form
				className="flex gap-2"
				onSubmit={() => {
					if (playlist.length == 1 && playlist[0] == "") playlist[0] = input;
					else playlist.push(input);
				}}
			>
				<Input
					onChange={(event) => {
						event.preventDefault();
						setInput(event.target.value);
					}}
					placeholder="https://..."
					value={input}
					className="border w-full"
				/>
				<Button>Add</Button>
			</form>
			<div className="flex gap-2 *:flex-1">
				<Button onClick={() => player.play()}>Play</Button>
				<Button onClick={() => player.pause()}>Pause</Button>
			</div>
		</div>
	);
}
