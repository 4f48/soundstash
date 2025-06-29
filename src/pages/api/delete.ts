import { db } from "@/lib/database";
import { client } from "@/lib/storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { track } from "drizzle/schema";

export const DELETE: APIRoute = async (ctx) => {
	const id = ctx.url.searchParams.get("id");
	if (!id) return new Response("no key param", { status: 400 });

	await client.send(
		new DeleteObjectCommand({
			Bucket: import.meta.env.CLOUDFLARE_R2_BUCKET,
			Key: `tracks/${id}`,
		})
	);
	await client.send(
		new DeleteObjectCommand({
			Bucket: import.meta.env.CLOUDFLARE_R2_BUCKET,
			Key: `covers/${id}`,
		})
	);
	await db.delete(track).where(eq(track.id, id));

	return new Response(null);
};
