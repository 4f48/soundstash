import { d as db, t as track } from '../../../chunks/database_Ch5beX0y.mjs';
import { c as client } from '../../../chunks/storage_CLPsYBhh.mjs';
import { HeadObjectCommand } from '@aws-sdk/client-s3';
export { renderers } from '../../../renderers.mjs';

const POST = async (ctx) => {
  const user = ctx.locals.user;
  if (!user)
    return new Response(null, {
      status: 401
    });
  const request = await ctx.request.json();
  await client.send(
    new HeadObjectCommand({
      Bucket: "soundstash",
      Key: `tracks/${request.id}`
    })
  ).catch((e) => {
    return new Response(`file does not exist in bucket: ${e}`, {
      status: 400
    });
  }).then(async () => {
    await db.insert(track).values({
      album: request.album,
      artist: request.artist,
      blob: `tracks/${request.id}`,
      id: request.id,
      owner: user.id,
      size: request.size,
      title: request.title,
      length: Math.floor(request.length)
    }).catch((e) => {
      console.error(e);
      return new Response("failed to insert track into db", {
        status: 500
      });
    });
  });
  return new Response(null);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
