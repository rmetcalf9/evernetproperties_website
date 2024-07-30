import{H as u,Q as p,a as _,b as f,c as m,_ as g}from"./HeadToolbars.c9d32eba.js";import{Q as h,_ as y}from"./PIMS Logo White.034cc999.js";import{_ as v,d as b,P as r,N as k,r as n,o as w,c as P,w as a,a as o,e,f as s,t as i}from"./index.19b6d715.js";import{u as A}from"./backend_connection.ec11e855.js";import"./QResizeObserver.35a694ca.js";import"./QToolbar.1788373e.js";import"./position-engine.ac007560.js";import"./axios.6e1fcf85.js";const C=b({name:"MainLayout",components:{HeadToolbars:u},setup(){return{backend_connection_store:A()}},data(){return{}},computed:{copyright(){return"\xA9 "+new Date().getFullYear()+" All Right Reserved"},connectionState(){return this.backend_connection_store.connectionStateString}},methods:{notifyAccept(){r.set("cookiesAccepted","true",{secure:!window.location.href.includes("localhost"),expires:180})},navigateToDataAndPrivacy(){this.$router.push("/privacy")},hasAcceptedCookie(){if(!r.has("cookiesAccepted"))return!1;var t=r.get("cookiesAccepted");return typeof t=="undefined"?!1:t==="true"},cookiePopup(){var t=this;this.hasAcceptedCookie()||k.create({color:"bg-grey-2",message:'By clicking \u201CAccept\u201D, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. Some of these may be "third party cookies".',timeout:0,actions:[{label:"View Privacy Policy",color:"primary",handler:t.navigateToDataAndPrivacy},{label:"Accept",color:"white",handler:t.notifyAccept}]})}},mounted(){this.backend_connection_store.connect(),this.cookiePopup()}}),T={class:"child_page_class"},S=e("div",{class:"bottom-sub-toolbar bg-grey-5 fit column wrap justify-center items-center content-center text-white"},[e("img",{alt:"PIMS Logo",src:y,class:"pims-logo"}),s("Membership number 34541 (Robert Metcalf) "),e("img",{class:"bottom-logo",alt:"Evernet properties logo",src:g}),e("div",null,"Evernet Properties Limited | Company Number: 15345182 | Company registered office : 86-90, Paul Street, London EC2A 4NE")],-1),x={class:"footer row"},L={class:"left_footer col-grow"},N={class:"right_footer"};function Q(t,H,M,B,D,$){const c=n("HeadToolbars"),l=n("router-view"),d=n("router-link");return w(),P(p,{view:"lHh Lpr lFf"},{default:a(()=>[o(_,{elevated:"",class:"bg-grey-7 text-white"},{default:a(()=>[o(c)]),_:1}),o(f,null,{default:a(()=>[e("div",T,[o(l)]),S]),_:1}),o(m,{elevated:"",class:"bg-grey-7 text-white"},{default:a(()=>[e("div",x,[e("div",L,[o(d,{to:"/privacy",class:"toolbar"},{default:a(()=>[s("Privacy Policy")]),_:1})]),e("div",N,[s(i(t.copyright)+" ",1),o(h,null,{default:a(()=>[e("table",null,[e("tr",null,[e("td",null,"Connection: "+i(t.connectionState),1)])])]),_:1})])])]),_:1})]),_:1})}var q=v(C,[["render",Q]]);export{q as default};
