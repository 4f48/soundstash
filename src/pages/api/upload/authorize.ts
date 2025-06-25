import { db } from "@/lib/database";
import { track } from "@/lib/schema";
import { client } from "@/lib/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { APIRoute } from "astro";
import { eq, sum } from "drizzle-orm";

export const POST: APIRoute = async (ctx) => {
	const user = ctx.locals.user;
	if (!user)
		return new Response(null, {
			status: 401,
		});
	const request =
		(await ctx.request.json()) as App.GetPresignedUploadUrlRequest;

	const result = await db
		.select({ storage: sum(track.size) })
		.from(track)
		.where(eq(track.owner, user.id));
	if (Number(result[0].storage) + request.contentLength >= 1e8)
		return new Response("not enough storage", {
			status: 507,
		});

	const key = `tracks/${crypto.randomUUID()}`;
	const command = new PutObjectCommand({
		Bucket: import.meta.env.CLOUDFLARE_R2_BUCKET,
		ContentLength: request.contentLength,
		ContentType: request.contentType,
		Key: key,
	});
	const url = await getSignedUrl(client, command, {
		expiresIn: 900,
		signableHeaders: new Set(["content-length"]),
	});

	const response: App.GetPresignedUploadUrlResponse = {
		key,
		url,
	};
	return new Response(JSON.stringify(response), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
