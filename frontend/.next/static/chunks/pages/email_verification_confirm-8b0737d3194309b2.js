(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[923],{6211:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/email_verification_confirm",function(){return n(4380)}])},4380:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return EmailVerificationConfirm}});var d=n(5893),l=n(1163),c=n(6501);function EmailVerificationConfirm(){let e=(0,l.useRouter)(),{token:r}=e.query,handleConfirm=async()=>{try{let n=await fetch("/api/Account/VerifyEmailToken",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:r})});n.ok?(c.ZP.success("Email verified successfully"),e.push("/email-verification-success")):c.ZP.error("Invalid or expired token")}catch(e){c.ZP.error("Error verifying email")}};return(0,d.jsxs)("div",{className:"p-6 text-center",children:[(0,d.jsx)("h1",{className:"text-xl font-bold mb-4",children:"Confirm Email Verification"}),(0,d.jsx)("button",{onClick:handleConfirm,className:"bg-green-600 text-white px-4 py-2 rounded",children:"Verify Email"})]})}},6501:function(e,r,n){"use strict";let d,l;n.d(r,{ZP:function(){return W}});var c,m=n(7294);let f={data:""},t=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||f,g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,y=/\/\*[^]*?\*\/|  +/g,h=/\n+/g,o=(e,r)=>{let n="",d="",l="";for(let c in e){let m=e[c];"@"==c[0]?"i"==c[1]?n=c+" "+m+";":d+="f"==c[1]?o(m,c):c+"{"+o(m,"k"==c[1]?"":r)+"}":"object"==typeof m?d+=o(m,r?r.replace(/([^,])+/g,e=>c.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,e):e?e+" "+r:r)):c):null!=m&&(c=/^--/.test(c)?c:c.replace(/[A-Z]/g,"-$&").toLowerCase(),l+=o.p?o.p(c,m):c+":"+m+";")}return n+(r&&l?r+"{"+l+"}":l)+d},b={},s=e=>{if("object"==typeof e){let r="";for(let n in e)r+=n+s(e[n]);return r}return e},i=(e,r,n,d,l)=>{var c;let m=s(e),f=b[m]||(b[m]=(e=>{let r=0,n=11;for(;r<e.length;)n=101*n+e.charCodeAt(r++)>>>0;return"go"+n})(m));if(!b[f]){let r=m!==e?e:(e=>{let r,n,d=[{}];for(;r=g.exec(e.replace(y,""));)r[4]?d.shift():r[3]?(n=r[3].replace(h," ").trim(),d.unshift(d[0][n]=d[0][n]||{})):d[0][r[1]]=r[2].replace(h," ").trim();return d[0]})(e);b[f]=o(l?{["@keyframes "+f]:r}:r,n?"":"."+f)}let x=n&&b.g?b.g:null;return n&&(b.g=b[f]),c=b[f],x?r.data=r.data.replace(x,c):-1===r.data.indexOf(c)&&(r.data=d?c+r.data:r.data+c),f},p=(e,r,n)=>e.reduce((e,d,l)=>{let c=r[l];if(c&&c.call){let e=c(n),r=e&&e.props&&e.props.className||/^go/.test(e)&&e;c=r?"."+r:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+d+(null==c?"":c)},"");function u(e){let r=this||{},n=e.call?e(r.p):e;return i(n.unshift?n.raw?p(n,[].slice.call(arguments,1),r.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(r.p):n),{}):n,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let x,v,w,k=u.bind({k:1});function j(e,r){let n=this||{};return function(){let d=arguments;function a(l,c){let m=Object.assign({},l),f=m.className||a.className;n.p=Object.assign({theme:v&&v()},m),n.o=/ *go\d+/.test(f),m.className=u.apply(n,d)+(f?" "+f:""),r&&(m.ref=c);let g=e;return e[0]&&(g=m.as||e,delete m.as),w&&g[0]&&w(m),x(g,m)}return r?r(a):a}}var Z=e=>"function"==typeof e,dist_h=(e,r)=>Z(e)?e(r):e,N=(d=0,()=>(++d).toString()),E=()=>{if(void 0===l&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");l=!e||e.matches}return l},C="default",H=(e,r)=>{let{toastLimit:n}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case 2:let{toast:d}=r;return H(e,{type:e.toasts.find(e=>e.id===d.id)?1:0,toast:d});case 3:let{toastId:l}=r;return{...e,toasts:e.toasts.map(e=>e.id===l||void 0===l?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===r.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let c=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+c}))}}},O=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},z={},Y=(e,r=C)=>{z[r]=H(z[r]||A,e),O.forEach(([e,n])=>{e===r&&n(z[r])})},_=e=>Object.keys(z).forEach(r=>Y(e,r)),Q=e=>Object.keys(z).find(r=>z[r].toasts.some(r=>r.id===e)),S=(e=C)=>r=>{Y(r,e)},ie=(e,r="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(null==n?void 0:n.id)||N()}),P=e=>(r,n)=>{let d=ie(r,e,n);return S(d.toasterId||Q(d.id))({type:2,toast:d}),d.id},dist_n=(e,r)=>P("blank")(e,r);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(e,r)=>{let n={type:3,toastId:e};r?S(r)(n):_(n)},dist_n.dismissAll=e=>dist_n.dismiss(void 0,e),dist_n.remove=(e,r)=>{let n={type:4,toastId:e};r?S(r)(n):_(n)},dist_n.removeAll=e=>dist_n.remove(void 0,e),dist_n.promise=(e,r,n)=>{let d=dist_n.loading(r.loading,{...n,...null==n?void 0:n.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let l=r.success?dist_h(r.success,e):void 0;return l?dist_n.success(l,{id:d,...n,...null==n?void 0:n.success}):dist_n.dismiss(d),e}).catch(e=>{let l=r.error?dist_h(r.error,e):void 0;l?dist_n.error(l,{id:d,...n,...null==n?void 0:n.error}):dist_n.dismiss(d)}),e};var I=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,T=k`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=k`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,V=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,D=k`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,L=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${D} 1s linear infinite;
`,R=k`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,q=k`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,M=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${q} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,X=j("div")`
  position: absolute;
`,J=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=k`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$=({toast:e})=>{let{icon:r,type:n,iconTheme:d}=e;return void 0!==r?"string"==typeof r?m.createElement(G,null,r):r:"blank"===n?null:m.createElement(J,null,m.createElement(L,{...d}),"loading"!==n&&m.createElement(X,null,"error"===n?m.createElement(V,{...d}):m.createElement(M,{...d})))},Re=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ee=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,K=j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,U=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ke=(e,r)=>{let n=e.includes("top")?1:-1,[d,l]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(n),Ee(n)];return{animation:r?`${k(d)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${k(l)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};m.memo(({toast:e,position:r,style:n,children:d})=>{let l=e.height?ke(e.position||r||"top-center",e.visible):{opacity:0},c=m.createElement($,{toast:e}),f=m.createElement(U,{...e.ariaProps},dist_h(e.message,e));return m.createElement(K,{className:e.className,style:{...l,...n,...e.style}},"function"==typeof d?d({icon:c,message:f}):m.createElement(m.Fragment,null,c,f))}),c=m.createElement,o.p=void 0,x=c,v=void 0,w=void 0,u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var W=dist_n}},function(e){e.O(0,[774,888,179],function(){return e(e.s=6211)}),_N_E=e.O()}]);