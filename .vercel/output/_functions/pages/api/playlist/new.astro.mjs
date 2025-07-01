import { d as db, p as playlist } from '../../../chunks/database_Ch5beX0y.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async (ctx) => {
  const user = ctx.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const request = await ctx.request.json();
  const id = crypto.randomUUID();
  try {
    await db.insert(playlist).values({
      id,
      name: request.name,
      owner: user.id
    });
  } catch (e) {
    if (e instanceof Error) console.error(e);
    return new Response("failed to create new playlist", {
      status: 500
    });
  }
  return new Response(id);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
