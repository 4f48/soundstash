import { d as db, t as track } from '../../chunks/database_Ch5beX0y.mjs';
import { eq } from 'drizzle-orm';
export { renderers } from '../../renderers.mjs';

const GET = async ({ locals }) => {
  if (!locals.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const tracks = await db.query.track.findMany({
      where: eq(track.owner, locals.user.id)
    });
    return new Response(JSON.stringify(tracks), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tracks" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
