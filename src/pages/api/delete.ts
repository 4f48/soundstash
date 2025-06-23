import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { client } from "@/lib/storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const DELETE: APIRoute = async (ctx) => {
	const key = ctx.url.searchParams.get("key");
	if (!key) return new Response("no key param", { status: 400 });

	await client.send(
		new DeleteObjectCommand({
			Bucket: import.meta.env.CLOUDFLARE_R2_BUCKET,
			Key: key,
		})
	);
	await db.delete(track).where(eq(track.blob, key));

	return new Response(null);
};
