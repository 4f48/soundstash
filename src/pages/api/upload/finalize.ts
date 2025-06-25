import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { client } from "@/lib/storage";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import type { APIRoute } from "astro";

export const POST: APIRoute = async (ctx) => {
	const user = ctx.locals.user;
	if (!user)
		return new Response(null, {
			status: 401,
		});
	const request = (await ctx.request.json()) as App.FinalizeUploadRequest;

	await client
		.send(
			new HeadObjectCommand({
				Bucket: import.meta.env.CLOUDFLARE_R2_BUCKET,
				Key: request.key,
			})
		)
		.catch((e) => {
			throw new Error(`file does not exist in bucket: ${e}`);
		})
		.then(async () => {
			await db
				.insert(track)
				.values({
					album: request.album,
					artist: request.artist,
					blob: request.key,
					id: request.key.split("/")[1],
					owner: user.id,
					size: request.size,
					title: request.title,
				})
				.catch((e) => {
					throw new Error(`failed to insert track into db: ${e}`);
				});
		});

	return new Response(null);
};
