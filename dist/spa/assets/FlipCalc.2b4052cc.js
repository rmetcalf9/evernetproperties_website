import{Q as R}from"./QPage.216927ad.js";import{d as v,_ as $,o as a,c as k,w as b,a as o,e as r,X as S,Y as C,$ as w,Z as F,r as h,g as u,h as G,F as I,f as O,af as c,t as d}from"./index.887f0315.js";import{F as x,I as B,u as j,G as N,P as Q,R as q,S as z,O as U,e as W}from"./FeatureTable.81a678ac.js";import"./QExpansionItem.ffc5c70e.js";const L=v({name:"FlipCalcVision",data(){return{devplan:""}},methods:{helpdevplan(){this.$q.dialog({title:"What is the plan for this flip?",message:"This is the way we will increase the value between buying and selling."}).onOk(()=>{})}}}),A=r("div",{class:"text-h6"},"Flip Vision",-1),E={class:"row"};function X(t,s,n,i,l,p){return a(),k(F,{inline:"",class:"q-ma-sm card-style"},{default:b(()=>[o(w,null,{default:b(()=>[A,r("div",E,[o(S,{modelValue:t.devplan,"onUpdate:modelValue":s[0]||(s[0]=_=>t.devplan=_),label:"What is the way to increase GDV in this flip?",class:"col-grow"},null,8,["modelValue"]),o(C,{round:"",color:"primary",icon:"info",onClick:t.helpdevplan},null,8,["onClick"])])]),_:1})]),_:1})}var Y=$(L,[["render",X]]);function Z(t){return t.filter(function(s){return s.type==="ledger"})}function H(t,s,n,i){t.push({type:"headtext",key:t.length,name:s,worst:n,best:i})}function y(t,s,n,i){t.push({type:"total",key:t.length,name:s,worst:n,best:i}),t.push({type:"blank",key:t.length})}function f(t,s,n,i){let l=Z(t);l.length>0&&(l[l.length-1].worst,l[l.length-1].best),t.push({type:"ledger",key:t.length,name:s,worst:n,best:i})}const J=v({name:"FlipCalcDealRating",props:["is_valid_input","purchaserange","finance_in_items_without_cash","purchase_items","stampduty_items","othercosts_items","refurb_cost_items","gdv_total","refurbmonths","finance_out_items","finance_during_items"],components:{FeatureTable:x,InvalidMessage:B},data(){return{}},methods:{format_currency(t){return typeof t=="string"&&t===""?"":j.format_currency(t)},helpcorporation(){this.$q.dialog({title:"Corporation Tax",message:'Corporation tax will depend on if buying in a company or as an individual. It also depends on the total profit of the company (See <a href="https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax" target="_new">this website</a>). For this calculation we assume 19%.',html:!0}).onOk(()=>{})}},computed:{finance_costs(){var t={worst:0,best:0};function s(n,i){n.worst+=i.worst,n.best+=i.best}return typeof this.finance_in_items_without_cash!="undefined"&&this.finance_in_items_without_cash.map(function(n){s(t,n)}),typeof this.finance_during_items!="undefined"&&this.finance_during_items.map(function(n){s(t,n)}),typeof this.finance_out_items!="undefined"&&this.finance_out_items.map(function(n){s(t,n)}),{worst:t.worst,best:t.best}},itemized_summary(){var t=[],s={worst:0,best:0};function n(e,g){e.worst+=g.worst,e.best+=g.best}typeof this.purchase_items!="undefined"&&this.purchase_items.map(function(e){f(t,e.name,-e.worst,-e.best),n(s,e)}),typeof this.stampduty_items!="undefined"&&this.stampduty_items.map(function(e){f(t,e.name,-e.worst,-e.best),n(s,e)}),typeof this.othercosts_items!="undefined"&&this.othercosts_items.map(function(e){f(t,e.name,-e.worst,-e.best),n(s,e)}),typeof this.refurb_cost_items!="undefined"&&this.refurb_cost_items.map(function(e){f(t,e.name,-e.worst,-e.best),n(s,e)}),f(t,"Finance Costs",-this.finance_costs.worst,-this.finance_costs.best),n(s,this.finance_costs),y(t,"Total Money In",-s.worst,-s.best),f(t,"GDV",this.gdv_total.min,this.gdv_total.max);var i={worst:this.gdv_total.min*.01,best:this.gdv_total.max*.01};f(t,"Sale Costs (1%)",i.worst,i.best);var l={worst:this.gdv_total.min-(-s.worst+i.worst),best:this.gdv_total.max-(-s.best+i.best)};y(t,"Gross Profit",l.worst,l.best);var p={worst:l.worst*.19,best:l.best*.19};f(t,"Corporation Tax",p.worst,p.best);var _={worst:l.worst-p.worst,best:l.best-p.best};y(t,"Net Profit",_.worst,_.best);var m={worst:_.worst*100/-s.worst,best:_.best*100/-s.best};return H(t,"Percentage",m.worst.toFixed(2)+"%",m.best.toFixed(2)+"%"),{items:t,percentage:m}},features(){var t=[],s=Math.min(this.itemized_summary.percentage.best,this.itemized_summary.percentage.worst);return s<20?t.push({type:"negative",text:"Less than 20% uplift. To justify the work in doing the flip we need the deal to make at least 20%"}):s<23?t.push({type:"neutral",text:"Between 20% and 23% uplift. This is borderline. To justify the work and account for risk we would prefer at least 23%"}):t.push({type:"positive",text:"Above 23% uplift. This project has enough uplift to justify the effort and risk."}),t}}}),K=r("div",{class:"text-h6"},"Flip Deal Rating",-1),tt=r("div",{class:"text-subtitle2"},"This section gives a break down of money in and out of the deal. It is broken down twice, for best and worst case figures.",-1),et={class:"sumtable"},st=r("thead",null,[r("tr",null,[r("th",{class:"text-left sumtablecell"}),r("th",{class:"text-center sumtablecell worstcasetablecell"},"Worst case"),r("th",{class:"text-center sumtablecell"},"Best case")])],-1),nt={key:0,class:"text-left sumtablecell"},at={key:1,class:"text-left sumtablecell worstcasetablecell"},rt={key:2,class:"text-left sumtablecell"},it={key:3,colspan:"3",class:"text-left sumtablecell sumtabletitlecell"},ot={key:4,class:"text-left sumtablecell"},lt={key:5,class:"text-right sumtablecell worstcasetablecell"},ut={key:6,class:"text-right sumtablecell"},ct={key:7,class:"text-left sumtablecell"},_t={key:8,class:"text-right sumtablecell worstcasetablecell"},dt={key:9,class:"text-right sumtablecell"},ht={key:10,class:"text-left sumtablecell"},ft={key:11,class:"text-right sumtablecell worstcasetablecell"},pt={key:12,class:"text-right sumtablecell"},mt=r("div",{class:"text-h6"},"Flip Project Features",-1);function bt(t,s,n,i,l,p){const _=h("InvalidMessage"),m=h("FeatureTable");return a(),k(F,{inline:"",class:"q-ma-sm card-style maincard col-grow"},{default:b(()=>[o(w,null,{default:b(()=>[K,tt]),_:1}),o(w,null,{default:b(()=>[r("div",null,[o(_,{is_valid_input:t.is_valid_input},null,8,["is_valid_input"]),r("table",et,[st,r("tbody",null,[(a(!0),u(I,null,G(t.itemized_summary.items,e=>(a(),u("tr",{key:e.id},[e.type=="blank"?(a(),u("td",nt,"\xA0")):c("",!0),e.type=="blank"?(a(),u("td",at,"\xA0")):c("",!0),e.type=="blank"?(a(),u("td",rt,"\xA0")):c("",!0),e.type=="title"?(a(),u("td",it,d(e.name),1)):c("",!0),e.type=="ledger"?(a(),u("td",ot,d(e.name),1)):c("",!0),e.type=="ledger"?(a(),u("td",lt,d(t.format_currency(e.worst)),1)):c("",!0),e.type=="ledger"?(a(),u("td",ut,d(t.format_currency(e.best)),1)):c("",!0),e.type=="total"?(a(),u("th",ct,d(e.name),1)):c("",!0),e.type=="total"?(a(),u("th",_t,d(t.format_currency(e.worst)),1)):c("",!0),e.type=="total"?(a(),u("th",dt,d(t.format_currency(e.best)),1)):c("",!0),e.type=="headtext"?(a(),u("th",ht,d(e.name),1)):c("",!0),e.type=="headtext"?(a(),u("th",ft,d(e.worst),1)):c("",!0),e.type=="headtext"?(a(),u("th",pt,d(e.best),1)):c("",!0)]))),128))])]),r("div",null,[O("Note: Corporation tax is assumed at 19%"),o(C,{round:"",dense:"",flat:"",icon:"info",onClick:t.helpcorporation},null,8,["onClick"])]),mt,o(m,{features:t.features,"onUpdate:features":s[0]||(s[0]=e=>t.features=e)},null,8,["features"])])]),_:1})]),_:1})}var gt=$(J,[["render",bt]]);const yt=v({name:"CalcFlip",components:{GdvCard:N,PurchasePrice:Q,RefurbCost:q,StampDuty:z,OtherCosts:U,Finance:W,Vision:Y,DealRating:gt},data(){return{isMounted:!1,purchaserange:{min:18e4,max:19e4}}},computed:{is_valid_input(){return this.isMounted?!(!this.$refs.PurchasePrice.isValid||!this.$refs.GdvCard.isValid):!0},finance_totalmoneyneeded(){return this.isMounted?this.$refs.Finance.totalmoneyneeded:{best:0,worst:0}},finance_in_items_without_cash(){return this.isMounted?this.$refs.Finance.finance_in_items_without_cash:[]},finance_in_items(){return this.isMounted?this.$refs.Finance.finance_in_items:[]},finance_during_items(){return this.isMounted?this.$refs.Finance.finance_during_items:[]},finance_out_items(){return this.isMounted?this.$refs.Finance.finance_out_items:[]},refinance_out_items(){return this.isMounted?this.$refs.Refinance.refinance_out_items:[]},purchase_items(){return this.isMounted?this.$refs.PurchasePrice.purchase_items:[]},stampduty_items(){return this.isMounted?this.$refs.StampDuty.stampduty_items:[]},othercosts_items(){return this.isMounted?this.$refs.OtherCosts.othercosts_items:[]},refurb_cost_items(){return this.isMounted?this.$refs.RefurbCost.refurb_cost_items:[]},refurb_cost_total(){return this.isMounted?this.$refs.RefurbCost.refurb_cost_total:[]},refurbmonths(){return this.isMounted?this.$refs.RefurbCost.refurbmonths:[]},stampduty_total(){return this.isMounted?this.$refs.StampDuty.stampduty:[]},othercosts_total(){return this.isMounted?this.$refs.OtherCosts.total:[]},gdv_total(){return this.isMounted?this.$refs.GdvCard.total:[]}},mounted(){const t=this;setTimeout(function(){t.isMounted=!0},5)}}),wt={class:"main-page fit col wrap justify-center items-center content-center"},vt=r("h1",null,"Flip Calculator",-1),$t=r("div",null,"This calculator can work out the costs associated with doing a property flip. It\u2019s helpful to make sure you have remembered everything!",-1),kt={class:"row"};function Ct(t,s,n,i,l,p){const _=h("Vision"),m=h("GdvCard"),e=h("PurchasePrice"),g=h("RefurbCost"),M=h("StampDuty"),P=h("OtherCosts"),T=h("Finance"),V=h("DealRating");return a(),k(R,{class:"flex flex-center"},{default:b(()=>[r("div",wt,[vt,$t,r("div",kt,[o(_,{ref:"Vision"},null,512),o(m,{ref:"GdvCard"},null,512),o(e,{ref:"PurchasePrice",purchaserange:t.purchaserange,"onUpdate:purchaserange":s[0]||(s[0]=D=>t.purchaserange=D)},null,8,["purchaserange"]),o(g,{ref:"RefurbCost"},null,512),o(M,{ref:"StampDuty",purchaserange:t.purchaserange},null,8,["purchaserange"]),o(P,{ref:"OtherCosts",purchaserange:t.purchaserange},null,8,["purchaserange"]),o(T,{ref:"Finance",purchaserange:t.purchaserange,refurb_cost_total:t.refurb_cost_total,stampduty_total:t.stampduty_total,othercosts_total:t.othercosts_total,refurbmonths:t.refurbmonths,gdv_total:t.gdv_total},null,8,["purchaserange","refurb_cost_total","stampduty_total","othercosts_total","refurbmonths","gdv_total"]),o(V,{ref:"DealRating",purchaserange:t.purchaserange,finance_in_items_without_cash:t.finance_in_items_without_cash,finance_out_items:t.finance_out_items,finance_during_items:t.finance_during_items,purchase_items:t.purchase_items,stampduty_items:t.stampduty_items,othercosts_items:t.othercosts_items,refurb_cost_items:t.refurb_cost_items,gdv_total:t.gdv_total,refurbmonths:t.refurbmonths,is_valid_input:t.is_valid_input},null,8,["purchaserange","finance_in_items_without_cash","finance_out_items","finance_during_items","purchase_items","stampduty_items","othercosts_items","refurb_cost_items","gdv_total","refurbmonths","is_valid_input"])])])]),_:1})}var Vt=$(yt,[["render",Ct]]);export{Vt as default};
