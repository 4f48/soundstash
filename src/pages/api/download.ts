import { client } from "@/lib/storage";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (ctx) => {
	const key = ctx.url.searchParams.get("key");
	if (!key) return new Response("no key param", { status: 400 });

	const command = new GetObjectCommand({
		Bucket: import.meta.env.CLOUDFLARE_R2_BUCKET,
		Key: key,
	});
	const url = await getSignedUrl(client, command, { expiresIn: 900 });
	return new Response(url);
};
