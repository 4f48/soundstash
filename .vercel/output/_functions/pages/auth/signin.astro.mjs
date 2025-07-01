import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Button, $ as $$Html } from '../../chunks/html_D7cA1FKc.mjs';
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from '../../chunks/dialog_ByFnIg8s.mjs';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from '../../chunks/form_CLn1OMo3.mjs';
import { I as Input } from '../../chunks/input_T9MNZPkb.mjs';
import { a as authClient } from '../../chunks/client_C1b0uAZ7.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import React__default, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, e as CardAction, d as CardContent } from '../../chunks/card_CEc-XKQm.mjs';
import { n as navigate } from '../../chunks/router_vN4ZPF0m.mjs';
import { toast } from 'sonner';
export { renderers } from '../../renderers.mjs';

const formSchema$1 = z.object({
  email: z.string().email().nonempty()
});
function ResetDialog() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema$1),
    defaultValues: {
      email: ""
    }
  });
  async function onSubmit(values) {
    setLoading(true);
    authClient.requestPasswordReset(
      {
        email: values.email,
        redirectTo: "/auth/reset"
      },
      {
        onSuccess: () => setLoading(false),
        onError: ({ error }) => {
          console.error(error);
          setLoading(false);
        }
      }
    );
  }
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { className: "hover:underline underline-offset-4 text-sm", children: "Forgot your password?" }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Forgot your password?" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Enter your email below to reset your password." })
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: form.handleSubmit(onSubmit), children: [
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
        /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading, className: "w-full", children: [
          loading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
          "Send"
        ] })
      ] }) })
    ] })
  ] });
}

const formSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty()
});
function Signup() {
  const [loading, setLoading] = React__default.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  async function onSubmit(values) {
    setLoading(true);
    authClient.signIn.email(
      {
        email: values.email,
        password: values.password
      },
      {
        onResponse: () => setLoading(false),
        onSuccess: () => navigate(),
        onError: ({ error }) => {
          toast.error(`Failed to sign in: ${error.message}`);
        }
      }
    );
  }
  return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-sm self-center my-auto", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Login to your account" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Enter your email below to login to your account." }),
      /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsx("a", { href: "/auth/signup", children: /* @__PURE__ */ jsx(Button, { variant: "link", children: "Sign up" }) }) })
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
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(FormLabel, { children: "Password" }),
                  /* @__PURE__ */ jsx("span", { className: "ml-auto inline-block", children: /* @__PURE__ */ jsx(ResetDialog, {}) })
                ] }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "password", ...field }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: loading, className: "w-full", children: [
            loading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
            "Sign in"
          ] })
        ]
      }
    ) }) })
  ] });
}

const $$Signin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Html, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SignIn", Signup, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/signin", "client:component-export": "default" })} ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/pages/auth/signin.astro", void 0);

const $$file = "/home/x4f48/Desktop/soundstash/src/pages/auth/signin.astro";
const $$url = "/auth/signin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Signin,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
