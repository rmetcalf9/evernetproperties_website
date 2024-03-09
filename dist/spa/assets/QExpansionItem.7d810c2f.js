import{i as w,a0 as P,a1 as Q,a2 as D,a3 as te,m as B,j as o,k as i,x as U,a4 as ne,U as F,D as ae,l as O,q as M,a5 as ie,a6 as le,a7 as oe,a8 as ue,a9 as H,aa as se,C,ab as N,ac as re,ad as ce,Q as R}from"./index.88243ddd.js";var de=w({name:"QItem",props:{...P,...Q,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:h,emit:r}){const{proxy:{$q:s}}=U(),g=D(e,s),{hasLink:l,linkAttrs:c,linkClass:f,linkTag:m,navigateOnClick:k}=te(),d=B(null),u=B(null),b=o(()=>e.clickable===!0||l.value===!0||e.tag==="label"),S=o(()=>e.disable!==!0&&b.value===!0),_=o(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(g.value===!0?" q-item--dark":"")+(l.value===!0&&e.active===null?f.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(S.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),n=o(()=>{if(e.insetLevel===void 0)return null;const a=s.lang.rtl===!0?"Right":"Left";return{["padding"+a]:16+e.insetLevel*56+"px"}});function v(a){S.value===!0&&(u.value!==null&&(a.qKeyEvent!==!0&&document.activeElement===d.value?u.value.focus():document.activeElement===u.value&&d.value.focus()),k(a))}function x(a){if(S.value===!0&&ne(a,[13,32])===!0){F(a),a.qKeyEvent=!0;const L=new MouseEvent("click",a);L.qKeyEvent=!0,d.value.dispatchEvent(L)}r("keyup",a)}function q(){const a=ae(h.default,[]);return S.value===!0&&a.unshift(i("div",{class:"q-focus-helper",tabindex:-1,ref:u})),a}return()=>{const a={ref:d,class:_.value,style:n.value,role:"listitem",onClick:v,onKeyup:x};return S.value===!0?(a.tabindex=e.tabindex||"0",Object.assign(a,c.value)):b.value===!0&&(a["aria-disabled"]="true"),i(m.value,a,q())}}}),E=w({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:h}){const r=o(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>i("div",{class:r.value},O(h.default))}}),K=w({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:h}){const r=o(()=>parseInt(e.lines,10)),s=o(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(r.value===1?" ellipsis":"")),g=o(()=>e.lines!==void 0&&r.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":r.value}:null);return()=>i("div",{style:g.value,class:s.value},O(h.default))}}),ve=w({name:"QSlideTransition",props:{appear:Boolean,duration:{type:Number,default:300}},emits:["show","hide"],setup(e,{slots:h,emit:r}){let s=!1,g,l,c=null,f=null,m,k;function d(){g&&g(),g=null,s=!1,c!==null&&(clearTimeout(c),c=null),f!==null&&(clearTimeout(f),f=null),l!==void 0&&l.removeEventListener("transitionend",m),m=null}function u(n,v,x){v!==void 0&&(n.style.height=`${v}px`),n.style.transition=`height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`,s=!0,g=x}function b(n,v){n.style.overflowY=null,n.style.height=null,n.style.transition=null,d(),v!==k&&r(v)}function S(n,v){let x=0;l=n,s===!0?(d(),x=n.offsetHeight===n.scrollHeight?0:void 0):(k="hide",n.style.overflowY="hidden"),u(n,x,v),c=setTimeout(()=>{c=null,n.style.height=`${n.scrollHeight}px`,m=q=>{f=null,(Object(q)!==q||q.target===n)&&b(n,"show")},n.addEventListener("transitionend",m),f=setTimeout(m,e.duration*1.1)},100)}function _(n,v){let x;l=n,s===!0?d():(k="show",n.style.overflowY="hidden",x=n.scrollHeight),u(n,x,v),c=setTimeout(()=>{c=null,n.style.height=0,m=q=>{f=null,(Object(q)!==q||q.target===n)&&b(n,"hide")},n.addEventListener("transitionend",m),f=setTimeout(m,e.duration*1.1)},100)}return M(()=>{s===!0&&d()}),()=>i(ie,{css:!1,appear:e.appear,onEnter:S,onLeave:_},h.default)}});const I=le({}),ge=Object.keys(Q);var me=w({name:"QExpansionItem",props:{...Q,...oe,...P,icon:String,label:String,labelLines:[Number,String],caption:String,captionLines:[Number,String],dense:Boolean,toggleAriaLabel:String,expandIcon:String,expandedIcon:String,expandIconClass:[Array,String,Object],duration:Number,headerInsetLevel:Number,contentInsetLevel:Number,expandSeparator:Boolean,defaultOpened:Boolean,hideExpandIcon:Boolean,expandIconToggle:Boolean,switchToggleSide:Boolean,denseToggle:Boolean,group:String,popup:Boolean,headerStyle:[Array,String,Object],headerClass:[Array,String,Object]},emits:[...ue,"click","afterShow","afterHide"],setup(e,{slots:h,emit:r}){const{proxy:{$q:s}}=U(),g=D(e,s),l=B(e.modelValue!==null?e.modelValue:e.defaultOpened),c=B(null),f=H(),{show:m,hide:k,toggle:d}=se({showing:l});let u,b;const S=o(()=>`q-expansion-item q-item-type q-expansion-item--${l.value===!0?"expanded":"collapsed"} q-expansion-item--${e.popup===!0?"popup":"standard"}`),_=o(()=>{if(e.contentInsetLevel===void 0)return null;const t=s.lang.rtl===!0?"Right":"Left";return{["padding"+t]:e.contentInsetLevel*56+"px"}}),n=o(()=>e.disable!==!0&&(e.href!==void 0||e.to!==void 0&&e.to!==null&&e.to!=="")),v=o(()=>{const t={};return ge.forEach(y=>{t[y]=e[y]}),t}),x=o(()=>n.value===!0||e.expandIconToggle!==!0),q=o(()=>e.expandedIcon!==void 0&&l.value===!0?e.expandedIcon:e.expandIcon||s.iconSet.expansionItem[e.denseToggle===!0?"denseIcon":"icon"]),a=o(()=>e.disable!==!0&&(n.value===!0||e.expandIconToggle===!0)),L=o(()=>({expanded:l.value===!0,detailsId:e.targetUid,toggle:d,show:m,hide:k})),j=o(()=>{const t=e.toggleAriaLabel!==void 0?e.toggleAriaLabel:s.lang.label[l.value===!0?"collapse":"expand"](e.label);return{role:"button","aria-expanded":l.value===!0?"true":"false","aria-controls":f,"aria-label":t}});C(()=>e.group,t=>{b!==void 0&&b(),t!==void 0&&$()});function G(t){n.value!==!0&&d(t),r("click",t)}function Y(t){t.keyCode===13&&A(t,!0)}function A(t,y){y!==!0&&c.value!==null&&c.value.focus(),d(t),F(t)}function V(){r("afterShow")}function W(){r("afterHide")}function $(){u===void 0&&(u=H()),l.value===!0&&(I[e.group]=u);const t=C(l,T=>{T===!0?I[e.group]=u:I[e.group]===u&&delete I[e.group]}),y=C(()=>I[e.group],(T,ee)=>{ee===u&&T!==void 0&&T!==u&&k()});b=()=>{t(),y(),I[e.group]===u&&delete I[e.group],b=void 0}}function z(){const t={class:[`q-focusable relative-position cursor-pointer${e.denseToggle===!0&&e.switchToggleSide===!0?" items-end":""}`,e.expandIconClass],side:e.switchToggleSide!==!0,avatar:e.switchToggleSide},y=[i(R,{class:"q-expansion-item__toggle-icon"+(e.expandedIcon===void 0&&l.value===!0?" q-expansion-item__toggle-icon--rotated":""),name:q.value})];return a.value===!0&&(Object.assign(t,{tabindex:0,...j.value,onClick:A,onKeyup:Y}),y.unshift(i("div",{ref:c,class:"q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",tabindex:-1}))),i(E,t,()=>y)}function J(){let t;return h.header!==void 0?t=[].concat(h.header(L.value)):(t=[i(E,()=>[i(K,{lines:e.labelLines},()=>e.label||""),e.caption?i(K,{lines:e.captionLines,caption:!0},()=>e.caption):null])],e.icon&&t[e.switchToggleSide===!0?"push":"unshift"](i(E,{side:e.switchToggleSide===!0,avatar:e.switchToggleSide!==!0},()=>i(R,{name:e.icon})))),e.disable!==!0&&e.hideExpandIcon!==!0&&t[e.switchToggleSide===!0?"unshift":"push"](z()),t}function X(){const t={ref:"item",style:e.headerStyle,class:e.headerClass,dark:g.value,disable:e.disable,dense:e.dense,insetLevel:e.headerInsetLevel};return x.value===!0&&(t.clickable=!0,t.onClick=G,Object.assign(t,n.value===!0?v.value:j.value)),i(de,t,J)}function Z(){return re(i("div",{key:"e-content",class:"q-expansion-item__content relative-position",style:_.value,id:f},O(h.default)),[[ce,l.value]])}function p(){const t=[X(),i(ve,{duration:e.duration,onShow:V,onHide:W},Z)];return e.expandSeparator===!0&&t.push(i(N,{class:"q-expansion-item__border q-expansion-item__border--top absolute-top",dark:g.value}),i(N,{class:"q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",dark:g.value})),t}return e.group!==void 0&&$(),M(()=>{b!==void 0&&b()}),()=>i("div",{class:S.value},[i("div",{class:"q-expansion-item__container relative-position"},p())])}});export{me as Q,E as a,K as b,de as c};
