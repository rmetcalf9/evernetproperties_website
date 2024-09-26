import{_ as m,d as g,N as b,o as t,c as p,w as h,K as n,ar as d,e as s,f as y,a as v,aB as k,L as c,M as _,t as f}from"./index.70401e4c.js";import{a as T}from"./QTable.778e0c88.js";import{Q as P}from"./QPage.4a5e0a84.js";import{u as j}from"./backend_connection.d610f77c.js";import"./QItemLabel.ad6c8ffe.js";import"./position-engine.492bb376.js";import"./axios.6e1fcf85.js";const D=g({name:"ToolsCansaveTodoPage",components:{},setup(){return{backend_connection_store:j()}},data(){return{loaded:!1,table_mode:!1,loaded_todo_data:void 0,group_by:"group",group_by_options:[{label:"None",value:"none"},{label:"Group",value:"group"},{label:"Project",value:"project"}],filter:"",columns:[{name:"project",required:!0,label:"Project",align:"left",field:"project_name",sortable:!0},{name:"group",required:!0,label:"Group",align:"left",field:"group",sortable:!0},{name:"description",required:!0,label:"Description",align:"left",field:"description",sortable:!0},{name:"due",required:!0,label:"Due",align:"left",field:"due",sortable:!0},{name:"due_date",required:!0,label:"Due Date",align:"left",field:"due_date",sortable:!0},{name:"done",required:!0,label:"Done",align:"left",field:"done",sortable:!0},{name:"done_date",required:!0,label:"Done Date",align:"left",field:"done_date",sortable:!0}],initialPagination:{rowsPerPage:50}}},computed:{display_groups(){const e=this;if(this.group_by==="none")return[{name:"",items:this.loaded_todo_data}];let a=[],r={};return this.loaded_todo_data.forEach(function(o){e.group_by==="group"&&(r[o.group]={name:o.group,filter:function(i){return i.group===o.group}}),e.group_by==="project"&&(r[o.project_name]={name:o.project_name,filter:function(i){return!0}})}),Object.keys(r).map(function(o){a.push({name:r[o].name,items:e.loaded_todo_data.filter(r[o].filter)})}),a}},methods:{refresh(){const e=this,a={ok:e.refresh_success,error:function(r){b.create({color:"negative",message:"Failed to load todos",timeout:2e3}),e.$router.push("/tools")}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/me/todos",method:"GET",data:void 0,callback:a})},refresh_success(e){this.loaded_todo_data=e.data.todos,this.loaded=!0}},mounted(){this.loaded=!1,this.refresh()}}),N={key:0},q=s("h1",null,"Loading...",-1),V=[q],w={key:1},B=s("h1",null,"My Todos",-1),C={key:0},$={class:"flex"};function G(e,a,r,o,i,Q){return t(),p(P,{class:"todopageclass"},{default:h(()=>[e.loaded?d("",!0):(t(),n("div",N,V)),e.loaded?(t(),n("div",w,[B,e.table_mode?d("",!0):(t(),n("div",C,[s("div",null,[s("div",$,[y("Due: "),v(k,{modelValue:e.group_by,"onUpdate:modelValue":a[0]||(a[0]=l=>e.group_by=l),options:e.group_by_options,color:"primary",inline:""},null,8,["modelValue","options"])])]),(t(!0),n(c,null,_(e.display_groups,l=>(t(),n("div",{key:l.name},[s("div",null,f(l.name),1),(t(!0),n(c,null,_(l.items,u=>(t(),n("div",{key:u.id},f(u),1))),128))]))),128))])),e.table_mode?(t(),p(T,{key:1,flat:"",bordered:"",title:"Todo Items",rows:e.loaded_todo_data,columns:e.columns,filter:e.filter,pagination:e.initialPagination,"no-data-label":"No todos foudn","no-results-label":"No results matching this filter","row-key":"name"},null,8,["rows","columns","filter","pagination"])):d("",!0)])):d("",!0)]),_:1})}var U=m(D,[["render",G]]);export{U as default};
