import { S3Client } from "@aws-sdk/client-s3";
import {
	CLOUDFLARE_R2_KEY_ID,
	CLOUDFLARE_R2_SECRET,
	CLOUDFLARE_R2_ENDPOINT,
} from "astro:env/server";

export const client = new S3Client({
	credentials: {
		accessKeyId: CLOUDFLARE_R2_KEY_ID,
		secretAccessKey: CLOUDFLARE_R2_SECRET,
	},
	endpoint: CLOUDFLARE_R2_ENDPOINT,
	forcePathStyle: true,
	region: "auto",
});
