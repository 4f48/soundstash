import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { client } from "@/lib/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { APIRoute } from "astro";
import { CLOUDFLARE_R2_BUCKET } from "astro:env/server";
import { eq, sum } from "drizzle-orm";

export const GET: APIRoute = async (ctx) => {
	const params = ctx.url.searchParams;
	const length = params.get("length");
	const type = params.get("type");
	if (!length || !type)
		return new Response("length or type missing", { status: 400 });

	const user = ctx.locals.user;
	if (!user) return new Response(null, { status: 401 });
	if (!user.emailVerified)
		return new Response("verify your email before uploading", { status: 403 });

	const check = await db
		.select({ storage: sum(track.size) })
		.from(track)
		.where(eq(track.owner, user.id));
	if (Number(check[0].storage) + Number(length) >= 1e8)
		return new Response("not enough storage", { status: 507 });

	const id = crypto.randomUUID();
	const command = new PutObjectCommand({
		Bucket: CLOUDFLARE_R2_BUCKET,
		ContentLength: Number(length),
		ContentType: type,
		Key: `tracks/${id}`,
	});
	const url = await getSignedUrl(client, command, { expiresIn: 900 });

	const response: App.GetTrackUploadUrlResponse = { id, url };
	return new Response(JSON.stringify(response), {
		headers: { "content-type": "application/json" },
	});
};
