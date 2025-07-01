import { c as createComponent, r as renderComponent, a as renderTemplate, b as renderSlot, d as createTransitionScope } from './astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { $ as $$Header } from './header___hUlGM6.mjs';
/* empty css                           */

const $$Player = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Header, {}, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ${renderComponent($$result2, "PlayerCard", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/player", "client:component-export": "default", "data-astro-transition-persist": createTransitionScope($$result2, "anmcpr5y") })} ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/layouts/player.astro", "self");

export { $$Player as $ };
