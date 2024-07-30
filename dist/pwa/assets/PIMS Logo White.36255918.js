import{j as ee,Q as te,R as oe,S as ae,g as O,y as f,T as ne,U as ie,V as se,W as le,X as re,z as C,k,Y as E,Z as x,F as ue,m as H,$ as ce,p as de,C as fe,a0 as ve}from"./index.cb6f97dd.js";import{u as he,v as A,a as ge,p as M,b as me,c as ye,r as j,s as Te,d as q,e as pe}from"./position-engine.357b4f89.js";var Pe=ee({name:"QTooltip",inheritAttrs:!1,props:{...he,...te,...oe,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:A},self:{type:String,default:"top middle",validator:A},offset:{type:Array,default:()=>[14,14],validator:ge},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...ae],setup(e,{slots:D,emit:y,attrs:v}){let i,s;const h=de(),{proxy:{$q:o}}=h,l=O(null),c=O(!1),L=f(()=>M(e.anchor,o.lang.rtl)),W=f(()=>M(e.self,o.lang.rtl)),_=f(()=>e.persistent!==!0),{registerTick:Q,removeTick:R}=ne(),{registerTimeout:d}=ie(),{transitionProps:I,transitionStyle:N}=se(e),{localScrollTarget:T,changeScrollEvent:U,unconfigureScrollTarget:V}=me(e,P),{anchorEl:a,canShow:$,anchorEvents:r}=ye({showing:c,configureAnchorEl:G}),{show:z,hide:g}=le({showing:c,canShow:$,handleShow:F,handleHide:X,hideOnRouteChange:_,processOnMount:!0});Object.assign(r,{delayShow:Y,delayHide:Z});const{showPortal:p,hidePortal:b,renderPortal:B}=re(h,l,K,"tooltip");if(o.platform.is.mobile===!0){const t={anchorEl:a,innerRef:l,onClickOutside(n){return g(n),n.target.classList.contains("q-dialog__backdrop")&&ve(n),!0}},m=f(()=>e.modelValue===null&&e.persistent!==!0&&c.value===!0);C(m,n=>{(n===!0?pe:j)(t)}),k(()=>{j(t)})}function F(t){p(),Q(()=>{s=new MutationObserver(()=>u()),s.observe(l.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),u(),P()}),i===void 0&&(i=C(()=>o.screen.width+"|"+o.screen.height+"|"+e.self+"|"+e.anchor+"|"+o.lang.rtl,u)),d(()=>{p(!0),y("show",t)},e.transitionDuration)}function X(t){R(),b(),S(),d(()=>{b(!0),y("hide",t)},e.transitionDuration)}function S(){s!==void 0&&(s.disconnect(),s=void 0),i!==void 0&&(i(),i=void 0),V(),E(r,"tooltipTemp")}function u(){Te({targetEl:l.value,offset:e.offset,anchorEl:a.value,anchorOrigin:L.value,selfOrigin:W.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function Y(t){if(o.platform.is.mobile===!0){q(),document.body.classList.add("non-selectable");const m=a.value,n=["touchmove","touchcancel","touchend","click"].map(w=>[m,w,"delayHide","passiveCapture"]);x(r,"tooltipTemp",n)}d(()=>{z(t)},e.delay)}function Z(t){o.platform.is.mobile===!0&&(E(r,"tooltipTemp"),q(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),d(()=>{g(t)},e.hideDelay)}function G(){if(e.noParentEvent===!0||a.value===null)return;const t=o.platform.is.mobile===!0?[[a.value,"touchstart","delayShow","passive"]]:[[a.value,"mouseenter","delayShow","passive"],[a.value,"mouseleave","delayHide","passive"]];x(r,"anchor",t)}function P(){if(a.value!==null||e.scrollTarget!==void 0){T.value=ue(a.value,e.scrollTarget);const t=e.noParentEvent===!0?u:g;U(T.value,t)}}function J(){return c.value===!0?H("div",{...v,ref:l,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",v.class],style:[v.style,N.value],role:"tooltip"},fe(D.default)):null}function K(){return H(ce,I.value,J)}return k(S),Object.assign(h.proxy,{updatePosition:u}),B}}),we="/assets/PIMS Logo White.099cb929.png";export{Pe as Q,we as _};