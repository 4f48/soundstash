import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Button, $ as $$Html } from '../../chunks/html_D7cA1FKc.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, e as CardAction, d as CardContent } from '../../chunks/card_CEc-XKQm.mjs';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from '../../chunks/form_CLn1OMo3.mjs';
import { I as Input } from '../../chunks/input_T9MNZPkb.mjs';
import { a as authClient } from '../../chunks/client_C1b0uAZ7.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import React__default from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export { renderers } from '../../renderers.mjs';

const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty()
});
function Signup() {
  const [loading, setLoading] = React__default.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  async function onSubmit(values) {
    setLoading(true);
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password
      },
      {
        onResponse: () => setLoading(false),
        onSuccess: () => {
          toast.success("Successfully signed up.");
        },
        onError: ({ error }) => {
          toast.error(`Failed to sign up: ${error.message}`);
        }
      }
    );
  }
  return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-sm self-center my-auto", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Create your account" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Enter your email below to create an account." }),
      /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsx("a", { href: "/auth/signin", children: /* @__PURE__ */ jsx(Button, { variant: "link", children: "Sign in" }) }) })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
      "form",
      {
        className: "flex flex-col gap-8",
        onSubmit: form.handleSubmit(onSubmit),
        children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "name",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Username" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "Your Beautiful Name", ...field }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "email",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "you@example.com", ...field }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "password",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Password" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "password", ...field }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading, className: "w-full", children: [
            loading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
            "Sign up"
          ] })
        ]
      }
    ) }) })
  ] });
}

const $$Signup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Html, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SignUp", Signup, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/signup", "client:component-export": "default" })} ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/pages/auth/signup.astro", void 0);

const $$file = "/home/x4f48/Desktop/soundstash/src/pages/auth/signup.astro";
const $$url = "/auth/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Signup,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
