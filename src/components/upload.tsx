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
import { UploadIcon, LoaderCircle } from "lucide-react";
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
		for (let i = 0; i < tracks?.length!; i++) {
			formData.append("track", tracks[i], tracks[i].name);
		}
		const result = await fetch("/api/upload", {
			body: formData,
			method: "POST",
		});

		setLoading(false);

		if (result.ok) {
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
