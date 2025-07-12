import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { client } from "@/lib/storage";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { APIRoute } from "astro";
import { CLOUDFLARE_R2_BUCKET } from "astro:env/server";
import { and, eq } from "drizzle-orm";

export const GET: APIRoute = async (ctx) => {
	const { id } = ctx.params;
	if (!id) return new Response("no track id provided", { status: 400 });
	const user = ctx.locals.user;
	if (!user) return new Response(null, { status: 401 });

	const isOwned = await db.query.track.findFirst({
		where: and(eq(track.id, id), eq(track.owner, user.id)),
	});
	if (!isOwned)
		return new Response("this track is not yours or does not exist", {
			status: 403,
		});

	const command = new GetObjectCommand({
		Bucket: CLOUDFLARE_R2_BUCKET,
		Key: `covers/${id}`,
	});
	const result = await client.send(command);

	return new Response(result.Body?.transformToWebStream(), {
		headers: {
			"Content-Type": result.ContentType || "application/octet-stream",
			"Cache-Control": "private, max-age=604800, immutable",
			...(result.ETag && { ETag: result.ETag }),
			...(result.LastModified && {
				"Last-Modified": result.LastModified.toUTCString(),
			}),
		},
	});
};
