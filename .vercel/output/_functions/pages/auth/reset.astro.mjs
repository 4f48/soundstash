import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Button, $ as $$Html } from '../../chunks/html_D7cA1FKc.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../../chunks/card_CEc-XKQm.mjs';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from '../../chunks/form_CLn1OMo3.mjs';
import { I as Input } from '../../chunks/input_T9MNZPkb.mjs';
import { a as authClient } from '../../chunks/client_C1b0uAZ7.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { n as navigate } from '../../chunks/router_vN4ZPF0m.mjs';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export { renderers } from '../../renderers.mjs';

const formSchema = z.object({
  password: z.string().nonempty()
});
function ResetPage({ token }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ""
    }
  });
  async function onSubmit(values) {
    setLoading(true);
    authClient.resetPassword(
      {
        newPassword: values.password,
        token
      },
      {
        onSuccess: () => {
          setLoading(false);
          setTimeout(() => navigate(), 1e3);
        },
        onError: ({ error }) => {
          console.error(error);
          setLoading(false);
        }
      }
    );
  }
  return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-sm self-center my-auto", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Forgot your password?" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Enter your email below to reset your password." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: form.handleSubmit(onSubmit), children: [
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "password",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "New password" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Something you'll remember",
                type: "password",
                ...field
              }
            ) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading, className: "w-full", children: [
        loading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
        "Save"
      ] })
    ] }) }) })
  ] });
}

const $$Astro = createAstro("https://soundstash.pirger.eu");
const $$Reset = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Reset;
  const token = new URLSearchParams(Astro2.url.searchParams).get("token") || "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Html, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ResetPage", ResetPage, { "token": token, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/reset-page", "client:component-export": "default" })} ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/pages/auth/reset.astro", void 0);

const $$file = "/home/x4f48/Desktop/soundstash/src/pages/auth/reset.astro";
const $$url = "/auth/reset";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Reset,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
