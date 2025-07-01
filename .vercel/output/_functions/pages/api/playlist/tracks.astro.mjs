import { d as db, p as playlist } from '../../../chunks/database_Ch5beX0y.mjs';
import { and, eq } from 'drizzle-orm';
export { renderers } from '../../../renderers.mjs';

const GET = async (ctx) => {
  const user = ctx.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const id = ctx.url.searchParams.get("id");
  if (!id) return new Response(null, { status: 400 });
  const playlist$1 = await db.query.playlist.findFirst({
    columns: {
      id: false,
      name: false,
      owner: false
    },
    where: and(eq(playlist.id, id), eq(playlist.owner, user.id)),
    with: {
      playlistToTracks: {
        with: {
          track: true
        }
      }
    }
  });
  if (!playlist$1) return new Response(null, { status: 401 });
  const tracks = playlist$1.playlistToTracks.map(({ track }) => track);
  return new Response(JSON.stringify(tracks), {
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
