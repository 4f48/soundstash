import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { $ as $$Header } from '../chunks/header___hUlGM6.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Header, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-2 [&_p]:leading-7 [&_p]:[&:not(:first-child)]:mt-6"> <p>
This is SoundStash, the music streaming platform where you own your music.
			Get started by <a href="/auth/signup" class="underline">signing up</a>.
</p> <p>Everyone gets 100 MB storage for free!</p> </section> ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/pages/index.astro", void 0);

const $$file = "/home/x4f48/Desktop/soundstash/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
