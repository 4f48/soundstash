import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { client } from "@/lib/storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { APIRoute } from "astro";
import { CLOUDFLARE_R2_BUCKET } from "astro:env/server";
import { eq } from "drizzle-orm";

export const DELETE: APIRoute = async (ctx) => {
	const id = ctx.url.searchParams.get("id");
	if (!id) return new Response("no key param", { status: 400 });

	await client.send(
		new DeleteObjectCommand({
			Bucket: CLOUDFLARE_R2_BUCKET,
			Key: `tracks/${id}`,
		})
	);
	await client.send(
		new DeleteObjectCommand({
			Bucket: CLOUDFLARE_R2_BUCKET,
			Key: `covers/${id}`,
		})
	);
	await db.delete(track).where(eq(track.id, id));

	return new Response(null);
};
