import{_ as f,d as g,o as h,c as y,w as l,e as t,a,ah as s,f as i,ag as u,Q as d,aa as m,t as n,K as v,L as V}from"./index.d6cdd244.js";import{Q as k}from"./QPage.62e2f293.js";import{u as c}from"./utils.b53f77d9.js";const p=.06,M=g({name:"SimpleRoiCalc",components:{},data(){return{isMounted:!1,purchaseprice:1e5,extrapurchasecosts:0,monthlyrent:800,flatannualservicecharge:0,mortgageltv:75,mortgagerate:6}},methods:{format_currency(e){return c.format_currency(e)},format_percent(e){return c.format_percent(e)},helpextrapurchasecosts(){this.$q.dialog({title:"Extra Purchase Costs",message:"Use this for anything else you want to take into account of.",html:!0}).onOk(()=>{})},helpmortgageltv(){this.$q.dialog({title:"Loan To Value",message:"Note: To see what it is like buying without a mortgage - Enter 0% as LTV!",html:!0}).onOk(()=>{})},helpstampandfees(){this.$q.dialog({title:"Stamp duty and fees",message:"This is a quick estimate. Assuming "+c.format_percent(p),html:!0}).onOk(()=>{})}},computed:{totalmortgage(){return this.purchaseprice*this.mortgageltv/100},deposit(){return this.purchaseprice-this.totalmortgage},stampandfees(){return this.purchaseprice*p},totalmoneyin(){return this.deposit+this.stampandfees+this.extrapurchasecosts},monthlymortgage(){return this.totalmortgage*this.mortgagerate/(100*12)},management(){return this.monthlyrent*.1},maintenance(){return this.monthlyrent*.1},flatmonthlyservicecharge(){return this.flatannualservicecharge/12},totalmonthlycosts(){return this.monthlymortgage+this.management+this.maintenance+this.flatmonthlyservicecharge},monthlyprofit(){return this.monthlyrent-this.totalmonthlycosts},roi(){return this.monthlyprofit*12/this.totalmoneyin}},mounted(){const e=this;setTimeout(function(){e.isMounted=!0},5)}}),C={class:"main-page fit col wrap justify-center items-center content-center"},_=t("h1",null,"Simple ROI Calculator",-1),b=t("div",null,"This calculator is a quick and simple way of finding the ROI on a property on an intrest only mortgage. It doesn't take into account refurbishment nor does it do a detailed stamp duty calculation. It is useful as a quick check only.",-1),w={class:"row"},T=t("div",{class:"text-h6"},"Property figures",-1),q={class:"row"},R={class:"row"},S=t("div",{class:"text-h6"},"Purchase",-1),I={key:0},P=t("div",{class:"text-h6"},"Monthly",-1),Q=t("div",{class:"text-h6"},"Rating",-1),U={class:"text-h6"};function $(e,o,O,B,E,N){return h(),y(k,{class:"flex flex-center"},{default:l(()=>[t("div",C,[_,b,t("div",w,[a(m,{inline:"",class:"q-ma-sm card-style"},{default:l(()=>[a(s,null,{default:l(()=>[T]),_:1}),a(s,null,{default:l(()=>[i(" Purchase Price: "),a(u,{modelValue:e.purchaseprice,"onUpdate:modelValue":o[0]||(o[0]=r=>e.purchaseprice=r),modelModifiers:{number:!0},type:"number",step:5e3,filled:"",style:{"max-width":"110px"}},null,8,["modelValue"]),i(" Extra purchase costs: "),t("div",q,[a(u,{modelValue:e.extrapurchasecosts,"onUpdate:modelValue":o[1]||(o[1]=r=>e.extrapurchasecosts=r),modelModifiers:{number:!0},type:"number",step:1e3,filled:"",style:{"max-width":"110px"}},null,8,["modelValue"]),a(d,{round:"",dense:"",flat:"",icon:"info",onClick:e.helpextrapurchasecosts},null,8,["onClick"])]),i(" Monthly Rent: "),a(u,{modelValue:e.monthlyrent,"onUpdate:modelValue":o[2]||(o[2]=r=>e.monthlyrent=r),modelModifiers:{number:!0},type:"number",step:50,filled:"",style:{"max-width":"110px"}},null,8,["modelValue"]),i(" Flat annual service charge: "),a(u,{modelValue:e.flatannualservicecharge,"onUpdate:modelValue":o[3]||(o[3]=r=>e.flatannualservicecharge=r),modelModifiers:{number:!0},type:"number",step:50,filled:"",style:{"max-width":"110px"}},null,8,["modelValue"]),i(" Mortgage LTV: "),t("div",R,[a(u,{modelValue:e.mortgageltv,"onUpdate:modelValue":o[4]||(o[4]=r=>e.mortgageltv=r),modelModifiers:{number:!0},type:"number",step:5,filled:"",style:{"max-width":"110px"}},null,8,["modelValue"]),a(d,{round:"",dense:"",flat:"",icon:"info",onClick:e.helpmortgageltv},null,8,["onClick"])]),i(" Monthly Rate: "),a(u,{modelValue:e.mortgagerate,"onUpdate:modelValue":o[5]||(o[5]=r=>e.mortgagerate=r),modelModifiers:{number:!0},type:"number",step:.1,filled:"",style:{"max-width":"110px"}},null,8,["modelValue"])]),_:1})]),_:1}),a(m,{inline:"",class:"q-ma-sm card-style"},{default:l(()=>[a(s,null,{default:l(()=>[S]),_:1}),a(s,null,{default:l(()=>[t("div",null,"Total Mortgage: "+n(e.format_currency(e.totalmortgage)),1),e.extrapurchasecosts!=0?(h(),v("div",I,"Extra purchase costs: "+n(e.format_currency(e.extrapurchasecosts)),1)):V("",!0),t("div",null,"Deposit: "+n(e.format_currency(e.deposit)),1),t("div",null,[i("Stamp and fees: "+n(e.format_currency(e.stampandfees)),1),a(d,{round:"",dense:"",flat:"",icon:"info",onClick:e.helpstampandfees},null,8,["onClick"])]),t("div",null,[t("b",null,"Total Money In: "+n(e.format_currency(e.totalmoneyin)),1)])]),_:1})]),_:1}),a(m,{inline:"",class:"q-ma-sm card-style"},{default:l(()=>[a(s,null,{default:l(()=>[P]),_:1}),a(s,null,{default:l(()=>[t("div",null,"Mortgage: "+n(e.format_currency(e.monthlymortgage)),1),t("div",null,"Management: "+n(e.format_currency(e.management)),1),t("div",null,"Maintenance: "+n(e.format_currency(e.maintenance)),1),t("div",null,"Service Charge: "+n(e.format_currency(e.flatmonthlyservicecharge)),1),t("div",null,[t("b",null,"Total Monthly Costs: "+n(e.format_currency(e.totalmonthlycosts)),1)])]),_:1})]),_:1}),a(m,{inline:"",class:"q-ma-sm card-style"},{default:l(()=>[a(s,null,{default:l(()=>[Q]),_:1}),a(s,null,{default:l(()=>[t("div",null,"Money in: "+n(e.format_currency(e.totalmoneyin)),1),t("div",null,"Monthly Profit: "+n(e.format_currency(e.monthlyprofit)),1),t("div",U,"ROI: "+n(e.format_percent(e.roi)),1)]),_:1})]),_:1})])])]),_:1})}var A=f(M,[["render",$]]);export{A as default};
