import{_ as g,d as w,r as C,o as s,c as b,w as u,e as o,K as a,M as m,L as f,a as i,aq as h,af as y,ag as B,t as c,f as j,ae as P}from"./index.2eeb48d0.js";import{Q as T}from"./QPage.04dbc04d.js";import{u as R}from"./backend_connection.b105d056.js";import{C as $}from"./CommonBRRToolLink.6f0a67e0.js";import{W as k}from"./Workflow_main.a228bc31.js";import"./axios.6e1fcf85.js";var x="/assets/patch_icon.880b248a.png";const L=w({name:"ToolsCansavePatchesPage",components:{CommonBRRToolLink:$},setup(){return{backend_connection_store:R()}},data(){return{patches_data:{}}},computed:{user_profile(){return this.backend_connection_store.user_profile}},methods:{get_workflow_name(e){return k.workflows[e].name},get_workflow_stage_name(e,t){return k.workflows[e].stages[t].name},click_patch(e){this.$router.push("/tools/cansave/patches/"+e)},click_brrr_card(){this.$router.push("/tools/brrcalc")},recursive_load_project_details(){const e=this.patches_data.filter(function(l){return l.loaded===!1});if(e.length===0)return;const t=e[0],_=this,p={ok:function(l){t.loaded=!0,t.loadsuccess=!0,t.detail=l.data,_.recursive_load_project_details()},error:function(l){t.loaded=!0,t.loadsuccess=!1,_.recursive_load_project_details()}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/patches/"+t.from_user_profile.id,method:"GET",data:void 0,callback:p})}},mounted(){this.patches_data=this.user_profile.patches.map(function(e){return{from_user_profile:e,loaded:!1,loadsuccess:!0,detail:{}}}),this.recursive_load_project_details()}}),Q=o("h1",null,"Select Patch",-1),V={class:"text-h6"},N={class:"row"},S=o("div",null,[o("img",{alt:"Item Picture",src:x,class:"tool-picture"})],-1),q={class:"col q-ma-sm"},E={align:"right"},I={key:0},O={class:"workflow_stage_block"},U={key:0},W=o("div",null,"You have not saved any projects. Use the BRR tool to create your first project:",-1);function A(e,t,_,p,l,D){const v=C("CommonBRRToolLink");return s(),b(T,{class:"flex flex-center"},{default:u(()=>[o("div",null,[Q,(s(!0),a(f,null,m(e.patches_data,r=>(s(),a("div",{key:r},[i(y,{inline:"",class:"q-ma-sm card-style tool-card",onClick:n=>e.click_patch(r.from_user_profile.id)},{default:u(()=>[i(B,null,{default:u(()=>[o("div",V,c(r.from_user_profile.name),1),o("div",N,[S,o("div",q,[o("div",E,[j(" View your projects in "+c(r.from_user_profile.name)+". ",1),r.loaded?(s(),a("div",I,[o("div",O,[(s(!0),a(f,null,m(Object.keys(r.detail.workflow_lookup),n=>(s(),a("div",{key:n},[o("h1",null,c(e.get_workflow_name(n)),1),(s(!0),a(f,null,m(Object.keys(r.detail.workflow_lookup[n]),d=>(s(),a("div",{key:d},c(e.get_workflow_stage_name(n,d))+": "+c(r.detail.workflow_lookup[n][d].length),1))),128))]))),128))])])):h("",!0),i(P,{round:"",color:"primary",icon:"info"})])])])]),_:2},1024)]),_:2},1032,["onClick"])]))),128)),e.user_profile.patches.length===0?(s(),a("div",U,[W,i(v)])):h("",!0)])]),_:1})}var H=g(L,[["render",A]]);export{H as default};