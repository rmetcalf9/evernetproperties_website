import{c as q,a as f,h as g,d as I,r as z,i as K,o as B,e as E,n as oe,f as X,g as k,l as D,j as U,k as P,w as b,m as ae,p as O,q as ne,s as se,t as ie,u as G,v as ue,x as H,y as ce,_ as de,z as fe,P as M,N as ve,A as J,B as W,C as he,D as C,E as $,F as L,G as A,H as Z,I as me,J as ge,K as pe}from"./index.2c511d18.js";var ye=q({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:d}){const n=f(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>g("div",{class:n.value},I(d.default))}}),be=q({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:d}){const n=f(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>g("div",{class:n.value,role:"toolbar"},I(d.default))}});function we(){const e=z(!K.value);return e.value===!1&&B(()=>{e.value=!0}),e}const re=typeof ResizeObserver!="undefined",ee=re===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var F=q({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:d}){let n=null,o,t={width:-1,height:-1};function c(l){l===!0||e.debounce===0||e.debounce==="0"?s():n===null&&(n=setTimeout(s,e.debounce))}function s(){if(n!==null&&(clearTimeout(n),n=null),o){const{offsetWidth:l,offsetHeight:a}=o;(l!==t.width||a!==t.height)&&(t={width:l,height:a},d("resize",t))}}const{proxy:m}=k();if(re===!0){let l;const a=p=>{o=m.$el.parentNode,o?(l=new ResizeObserver(c),l.observe(o),s()):p!==!0&&X(()=>{a(!0)})};return B(()=>{a()}),E(()=>{n!==null&&clearTimeout(n),l!==void 0&&(l.disconnect!==void 0?l.disconnect():o&&l.unobserve(o))}),oe}else{let p=function(){n!==null&&(clearTimeout(n),n=null),a!==void 0&&(a.removeEventListener!==void 0&&a.removeEventListener("resize",c,D.passive),a=void 0)},y=function(){p(),o&&o.contentDocument&&(a=o.contentDocument.defaultView,a.addEventListener("resize",c,D.passive),s())};const l=we();let a;return B(()=>{X(()=>{o=m.$el,o&&y()})}),E(p),m.trigger=c,()=>{if(l.value===!0)return g("object",{style:ee.style,tabindex:-1,type:"text/html",data:ee.url,"aria-hidden":"true",onLoad:y})}}}}),_e=q({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:d,emit:n}){const{proxy:{$q:o}}=k(),t=U(O,P);if(t===P)return console.error("QHeader needs to be child of QLayout"),P;const c=z(parseInt(e.heightHint,10)),s=z(!0),m=f(()=>e.reveal===!0||t.view.value.indexOf("H")>-1||o.platform.is.ios&&t.isContainer.value===!0),l=f(()=>{if(e.modelValue!==!0)return 0;if(m.value===!0)return s.value===!0?c.value:0;const r=c.value-t.scroll.value.position;return r>0?r:0}),a=f(()=>e.modelValue!==!0||m.value===!0&&s.value!==!0),p=f(()=>e.modelValue===!0&&a.value===!0&&e.reveal===!0),y=f(()=>"q-header q-layout__section--marginal "+(m.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(a.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),S=f(()=>{const r=t.rows.value.top,_={};return r[0]==="l"&&t.left.space===!0&&(_[o.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),r[2]==="r"&&t.right.space===!0&&(_[o.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),_});function v(r,_){t.update("header",r,_)}function x(r,_){r.value!==_&&(r.value=_)}function w({height:r}){x(c,r),v("size",r)}function T(r){p.value===!0&&x(s,!0),n("focusin",r)}b(()=>e.modelValue,r=>{v("space",r),x(s,!0),t.animate()}),b(l,r=>{v("offset",r)}),b(()=>e.reveal,r=>{r===!1&&x(s,e.modelValue)}),b(s,r=>{t.animate(),n("reveal",r)}),b(t.scroll,r=>{e.reveal===!0&&x(s,r.direction==="up"||r.position<=e.revealOffset||r.position-r.inflectionPoint<100)});const R={};return t.instances.header=R,e.modelValue===!0&&v("size",c.value),v("space",e.modelValue),v("offset",l.value),E(()=>{t.instances.header===R&&(t.instances.header=void 0,v("size",0),v("offset",0),v("space",!1))}),()=>{const r=ae(d.default,[]);return e.elevated===!0&&r.push(g("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),r.push(g(F,{debounce:0,onResize:w})),g("header",{class:y.value,style:S.value,onFocusin:T},r)}}}),xe=q({name:"QPageContainer",setup(e,{slots:d}){const{proxy:{$q:n}}=k(),o=U(O,P);if(o===P)return console.error("QPageContainer needs to be child of QLayout"),P;ne(se,!0);const t=f(()=>{const c={};return o.header.space===!0&&(c.paddingTop=`${o.header.size}px`),o.right.space===!0&&(c[`padding${n.lang.rtl===!0?"Left":"Right"}`]=`${o.right.size}px`),o.footer.space===!0&&(c.paddingBottom=`${o.footer.size}px`),o.left.space===!0&&(c[`padding${n.lang.rtl===!0?"Right":"Left"}`]=`${o.left.size}px`),c});return()=>g("div",{class:"q-page-container",style:t.value},I(d.default))}}),ze=q({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:d,emit:n}){const{proxy:{$q:o}}=k(),t=U(O,P);if(t===P)return console.error("QFooter needs to be child of QLayout"),P;const c=z(parseInt(e.heightHint,10)),s=z(!0),m=z(K.value===!0||t.isContainer.value===!0?0:window.innerHeight),l=f(()=>e.reveal===!0||t.view.value.indexOf("F")>-1||o.platform.is.ios&&t.isContainer.value===!0),a=f(()=>t.isContainer.value===!0?t.containerHeight.value:m.value),p=f(()=>{if(e.modelValue!==!0)return 0;if(l.value===!0)return s.value===!0?c.value:0;const i=t.scroll.value.position+a.value+c.value-t.height.value;return i>0?i:0}),y=f(()=>e.modelValue!==!0||l.value===!0&&s.value!==!0),S=f(()=>e.modelValue===!0&&y.value===!0&&e.reveal===!0),v=f(()=>"q-footer q-layout__section--marginal "+(l.value===!0?"fixed":"absolute")+"-bottom"+(e.bordered===!0?" q-footer--bordered":"")+(y.value===!0?" q-footer--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus"+(l.value!==!0?" hidden":""):"")),x=f(()=>{const i=t.rows.value.bottom,h={};return i[0]==="l"&&t.left.space===!0&&(h[o.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),i[2]==="r"&&t.right.space===!0&&(h[o.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),h});function w(i,h){t.update("footer",i,h)}function T(i,h){i.value!==h&&(i.value=h)}function R({height:i}){T(c,i),w("size",i)}function r(){if(e.reveal!==!0)return;const{direction:i,position:h,inflectionPoint:V}=t.scroll.value;T(s,i==="up"||h-V<100||t.height.value-a.value-h-c.value<300)}function _(i){S.value===!0&&T(s,!0),n("focusin",i)}b(()=>e.modelValue,i=>{w("space",i),T(s,!0),t.animate()}),b(p,i=>{w("offset",i)}),b(()=>e.reveal,i=>{i===!1&&T(s,e.modelValue)}),b(s,i=>{t.animate(),n("reveal",i)}),b([c,t.scroll,t.height],r),b(()=>o.screen.height,i=>{t.isContainer.value!==!0&&T(m,i)});const u={};return t.instances.footer=u,e.modelValue===!0&&w("size",c.value),w("space",e.modelValue),w("offset",p.value),E(()=>{t.instances.footer===u&&(t.instances.footer=void 0,w("size",0),w("offset",0),w("space",!1))}),()=>{const i=ie(d.default,[g(F,{debounce:0,onResize:R})]);return e.elevated===!0&&i.push(g("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),g("footer",{class:v.value,style:x.value,onFocusin:_},i)}}});const Le=[null,document,document.body,document.scrollingElement,document.documentElement];function Se(e,d){let n=ue(d);if(n===void 0){if(e==null)return window;n=e.closest(".scroll,.scroll-y,.overflow-auto")}return Le.includes(n)?window:n}function Te(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function Pe(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let Q;function j(){if(Q!==void 0)return Q;const e=document.createElement("p"),d=document.createElement("div");G(e,{width:"100%",height:"200px"}),G(d,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),d.appendChild(e),document.body.appendChild(d);const n=e.offsetWidth;d.style.overflow="scroll";let o=e.offsetWidth;return n===o&&(o=d.clientWidth),d.remove(),Q=n-o,Q}const{passive:te}=D,Ce=["both","horizontal","vertical"];var $e=q({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Ce.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:d}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,t,c;b(()=>e.scrollTarget,()=>{l(),m()});function s(){o!==null&&o();const y=Math.max(0,Te(t)),S=Pe(t),v={top:y-n.position.top,left:S-n.position.left};if(e.axis==="vertical"&&v.top===0||e.axis==="horizontal"&&v.left===0)return;const x=Math.abs(v.top)>=Math.abs(v.left)?v.top<0?"up":"down":v.left<0?"left":"right";n.position={top:y,left:S},n.directionChanged=n.direction!==x,n.delta=v,n.directionChanged===!0&&(n.direction=x,n.inflectionPoint=n.position),d("scroll",{...n})}function m(){t=Se(c,e.scrollTarget),t.addEventListener("scroll",a,te),a(!0)}function l(){t!==void 0&&(t.removeEventListener("scroll",a,te),t=void 0)}function a(y){if(y===!0||e.debounce===0||e.debounce==="0")s();else if(o===null){const[S,v]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];o=()=>{v(S),o=null}}}const{proxy:p}=k();return b(()=>p.$q.lang.rtl,s),B(()=>{c=p.$el.parentNode,m()}),E(()=>{o!==null&&o(),l()}),Object.assign(p,{trigger:a,getPosition:()=>n}),oe}}),qe=q({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:d,emit:n}){const{proxy:{$q:o}}=k(),t=z(null),c=z(o.screen.height),s=z(e.container===!0?0:o.screen.width),m=z({position:0,direction:"down",inflectionPoint:0}),l=z(0),a=z(K.value===!0?0:j()),p=f(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),y=f(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),S=f(()=>a.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${a.value}px`}:null),v=f(()=>a.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${a.value}px`,width:`calc(100% + ${a.value}px)`}:null);function x(u){if(e.container===!0||document.qScrollPrevented!==!0){const i={position:u.position.top,direction:u.direction,directionChanged:u.directionChanged,inflectionPoint:u.inflectionPoint.top,delta:u.delta.top};m.value=i,e.onScroll!==void 0&&n("scroll",i)}}function w(u){const{height:i,width:h}=u;let V=!1;c.value!==i&&(V=!0,c.value=i,e.onScrollHeight!==void 0&&n("scrollHeight",i),R()),s.value!==h&&(V=!0,s.value=h),V===!0&&e.onResize!==void 0&&n("resize",u)}function T({height:u}){l.value!==u&&(l.value=u,R())}function R(){if(e.container===!0){const u=c.value>l.value?j():0;a.value!==u&&(a.value=u)}}let r=null;const _={instances:{},view:f(()=>e.view),isContainer:f(()=>e.container),rootRef:t,height:c,containerHeight:l,scrollbarWidth:a,totalWidth:f(()=>s.value+a.value),rows:f(()=>{const u=e.view.toLowerCase().split(" ");return{top:u[0].split(""),middle:u[1].split(""),bottom:u[2].split("")}}),header:H({size:0,offset:0,space:!1}),right:H({size:300,offset:0,space:!1}),footer:H({size:0,offset:0,space:!1}),left:H({size:300,offset:0,space:!1}),scroll:m,animate(){r!==null?clearTimeout(r):document.body.classList.add("q-body--layout-animate"),r=setTimeout(()=>{r=null,document.body.classList.remove("q-body--layout-animate")},155)},update(u,i,h){_[u][i]=h}};if(ne(O,_),j()>0){let h=function(){u=null,i.classList.remove("hide-scrollbar")},V=function(){if(u===null){if(i.scrollHeight>o.screen.height)return;i.classList.add("hide-scrollbar")}else clearTimeout(u);u=setTimeout(h,300)},N=function(Y){u!==null&&Y==="remove"&&(clearTimeout(u),h()),window[`${Y}EventListener`]("resize",V)},u=null;const i=document.body;b(()=>e.container!==!0?"add":"remove",N),e.container!==!0&&N("add"),ce(()=>{N("remove")})}return()=>{const u=ie(d.default,[g($e,{onScroll:x}),g(F,{onResize:w})]),i=g("div",{class:p.value,style:y.value,ref:e.container===!0?void 0:t,tabindex:-1},u);return e.container===!0?g("div",{class:"q-layout-container overflow-hidden",ref:t},[g(F,{onResize:T}),g("div",{class:"absolute-full",style:S.value},[g("div",{class:"scroll",style:v.value},[i])])]):i}}}),le="/assets/main_logo.bf821892.svg",Re="/assets/PIMS Logo White.099cb929.png";const Ve=fe({name:"MainLayout",data(){return{menu_items:[{name:"Home",target:"/"},{name:"FAQ",target:"/faq"},{name:"About",target:"/about"}]}},caculated:{copyright(){return"\xA9 "+new Date().getFullYear()+" All Right Reserved Evernet Properties Limited"}},methods:{notifyAccept(){M.set("cookiesAccepted","true",{secure:!window.location.href.includes("localhost"),expires:180})},navigateToDataAndPrivacy(){this.$router.push("/privacy")},hasAcceptedCookie(){if(!M.has("cookiesAccepted"))return!1;var e=M.get("cookiesAccepted");return typeof e=="undefined"?!1:e==="true"},cookiePopup(){var e=this;this.hasAcceptedCookie()||ve.create({color:"bg-grey-2",message:'By clicking \u201CAccept\u201D, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. Some of these may be "third party cookies".',timeout:0,actions:[{label:"View Privacy Policy",color:"primary",handler:e.navigateToDataAndPrivacy},{label:"Accept",color:"white",handler:e.notifyAccept}]})}},mounted(){this.cookiePopup()}}),ke={class:"row no-wrap justify-start items-center content-start"},Ee=L("img",{class:"main-logo",alt:"Evernet properties logo",src:le},null,-1),He={class:"column no-wrap justify-start items-center content-start"},Qe=L("div",null," We find properties ",-1),Ae={class:"sub-toolbar bg-grey-5 fit row no-wrap justify-center items-center content-start"},Be=L("div",{class:"bottom-sub-toolbar bg-grey-5 fit column wrap justify-center items-center content-center text-white"},[L("img",{alt:"PIMS Logo",src:Re,class:"pims-logo"}),A("Membership number 34541 (Robert Metcalf) "),L("img",{class:"bottom-logo",alt:"Evernet properties logo",src:le}),L("div",null,"Evernet Properties Limited | Company Number: 15345182 | Company registered office : 86-90, Paul Street, London EC2A 4NE")],-1),Fe={class:"footer row"},Oe={class:"left_footer col-grow"},Ne=L("div",{class:"right_footer"},"\xA9 2023 All Right Reserved",-1);function Me(e,d,n,o,t,c){const s=J("router-link"),m=J("router-view");return W(),he(qe,{view:"lHh Lpr lFf"},{default:C(()=>[$(_e,{elevated:"",class:"bg-grey-7 text-white"},{default:C(()=>[$(be,{class:"main-toolbar column no-wrap justify-start items-center content-start"},{default:C(()=>[L("div",ke,[Ee,L("div",He,[$(ye,null,{default:C(()=>[A(" Evernet Properties Limited ")]),_:1}),Qe])])]),_:1}),L("div",Ae,[(W(!0),Z(ge,null,me(e.menu_items,l=>(W(),Z("div",{key:l.name},[$(s,{to:l.target,class:"toolbar"},{default:C(()=>[A(pe(l.name),1)]),_:2},1032,["to"])]))),128))])]),_:1}),$(xe,null,{default:C(()=>[$(m),Be]),_:1}),$(ze,{elevated:"",class:"bg-grey-7 text-white"},{default:C(()=>[L("div",Fe,[L("div",Oe,[$(s,{to:"/privacy",class:"toolbar"},{default:C(()=>[A("Privacy Policy")]),_:1})]),Ne])]),_:1})]),_:1})}var je=de(Ve,[["render",Me]]);export{je as default};
