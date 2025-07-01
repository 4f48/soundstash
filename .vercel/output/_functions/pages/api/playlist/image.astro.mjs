import { d as db, p as playlist } from '../../../chunks/database_Ch5beX0y.mjs';
import { c as client } from '../../../chunks/storage_CLPsYBhh.mjs';
import { HeadObjectCommand, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { and, eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const GET = async (ctx) => {
  const user = ctx.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const id = ctx.url.searchParams.get("id");
  if (!id) return new Response(null, { status: 400 });
  const checkResult = await db.query.playlist.findFirst({
    where: and(eq(playlist.id, id), eq(playlist.owner, user.id))
  });
  if (!checkResult) return new Response(null, { status: 403 });
  const bucket = "soundstash";
  const key = `playlists/${id}`;
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
const POST = async (ctx) => {
  try {
    const user = ctx.locals.user;
    if (!user) return new Response(null, { status: 401 });
    const contentLength = ctx.request.headers.get("Content-Length");
    const contentType = ctx.request.headers.get("Content-Type");
    if (!contentLength || !contentType)
      return new Response("Content-Length and Content-Type headers missing", {
        status: 400
      });
    const id = ctx.url.searchParams.get("id");
    if (!id) return new Response(null, { status: 400 });
    const checkResult = await db.query.playlist.findFirst({
      where: and(eq(playlist.id, id), eq(playlist.owner, user.id))
    });
    if (!checkResult)
      return new Response("you don't own this playlist", { status: 403 });
    const body = await ctx.request.arrayBuffer();
    if (!body) return new Response("no request body", { status: 400 });
    const command = new PutObjectCommand({
      Bucket: "soundstash",
      ContentLength: Number(contentLength),
      ContentType: contentType,
      Key: `playlists/${id}`,
      Body: new Uint8Array(body),
      IfNoneMatch: "*"
    });
    await client.send(command);
    await db.update(playlist).set({
      image: `playlists/${id}`
    }).where(eq(playlist.id, id));
  } catch (e) {
    if (e instanceof Error) console.error(e);
    return new Response("something went wrong", { status: 500 });
  }
  return new Response(null);
};
const PUT = async (ctx) => {
  try {
    const user = ctx.locals.user;
    if (!user) return new Response(null, { status: 401 });
    const contentLength = ctx.request.headers.get("Content-Length");
    const contentType = ctx.request.headers.get("Content-Type");
    if (!contentLength || !contentType)
      return new Response(null, { status: 400 });
    const id = ctx.url.searchParams.get("id");
    if (!id) return new Response(null, { status: 400 });
    const checkResult = await db.query.playlist.findFirst({
      where: and(eq(playlist.id, id), eq(playlist.owner, user.id))
    });
    if (!checkResult) return new Response(null, { status: 403 });
    const headResponse = await client.send(
      new HeadObjectCommand({
        Bucket: "soundstash",
        Key: `playlists/${id}`
      })
    );
    const eTag = headResponse.ETag;
    if (!eTag) return new Response(null, { status: 404 });
    const body = await ctx.request.arrayBuffer();
    if (!body) return new Response("no request body", { status: 400 });
    const command = new PutObjectCommand({
      Bucket: "soundstash",
      ContentLength: Number(contentLength),
      ContentType: contentType,
      Key: `playlists/${id}`,
      Body: new Uint8Array(body),
      IfMatch: eTag
    });
    await client.send(command);
  } catch (e) {
    if (e instanceof Error) console.error(e);
    return new Response(null, { status: 500 });
  }
  return new Response(null);
};
const DELETE = async (ctx) => {
  try {
    const user = ctx.locals.user;
    if (!user) return new Response(null, { status: 401 });
    const id = ctx.url.searchParams.get("id");
    if (!id) return new Response(null, { status: 400 });
    const checkResult = await db.query.playlist.findFirst({
      where: and(eq(playlist.id, id), eq(playlist.owner, user.id))
    });
    if (!checkResult) return new Response(null, { status: 403 });
    const command = new DeleteObjectCommand({
      Bucket: "soundstash",
      Key: `playlists/${id}`
    });
    await client.send(command);
    await db.update(playlist).set({
      image: null
    }).where(eq(playlist.id, id));
  } catch (e) {
    if (e instanceof Error) console.error(e);
    return new Response(null, { status: 500 });
  }
  return new Response(null);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	GET,
	POST,
	PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
