import{Q as b}from"./QPage.62e2f293.js";import{u as C}from"./backend_connection.7bf05146.js";import{C as T}from"./CommonBRRToolLink.30260dc8.js";import{d as g,_ as w,o as n,c as j,w as f,a as _,e as a,t as i,f as y,K as c,M as p,O as h,L as m,Q as P,ah as B,aa as O,r as v}from"./index.d6cdd244.js";import{W as k}from"./Workflow_main.64586049.js";import"./axios.6e1fcf85.js";var R="/assets/patch_icon.880b248a.png";const S=g({name:"PatchCard",props:["patch"],data(){return{}},methods:{todo_text(e){let t=0,o=0,s=0;return Object.keys(e.detail.todogroups).forEach(function(r){t=t+e.detail.todogroups[r].due,o=o+e.detail.todogroups[r].not_due.length,s=s+e.detail.todogroups[r].done}),t.toString()+"/"+(o+t).toString()+" ("+s.toString()+")"},num_todos(e){let t=0,o=0,s=0;return Object.keys(e.detail.todogroups).forEach(function(r){t=t+e.detail.todogroups[r].due,o=o+e.detail.todogroups[r].not_due.length,s=s+e.detail.todogroups[r].done}),t+o+s},get_workflow_name(e){return k.workflows[e].name},get_workflow_stage_name(e,t){return k.workflows[e].stages[t].name},click_patch(e){this.$router.push("/tools/cansave/patches/"+e)}}}),E={class:"text-h6"},Q={class:"row"},L=a("div",null,[a("img",{alt:"Item Picture",src:R,class:"tool-picture"})],-1),V={class:"col q-ma-sm"},D={align:"right"},N={key:0},q={class:"workflow_stage_block"},A={key:0,class:"todo_stage_block"},I=a("h1",null,"Todos",-1);function U(e,t,o,s,r,$){return n(),j(O,{inline:"",class:"q-ma-sm card-style tool-card",onClick:t[0]||(t[0]=l=>e.click_patch(e.patch.from_user_profile.id))},{default:f(()=>[_(B,null,{default:f(()=>[a("div",E,i(e.patch.from_user_profile.name),1),a("div",Q,[L,a("div",V,[a("div",D,[y(" View your projects in "+i(e.patch.from_user_profile.name)+". ",1),e.patch.loaded?(n(),c("div",N,[a("div",q,[(n(!0),c(p,null,h(Object.keys(e.patch.detail.workflow_lookup),l=>(n(),c("div",{key:l},[a("h1",null,i(e.get_workflow_name(l)),1),(n(!0),c(p,null,h(Object.keys(e.patch.detail.workflow_lookup[l]),d=>(n(),c("div",{key:d},i(e.get_workflow_stage_name(l,d))+": "+i(e.patch.detail.workflow_lookup[l][d].length),1))),128))]))),128))]),e.num_todos(e.patch)>0?(n(),c("div",A,[I,a("div",null,"Due: "+i(e.todo_text(e.patch)),1)])):m("",!0)])):m("",!0),_(P,{round:"",color:"primary",icon:"info"})])])])]),_:1})]),_:1})}var W=w(S,[["render",U]]);const F=g({name:"ToolsCansavePatchesPage",components:{CommonBRRToolLink:T,PatchCard:W},setup(){return{backend_connection_store:C()}},data(){return{patches_data:{}}},computed:{active_patches(){const e=this;return Object.keys(this.patches_data).filter(function(t){return e.patches_data[t].loaded?e.patch_has_active_projects(e.patches_data[t]):!1}).reduce((t,o)=>(t[o]=e.patches_data[o],t),{})},dormant_patches(){const e=this;return Object.keys(this.patches_data).filter(function(t){return e.patches_data[t].loaded?!e.patch_has_active_projects(e.patches_data[t]):!1}).reduce((t,o)=>(t[o]=e.patches_data[o],t),{})},user_profile(){return this.backend_connection_store.user_profile}},methods:{patch_has_active_projects(e){let t=!1;return Object.keys(e.detail.workflow_lookup).forEach(function(o){Object.keys(e.detail.workflow_lookup[o]).forEach(function(s){e.detail.workflow_lookup[o][s].length>0&&k.isActiveStage(o,s)&&(t=!0)})}),t},click_brrr_card(){this.$router.push("/tools/brrcalc")},recursive_load_project_details(){const e=this.patches_data.filter(function(r){return r.loaded===!1});if(e.length===0)return;const t=e[0],o=this,s={ok:function(r){t.loaded=!0,t.loadsuccess=!0,t.detail=r.data,o.recursive_load_project_details()},error:function(r){t.loaded=!0,t.loadsuccess=!1,o.recursive_load_project_details()}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/patches/"+t.from_user_profile.id,method:"GET",data:void 0,callback:s})}},mounted(){this.patches_data=this.user_profile.patches.map(function(e){return{from_user_profile:e,loaded:!1,loadsuccess:!0,detail:{}}}),this.recursive_load_project_details()}}),G=a("h1",null,"Select Patch",-1),K=a("h2",null,"Dormant",-1),M=a("p",null,"Dormant patches are patches with no projects in an active stage.",-1),Y={key:0},z=a("div",null,"You have not saved any projects. Use the BRR tool to create your first project:",-1);function H(e,t,o,s,r,$){const l=v("PatchCard"),d=v("CommonBRRToolLink");return n(),j(b,{class:"flex flex-center"},{default:f(()=>[a("div",null,[G,(n(!0),c(p,null,h(e.active_patches,u=>(n(),c("div",{key:u},[_(l,{patch:u},null,8,["patch"])]))),128)),K,M,(n(!0),c(p,null,h(e.dormant_patches,u=>(n(),c("div",{key:u},[_(l,{patch:u},null,8,["patch"])]))),128)),e.user_profile.patches.length===0?(n(),c("div",Y,[z,_(d)])):m("",!0)])]),_:1})}var oe=w(F,[["render",H]]);export{oe as default};
