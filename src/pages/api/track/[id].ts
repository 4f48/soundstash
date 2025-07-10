import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { client } from "@/lib/storage";
import { GetObjectCommand } from "@aws-sdk/client-s3";
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

		const isOwned = await db.query.track.findFirst({
			where: and(eq(track.id, id), eq(track.owner, user.id)),
		});
		if (!isOwned)
			return new Response("this track is not yours or does not exist", {
				status: 403,
			});

		const command = new GetObjectCommand({
			Bucket: CLOUDFLARE_R2_BUCKET,
			Key: `tracks/${id}`,
			ResponseCacheControl: "private, max-age=604800, immutable",
		});
		const url = await getSignedUrl(client, command, { expiresIn: 300 });

		return new Response(url);
	} catch (e) {
		if (e instanceof Error) console.error(e);
		return new Response("something went wrong", { status: 500 });
	}
};
