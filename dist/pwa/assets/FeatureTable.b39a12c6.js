import{d as c,_ as p,o as e,K as t,L as l,M as i,c as r,a7 as o,ar as n,f as _,t as u}from"./index.359aadd0.js";const d=c({name:"FeatureTable",props:["features"],data(){return{}}}),m={class:"featuretable"};function y(s,v,x,k,f,g){return e(),t("div",m,[(e(!0),t(l,null,i(s.features,a=>(e(),t("div",{key:a},[a.type==="positive"?(e(),r(o,{key:0,name:"check_box",color:"green",size:"32px"})):n("",!0),a.type==="negative"?(e(),r(o,{key:1,name:"cancel",color:"red",size:"32px"})):n("",!0),a.type==="neutral"?(e(),r(o,{key:2,name:"remove",color:"orange",size:"32px"})):n("",!0),_(" "+u(a.text),1)]))),128))])}var F=p(d,[["render",y]]);export{F};