// import { db } from "@/lib/database";
// import { track } from "@/lib/schema";
// import { eq } from "drizzle-orm";
import { client } from "@/lib/storage";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import type { APIRoute } from "astro";
import { CLOUDFLARE_R2_BUCKET } from "astro:env/server";

export const GET: APIRoute = async (ctx) => {
	/*
	 * const user = ctx.locals.user;
	 * if (!user) return new Response(null, { status: 401 });
	 */

	const id = ctx.url.searchParams.get("id");
	if (!id) return new Response(null, { status: 400 });

	/*
	 * const dbCheck = await db.query.track.findFirst({
	 * 	columns: { owner: true },
	 * 	where: eq(track.id, id),
	 * });
	 * if (dbCheck?.owner != user.id) return new Response(null, { status: 401 });
	 */

	const bucket = CLOUDFLARE_R2_BUCKET;
	const key = `covers/${id}`;

	const headCommand = new HeadObjectCommand({ Bucket: bucket, Key: key });
	const headResult = await client.send(headCommand).catch(() => null);
	if (!headResult) return new Response(null, { status: 404 });
	const etag = headResult.ETag;
	const lastModified = headResult.LastModified?.toUTCString();

	if (etag) {
		const ifNoneMatch = ctx.request.headers.get("If-None-Match");
		if (ifNoneMatch === etag) {
			return new Response(null, {
				status: 304,
				headers: {
					"Cache-Control": "private, max-age=604800, immutable",
					ETag: etag,
				},
			});
		}
	}

	const getCommand = new GetObjectCommand({ Bucket: bucket, Key: key });
	const result = await client.send(getCommand).catch(() => null);
	if (!result || !result.Body) return new Response(null, { status: 404 });

	return new Response(await result.Body.transformToByteArray(), {
		headers: {
			"Content-Type": result.ContentType || "application/octet-stream",
			"Cache-Control": "private, max-age=604800, immutable",
			...(etag && { ETag: etag }),
			...(lastModified && { "Last-Modified": lastModified }),
		},
	});
};
