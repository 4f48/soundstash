import { d as db, p as playlist } from '../../../chunks/database_Ch5beX0y.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const GET = async (ctx) => {
  const user = ctx.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const result = await db.query.playlist.findMany({
    columns: {
      owner: false
    },
    where: eq(playlist.owner, user.id)
  });
  if (!result) return new Response(null, { status: 500 });
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
