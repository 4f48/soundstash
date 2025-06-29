import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { UploadIcon, LoaderCircle } from "lucide-react";
import { parseBlob } from "music-metadata";
import React from "react";

export default function Upload({
	onUploadSuccess,
}: {
	onUploadSuccess?: () => void;
}): React.JSX.Element {
	const [loading, setLoading] = React.useState(false);
	const [tracks, setTracks] = React.useState<FileList | undefined>(undefined);
	const [open, setOpen] = React.useState(false);
	const { data: session } = authClient.useSession();
	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		event.preventDefault();

		if (!tracks || !session?.user?.id) return;

		try {
			for (let i = 0; i < tracks.length; i++) {
				const track = tracks[i];

				const { common, format } = await parseBlob(track);
				const cover = common.picture;
				const urlRequest: App.GetPresignedUploadUrlRequest = {
					coverLength: cover ? cover[0].data.length : undefined,
					coverType: cover ? cover[0].format : undefined,
					trackLength: track.size,
					trackType: track.type,
				};
				const urlResult = await fetch("/api/upload/authorize", {
					body: JSON.stringify(urlRequest),
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
				});
				const urlResponse =
					(await urlResult.json()) as App.GetPresignedUploadUrlResponse;

				const uploadTrackResponse = await fetch(urlResponse.trackUrl, {
					body: track,
					headers: {
						"Content-Length": urlRequest.trackLength.toString(),
						"Content-Type": urlRequest.trackType,
					},
					method: "PUT",
				});
				if (
					cover &&
					urlResponse.coverUrl &&
					urlRequest.coverLength &&
					urlRequest.coverType
				)
					await fetch(urlResponse.coverUrl, {
						body: cover[0].data,
						headers: {
							"Content-Length": urlRequest.coverLength.toString(),
							"Content-Type": urlRequest.coverType,
						},
						method: "PUT",
					});

				const finalizeRequest: App.FinalizeUploadRequest = {
					album: common.album,
					artist: common.artist!,
					id: urlResponse.uuid,
					length: format.duration!,
					size: track.size,
					title: common.title!,
				};
				if (uploadTrackResponse.ok)
					await fetch("/api/upload/finalize", {
						body: JSON.stringify(finalizeRequest),
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
					});
			}
		} catch (e) {
			setLoading(false);
			if (e instanceof Error) console.error(e.message);
			return 1;
		} finally {
			onUploadSuccess?.();
			setLoading(false);
			setOpen(false);
		}
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<UploadIcon />
					Upload
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload tracks</DialogTitle>
					<DialogDescription>
						Upload your MP3, FLAC, and OPUS files to SoundStash's cloud storage for
						online playback.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={(event) => onSubmit(event)} className="space-y-4">
					<Input
						type="file"
						multiple
						accept=".mp3,.flac,.opus"
						required
						onChange={(event) => {
							setTracks(event.target.files!);
						}}
					/>
					<Button className="w-full" disabled={loading} type="submit">
						{loading && <LoaderCircle className="animate-spin" />}Upload
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
