import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { client } from "@/lib/storage";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import type { APIRoute } from "astro";
import { CLOUDFLARE_R2_BUCKET } from "astro:env/server";
import { and, eq } from "drizzle-orm";

export const GET: APIRoute = async (ctx) => {
	try {
		const { id } = ctx.params;
		if (!id) return new Response("no track id provided", { status: 400 });
		const user = ctx.locals.user;
		if (!user) return new Response(null, { status: 401 });

		const check = await db.query.track.findFirst({
			columns: {
				cover: true,
				owner: true,
			},
			where: and(eq(track.id, id), eq(track.owner, user.id)),
		});
		if (!check || check.owner !== user.id)
			return new Response("this track does not exist", { status: 404 });
		if (!check.cover)
			return new Response("this track does not have a cover", { status: 404 });

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
	} catch (e) {
		if (e instanceof Error) console.error(e.message);
		return new Response("something went wrong", { status: 500 });
	}
};

export const PUT: APIRoute = async (ctx) => {
	try {
		const { id } = ctx.params;
		if (!id) return new Response("no track id provided", { status: 400 });

		const contentType = ctx.request.headers.get("content-type");
		if (!contentType)
			return new Response("no content-type header set", { status: 400 });

		const user = ctx.locals.user;
		if (!user) return new Response(null, { status: 401 });

		const check = await db.query.track.findFirst({
			columns: {
				owner: true,
			},
			where: eq(track.id, id),
		});
		if (!check) return new Response("track does not exist", { status: 404 });
		if (check.owner !== user.id)
			return new Response("you do not have access to this track", {
				status: 403,
			});

		const data = await ctx.request.arrayBuffer();
		if (!data) return new Response("empty body", { status: 400 });

		const command = new PutObjectCommand({
			Bucket: CLOUDFLARE_R2_BUCKET,
			Body: new Uint8Array(data),
			ContentType: contentType,
			Key: `covers/${id}`,
		});
		await client.send(command);
		await db.update(track).set({
			cover: true,
		});

		return new Response(null);
	} catch (e) {
		if (e instanceof Error) console.error(e.message);
		return new Response("something went wrong", { status: 500 });
	}
};
