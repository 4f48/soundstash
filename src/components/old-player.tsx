import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import type { track } from "@/lib/schema";
import { index as indexStore } from "@/lib/stores";
import {
	playing as playingStore,
	playlist as playlistStore,
} from "@/lib/stores";
import { formatTime } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import {
	Pause,
	Play,
	Repeat,
	Shuffle,
	SkipBack,
	SkipForward,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import ReactHowler, { type HowlCallback } from "react-howler";

export default function Player(): JSX.Element {
	const current = useStore(indexStore);
	const playing = useStore(playingStore);
	const playlist = useStore(playlistStore);
	const [url, setUrl] = useState<string | undefined>();
	const currentKey = playlist[current];
	const [original, setOriginal] = useState<(typeof track.$inferSelect)[]>([]);
	const playerRef = useRef<ReactHowler>(null);
	const [duration, setDuration] = useState(0);
	const [position, setPosition] = useState(0);
	const repeat = useRef(false);
	const seeking = useRef(false);
	const shuffle = useRef(false);
	function previous() {
		if (current > 0) {
			playingStore.set(false);
			indexStore.set(current - 1);
			playingStore.set(true);
		} else if (current === 0 && repeat.current) {
			indexStore.set(playlist.length - 1);
			playingStore.set(true);
		}
	}
	function next() {
		if (current < playlist.length - 1) {
			playingStore.set(false);
			indexStore.set(current + 1);
			playingStore.set(true);
		} else if (current === playlist.length - 1 && repeat.current) {
			if (shuffle.current) shufflePlaylist();
			indexStore.set(0);
			playingStore.set(true);
		}
	}
	function handleTracking() {
		if (!playerRef.current) return;
		const howler = playerRef.current.howler;
		if (!howler.playing()) return;
		if (seeking.current === false) setPosition(howler.seek());

		setTimeout(handleTracking, 100);
	}
	const handleLoad = useCallback<HowlCallback>(() => {
		if (!playerRef.current) return;
		const howler = playerRef.current.howler;
		setDuration(howler.duration());
		setPosition(0);
	}, []);
	function shufflePlaylist() {
		// Save the original playlist before shuffling
		if (shuffle.current && original.length === 0) {
			setOriginal([...playlist]);
		}

		const copy = playlist.slice(0, current).concat(playlist.slice(current + 1));
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		copy.splice(current, 0, playlist[current]);

		playlistStore.set(copy);
	}
	const handleEnd: HowlCallback = () => {
		const latestCurrent = indexStore.get();
		const latestPlaylist = playlistStore.get();

		if (latestCurrent < latestPlaylist.length - 1) {
			indexStore.set(latestCurrent + 1);
			playingStore.set(true);
		} else {
			if (repeat.current) {
				playingStore.set(false);
				if (shuffle.current) {
					shufflePlaylist();
				}
				indexStore.set(0);
				playingStore.set(true);
			} else {
				playingStore.set(false);
			}
		}
	};
	useEffect(() => {
		if (!currentKey) return;
		(async () => {
			const response = await fetch(`/api/download?key=${currentKey.blob}`);
			setUrl(await response.text());
		})();
	}, [currentKey]);
	useEffect(() => {
		if (!playlist[current]) return;

		if (shuffle.current) {
			// Shuffle when enabled
			shufflePlaylist();
		} else if (original.length > 0) {
			// Restore original playlist when disabled
			const currentId = playlist[current].id;
			const index = original.findIndex((track) => track.id === currentId);
			playlistStore.set(original);
			indexStore.set(index >= 0 ? index : current);
			setOriginal([]); // Clear the saved original
		}
	}, [shuffle.current]);
	return (
		<>
			{url && (
				<ReactHowler
					ref={playerRef}
					src={url}
					playing={playing}
					onLoad={handleLoad}
					onPlay={() => handleTracking()}
					onEnd={handleEnd}
					html5={true}
				/>
			)}
			<div className="border-border bg-card text-card-foreground absolute bottom-2 left-2 grid h-[58px] w-[calc(100vw-16px)] grid-cols-3 grid-rows-1 items-center justify-center gap-3 rounded-xl border p-2 shadow-sm">
				<div className="flex items-center gap-2">
					{playlist[current] && (
						<Title
							artist={currentKey.artist}
							id={currentKey.id}
							title={currentKey.title}
						/>
					)}
				</div>
				<div>
					<div className="flex items-center justify-center gap-2">
						<Toggle
							onPressedChange={(value) => {
								shuffle.current = value;
							}}
							disabled={playlist.length <= 0}
						>
							<Shuffle className="text-primary" />
						</Toggle>
						<Button
							size="icon"
							variant="ghost"
							onClick={() => previous()}
							disabled={current == 0 && !repeat.current}
						>
							<SkipBack className="fill-primary" />
						</Button>
						{playing ? (
							<Button
								size="icon"
								variant="ghost"
								onClick={() => playingStore.set(false)}
							>
								<Pause className="fill-primary" />
							</Button>
						) : (
							<Button
								size="icon"
								variant="ghost"
								onClick={() => playingStore.set(true)}
								disabled={!playlist[current]}
							>
								<Play className="fill-primary" />
							</Button>
						)}
						<Button
							size="icon"
							variant="ghost"
							onClick={() => next()}
							disabled={
								(current == playlist.length - 1 && !repeat.current) ||
								!playlist[current]
							}
						>
							<SkipForward className="fill-primary" />
						</Button>
						<Toggle
							disabled={playlist.length <= 0}
							onPressedChange={(value) => {
								repeat.current = value;
							}}
						>
							<Repeat className="text-primary" />
						</Toggle>
					</div>
					<div className="flex items-center gap-3">
						<span className="text-muted-foreground text-sm">
							{formatTime(position)}
						</span>
						<Slider
							disabled={duration === 0}
							value={[position]}
							onPointerDown={() => (seeking.current = true)}
							onPointerUp={() => (seeking.current = false)}
							onValueChange={(e) => setPosition(e[0])}
							onPlay={() => playingStore.set(true)}
							onPause={() => playingStore.set(false)}
							min={0}
							step={0.01}
							max={duration}
							onValueCommit={(e) => {
								if (!playerRef.current) return;
								const howler = playerRef.current.howler;
								seeking.current = false;
								howler.seek(e[0]);
								setPosition(e[0]);
							}}
						/>
						<span className="text-muted-foreground text-sm">
							{formatTime(duration)}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
