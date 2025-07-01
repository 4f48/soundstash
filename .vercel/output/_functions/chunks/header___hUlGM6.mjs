import { e as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate, F as Fragment, b as renderSlot } from './astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { jsx } from 'react/jsx-runtime';
import { c as cn, B as Button, $ as $$Html } from './html_D7cA1FKc.mjs';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import 'react';

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}

const $$Astro = createAstro("https://soundstash.pirger.eu");
const $$Header$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header$1;
  const session = Astro2.locals.session;
  return renderTemplate`${maybeRenderHead()}<header class="bg-background sticky top-0 z-50 flex w-full items-center px-6 py-1"> <div class="flex items-center"> <a href="/">${renderComponent($$result, "Button", Button, { "className": "flex items-center text-lg font-extrabold", "variant": "ghost" }, { "default": ($$result2) => renderTemplate`SoundStash ${renderComponent($$result2, "Badge", Badge, { "className": "bg-yellow-500" }, { "default": ($$result3) => renderTemplate`Alpha` })}` })}</a> ${session && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a href="/"> ${renderComponent($$result2, "Button", Button, { "size": "sm", "variant": "ghost" }, { "default": ($$result3) => renderTemplate`
Library
` })} </a> <a href="/storage"> ${renderComponent($$result2, "Button", Button, { "size": "sm", "variant": "ghost" }, { "default": ($$result3) => renderTemplate`
Storage
` })} </a> ` })}`} </div> <div class="flex flex-1 items-center justify-end"> ${session ? renderTemplate`<a href="/account"> ${renderComponent($$result, "Button", Button, { "size": "sm", "variant": "ghost" }, { "default": ($$result2) => renderTemplate`
Account
` })} </a>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a href="/auth/signup"> ${renderComponent($$result2, "Button", Button, { "size": "sm", "variant": "ghost" }, { "default": ($$result3) => renderTemplate`
Sign up
` })} </a> <a href="/auth/signin"> ${renderComponent($$result2, "Button", Button, { "size": "sm", "variant": "ghost" }, { "default": ($$result3) => renderTemplate`
Sign in
` })} </a> ` })}`} </div> </header>`;
}, "/home/x4f48/Desktop/soundstash/src/components/header.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Html, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeaderBar", $$Header$1, {})} ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/layouts/header.astro", void 0);

export { $$Header as $ };
