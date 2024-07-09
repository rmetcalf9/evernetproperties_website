import{d as h,_ as m,r as f,o as n,g as i,e as c,a as t,w as r,f as _,t as k,ad as T,a7 as j,aq as l,N as $,c as w,ae as C}from"./index.62ab38e1.js";import{Q as P}from"./QPage.6e427784.js";import{u as b}from"./backend_connection.59f83a04.js";import{b as g,Q as y}from"./QTable.be38dc9d.js";import{Q as B}from"./QTr.839a1b0a.js";import{C as Q}from"./CommonBRRToolLink.ae3091d5.js";import"./axios.6e1fcf85.js";import"./QItemLabel.24dca4d7.js";import"./position-engine.284e1c44.js";const R=h({name:"ToolsCansavePatchePage",props:["patch_data_projects"],components:{CommonBRRToolLink:Q},setup(){return{backend_connection_store:b()}},data(){return{rows:[],filter:"",columns:[{name:"address",required:!0,label:"Address",align:"left",field:"address",sortable:!0}]}},computed:{user_profile(){return this.backend_connection_store.user_profile}},methods:{onRowClick(e){this.$router.push("/tools/brrcalc?projectid="+e.id)},recursive_load_project_details(){const e=this.rows.filter(function(a){return a.loaded===!1});if(e.length===0)return;const o=e[0],d=this,p={ok:function(a){o.loaded=!0,o.address=a.data.sub_section_details.dealbasicinfo.address,d.recursive_load_project_details()},error:function(a){o.loaded=!0,o.address="TODO LOAD FAIL",d.recursive_load_project_details()}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/projects/"+o.id,method:"GET",data:void 0,callback:p})}},mounted(){this.rows=this.patch_data_projects.map(function(e){return{id:e,loaded:!1,address:"loading..."}}),this.recursive_load_project_details()}}),N={class:"q-pa-md"},V={key:0},A={key:1};function I(e,o,d,p,a,v){const u=f("CommonBRRToolLink");return n(),i("div",null,[c("div",N,[t(y,{flat:"",bordered:"",title:"Projects",rows:e.rows,columns:e.columns,filter:e.filter,"no-data-label":"I didn't find anything for you","no-results-label":"The filter didn't uncover any results","row-key":"name"},{body:r(s=>[t(B,{props:s,onClick:G=>e.onRowClick(s.row)},{default:r(()=>[t(g,{key:"address",props:s},{default:r(()=>[_(k(s.row.address),1)]),_:2},1032,["props"])]),_:2},1032,["props","onClick"])]),"top-right":r(()=>[t(T,{borderless:"",dense:"",debounce:"300",modelValue:e.filter,"onUpdate:modelValue":o[0]||(o[0]=s=>e.filter=s),clearable:"",placeholder:"Search"},{append:r(()=>[t(j,{name:"search"})]),_:1},8,["modelValue"])]),"no-data":r(({})=>[c("div",null,[e.rows.length===0?(n(),i("div",V,[_(" No projects in this patch - use the BRR calculator to create one "),t(u)])):l("",!0),e.rows.length!==0?(n(),i("div",A," No projects match the filter ")):l("",!0)])]),_:1},8,["rows","columns","filter"])])])}var L=m(R,[["render",I]]);const q=h({name:"ToolsCansavePatchePage",components:{ProjectTable:L},setup(){return{backend_connection_store:b()}},data(){return{loaded:!1,patch_data:{}}},computed:{user_profile(){return this.backend_connection_store.user_profile}},methods:{clicknewproject(){this.$router.push("/tools/brrcalc?patchid="+this.$route.params.patchid)},click_brrr_card(){this.$router.push("/tools/brrcalc")},refresh(){const e=this,o={ok:e.refresh_success,error:function(d){$.create({color:"negative",message:"Failed to find patch information",timeout:2e3}),e.$router.push("/tools/cansave/patches")}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/patches/"+e.$route.params.patchid,method:"GET",data:void 0,callback:o})},refresh_success(e){this.patch_data=e.data,this.loaded=!0}},mounted(){this.loaded=!1,this.refresh()}}),D={key:0},E=c("h1",null,"Loading...",-1),O=[E],S={key:1},U=c("h2",null,"Projects",-1);function F(e,o,d,p,a,v){const u=f("ProjectTable");return n(),w(P,{class:"flex flex-center"},{default:r(()=>[e.loaded?l("",!0):(n(),i("div",D,O)),e.loaded?(n(),i("div",S,[c("h1",null,k(e.patch_data.name),1),U,c("div",null,[t(u,{patch_data_projects:e.patch_data.projects},null,8,["patch_data_projects"])]),t(C,{color:"primary",label:"Add Project",onClick:e.clicknewproject},null,8,["onClick"])])):l("",!0)]),_:1})}var x=m(q,[["render",F]]);export{x as default};
