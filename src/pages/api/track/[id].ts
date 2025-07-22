import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { client } from "@/lib/storage";
import { DeleteObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
				owner: true,
			},
			where: and(eq(track.id, id), eq(track.owner, user.id)),
		});
		if (!check || check.owner !== user.id)
			return new Response("this track does not exist", { status: 404 });

		const command = new GetObjectCommand({
			Bucket: CLOUDFLARE_R2_BUCKET,
			Key: `tracks/${id}`,
			ResponseCacheControl: "private, max-age=604800, immutable",
		});
		const url = await getSignedUrl(client, command, { expiresIn: 300 });

		return new Response(url);
	} catch (e) {
		if (e instanceof Error) console.error(e.message);
		return new Response("something went wrong", { status: 500 });
	}
};

export const PUT: APIRoute = async (ctx) => {
	try {
		const { id } = ctx.params;
		if (!id) return new Response("no track id provided", { status: 400 });

		const params = ctx.url.searchParams;
		const album = params.get("album");
		const artist = params.get("artist");
		const title = params.get("title");
		const length = params.get("length");
		const size = params.get("size");
		if (!artist || !title || !length || !size)
			return new Response("no artist, title, length or size provided");

		const user = ctx.locals.user;
		if (!user) return new Response(null, { status: 401 });

		await db
			.insert(track)
			.values({
				artist,
				length: Number(length),
				owner: user.id,
				size: Number(size),
				id,
				title,
				album,
			})
			.onConflictDoNothing();
		return new Response(null);
	} catch (e) {
		if (e instanceof Error) console.error(e.message);
		return new Response("something went wrong", { status: 500 });
	}
};

export const DELETE: APIRoute = async (ctx) => {
	try {
		const { id } = ctx.params;
		if (!id) return new Response("no track id provided", { status: 400 });
		const user = ctx.locals.user;
		if (!user) return new Response(null, { status: 401 });

		const result = await db
			.delete(track)
			.where(and(eq(track.id, id), eq(track.owner, user.id)));
		if (result.rowsAffected === 0)
			return new Response("this track does not exist", {
				status: 404,
			});

		const command = new DeleteObjectsCommand({
			Bucket: CLOUDFLARE_R2_BUCKET,
			Delete: {
				Objects: [{ Key: `tracks/${id}` }, { Key: `covers/${id}` }],
			},
		});
		await client.send(command);

		return new Response(null);
	} catch (e) {
		if (e instanceof Error) console.error(e.message);
		return new Response("something went wrong", { status: 500 });
	}
};
