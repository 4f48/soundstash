import { e as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, h as addAttribute, a as renderTemplate } from '../chunks/astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { A as AllTracks } from '../chunks/all-tracks_CWZwu-3w.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Button, p as playPlaylist } from '../chunks/html_D7cA1FKc.mjs';
import { C as Card, d as CardContent } from '../chunks/card_CEc-XKQm.mjs';
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from '../chunks/dialog_ByFnIg8s.mjs';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, e as FormMessage, d as FormControl } from '../chunks/form_CLn1OMo3.mjs';
import { I as Input } from '../chunks/input_T9MNZPkb.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { n as navigate } from '../chunks/router_vN4ZPF0m.mjs';
import { Plus, PlayIcon, CassetteTape } from 'lucide-react';
import React__default from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { d as db, p as playlist, t as track } from '../chunks/database_Ch5beX0y.mjs';
import '../chunks/index_DfOMS8cV.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_DOIVCdsf.mjs';
import { eq } from 'drizzle-orm';
import { $ as $$Player } from '../chunks/player_Ce_Dw_eS.mjs';
export { renderers } from '../renderers.mjs';

const formSchema = z.object({
  name: z.string().nonempty("You must name your playlist.").max(30)
});
function createPlaylist({
  count
}) {
  const [open, setOpen] = React__default.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  });
  async function onSubmit(values) {
    const request = { name: values.name };
    const result = await fetch("/api/playlist/new", {
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    if (result.ok) {
      await result.text();
      navigate();
    }
  }
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { children: /* @__PURE__ */ jsx(Card, { className: "w-38.5 h-44.5 flex items-center justify-center hover:bg-muted duration-100", children: /* @__PURE__ */ jsxs(CardContent, { className: "flex size-32 px-0 flex-col items-center justify-center gap-0", children: [
      /* @__PURE__ */ jsx(Plus, {}),
      /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Create playlist" })
    ] }) }) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Create new playlist" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Let's name your new playlist." })
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-3", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Playlist name" }),
                /* @__PURE__ */ jsx(FormMessage, { className: "flex-1 text-right" })
              ] }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: `My Playlist #${count + 1}`,
                  ...field
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: "Create" })
      ] }) })
    ] })
  ] });
}

function Play({
  playlist
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "bg-background hover:bg-muted invisible absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full duration-100 group-hover:visible hover:drop-shadow-sm",
      onClick: () => playPlaylist(playlist),
      children: /* @__PURE__ */ jsx(PlayIcon, { className: "fill-muted-foreground text-muted-foreground" })
    }
  );
}

const $$Astro$1 = createAstro("https://soundstash.pirger.eu");
const $$Playlists = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Playlists;
  const { user } = Astro2.props;
  const playlists = await db.query.playlist.findMany({
    where: eq(playlist.owner, user.id)
  });
  return renderTemplate`${maybeRenderHead()}<div class="space-y-3"> <h1 class="text-3xl font-bold">Playlists</h1> <div class="flex flex-wrap gap-2"> ${playlists.slice(0, 6).map((playlist2) => renderTemplate`<div class="group text-card-foreground bg-card grid gap-1 rounded-lg border p-3 shadow duration-100"> <div class="relative"> ${playlist2.image ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": `http://localhost:4321/api/playlist/image?id=${playlist2.id}`, "alt": "", "width": "8", "height": "8", "class": "size-32 rounded-md" })}` : renderTemplate`<div class="bg-muted flex size-32 items-center justify-center rounded-md"> ${renderComponent($$result, "CassetteTape", CassetteTape, { "className": "text-muted-foreground size-24" })} </div>`} ${renderComponent($$result, "Play", Play, { "playlist": playlist2, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/play-playlist", "client:component-export": "default" })} </div> <a class="text-center text-sm group-hover:underline"${addAttribute(`/playlist/${playlist2.id}`, "href")}> ${playlist2.name} </a> </div>`)} ${renderComponent($$result, "CreatePlaylist", createPlaylist, { "count": playlists.length, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@/components/create-playlist", "client:component-export": "default" })} </div> </div>`;
}, "/home/x4f48/Desktop/soundstash/src/components/playlists.astro", void 0);

const $$Astro = createAstro("https://soundstash.pirger.eu");
const $$Home = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Home;
  const user = Astro2.locals.user;
  if (!user) return new Response(null, { status: 401 });
  const tracks = await db.query.track.findMany({
    where: eq(track.owner, user.id)
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Player, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-3 space-y-6"> ${renderComponent($$result2, "Playlists", $$Playlists, { "user": user })} <div class="space-y-3"> <h1 class="text-3xl font-bold">All your tracks</h1> ${renderComponent($$result2, "AllTracks", AllTracks, { "tracks": tracks, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/all-tracks", "client:component-export": "default" })} </div> </main> ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/pages/home.astro", void 0);

const $$file = "/home/x4f48/Desktop/soundstash/src/pages/home.astro";
const $$url = "/home";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Home,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
