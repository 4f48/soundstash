import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { $currentTrack, $playing, $playlist } from "@/lib/stores";
import { formatTime } from "@/lib/utils";
import { useStore } from "@nanostores/react";
import { Music2, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import ReactHowler, { type HowlCallback } from "react-howler";

export default function Player(): JSX.Element {
	const current = useStore($currentTrack);
	const playing = useStore($playing);
	const playlist = useStore($playlist);
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState<string | undefined>();
	const currentKey = playlist[current];
	const playerRef = useRef<ReactHowler>(null);
	const [duration, setDuration] = useState(0);
	const [position, setPosition] = useState(0);
	const seeking = useRef(false);
	function previous() {
		if (current > 0) {
			$playing.set(false);
			$currentTrack.set(current - 1);
			$playing.set(true);
		}
	}
	function next() {
		if (current < playlist.length - 1) {
			$playing.set(false);
			$currentTrack.set(current + 1);
			$playing.set(true);
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
	const handleEnd = useCallback<HowlCallback>(() => {
		const latestCurrent = $currentTrack.get();
		const latestPlaylist = $playlist.get();

		if (latestCurrent < latestPlaylist.length - 1) {
			$currentTrack.set(latestCurrent + 1);
			$playing.set(true);
		} else {
			$playing.set(false);
		}
	}, []);
	useEffect(() => {
		if (!playlist[current]) return;
		const request: App.GetMetadataRequest = {
			blob: playlist[current],
		};
		fetch("/api/metadata", {
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		}).then(async (result) => {
			setTitle(await result.text());
		});
	}, [playlist[current]]);
	useEffect(() => {
		if (!currentKey) return;
		(async () => {
			const response = await fetch(`/api/download?key=${currentKey}`);
			setUrl(await response.text());
		})();
	}, [currentKey]);
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
			<div className="border absolute bottom-2 h-[58px] w-[calc(100vw-16px)] items-center grid grid-rows-1 grid-cols-3 justify-center left-2 p-2 gap-3 border-border bg-card text-card-foreground rounded-xl shadow-sm">
				<div>
					{playlist[current] && (
						<p className="flex items-center gap-2">
							<span className="bg-muted rounded-sm flex items-center justify-center p-2">
								<Music2 className="text-muted-foreground" />
							</span>
							{title}
						</p>
					)}
				</div>
				<div>
					<div className="flex items-center justify-center gap-2">
						<Button
							size="icon"
							variant="ghost"
							onClick={() => previous()}
							disabled={current == 0}
						>
							<SkipBack className="fill-primary" />
						</Button>
						{playing ? (
							<Button
								size="icon"
								variant="ghost"
								onClick={() => $playing.set(false)}
							>
								<Pause className="fill-primary" />
							</Button>
						) : (
							<Button
								size="icon"
								variant="ghost"
								onClick={() => $playing.set(true)}
								disabled={!playlist[current]}
							>
								<Play className="fill-primary" />
							</Button>
						)}
						<Button
							size="icon"
							variant="ghost"
							onClick={() => next()}
							disabled={current == playlist.length - 1 || !playlist[current]}
						>
							<SkipForward className="fill-primary" />
						</Button>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">
							{formatTime(position)}
						</span>
						<Slider
							disabled={duration === 0}
							value={[position]}
							onPointerDown={() => (seeking.current = true)}
							onPointerUp={() => (seeking.current = false)}
							onValueChange={(e) => setPosition(e[0])}
							min={0}
							step={0.01}
							max={duration}
							onValueCommit={(e) => {
								if (!playerRef.current) return;
								const howler = playerRef.current.howler;
								howler.seek(e[0]);
								setPosition(e[0]);
							}}
						/>
						<span className="text-sm text-muted-foreground">
							{formatTime(duration)}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
