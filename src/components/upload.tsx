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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { upload } from "@vercel/blob/client";
import { UploadIcon, LoaderCircle } from "lucide-react";
import { parseBlob } from "music-metadata";
import { useState, type JSX } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Upload({
	onUploadSuccess,
}: {
	onUploadSuccess?: () => void;
}): JSX.Element {
	const [loading, setLoading] = useState(false);
	const [tracks, setTracks] = useState<FileList | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const { data: session } = authClient.useSession();
	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		event.preventDefault();

		if (!tracks || !session?.user?.id) return;

		const formData = new FormData();

		try {
			for (let i = 0; i < tracks?.length!; i++) {
				const track = tracks[i];

				const urlRequest: App.GetPresignedUploadUrlRequest = {
					contentLength: track.size,
					contentType: track.type,
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

				const uploadResponse = await fetch(urlResponse.url, {
					body: track,
					headers: {
						"Content-Length": track.size.toString(),
						"Content-Type": track.type,
					},
					method: "PUT",
				});

				const { common } = await parseBlob(track, {
					skipCovers: true,
				});
				const finalizeRequest: App.FinalizeUploadRequest = {
					artist: common.artist!,
					key: urlResponse.key,
					size: track.size,
					title: common.title!,
				};
				if (uploadResponse.ok)
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
						Upload your MP3 or FLAC files to SoundStash's cloud storage for
						online playback.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={(event) => onSubmit(event)} className="space-y-4">
					<Input
						type="file"
						multiple
						accept=".mp3,.flac"
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
