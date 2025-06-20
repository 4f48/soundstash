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
	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		event.preventDefault();

		if (!tracks) return;

		const formData = new FormData();

		try {
			for (let i = 0; i < tracks?.length!; i++) {
				const track = tracks[i];
				const { common } = await parseBlob(track, {
					skipCovers: true,
				});
				const id = crypto.randomUUID();
				const metadata: App.Track = {
					artist: common.artist!,
					id,
					size: track.size,
					title: common.title!,
				};
				await upload(id, track, {
					access: "public",
					clientPayload: JSON.stringify(metadata),
					contentType: track.type,
					handleUploadUrl: "/api/upload/handler",
					multipart: true,
				});
			}
		} catch (e) {
			if (e instanceof Error) console.error(e.message);
			return 1;
		} finally {
			setLoading(false);
			setOpen(false);
			onUploadSuccess?.();
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
