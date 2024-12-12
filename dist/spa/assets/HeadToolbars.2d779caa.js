import{Q as j}from"./QResizeObserver.7fbbec73.js";import{g as R,i as K,h as q,l as M,j as k,k as d,m as _,n as G,p as ie,q as m,u as D,v as te,x as le,y as se,z as ne,A as oe,B as ue,C as ce,D as de,E as fe,F as ve,G as he,H as A,I as O,J as ge,d as J,P,_ as X,o as Q,K as V,e as w,f as T,t as F,a as S,w as E,Q as N,L as re,r as U,M as me,O as _e}from"./index.d6cdd244.js";import{Q as be,a as pe}from"./QToolbar.46aed6fe.js";import{u as ae}from"./backend_connection.7bf05146.js";import{e as L}from"./events.2b65e2cf.js";var Ae=R({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:h,emit:i}){const{proxy:{$q:r}}=D(),t=K(M,q);if(t===q)return console.error("QHeader needs to be child of QLayout"),q;const l=k(parseInt(e.heightHint,10)),s=k(!0),g=d(()=>e.reveal===!0||t.view.value.indexOf("H")>-1||r.platform.is.ios&&t.isContainer.value===!0),v=d(()=>{if(e.modelValue!==!0)return 0;if(g.value===!0)return s.value===!0?l.value:0;const o=l.value-t.scroll.value.position;return o>0?o:0}),u=d(()=>e.modelValue!==!0||g.value===!0&&s.value!==!0),x=d(()=>e.modelValue===!0&&u.value===!0&&e.reveal===!0),$=d(()=>"q-header q-layout__section--marginal "+(g.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(u.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),C=d(()=>{const o=t.rows.value.top,p={};return o[0]==="l"&&t.left.space===!0&&(p[r.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),o[2]==="r"&&t.right.space===!0&&(p[r.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),p});function c(o,p){t.update("header",o,p)}function y(o,p){o.value!==p&&(o.value=p)}function b({height:o}){y(l,o),c("size",o)}function z(o){x.value===!0&&y(s,!0),i("focusin",o)}_(()=>e.modelValue,o=>{c("space",o),y(s,!0),t.animate()}),_(v,o=>{c("offset",o)}),_(()=>e.reveal,o=>{o===!1&&y(s,e.modelValue)}),_(s,o=>{t.animate(),i("reveal",o)}),_(t.scroll,o=>{e.reveal===!0&&y(s,o.direction==="up"||o.position<=e.revealOffset||o.position-o.inflectionPoint<100)});const B={};return t.instances.header=B,e.modelValue===!0&&c("size",l.value),c("space",e.modelValue),c("offset",v.value),G(()=>{t.instances.header===B&&(t.instances.header=void 0,c("size",0),c("offset",0),c("space",!1))}),()=>{const o=ie(h.default,[]);return e.elevated===!0&&o.push(m("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),o.push(m(j,{debounce:0,onResize:b})),m("header",{class:$.value,style:C.value,onFocusin:z},o)}}}),Ue=R({name:"QPageContainer",setup(e,{slots:h}){const{proxy:{$q:i}}=D(),r=K(M,q);if(r===q)return console.error("QPageContainer needs to be child of QLayout"),q;te(se,!0);const t=d(()=>{const l={};return r.header.space===!0&&(l.paddingTop=`${r.header.size}px`),r.right.space===!0&&(l[`padding${i.lang.rtl===!0?"Left":"Right"}`]=`${r.right.size}px`),r.footer.space===!0&&(l.paddingBottom=`${r.footer.size}px`),r.left.space===!0&&(l[`padding${i.lang.rtl===!0?"Right":"Left"}`]=`${r.left.size}px`),l});return()=>m("div",{class:"q-page-container",style:t.value},le(h.default))}}),Ie=R({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:h,emit:i}){const{proxy:{$q:r}}=D(),t=K(M,q);if(t===q)return console.error("QFooter needs to be child of QLayout"),q;const l=k(parseInt(e.heightHint,10)),s=k(!0),g=k(ne.value===!0||t.isContainer.value===!0?0:window.innerHeight),v=d(()=>e.reveal===!0||t.view.value.indexOf("F")>-1||r.platform.is.ios&&t.isContainer.value===!0),u=d(()=>t.isContainer.value===!0?t.containerHeight.value:g.value),x=d(()=>{if(e.modelValue!==!0)return 0;if(v.value===!0)return s.value===!0?l.value:0;const n=t.scroll.value.position+u.value+l.value-t.height.value;return n>0?n:0}),$=d(()=>e.modelValue!==!0||v.value===!0&&s.value!==!0),C=d(()=>e.modelValue===!0&&$.value===!0&&e.reveal===!0),c=d(()=>"q-footer q-layout__section--marginal "+(v.value===!0?"fixed":"absolute")+"-bottom"+(e.bordered===!0?" q-footer--bordered":"")+($.value===!0?" q-footer--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus"+(v.value!==!0?" hidden":""):"")),y=d(()=>{const n=t.rows.value.bottom,f={};return n[0]==="l"&&t.left.space===!0&&(f[r.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),n[2]==="r"&&t.right.space===!0&&(f[r.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),f});function b(n,f){t.update("footer",n,f)}function z(n,f){n.value!==f&&(n.value=f)}function B({height:n}){z(l,n),b("size",n)}function o(){if(e.reveal!==!0)return;const{direction:n,position:f,inflectionPoint:H}=t.scroll.value;z(s,n==="up"||f-H<100||t.height.value-u.value-f-l.value<300)}function p(n){C.value===!0&&z(s,!0),i("focusin",n)}_(()=>e.modelValue,n=>{b("space",n),z(s,!0),t.animate()}),_(x,n=>{b("offset",n)}),_(()=>e.reveal,n=>{n===!1&&z(s,e.modelValue)}),_(s,n=>{t.animate(),i("reveal",n)}),_([l,t.scroll,t.height],o),_(()=>r.screen.height,n=>{t.isContainer.value!==!0&&z(g,n)});const a={};return t.instances.footer=a,e.modelValue===!0&&b("size",l.value),b("space",e.modelValue),b("offset",x.value),G(()=>{t.instances.footer===a&&(t.instances.footer=void 0,b("size",0),b("offset",0),b("space",!1))}),()=>{const n=oe(h.default,[m(j,{debounce:0,onResize:B})]);return e.elevated===!0&&n.push(m("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),m("footer",{class:c.value,style:y.value,onFocusin:p},n)}}});const{passive:Z}=fe,ye=["both","horizontal","vertical"];var we=R({name:"QScrollObserver",props:{axis:{type:String,validator:e=>ye.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:h}){const i={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let r=null,t,l;_(()=>e.scrollTarget,()=>{v(),g()});function s(){r!==null&&r();const $=Math.max(0,ve(t)),C=he(t),c={top:$-i.position.top,left:C-i.position.left};if(e.axis==="vertical"&&c.top===0||e.axis==="horizontal"&&c.left===0)return;const y=Math.abs(c.top)>=Math.abs(c.left)?c.top<0?"up":"down":c.left<0?"left":"right";i.position={top:$,left:C},i.directionChanged=i.direction!==y,i.delta=c,i.directionChanged===!0&&(i.direction=y,i.inflectionPoint=i.position),h("scroll",{...i})}function g(){t=de(l,e.scrollTarget),t.addEventListener("scroll",u,Z),u(!0)}function v(){t!==void 0&&(t.removeEventListener("scroll",u,Z),t=void 0)}function u($){if($===!0||e.debounce===0||e.debounce==="0")s();else if(r===null){const[C,c]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];r=()=>{c(C),r=null}}}const{proxy:x}=D();return _(()=>x.$q.lang.rtl,s),ue(()=>{l=x.$el.parentNode,g()}),G(()=>{r!==null&&r(),v()}),Object.assign(x,{trigger:u,getPosition:()=>i}),ce}}),Ke=R({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:h,emit:i}){const{proxy:{$q:r}}=D(),t=k(null),l=k(r.screen.height),s=k(e.container===!0?0:r.screen.width),g=k({position:0,direction:"down",inflectionPoint:0}),v=k(0),u=k(ne.value===!0?0:A()),x=d(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),$=d(()=>e.container===!1?{minHeight:r.screen.height+"px"}:null),C=d(()=>u.value!==0?{[r.lang.rtl===!0?"left":"right"]:`${u.value}px`}:null),c=d(()=>u.value!==0?{[r.lang.rtl===!0?"right":"left"]:0,[r.lang.rtl===!0?"left":"right"]:`-${u.value}px`,width:`calc(100% + ${u.value}px)`}:null);function y(a){if(e.container===!0||document.qScrollPrevented!==!0){const n={position:a.position.top,direction:a.direction,directionChanged:a.directionChanged,inflectionPoint:a.inflectionPoint.top,delta:a.delta.top};g.value=n,e.onScroll!==void 0&&i("scroll",n)}}function b(a){const{height:n,width:f}=a;let H=!1;l.value!==n&&(H=!0,l.value=n,e.onScrollHeight!==void 0&&i("scrollHeight",n),B()),s.value!==f&&(H=!0,s.value=f),H===!0&&e.onResize!==void 0&&i("resize",a)}function z({height:a}){v.value!==a&&(v.value=a,B())}function B(){if(e.container===!0){const a=l.value>v.value?A():0;u.value!==a&&(u.value=a)}}let o=null;const p={instances:{},view:d(()=>e.view),isContainer:d(()=>e.container),rootRef:t,height:l,containerHeight:v,scrollbarWidth:u,totalWidth:d(()=>s.value+u.value),rows:d(()=>{const a=e.view.toLowerCase().split(" ");return{top:a[0].split(""),middle:a[1].split(""),bottom:a[2].split("")}}),header:O({size:0,offset:0,space:!1}),right:O({size:300,offset:0,space:!1}),footer:O({size:0,offset:0,space:!1}),left:O({size:300,offset:0,space:!1}),scroll:g,animate(){o!==null?clearTimeout(o):document.body.classList.add("q-body--layout-animate"),o=setTimeout(()=>{o=null,document.body.classList.remove("q-body--layout-animate")},155)},update(a,n,f){p[a][n]=f}};if(te(M,p),A()>0){let f=function(){a=null,n.classList.remove("hide-scrollbar")},H=function(){if(a===null){if(n.scrollHeight>r.screen.height)return;n.classList.add("hide-scrollbar")}else clearTimeout(a);a=setTimeout(f,300)},W=function(Y){a!==null&&Y==="remove"&&(clearTimeout(a),f()),window[`${Y}EventListener`]("resize",H)},a=null;const n=document.body;_(()=>e.container!==!0?"add":"remove",W),e.container!==!0&&W("add"),ge(()=>{W("remove")})}return()=>{const a=oe(h.default,[m(we,{onScroll:y}),m(j,{onResize:b})]),n=m("div",{class:x.value,style:$.value,ref:e.container===!0?void 0:t,tabindex:-1},a);return e.container===!0?m("div",{class:"q-layout-container overflow-hidden",ref:t},[m(j,{onResize:z}),m("div",{class:"absolute-full",style:C.value},[m("div",{class:"scroll",style:c.value},[n])])]):n}}});const I="preeventbanner_seen_event",$e=J({name:"PreEventBanner",setup(){return{backend_connection_store:ae()}},components:{},data(){return{shown_cookie_set:!1}},computed:{next_event(){return L.next_event},show_banner(){return!(this.$router.currentRoute.value.path=="/ppbevent"||!this.isLoggedin||L.get_stage(L.next_event)!=="before_event"||this.shown_cookie_set)},isLoggedin(){return this.backend_connection_store.isLoggedin}},methods:{close_banner(){this.shown_cookie_set=!0,P.set(I,L.next_event.date,{secure:!window.location.href.includes("localhost"),expires:180})}},mounted(){if(!!P.has(I)){var e=P.get(I);typeof e!="undefined"&&e===L.next_event.date&&(this.shown_cookie_set=!0)}}}),ke={key:0,class:"preeventbanner fit row no-wrap justify-left items-center content-start"},xe=w("div",{class:"col-grow"},null,-1);function Ce(e,h,i,r,t,l){return e.show_banner?(Q(),V("div",ke,[w("div",null,[T("\u{1F4F0} Upcoming Event "+F(e.next_event.title)+" - "+F(e.next_event.subtitle)+" - ",1),S(N,{onClick:h[0]||(h[0]=s=>e.$router.replace("/ppbevent")),flat:""},{default:E(()=>[T(" Click here for More details ")]),_:1})]),xe,w("div",null,[S(N,{icon:"close",flat:"",round:"",dense:"",onClick:e.close_banner},null,8,["onClick"])])])):re("",!0)}var ze=X($e,[["render",Ce]]);const ee="duringbanner_seen_event",Se=J({name:"DuringEventBanner",setup(){return{backend_connection_store:ae()}},components:{},data(){return{shown_cookie_set:!1}},computed:{next_event(){return L.next_event},show_banner(){return!(this.$router.currentRoute.value.path=="/ppbevent"||!this.isLoggedin||L.get_stage(L.next_event)!=="near_and_during_event"||this.shown_cookie_set)},isLoggedin(){return this.backend_connection_store.isLoggedin}},methods:{close_banner(){this.shown_cookie_set=!0}},mounted(){if(!!P.has(ee)){var e=P.get(ee);typeof e!="undefined"&&e===L.next_event.date&&(this.shown_cookie_set=!0)}}}),Le={key:0,class:"preeventbanner fit row no-wrap justify-left items-center content-start"},qe=w("div",{class:"col-grow"},null,-1);function Be(e,h,i,r,t,l){return e.show_banner?(Q(),V("div",Le,[w("div",null,[T("\u{1F4F0} Event coming up/in progress "+F(e.next_event.title)+" - "+F(e.next_event.subtitle)+" - ",1),S(N,{onClick:h[0]||(h[0]=s=>e.$router.replace("/ppbevent")),flat:""},{default:E(()=>[T(" Click here for More details ")]),_:1})]),qe,w("div",null,[S(N,{icon:"close",flat:"",round:"",dense:"",onClick:e.close_banner},null,8,["onClick"])])])):re("",!0)}var He=X(Se,[["render",Be]]),Te="/assets/main_logo.bf821892.svg";const Pe=J({name:"HeadToolbarLayoutComponent",components:{PreEventBanner:ze,DuringEventBanner:He},data(){return{menu_items:[{name:"Home",target:"/"},{name:"FAQ",target:"/faq"},{name:"Tools",target:"/tools"},{name:"Contact Us",target:"/contact"},{name:"About",target:"/about"}],toolbartitlelastclick:Date.now(),toolbartitleclickcount:0}},methods:{clicktoolbartitle(){var e=Date.now();if(e-this.toolbartitlelastclick>2e3){this.toolbartitlelastclick=e,this.toolbartitleclickcount=0;return}this.toolbartitleclickcount=this.toolbartitleclickcount+1,this.toolbartitlelastclick=e,this.toolbartitleclickcount>7&&(this.toolbartitleclickcount=0,this.$router.push("/debug"))}}}),Qe={class:"row no-wrap justify-start items-center content-start"},Ve=w("img",{class:"main-logo",alt:"Evernet properties logo",src:Te},null,-1),Ee={class:"column no-wrap justify-start items-center content-start"},Fe=w("div",null," We find properties ",-1),Re={class:"sub-toolbar bg-grey-5 fit row no-wrap justify-center items-center content-start"};function De(e,h,i,r,t,l){const s=U("router-link"),g=U("PreEventBanner"),v=U("DuringEventBanner");return Q(),V("div",null,[w("div",null,[S(pe,{class:"main-toolbar column no-wrap justify-start items-center content-start"},{default:E(()=>[w("div",Qe,[Ve,w("div",Ee,[S(be,{onClick:e.clicktoolbartitle},{default:E(()=>[T(" Evernet Properties Limited ")]),_:1},8,["onClick"]),Fe])])]),_:1}),w("div",Re,[(Q(!0),V(me,null,_e(e.menu_items,u=>(Q(),V("div",{key:u.name},[S(s,{to:u.target,class:"toolbar"},{default:E(()=>[T(F(u.name),1)]),_:2},1032,["to"])]))),128))]),S(g),S(v)])])}var Ge=X(Pe,[["render",De]]);export{Ge as H,Ke as Q,Te as _,Ae as a,Ue as b,Ie as c};
