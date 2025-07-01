import { d as db, t as track } from '../../../chunks/database_Ch5beX0y.mjs';
import { c as client } from '../../../chunks/storage_CLPsYBhh.mjs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { sum, eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const POST = async (ctx) => {
  const user = ctx.locals.user;
  if (!user)
    return new Response(null, {
      status: 401
    });
  const request = await ctx.request.json();
  const result = await db.select({ storage: sum(track.size) }).from(track).where(eq(track.owner, user.id));
  if (Number(result[0].storage) + request.trackLength >= 1e8)
    return new Response("not enough storage", {
      status: 507
    });
  const uuid = crypto.randomUUID();
  const trackCommand = new PutObjectCommand({
    Bucket: "soundstash",
    ContentLength: request.trackLength,
    ContentType: request.trackType,
    Key: `tracks/${uuid}`
  });
  const trackUrl = await getSignedUrl(client, trackCommand, {
    expiresIn: 900,
    signableHeaders: /* @__PURE__ */ new Set(["content-length"])
  });
  let coverUrl;
  if (request.coverLength && request.coverType) {
    const coverCommand = new PutObjectCommand({
      Bucket: "soundstash",
      ContentLength: request.coverLength,
      ContentType: request.coverType,
      Key: `covers/${uuid}`
    });
    coverUrl = await getSignedUrl(client, coverCommand, {
      expiresIn: 900,
      signableHeaders: /* @__PURE__ */ new Set(["content-length"])
    });
  }
  const response = {
    uuid,
    trackUrl,
    coverUrl
  };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
