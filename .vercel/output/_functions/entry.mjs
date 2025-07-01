import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DpRxqcOb.mjs';
import { manifest } from './manifest_DeL6vrvK.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/account.astro.mjs');
const _page2 = () => import('./pages/api/auth/_---all_.astro.mjs');
const _page3 = () => import('./pages/api/cover.astro.mjs');
const _page4 = () => import('./pages/api/delete.astro.mjs');
const _page5 = () => import('./pages/api/download.astro.mjs');
const _page6 = () => import('./pages/api/playlist/add.astro.mjs');
const _page7 = () => import('./pages/api/playlist/image.astro.mjs');
const _page8 = () => import('./pages/api/playlist/list.astro.mjs');
const _page9 = () => import('./pages/api/playlist/new.astro.mjs');
const _page10 = () => import('./pages/api/playlist/remove.astro.mjs');
const _page11 = () => import('./pages/api/playlist/track.astro.mjs');
const _page12 = () => import('./pages/api/playlist/tracks.astro.mjs');
const _page13 = () => import('./pages/api/tracks.astro.mjs');
const _page14 = () => import('./pages/api/upload/authorize.astro.mjs');
const _page15 = () => import('./pages/api/upload/finalize.astro.mjs');
const _page16 = () => import('./pages/auth/reset.astro.mjs');
const _page17 = () => import('./pages/auth/signin.astro.mjs');
const _page18 = () => import('./pages/auth/signup.astro.mjs');
const _page19 = () => import('./pages/home.astro.mjs');
const _page20 = () => import('./pages/playlist/_id_.astro.mjs');
const _page21 = () => import('./pages/storage.astro.mjs');
const _page22 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.10.2_@types+node@24.0.8_@vercel+blob@1.1.1_jiti@2.4.2_lightningcss@1.30.1_rollu_2fe5823b3e868a80f4a4d4b94541cc2d/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/account.astro", _page1],
    ["src/pages/api/auth/[...all].ts", _page2],
    ["src/pages/api/cover.ts", _page3],
    ["src/pages/api/delete.ts", _page4],
    ["src/pages/api/download.ts", _page5],
    ["src/pages/api/playlist/add.ts", _page6],
    ["src/pages/api/playlist/image.ts", _page7],
    ["src/pages/api/playlist/list.ts", _page8],
    ["src/pages/api/playlist/new.ts", _page9],
    ["src/pages/api/playlist/remove.ts", _page10],
    ["src/pages/api/playlist/track.ts", _page11],
    ["src/pages/api/playlist/tracks.ts", _page12],
    ["src/pages/api/tracks.ts", _page13],
    ["src/pages/api/upload/authorize.ts", _page14],
    ["src/pages/api/upload/finalize.ts", _page15],
    ["src/pages/auth/reset.astro", _page16],
    ["src/pages/auth/signin.astro", _page17],
    ["src/pages/auth/signup.astro", _page18],
    ["src/pages/home.astro", _page19],
    ["src/pages/playlist/[id].astro", _page20],
    ["src/pages/storage.astro", _page21],
    ["src/pages/index.astro", _page22]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "a218d6e3-c9ca-4bd6-91b9-0d030c15a8de",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
