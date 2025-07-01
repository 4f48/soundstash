import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DQLiH3RP.js";import{c as n}from"./createLucideIcon.DxLV4sYg.js";/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["circle",{cx:"8",cy:"18",r:"4",key:"1fc0mg"}],["path",{d:"M12 18V2l7 4",key:"g04rme"}]],m=n("music-2",i);function u({artist:t,id:c,title:a}){const[s,r]=o.useState(!0);return e.jsxs("div",{className:"flex gap-2 items-center",children:[!s&&e.jsx("span",{className:"bg-muted rounded-sm flex items-center justify-center p-2",children:e.jsx(m,{className:"text-muted-foreground"})}),e.jsx("img",{src:`/api/cover?id=${c}`,className:`size-10 rounded-sm ${s?"block":"hidden"}`,onLoad:()=>r(!0),onError:()=>r(!1)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"truncate",children:a}),e.jsx("span",{className:"text-sm text-muted-foreground",children:t})]})]})}export{u as T};
