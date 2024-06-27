import{_ as r,v as n,x as d,y as _,z as p,A as s,C as o,B as t,D as u,ag as i,ae as a,af as l}from"./index.cd103895.js";import{Q as h}from"./QPage.1ea0f190.js";import{L as m}from"./LoginButton.0f47977c.js";import"./backend_connection.ad147349.js";import"./axios.6e1fcf85.js";var f="/assets/tool_simpleroi_calc.19fe75f0.png",v="/assets/tool_brr_calc.71c4dc49.png",g="/assets/tool_flip_calc.30196ab9.png";const y=n({name:"ToolsPage",components:{LoginButton:m},data(){return{}},methods:{click_simproi_card(){this.$router.push("/tools/simpleroicalc")},click_brrr_card(){this.$router.push("/tools/brrcalc")},click_flip_card(){this.$router.push("/tools/flipcalc")}}}),k=o("h3",{style:{margin:"0px"}},"Tools",-1),x={class:"row"},C=o("div",{class:"text-h6"},"Simple ROI Caculator",-1),w={class:"row"},B=o("div",null,[o("img",{alt:"Item Picture",src:f,class:"tool-picture"})],-1),R={class:"col q-ma-sm"},b=o("div",{style:{height:"150px"}},"This caculator is a quick and simple way of finding the ROI on a property. It doesn't take into account refurbishment.",-1),I={align:"right"},q=o("div",{class:"text-h6"},"Buy Refurbish Rent Refinance Calculator",-1),T={class:"row"},$=o("div",null,[o("img",{alt:"Item Picture",src:v,class:"tool-picture"})],-1),P={class:"col q-ma-sm"},Q=o("div",{style:{height:"150px"}},"This calculator lets you input data from a property you are considering using the BRRR strategy with and will calculate the expected profit, ROI. It also allows you to experiment with different finance options.",-1),L={align:"right"},N=o("div",{class:"text-h6"},"Flip Calculator",-1),O={class:"row"},V=o("div",null,[o("img",{alt:"Item Picture",src:g,class:"tool-picture"})],-1),S={class:"col q-ma-sm"},U=o("div",{style:{height:"150px"}},"Use this calculator if you are working on a flip deal; where you buy a property, push the value up then sell it for a profit.",-1),z={align:"right"};function A(e,D,F,j,E,G){const c=d("LoginButton");return _(),p(h,{class:"flex flex-center"},{default:s(()=>[o("div",null,[t(c),k,u(" Useful tools and calculators for property tasks. "),o("div",x,[t(l,{inline:"",class:"q-ma-sm card-style tool-card",onClick:e.click_simproi_card},{default:s(()=>[t(i,null,{default:s(()=>[C,o("div",w,[B,o("div",R,[b,o("div",I,[t(a,{round:"",color:"primary",icon:"info"})])])])]),_:1})]),_:1},8,["onClick"]),t(l,{inline:"",class:"q-ma-sm card-style tool-card",onClick:e.click_brrr_card},{default:s(()=>[t(i,null,{default:s(()=>[q,o("div",T,[$,o("div",P,[Q,o("div",L,[t(a,{round:"",color:"primary",icon:"info"})])])])]),_:1})]),_:1},8,["onClick"]),t(l,{inline:"",class:"q-ma-sm card-style tool-card",onClick:e.click_flip_card},{default:s(()=>[t(i,null,{default:s(()=>[N,o("div",O,[V,o("div",S,[U,o("div",z,[t(a,{round:"",color:"primary",icon:"info"})])])])]),_:1})]),_:1},8,["onClick"])])])]),_:1})}var X=r(y,[["render",A]]);export{X as default};
