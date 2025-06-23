import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
	credentials: {
		accessKeyId: import.meta.env.CLOUDFLARE_R2_KEY_ID,
		secretAccessKey: import.meta.env.CLOUDFLARE_R2_SECRET,
	},
	endpoint: import.meta.env.CLOUDFLARE_R2_ENDPOINT,
	forcePathStyle: true,
	region: "auto",
});
