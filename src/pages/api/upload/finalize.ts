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
				Key: `tracks/${request.id}`,
			})
		)
		.catch((e) => {
			return new Response(`file does not exist in bucket: ${e}`, {
				status: 400,
			});
		})
		.then(async () => {
			await db
				.insert(track)
				.values({
					album: request.album,
					artist: request.artist,
					blob: `tracks/${request.id}`,
					id: request.id,
					owner: user.id,
					size: request.size,
					title: request.title,
					length: Math.floor(request.length),
				})
				.catch((e) => {
					console.error(e);
					return new Response("failed to insert track into db", {
						status: 500,
					});
				});
		});

	return new Response(null);
};
