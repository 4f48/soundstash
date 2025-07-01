import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BwXzANG0.mjs';
import 'kleur/colors';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { B as Button } from '../chunks/html_D7cA1FKc.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_CEc-XKQm.mjs';
import { a as authClient } from '../chunks/client_C1b0uAZ7.mjs';
import { n as navigate } from '../chunks/router_vN4ZPF0m.mjs';
import { Mail, LoaderCircle, Check } from 'lucide-react';
import { useState } from 'react';
import { $ as $$Player } from '../chunks/player_Ce_Dw_eS.mjs';
export { renderers } from '../renderers.mjs';

function Account({
  user
}) {
  if (!user) throw new Error("user is not defined");
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [signoutLoading, setSignoutLoading] = useState(false);
  const [verifyButton, setVerifyButton] = useState(
    /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Mail, {}),
      " Verify email"
    ] })
  );
  const [verifyLoading, setVerifyLoading] = useState(false);
  function requestChange() {
    if (!user) throw new Error("user is not defined");
    setChangePasswordLoading(true);
    authClient.requestPasswordReset(
      {
        email: user.email,
        redirectTo: "/auth/reset"
      },
      {
        onSuccess: () => setChangePasswordLoading(false),
        onError: ({ error }) => {
          console.error(error);
          setChangePasswordLoading(false);
        }
      }
    );
  }
  function signOut() {
    setSignoutLoading(true);
    authClient.signOut();
    setTimeout(() => navigate(), 1e3);
  }
  return /* @__PURE__ */ jsxs(Card, { className: "mx-3", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "scroll-m-20 text-3xl font-extrabold tracking-tight text-balance", children: "Account Settings" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Manage your account, subscription, security and privacy." })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h1", { className: "scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0", children: "Account Details" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "name: ",
          user?.name
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "email: ",
          user?.email
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "email verified: ",
          user?.emailVerified ? "Yes" : "No"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "flex flex-col items-start gap-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "scroll-m-20 border-b pb-2 w-full text-xl font-semibold tracking-tight first:mt-0", children: "Account Actions" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          !user?.emailVerified && /* @__PURE__ */ jsx(
            Button,
            {
              disabled: verifyLoading,
              onClick: () => {
                setVerifyLoading(true);
                setVerifyButton(
                  /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
                    " Verify email"
                  ] })
                );
                authClient.sendVerificationEmail(
                  {
                    email: user.email,
                    callbackURL: "/account"
                  },
                  {
                    onSuccess: () => {
                      setVerifyLoading(false);
                      setVerifyButton(
                        /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(Check, {}),
                          "Sent email"
                        ] })
                      );
                      setTimeout(
                        () => setVerifyButton(
                          /* @__PURE__ */ jsxs(Fragment, { children: [
                            /* @__PURE__ */ jsx(Mail, {}),
                            " Verify email"
                          ] })
                        ),
                        5e3
                      );
                    }
                  }
                );
              },
              children: verifyButton
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              disabled: changePasswordLoading,
              onClick: () => requestChange(),
              children: [
                changePasswordLoading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
                "Change password"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "destructive",
              disabled: signoutLoading,
              onClick: () => signOut(),
              children: [
                signoutLoading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
                "Sign out"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro("https://soundstash.pirger.eu");
const $$Account = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Account;
  const user = Astro2.locals.user;
  return renderTemplate`${renderComponent($$result, "Layout", $$Player, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AccountSettings", Account, { "user": user, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/account", "client:component-export": "default" })} ` })}`;
}, "/home/x4f48/Desktop/soundstash/src/pages/account.astro", void 0);

const $$file = "/home/x4f48/Desktop/soundstash/src/pages/account.astro";
const $$url = "/account";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Account,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
