import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{I as y}from"./input.CNO_L4t5.js";import{B as o}from"./button.Db3GhhwO.js";import{D as j,a as m,b as k,c as v,d as M,e as D}from"./dialog.CUSjS07t.js";import{D as w,a as C,E as _,b,d as N,e as S,f as I,g as L,h as P,i as T,c as t}from"./dropdown-menu.COVBS5Vz.js";import"./playlists.schema.Do3Lpyr0.js";import{c as s,p as z,e as $}from"./createLucideIcon.DxLV4sYg.js";import{n as p}from"./router.DnZMHVsn.js";import{R as c}from"./index.DQLiH3RP.js";import{P as E}from"./play.B9C71mVS.js";import{T as H}from"./trash-2.4YVattyp.js";import{L as R}from"./loader-circle.BgR7_kSm.js";import"./index.CKCoq1tz.js";import"./index.B8Cg28y-.js";import"./index.C-Vi51-h.js";import"./index.CKz0Jdri.js";import"./index.CNoT2JK1.js";/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7",key:"m87ecr"}],["line",{x1:"16",x2:"22",y1:"5",y2:"5",key:"ez7e4s"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],B=s("image-minus",U);/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M16 5h6",key:"1vod17"}],["path",{d:"M19 2v6",key:"4bpg5p"}],["path",{d:"M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",key:"1ue2ih"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}]],V=s("image-plus",O);/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],q=s("image",A);/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],F=s("pencil",G);/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",key:"1ailkh"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2",key:"km57vx"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",key:"os18l9"}]],K=s("shuffle",J);/**
 * @license lucide-react v0.518.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6",key:"1528k5"}],["path",{d:"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7",key:"13ksps"}],["path",{d:"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1",key:"1n9rhb"}],["path",{d:"M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1",key:"1mj8rg"}],["path",{d:"M9 6v12",key:"velyjx"}]],W=s("text-cursor-input",Q);function ge({playlist:a}){const[d,r]=c.useState(!1),[i,g]=c.useState(void 0),[u,l]=c.useState(!1);async function x(n){if(r(!0),n.preventDefault(),!!i)try{await fetch(`/api/playlist/image?id=${a.id}`,{body:new Blob([i]),headers:{"Content-Type":i.type,"Content-Length":i.size.toString()},method:a.image?"PUT":"POST"})}catch(h){return r(!1),h instanceof Error&&console.error(h.message),1}finally{r(!1),l(!1),a.image||p(`/playlist/${a.id}`)}}async function f(){await fetch(`/api/playlist/image?id=${a.id}`,{method:"DELETE"}),p(`/playlist/${a.id}`)}return e.jsxs("div",{className:"grid grid-cols-3 w-fit border rounded-md shadow-xs",children:[e.jsx(o,{onClick:()=>z(a),size:"icon",variant:"ghost",children:e.jsx(E,{})}),e.jsx(o,{onClick:()=>$(a),size:"icon",variant:"ghost",children:e.jsx(K,{})}),e.jsxs(j,{open:u,onOpenChange:l,children:[e.jsxs(w,{children:[e.jsx(C,{asChild:!0,children:e.jsx(o,{size:"icon",variant:"ghost",children:e.jsx(_,{})})}),e.jsxs(b,{children:[e.jsx(N,{children:"Manage Playlist"}),e.jsxs(S,{children:[a.image?e.jsxs(I,{children:[e.jsxs(L,{className:"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground gap-2",children:[e.jsx(q,{}),"Image"]}),e.jsx(P,{children:e.jsxs(T,{children:[e.jsx(m,{className:"w-full",children:e.jsxs(t,{children:[e.jsx(F,{}),"Change"]})}),e.jsxs(t,{onClick:()=>f(),children:[e.jsx(B,{}),"Remove"]})]})})]}):e.jsx(m,{className:"w-full",children:e.jsxs(t,{children:[e.jsx(V,{}),"Add image"]})}),e.jsxs(t,{children:[e.jsx(W,{className:"text-muted-foreground"}),"Rename"]}),e.jsxs(t,{children:[e.jsx(H,{}),"Delete"]})]})]})]}),e.jsxs(k,{children:[e.jsxs(v,{children:[e.jsxs(M,{children:[a.image?"Change":"Upload"," image"]}),e.jsxs(D,{children:[a.image?"Change the":"Upload a"," cover image for your playlist."]})]}),e.jsxs("form",{onSubmit:n=>x(n),className:"space-y-4",children:[e.jsx(y,{type:"file",accept:".jpg,.avif",required:!0,onChange:n=>{g(n.target.files?.[0])}}),e.jsxs(o,{className:"w-full",disabled:d,type:"submit",children:[d&&e.jsx(R,{className:"animate-spin"}),a.image?"Change":"Upload"]})]})]})]})]})}export{ge as default};
