import{b as t,a as n,Q as r}from"./QItemLabel.e79be406.js";import{_ as c,d as s,o as l,c as d,w as e,a as o,f as i,ae as _,e as u}from"./index.69bb5fcd.js";import{Q as f}from"./QPage.029b8c8a.js";import{u as m}from"./backend_connection.2c0c0225.js";import"./axios.6e1fcf85.js";const p=s({name:"DebugPage",setup(){return{backend_connection_store:m()}},data(){return{}},methods:{forcereload(){this.backend_connection_store.logout(),window.location.reload(!0)}}}),b=u("div",{class:"heading"},"Debug",-1);function g(a,k,h,x,Q,v){return l(),d(f,{class:"flex flex-center column main-page"},{default:e(()=>[b,o(r,null,{default:e(()=>[o(t,null,{default:e(()=>[o(n,null,{default:e(()=>[i("Make browser clear all caches for this app")]),_:1}),o(_,{color:"primary",label:"Force Reload",onClick:a.forcereload},null,8,["onClick"])]),_:1})]),_:1})]),_:1})}var $=c(p,[["render",g]]);export{$ as default};
