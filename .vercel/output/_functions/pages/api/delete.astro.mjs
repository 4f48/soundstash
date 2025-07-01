import { d as db, t as track } from '../../chunks/database_Ch5beX0y.mjs';
import { c as client } from '../../chunks/storage_CLPsYBhh.mjs';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { eq } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const DELETE = async (ctx) => {
  const id = ctx.url.searchParams.get("id");
  if (!id) return new Response("no key param", { status: 400 });
  await client.send(
    new DeleteObjectCommand({
      Bucket: "soundstash",
      Key: `tracks/${id}`
    })
  );
  await client.send(
    new DeleteObjectCommand({
      Bucket: "soundstash",
      Key: `covers/${id}`
    })
  );
  await db.delete(track).where(eq(track.id, id));
  return new Response(null);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
