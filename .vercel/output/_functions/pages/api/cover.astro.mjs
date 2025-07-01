import { d as db, t as track } from '../../chunks/database_Ch5beX0y.mjs';
import { c as client } from '../../chunks/storage_CLPsYBhh.mjs';
import { HeadObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { eq } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const GET = async (ctx) => {
  const user = ctx.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const id = ctx.url.searchParams.get("id");
  if (!id) return new Response(null, { status: 400 });
  const dbCheck = await db.query.track.findFirst({
    columns: { owner: true },
    where: eq(track.id, id)
  });
  if (dbCheck?.owner != user.id) return new Response(null, { status: 401 });
  const bucket = "soundstash";
  const key = `covers/${id}`;
  const headCommand = new HeadObjectCommand({ Bucket: bucket, Key: key });
  const headResult = await client.send(headCommand).catch(() => null);
  if (!headResult) return new Response(null, { status: 404 });
  const etag = headResult.ETag;
  const lastModified = headResult.LastModified?.toUTCString();
  if (etag) {
    const ifNoneMatch = ctx.request.headers.get("If-None-Match");
    if (ifNoneMatch === etag) {
      return new Response(null, {
        status: 304,
        headers: {
          "Cache-Control": "private, max-age=604800, immutable",
          ETag: etag
        }
      });
    }
  }
  const getCommand = new GetObjectCommand({ Bucket: bucket, Key: key });
  const result = await client.send(getCommand).catch(() => null);
  if (!result || !result.Body) return new Response(null, { status: 404 });
  return new Response(await result.Body.transformToByteArray(), {
    headers: {
      "Content-Type": result.ContentType || "application/octet-stream",
      "Cache-Control": "private, max-age=604800, immutable",
      ...etag && { ETag: etag },
      ...lastModified && { "Last-Modified": lastModified }
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
