import { jsx } from 'react/jsx-runtime';
import { atom } from 'nanostores';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import 'react';
import { c as createComponent, a as renderTemplate, e as createAstro, h as addAttribute, i as renderScript, r as renderComponent, j as renderHead, b as renderSlot, k as renderTransition, d as createTransitionScope } from './astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { useTheme } from 'next-themes';
import { Toaster as Toaster$1 } from 'sonner';
/* empty css                           */
import './index_DfOMS8cV.mjs';
import { c as $$Font } from './_astro_assets_DOIVCdsf.mjs';

const $currentTrack = atom(0);
const $playing = atom(false);
const $playlist = atom([]);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
async function playPlaylist(playlist) {
  const playlistToTracks = await (await fetch(`/api/playlist/tracks?id=${playlist.id}`)).json();
  $playing.set(false);
  $playlist.set(playlistToTracks);
  $currentTrack.set(0);
  $playing.set(true);
}
async function playPlaylistShuffled(playlist) {
  const playlistToTracks = await (await fetch(`/api/playlist/tracks?id=${playlist.id}`)).json();
  const shuffledTracks = [...playlistToTracks];
  for (let i = shuffledTracks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledTracks[i], shuffledTracks[j]] = [
      shuffledTracks[j],
      shuffledTracks[i]
    ];
  }
  $playing.set(false);
  $playlist.set(shuffledTracks);
  $currentTrack.set(0);
  $playing.set(true);
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Posthog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<script>\n	!(function (t, e) {\n		var o, n, p, r;\n		e.__SV ||\n			((window.posthog = e),\n			(e._i = []),\n			(e.init = function (i, s, a) {\n				function g(t, e) {\n					var o = e.split(".");\n					(2 == o.length && ((t = t[o[0]]), (e = o[1])),\n						(t[e] = function () {\n							t.push([e].concat(Array.prototype.slice.call(arguments, 0)));\n						}));\n				}\n				(((p = t.createElement("script")).type = "text/javascript"),\n					(p.crossOrigin = "anonymous"),\n					(p.async = !0),\n					(p.src =\n						s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") +\n						"/static/array.js"),\n					(r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(\n						p,\n						r\n					));\n				var u = e;\n				for (\n					void 0 !== a ? (u = e[a] = []) : (a = "posthog"),\n						u.people = u.people || [],\n						u.toString = function (t) {\n							var e = "posthog";\n							return (\n								"posthog" !== a && (e += "." + a),\n								t || (e += " (stub)"),\n								e\n							);\n						},\n						u.people.toString = function () {\n							return u.toString(1) + ".people (stub)";\n						},\n						o =\n							"init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(\n								" "\n							),\n						n = 0;\n					n < o.length;\n					n++\n				)\n					g(u, o[n]);\n				e._i.push([i, s, a]);\n			}),\n			(e.__SV = 1));\n	})(document, window.posthog || []);\n	posthog.init("phc_88SD8f9bWD050DHuUSWa81C5jAQdqgGR6mvSBg2ln7K", {\n		api_host: "https://soundstash.pirger.eu/repr",\n		ui_host: "https://eu.posthog.com",\n		defaults: "2025-05-24",\n	});\n<\/script>'])));
}, "/home/x4f48/Desktop/soundstash/src/components/posthog.astro", void 0);

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...props
    }
  );
};

const $$Astro$1 = createAstro("https://soundstash.pirger.eu");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/x4f48/Desktop/soundstash/node_modules/.pnpm/astro@5.10.2_@types+node@24.0.8_@vercel+blob@1.1.1_jiti@2.4.2_lightningcss@1.30.1_rollu_2fe5823b3e868a80f4a4d4b94541cc2d/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/x4f48/Desktop/soundstash/node_modules/.pnpm/astro@5.10.2_@types+node@24.0.8_@vercel+blob@1.1.1_jiti@2.4.2_lightningcss@1.30.1_rollu_2fe5823b3e868a80f4a4d4b94541cc2d/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro = createAstro("https://soundstash.pirger.eu");
const $$Html = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Html;
  return renderTemplate`<html class="min-h-screen w-screen" lang="en"${addAttribute(renderTransition($$result, "h7pwer7l"), "data-astro-transition-scope")}> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="sitemap" href="/sitemap-index.xml"><link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="shortcut icon" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="SoundStash"><link rel="manifest" href="/site.webmanifest"><title>SoundStash</title>${renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-inter", "preload": true })}${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderComponent($$result, "PostHog", $$Posthog, {})}${renderHead()}</head> <body class="relative flex min-h-screen w-screen flex-col gap-3 antialiased"> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Toaster", Toaster, { "closeButton": true, "richColors": true, "swipeDirections": ["right", "bottom"], "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/sonner", "client:component-export": "Toaster", "data-astro-transition-persist": createTransitionScope($$result, "fxsrrkue") })} </body></html>`;
}, "/home/x4f48/Desktop/soundstash/src/layouts/html.astro", "self");

export { $$Html as $, Button as B, playPlaylistShuffled as a, $playlist as b, cn as c, $playing as d, $currentTrack as e, formatTime as f, playPlaylist as p };
