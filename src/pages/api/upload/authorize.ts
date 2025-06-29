import { db } from "@/lib/database";
import { client } from "@/lib/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { APIRoute } from "astro";
import { eq, sum } from "drizzle-orm";
import { track } from "drizzle/schema";

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
	if (Number(result[0].storage) + request.trackLength >= 1e8)
		return new Response("not enough storage", {
			status: 507,
		});

	const uuid = crypto.randomUUID();

	const trackCommand = new PutObjectCommand({
		Bucket: import.meta.env.CLOUDFLARE_R2_BUCKET,
		ContentLength: request.trackLength,
		ContentType: request.trackType,
		Key: `tracks/${uuid}`,
	});
	const trackUrl = await getSignedUrl(client, trackCommand, {
		expiresIn: 900,
		signableHeaders: new Set(["content-length"]),
	});

	let coverUrl: string | undefined;
	if (request.coverLength && request.coverType) {
		const coverCommand = new PutObjectCommand({
			Bucket: import.meta.env.CLOUDFLARE_R2_BUCKET,
			ContentLength: request.coverLength,
			ContentType: request.coverType,
			Key: `covers/${uuid}`,
		});
		coverUrl = await getSignedUrl(client, coverCommand, {
			expiresIn: 900,
			signableHeaders: new Set(["content-length"]),
		});
	}

	const response: App.GetPresignedUploadUrlResponse = {
		uuid,
		trackUrl,
		coverUrl,
	};
	return new Response(JSON.stringify(response), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
