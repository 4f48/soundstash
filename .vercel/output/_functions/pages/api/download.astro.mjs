import { c as client } from '../../chunks/storage_CLPsYBhh.mjs';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
export { renderers } from '../../renderers.mjs';

const GET = async (ctx) => {
  const key = ctx.url.searchParams.get("key");
  if (!key) return new Response("no key param", { status: 400 });
  const command = new GetObjectCommand({
    Bucket: "soundstash",
    Key: key
  });
  const url = await getSignedUrl(client, command, { expiresIn: 900 });
  return new Response(url);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
