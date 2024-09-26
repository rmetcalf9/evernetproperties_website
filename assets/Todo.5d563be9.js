import{_ as y,d as k,N as v,r as j,o as t,c as b,w as T,K as n,ar as u,e as i,f as g,a as _,aB as P,L as c,M as f,t as h,a8 as w}from"./index.359aadd0.js";import{a as N}from"./QTable.7af92238.js";import{Q as C}from"./QPage.3d6760a9.js";import{u as D}from"./backend_connection.2a9a2030.js";import{T as q}from"./TodoItem.c68f38f8.js";import"./QItemLabel.d4c59ab3.js";import"./position-engine.0aa005ac.js";import"./axios.6e1fcf85.js";import"./ClosePopup.5e7a0654.js";const B=k({name:"ToolsCansaveTodoPage",components:{TodoItem:q},setup(){return{backend_connection_store:D()}},data(){return{loaded:!1,table_mode:!1,loaded_todo_data:void 0,group_by:"group",group_by_options:[{label:"None",value:"none"},{label:"Group",value:"group"},{label:"Project",value:"project"}],filter:"",columns:[{name:"project",required:!0,label:"Project",align:"left",field:"project_name",sortable:!0},{name:"group",required:!0,label:"Group",align:"left",field:"group",sortable:!0},{name:"description",required:!0,label:"Description",align:"left",field:"description",sortable:!0},{name:"due",required:!0,label:"Due",align:"left",field:"due",sortable:!0},{name:"due_date",required:!0,label:"Due Date",align:"left",field:"due_date",sortable:!0},{name:"done",required:!0,label:"Done",align:"left",field:"done",sortable:!0},{name:"done_date",required:!0,label:"Done Date",align:"left",field:"done_date",sortable:!0}],initialPagination:{rowsPerPage:50}}},computed:{display_groups(){const e=this;let d=[],r={"":{name:"",link_url:void 0,filter:void 0}};return this.group_by==="none"?r[""]={name:"",filter:function(o){return!0}}:this.loaded_todo_data.forEach(function(o){e.group_by==="group"&&(r[o.group]={name:o.group,link_url:void 0,filter:function(l){return l.group===o.group}}),e.group_by==="project"&&(r[o.project_name]={name:o.project_name,link_url:"/tools/brrcalc?projectid="+o.project_id,filter:function(l){return l.project_id===o.project_id}})}),Object.keys(r).map(function(o){if(typeof r[o].filter!="undefined"){let l=r[o].name;l===""&&(l="Ungrouped"),d.push({name:l,link_url:r[o].link_url,due_items:e.loaded_todo_data.filter(r[o].filter).filter(function(p){return p.due}),nondue_items:e.loaded_todo_data.filter(r[o].filter).filter(function(p){return!p.due})})}}),d}},methods:{refresh(){const e=this,d={ok:e.refresh_success,error:function(r){v.create({color:"negative",message:"Failed to load todos",timeout:2e3}),e.$router.push("/tools")}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/me/todos?done=false",method:"GET",data:void 0,callback:d})},refresh_success(e){this.loaded_todo_data=e.data.todos,this.loaded=!0}},mounted(){this.loaded=!1,this.refresh()}}),U={key:0},V=i("h1",null,"Loading...",-1),$=[V],G={key:1},I=i("h1",null,"My Todos",-1),Q={key:0},E={class:"flex"},L={key:0},F={key:1},M={class:"row"};function O(e,d,r,o,l,p){const m=j("TodoItem");return t(),b(C,{class:"todopageclass"},{default:T(()=>[e.loaded?u("",!0):(t(),n("div",U,$)),e.loaded?(t(),n("div",G,[I,e.table_mode?u("",!0):(t(),n("div",Q,[i("div",null,[i("div",E,[g("Group: "),_(P,{modelValue:e.group_by,"onUpdate:modelValue":d[0]||(d[0]=a=>e.group_by=a),options:e.group_by_options,color:"primary",inline:""},null,8,["modelValue","options"])])]),(t(!0),n(c,null,f(e.display_groups,a=>(t(),n("div",{key:a.name},[typeof a.link_url=="undefined"?(t(),n("div",L,[i("h2",null,h(a.name),1)])):u("",!0),typeof a.link_url!="undefined"?(t(),n("div",F,[i("h2",null,[g(h(a.name)+" ",1),_(w,{color:"primary",icon:"arrow_forward",onClick:s=>e.$router.push(a.link_url)},null,8,["onClick"])])])):u("",!0),i("div",M,[(t(!0),n(c,null,f(a.due_items,s=>(t(),n("div",{key:s.id},[_(m,{todo:s,include_project:e.group_by!="project",onUpdate_todo_item:e.refresh},null,8,["todo","include_project","onUpdate_todo_item"])]))),128)),(t(!0),n(c,null,f(a.nondue_items,s=>(t(),n("div",{key:s.id},[_(m,{todo:s,include_project:e.group_by!="project",onUpdate_todo_item:e.refresh},null,8,["todo","include_project","onUpdate_todo_item"])]))),128))])]))),128))])),e.table_mode?(t(),b(N,{key:1,flat:"",bordered:"",title:"Todo Items",rows:e.loaded_todo_data,columns:e.columns,filter:e.filter,pagination:e.initialPagination,"no-data-label":"No todos foudn","no-results-label":"No results matching this filter","row-key":"name"},null,8,["rows","columns","filter","pagination"])):u("",!0)])):u("",!0)]),_:1})}var Y=y(B,[["render",O]]);export{Y as default};
