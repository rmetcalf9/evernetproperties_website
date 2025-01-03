import{Q as X,a as N}from"./QTabs.d6d0db30.js";import{a2 as J,g as Z,ay as O,av as ee,k as W,q as R,x as A,u as te,d as E,_ as q,o as n,K as u,a as s,w as i,f as p,t as y,aa as z,ae as w,ai as T,Q as m,e as _,M as j,O as $,ag as B,aj as I,r as P,c as Q,al as le,L as h,af as oe,a9 as se,N as ae}from"./index.d2ef3ad6.js";import{Q as re}from"./QPage.d89037f3.js";import{u as x}from"./backend_connection.dd5f4fd4.js";import{b as G,Q as M}from"./QItemLabel.93ae02da.js";import{b as Y,c as ie,Q as ne}from"./QTable.0b0ebdd8.js";import{Q as ce}from"./QPopupProxy.3c71712a.js";import{C as S}from"./ClosePopup.21c4b1a2.js";import{C as de}from"./CommonBRRToolLink.464a1bb2.js";import{a as D}from"./QSelect.7dea3dff.js";import{Q as L}from"./QSpace.b713f765.js";import{W as k}from"./Workflow_main.60013326.js";import{u as b}from"./utils.3f2e20ba.js";import{c as ue,z as _e}from"./zoom.2619b28f.js";import{T as fe}from"./TodoDisplay.87bfc7bc.js";import"./QResizeObserver.089e2dab.js";import"./axios.6e1fcf85.js";import"./format.eab05819.js";import"./position-engine.be109594.js";import"./TodoItem.494d9ff5.js";import"./common_constants.94b43302.js";function ge(e){return{cumulatively_loaded_stages:{},cumulatively_loaded_sources:{},cumulatively_loaded_agents:{}}}const me=J("cumulatively_loaded_stages",{state:()=>({value:{}}),getters:{none(e){console.log("SSS")}},actions:{_createPatchRecordIfRequired(e){Object.keys(this.value).includes(e)||(this.value[e]=ge())},findPatchRecord(e){return this._createPatchRecordIfRequired(e),this.value[e]},reportFoundProject({patch_id:e,workflow_stage_id:t,workflow_id:o,stage_id:l,stage:r,stage_selected:f,source:a,source_selected:c,agent:d,agent_selected:g}){this._createPatchRecordIfRequired(e),t in this.value[e].cumulatively_loaded_stages||(this.value[e].cumulatively_loaded_stages[t]={workflow_stage_id:t,workflow_id:o,stage_id:l,stage:r,selected:f}),a in this.value[e].cumulatively_loaded_sources||(this.value[e].cumulatively_loaded_sources[a]={name:a,selected:c}),d in this.value[e].cumulatively_loaded_agents||(this.value[e].cumulatively_loaded_agents[d]={name:d,selected:g})}}});var he=Z({name:"QBanner",props:{...O,inlineActions:Boolean,dense:Boolean,rounded:Boolean},setup(e,{slots:t}){const{proxy:{$q:o}}=te(),l=ee(e,o),r=W(()=>"q-banner row items-center"+(e.dense===!0?" q-banner--dense":"")+(l.value===!0?" q-banner--dark q-dark":"")+(e.rounded===!0?" rounded-borders":"")),f=W(()=>`q-banner__actions row items-center justify-end col-${e.inlineActions===!0?"auto":"all"}`);return()=>{const a=[R("div",{class:"q-banner__avatar col-auto row items-center self-start"},A(t.avatar)),R("div",{class:"q-banner__content col text-body2"},A(t.default))],c=A(t.action);return c!==void 0&&a.push(R("div",{class:f.value},c)),R("div",{class:r.value+(e.inlineActions===!1&&c!==void 0?" q-banner--top-padding":""),role:"alert"},a)}}});const pe=E({name:"ProjectTableFilterComponent",props:["projects","cumulatively_loaded_stages","cumulatively_loaded_agents","cumulatively_loaded_sources"],emits:["filterchanged"],components:{},setup(){return{backend_connection_store:x()}},data(){return{dialog_stages:!1,dialog_sources:!1,dialog_agents:!1}},computed:{stages(){const e=this;let t=[];return Object.keys(e.cumulatively_loaded_stages).forEach(function(o){t.push(e.cumulatively_loaded_stages[o])}),t},agents(){const e=this;let t=[];return Object.keys(e.cumulatively_loaded_agents).forEach(function(o){t.push(e.cumulatively_loaded_agents[o])}),t},sources(){const e=this;let t=[];return Object.keys(e.cumulatively_loaded_sources).forEach(function(o){t.push(e.cumulatively_loaded_sources[o])}),t},filter_stages_options(){return[{label:"Call Agent",value:"agent"},{label:"Call Sourcer",value:"sourcer"},{label:"Other",value:"other"}]},isStageSelected(e){return!0}},methods:{close_all_dialogs(){this.dialog_stages=!1,this.dialog_agents=!1,this.dialog_sources=!1},click_filter_chip(e){if(this.close_all_dialogs(),e==="Stages"){this.dialog_stages=!0;return}if(e==="Agents"){this.dialog_agents=!0;return}this.dialog_sources=!0},_isFiltered(e){return e.filter(function(o){return!o.selected}).length>0},isFiltered(e){return e==="Stages"?this._isFiltered(this.stages):e==="Sources"?this._isFiltered(this.sources):this._isFiltered(this.agents)},onlyActiveShowing(){let e=!0;return this.stages.forEach(function(t){t.stage.active?t.selected||(e=!1):t.selected&&(e=!1)}),e},filter_text(e){return e==="Stages"&&this.onlyActiveShowing()?"Filter: Active Stages":this.isFiltered(e)?"Filter: "+e:"Filter: "+e+" - not filtered"},set_selected_stages(e){this.stages.forEach(function(t){e.includes(t.workflow_stage_id)?t.selected=!0:t.selected=!1}),this.agents.forEach(function(t){t.selected=!0}),this.sources.forEach(function(t){t.selected=!0}),this.emit_filter_changed_signal()},get_current_filter(){let e=[];this.stages.forEach(function(l){l.selected&&e.push(l.workflow_stage_id)});let t=[];this.agents.forEach(function(l){l.selected&&t.push(l.name)});let o=[];return this.sources.forEach(function(l){l.selected&&o.push(l.name)}),{selected_stages:e,selected_agents:t,selected_sources:o}},emit_filter_changed_signal(){this.$emit("filterchanged",this.get_current_filter())},click_stages_select_none(){this.stages.forEach(function(e){e.selected=!1}),this.emit_filter_changed_signal()},click_stages_select_all(){this.stages.forEach(function(e){e.selected=!0}),this.emit_filter_changed_signal()},click_agents_select_none(){this.agents.forEach(function(e){e.selected=!1}),this.emit_filter_changed_signal()},click_agents_select_all(){this.agents.forEach(function(e){e.selected=!0}),this.emit_filter_changed_signal()},click_sources_select_none(){this.sources.forEach(function(e){e.selected=!1}),this.emit_filter_changed_signal()},click_sources_select_all(){this.sources.forEach(function(e){e.selected=!0}),this.emit_filter_changed_signal()},click_stages_select_active(){this.stages.forEach(function(e){let t=!1;typeof e.stage.active!="undefined"&&(t=e.stage.active),e.selected=t}),this.emit_filter_changed_signal()}},mounted(){}}),ke=_("div",{class:"text-h6"},"Filter Stages",-1),ve={class:"col project_table_filters_any_filter"},be={class:"row"},ye={class:"row"},we={class:"project_table_filters_any_filter_button"},Ce={class:"project_table_filters_any_filter_button"},Te={class:"project_table_filters_any_filter_button"},je={class:"project_table_filters_any_filter_button"},$e=_("div",{class:"text-h6"},"Filter Agents",-1),Pe={class:"row project_table_filters_any_filter"},Se={class:"project_table_filters_any_filter_button"},Re={class:"project_table_filters_any_filter_button"},Ve={class:"project_table_filters_any_filter_button"},Fe=_("div",{class:"text-h6"},"Filter Sources",-1),Qe={class:"row project_table_filters_any_filter"},Ee={class:"project_table_filters_any_filter_button"},qe={class:"project_table_filters_any_filter_button"},Ae={class:"project_table_filters_any_filter_button"};function ze(e,t,o,l,r,f){return n(),u("div",null,[s(D,{clickable:"",onClick:t[0]||(t[0]=a=>e.click_filter_chip("Stages")),removable:e.isFiltered("Stages"),onRemove:e.click_stages_select_all,color:"primary","text-color":"white","icon-remove":"close"},{default:i(()=>[p(y(e.filter_text("Stages")),1)]),_:1},8,["removable","onRemove"]),s(D,{clickable:"",onClick:t[1]||(t[1]=a=>e.click_filter_chip("Agents")),removable:e.isFiltered("Agents"),onRemove:e.click_agents_select_all,color:"primary","text-color":"white","icon-remove":"close"},{default:i(()=>[p(y(e.filter_text("Agents")),1)]),_:1},8,["removable","onRemove"]),s(D,{clickable:"",onClick:t[2]||(t[2]=a=>e.click_filter_chip("Sources")),removable:e.isFiltered("Sources"),onRemove:e.click_sources_select_all,color:"primary","text-color":"white","icon-remove":"close"},{default:i(()=>[p(y(e.filter_text("Sources")),1)]),_:1},8,["removable","onRemove"]),s(I,{modelValue:e.dialog_stages,"onUpdate:modelValue":t[3]||(t[3]=a=>e.dialog_stages=a)},{default:i(()=>[s(z,{class:"todoitem-dialogcard"},{default:i(()=>[s(w,{class:"row items-center q-pb-none"},{default:i(()=>[ke,s(L),T(s(m,{icon:"close",flat:"",round:"",dense:""},null,512),[[S]])]),_:1}),s(w,null,{default:i(()=>[_("div",ve,[_("div",be,[(n(!0),u(j,null,$(e.stages,a=>(n(),u("div",{key:a.workflow_stage_id},[s(B,{modelValue:a.selected,"onUpdate:modelValue":c=>a.selected=c,label:a.stage.name,onClick:e.emit_filter_changed_signal},null,8,["modelValue","onUpdate:modelValue","label","onClick"])]))),128))]),_("div",ye,[_("div",we,[s(m,{color:"primary",label:"Select all",onClick:e.click_stages_select_all},null,8,["onClick"])]),_("div",Ce,[s(m,{color:"primary",label:"Select none",onClick:e.click_stages_select_none},null,8,["onClick"])]),_("div",Te,[s(m,{color:"primary",label:"Select active",onClick:e.click_stages_select_active},null,8,["onClick"])]),_("div",je,[s(m,{color:"secondary",label:"Close",onClick:e.close_all_dialogs},null,8,["onClick"])])])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),s(I,{modelValue:e.dialog_agents,"onUpdate:modelValue":t[4]||(t[4]=a=>e.dialog_agents=a)},{default:i(()=>[s(z,{class:"todoitem-dialogcard"},{default:i(()=>[s(w,{class:"row items-center q-pb-none"},{default:i(()=>[$e,s(L),T(s(m,{icon:"close",flat:"",round:"",dense:""},null,512),[[S]])]),_:1}),s(w,null,{default:i(()=>[_("div",Pe,[(n(!0),u(j,null,$(e.agents,a=>(n(),u("div",{key:a.name},[s(B,{modelValue:a.selected,"onUpdate:modelValue":c=>a.selected=c,label:a.name,onClick:e.emit_filter_changed_signal},null,8,["modelValue","onUpdate:modelValue","label","onClick"])]))),128)),_("div",Se,[s(m,{color:"primary",label:"Select all",onClick:e.click_agents_select_all},null,8,["onClick"])]),_("div",Re,[s(m,{color:"primary",label:"Select none",onClick:e.click_agents_select_none},null,8,["onClick"])]),_("div",Ve,[s(m,{color:"secondary",label:"Close",onClick:e.close_all_dialogs},null,8,["onClick"])])])]),_:1})]),_:1})]),_:1},8,["modelValue"]),s(I,{modelValue:e.dialog_sources,"onUpdate:modelValue":t[5]||(t[5]=a=>e.dialog_sources=a)},{default:i(()=>[s(z,{class:"todoitem-dialogcard"},{default:i(()=>[s(w,{class:"row items-center q-pb-none"},{default:i(()=>[Fe,s(L),T(s(m,{icon:"close",flat:"",round:"",dense:""},null,512),[[S]])]),_:1}),s(w,null,{default:i(()=>[_("div",Qe,[(n(!0),u(j,null,$(e.sources,a=>(n(),u("div",{key:a.name},[s(B,{modelValue:a.selected,"onUpdate:modelValue":c=>a.selected=c,label:a.name,onClick:e.emit_filter_changed_signal},null,8,["modelValue","onUpdate:modelValue","label","onClick"])]))),128)),_("div",Ee,[s(m,{color:"primary",label:"Select all",onClick:e.click_sources_select_all},null,8,["onClick"])]),_("div",qe,[s(m,{color:"primary",label:"Select none",onClick:e.click_sources_select_none},null,8,["onClick"])]),_("div",Ae,[s(m,{color:"secondary",label:"Close",onClick:e.close_all_dialogs},null,8,["onClick"])])])]),_:1})]),_:1})]),_:1},8,["modelValue"])])}var Be=q(pe,[["render",ze]]);const Ie=E({name:"ToolsCansavePatchePage",props:["projects","prefiltered","cumulatively_loaded_stages","cumulatively_loaded_agents","cumulatively_loaded_sources"],emits:["filterchanged"],components:{CommonBRRToolLink:de,ProjectTableFilters:Be},setup(){return{backend_connection_store:x()}},data(){return{filter:"",columns:[{name:"address",required:!0,label:"Address",align:"left",field:"address",sortable:!0},{name:"workflowstage",required:!0,label:"Stage",align:"left",field:"stage",sortable:!0},{name:"visionandnotes",required:!0,label:"Vision and Notes",align:"left",field:"vandnotes",sortable:!1},{name:"source",required:!0,label:"Source",align:"left",field:"source",sortable:!0},{name:"agent",required:!0,label:"Agent",align:"left",field:"selling_agent",sortable:!0},{name:"todo",required:!0,label:"Todos",align:"left",field:"todo",sortable:!1}],initialPagination:{rowsPerPage:50}}},computed:{filter_stages_options(){return[{label:"Call Agent",value:"agent"},{label:"Call Sourcer",value:"sourcer"},{label:"Other",value:"other"}]},user_profile(){return this.backend_connection_store.user_profile},table_content(){const e=this;return this.projects.map(function(t){return t.loaded?{id:t.id,loaded:t.loaded,address:t.item.sub_section_details.dealbasicinfo.address,source:e.get_source_text(t),selling_agent:b.get_agent_text(t.item.sub_section_details.dealbasicinfo.selling_agent),vandnotes:"NOT DISPLAYED",devplan:t.item.sub_section_details.vision.devplan,notes:t.item.sub_section_details.dealbasicinfo.notes,stage:e.getWorkflowStage(t.item.workflow).name,todo:e.get_todo_text(t)}:{id:t.id,loaded:!1,address:"Loading...",source:"",selling_agent:"",vandnotes:"",devplan:"",notes:"",stage:"",todo:""}})}},methods:{get_current_filter(){return this.$refs.ProjectTableFilters.get_current_filter()},set_selected_stages(e){this.$refs.ProjectTableFilters.set_selected_stages(e)},get_todo_text(e){let t=0,o=0,l=0;return typeof e.item.todos!="undefined"&&(t=e.item.todos.filter(function(r){return!r.done&&!r.due}).length,o=e.item.todos.filter(function(r){return!r.done&&r.due}).length,l=e.item.todos.filter(function(r){return r.done}).length),o.toString()+"/"+(t+o).toString()+" ("+l.toString()+")"},get_source_text(e){return b.get_source_text(e.item.sub_section_details.dealbasicinfo.deal_source)},getWorkflowStage({workflow_used_id:e,current_stage:t}){return k.workflows[e].stages[t]},onRowClick(e,t){if(t){const o=this.$router.resolve("/tools/brrcalc"),l=new URL(o.href,window.location.origin+window.location.pathname).href+"?projectid="+e.id;window.open(l),window.focus();return}this.$router.push("/tools/brrcalc?projectid="+e.id)}},mounted(){}}),De={class:"projecttablecontainer"},Le={class:"projecttablestyle"},Ue=_("th",{align:"left"},[p("Todo"),_("br"),p("due/total (done)")],-1),xe={key:0},Ne={key:0},We={key:1},Ge={key:0},Me={key:0},Ye={key:1},He={key:1};function Ke(e,t,o,l,r,f){const a=P("ProjectTableFilters"),c=P("CommonBRRToolLink");return n(),u("div",De,[_("div",Le,[s(a,{ref:"ProjectTableFilters",projects:e.projects,cumulatively_loaded_stages:e.cumulatively_loaded_stages,cumulatively_loaded_agents:e.cumulatively_loaded_agents,cumulatively_loaded_sources:e.cumulatively_loaded_sources,onFilterchanged:t[0]||(t[0]=d=>e.$emit("filterchanged",d))},null,8,["projects","cumulatively_loaded_stages","cumulatively_loaded_agents","cumulatively_loaded_sources"]),s(ne,{flat:"",bordered:"",title:"Projects",rows:e.table_content,columns:e.columns,filter:e.filter,pagination:e.initialPagination,"no-data-label":"I didn't find anything for you","no-results-label":"The filter didn't uncover any results","row-key":"name",onRowClick:t[2]||(t[2]=(d,g,C)=>e.onRowClick(g,!1))},{"header-cell-todo":i(()=>[Ue]),"body-cell-address":i(d=>[s(Y,null,{default:i(()=>[s(ce,{"context-menu":""},{default:i(()=>[s(he,null,{default:i(()=>[s(ie,{style:{"min-width":"100px"}},{default:i(()=>[T((n(),Q(M,{clickable:"",onClick:g=>e.onRowClick(d.row,!0)},{default:i(()=>[s(G,null,{default:i(()=>[p("Open in new tab...")]),_:1})]),_:2},1032,["onClick"])),[[S]]),s(le),T((n(),Q(M,{clickable:""},{default:i(()=>[s(G,null,{default:i(()=>[p("Cancel")]),_:1})]),_:1})),[[S]])]),_:2},1024)]),_:2},1024)]),_:2},1024),p(" "+y(d.row.address),1)]),_:2},1024)]),"body-cell-visionandnotes":i(d=>[s(Y,null,{default:i(()=>[d.row.loaded?(n(),u("div",xe,[typeof d.row.devplan!="undefined"?(n(),u("div",Ne,[(n(!0),u(j,null,$(d.row.devplan.split(`
`),g=>(n(),u("div",{key:g,class:"projecttablehead"},y(g),1))),128))])):h("",!0),typeof d.row.notes!="undefined"?(n(),u("div",We,[(n(!0),u(j,null,$(d.row.notes.split(`
`),g=>(n(),u("div",{key:g},y(g),1))),128))])):h("",!0)])):h("",!0)]),_:2},1024)]),"top-right":i(()=>[s(oe,{borderless:"",dense:"",debounce:"300",modelValue:e.filter,"onUpdate:modelValue":t[1]||(t[1]=d=>e.filter=d),clearable:"",placeholder:"Search"},{append:i(()=>[s(se,{name:"search"})]),_:1},8,["modelValue"])]),"no-data":i(({})=>[e.prefiltered?h("",!0):(n(),u("div",Ge,[e.projects.length===0?(n(),u("div",Me,[p(" No projects in this patch - use the BRR calculator to create one "),s(c)])):h("",!0),e.projects.length!==0?(n(),u("div",Ye," No projects match the filter ")):h("",!0)])),e.prefiltered?(n(),u("div",He," No projects match the filter ")):h("",!0)]),_:1},8,["rows","columns","filter","pagination"])])])}var Xe=q(Ie,[["render",Ke]]);function Je(e,t,o,l){const r={items_drawn:{},cols:[-300,120,560]};U(e,t.initial_stage,t.stages[t.initial_stage],r,t,200,!1,o,l)}const V=130,F=400;function Ze(e,t,o){let l=0;return o?l=2:typeof e.draw_col!="undefined"&&(l=e.draw_col),t.cols[l]}function U(e,t,o,l,r,f,a,c,d){if(Object.keys(l.items_drawn).includes(t))return;const g=Ze(o,l,a),C=e.append("g").attr("transform","translate( "+g+" "+f+")");l.items_drawn[t]={pos_x:g,pos_y:f},Oe(C,t,o,a,c,r,d),typeof o.progression!="undefined"&&(typeof o.progression.failed!="undefined"&&(U(e,o.progression.failed,r.stages[o.progression.failed],l,r,f+150,!0,c,d),H(e,g,f+V,l.cols[2]-F/2,f+150+V/2)),typeof o.progression.success!="undefined"&&o.progression.success.forEach(function(v){U(e,v.next_stage,r.stages[v.next_stage],l,r,f+300,!1,c,d),H(e,g,f+V,l.items_drawn[v.next_stage].pos_x,l.items_drawn[v.next_stage].pos_y)}))}function H(e,t,o,l,r){e.append("line").attr("x1",t).attr("y1",o).attr("x2",l).attr("y2",r).attr("stroke","black").attr("style","stroke-width:10;").attr("marker-end","url(#triangle)")}function Oe(e,t,o,l,r,f,a){const c=e.append("g");let d="lightgreen";l&&(d="pink");function g(){r(t,o)}let C=0;if(typeof a.workflow_lookup!="undefined"&&typeof a.workflow_lookup[f.id]!="undefined"&&typeof a.workflow_lookup[f.id][t]!="undefined"&&(C=a.workflow_lookup[f.id][t].length),c.append("rect").attr("width",F).attr("height",V).attr("x",-(F/2)).attr("y",0).attr("style","fill: "+d+";stroke-width:3;stroke:rgb(0,0,0)").on("click",g),c.append("text").attr("x",0).attr("y",50).attr("text-anchor","middle").style("font-size","28px").style("font-weight","500").text(o.name).on("click",g),c.append("text").attr("x",0).attr("y",110).attr("text-anchor","middle").style("font-size","56px").style("font-weight","500").text(C.toString()).on("click",g),typeof o.diagram_notes!="undefined"){let v=0;o.diagram_notes.split("<BR>").forEach(function(K){c.append("text").attr("x",-(F/2+20)).attr("y",v).attr("text-anchor","end").attr("alignment-baseline","text-before-edge").style("font-size","24px").style("font-weight","500").text(K),v=v+30})}}const et=E({name:"WorkflowChart",props:["patch_data"],emits:["onclickstage"],data(){return{allzoomedelements:void 0,boudaryRect:void 0,svg:void 0,background_item_group:void 0,chartarea:{xmin:-950,xmax:950,ymin:-150,ymax:2300}}},computed:{workflow(){return k.workflows[k.default_workflow_id]}},methods:{initChart(){for(var e=this,t=function(l){var r=800,f=800;l.svg=ue("svg").attr("style","border: 1px solid black;position:fixed; top:0; left:0; height:100%; width:100%").attr("viewBox",[-r/2,-f/2,r,f]).attr("oncontextmenu","return false;"),l.allzoomedelements=l.svg.append("g"),e.boudaryRect=l.allzoomedelements.append("rect").attr("width",l.chartarea.xmax-l.chartarea.xmin).attr("height",l.chartarea.ymax-l.chartarea.ymin).attr("x",l.chartarea.xmin).attr("y",l.chartarea.ymin).attr("style","fill: white;stroke-width:3;stroke:rgb(0,0,0)"),l.svg.call(_e().extent([[0,0],[r,f]]).scaleExtent([-5,10]).on("zoom",a)),l.svg.on("dblclick.zoom",null);function a(c,d){l.allzoomedelements.attr("transform",c.transform)}return l.allzoomedelements.append("text").attr("text-anchor","middle").attr("alignment-baseline","central").attr("x",0).attr("y",-70).attr("style","font-size: 60px; font-weight: 800;").text(c=>e.workflow.name),l.allzoomedelements.append("text").attr("text-anchor","middle").attr("alignment-baseline","central").attr("x",0).attr("y",-0).attr("style","font-size: 50px; font-weight: 300;").text(c=>"Projects for patch "+e.patch_data.name),l.allzoomedelements.append("text").attr("text-anchor","middle").attr("alignment-baseline","central").attr("x",0).attr("y",60).attr("style","font-size: 40px; font-weight: 300;").text(c=>"(Note: Diagram only - workflows not yet implemented)"),l.svg.node()},o=document.getElementById("chartInsetionPoint_workflowchart");o.firstChild;)console.log("Removing old SVG"),o.removeChild(o.firstChild);o.appendChild(t(this)),this.svg.append("marker").attr("id","triangle").attr("viewBox","0 0 10 10").attr("refX","8").attr("refY","5").attr("markerUnits","strokeWidth").attr("markerWidth","4").attr("markerHeight","4").attr("orient","auto").attr("fill","black").append("path").attr("d","M 0 0 L 10 5 L 0 10 z"),Je(this.allzoomedelements,this.workflow,this.click_stage_callback,this.patch_data)},click_stage_callback(e,t){this.$emit("onclickstage",this.workflow.id,e,t)},clickDIV(){}},mounted(){this.initChart()}});function tt(e,t,o,l,r,f){return n(),u("div",{id:"chartInsetionPoint_workflowchart",onClick:t[0]||(t[0]=a=>e.clickDIV(a))})}var lt=q(et,[["render",tt]]);const ot=E({name:"ToolsCansavePatchePage",components:{ProjectTable:Xe,WrokflowChart:lt,TodoDisplay:fe},setup(){const e=x(),t=me();return{backend_connection_store:e,patch_local_settings_store:t}},data(){return{loaded:!1,patch_data:{},loaded_projects:[],filtered_loaded_projects:[],project_filter:{filter_stages:!0,selected_stages:[],filter_agents:!0,selected_agents:[],filter_sources:!0,selected_sources:[]},tab:"projects"}},watch:{loaded_projects(e){this.recompute_filtered_projects()}},computed:{cumulatively_loaded_stages:{get(){return this.patch_local_settings_store.findPatchRecord(this.patch_data.id).cumulatively_loaded_stages}},cumulatively_loaded_sources:{get(){return this.patch_local_settings_store.findPatchRecord(this.patch_data.id).cumulatively_loaded_sources}},cumulatively_loaded_agents:{get(){return this.patch_local_settings_store.findPatchRecord(this.patch_data.id).cumulatively_loaded_agents}},selectedStageText(){return k.workflows[this.selected_stage.workflow_id].stages[this.selected_stage.stage_id].name},user_profile(){return this.backend_connection_store.user_profile}},methods:{btn_click_workflow(){this.tab="workflow"},projecttablefilterchanged(e){this.project_filter.filter_stages=!0,this.project_filter.selected_stages=e.selected_stages,this.project_filter.filter_agents=!0,this.project_filter.selected_agents=e.selected_agents,this.project_filter.filter_sources=!0,this.project_filter.selected_sources=e.selected_sources,this.recompute_filtered_projects()},_recompute_filtered_projects_stage_filter(e){if(!this.project_filter.filter_stages)return!0;const t=k.get_workflow_stage_key(e.item.workflow.workflow_used_id,e.item.workflow.current_stage);return!!this.project_filter.selected_stages.includes(t)},_recompute_filtered_projects_agent_filter(e){if(!this.project_filter.filter_agents)return!0;const t=b.get_agent_text(e.item.sub_section_details.dealbasicinfo.selling_agent);return!!this.project_filter.selected_agents.includes(t)},_recompute_filtered_projects_source_filter(e){if(!this.project_filter.filter_sources)return!0;const t=b.get_source_text(e.item.sub_section_details.dealbasicinfo.deal_source);return!!this.project_filter.selected_sources.includes(t)},is_project_included_in_current_filters(e){return!(!this._recompute_filtered_projects_stage_filter(e)||!this._recompute_filtered_projects_agent_filter(e)||!this._recompute_filtered_projects_source_filter(e))},recompute_filtered_projects(){const e=this;this.filtered_loaded_projects=this.loaded_projects.filter(function(t){return t.loaded?e.is_project_included_in_current_filters(t):!0})},onchartclickstage(e,t,o){const l=this;this.tab="projects",setTimeout(function(){const r=k.get_workflow_stage_key(e,t);l.$refs.ProjectTableRef.set_selected_stages([r])},5)},clicknewproject(){this.$router.push("/tools/brrcalc?patchid="+this.$route.params.patchid)},click_brrr_card(){this.$router.push("/tools/brrcalc")},refresh(){const e=this,t={ok:e.refresh_success,error:function(o){ae.create({color:"negative",message:"Failed to find patch information",timeout:2e3}),e.$router.push("/tools/cansave/patches")}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/patches/"+e.$route.params.patchid,method:"GET",data:void 0,callback:t})},refresh_success(e){this.patch_data=e.data,this.loaded_projects=this.patch_data.projects.map(function(t){return{id:t,loaded:!1,item:void 0}}),this.recursive_load_project_details(),this.loaded=!0},recursive_load_project_details(){const e=this.loaded_projects.filter(function(r){return r.loaded===!1});if(e.length===0)return;const t=e[0],o=this,l={ok:function(r){t.loaded=!0,t.item=r.data,o.add_to_cumulatively_loaded(r.data),o.projecttablefilterchanged(o.$refs.ProjectTableRef.get_current_filter()),o.recompute_filtered_projects(),o.recursive_load_project_details()},error:function(r){t.loaded=!0,t.address="TODO LOAD FAIL",o.recursive_load_project_details()}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/projects/"+t.id,method:"GET",data:void 0,callback:l})},add_to_cumulatively_loaded(e){const t=k.get_workflow_stage_key(e.workflow.workflow_used_id,e.workflow.current_stage),o=b.get_source_text(e.sub_section_details.dealbasicinfo.deal_source),l=b.get_agent_text(e.sub_section_details.dealbasicinfo.selling_agent);this.patch_local_settings_store.reportFoundProject({patch_id:this.patch_data.id,workflow_stage_id:t,workflow_id:e.workflow.workflow_used_id,stage_id:e.workflow.current_stage,stage:k.getWorkflowStage(e.workflow.workflow_used_id,e.workflow.current_stage),stage_selected:b.boolean_undefined_to_false(k.workflows[e.workflow.workflow_used_id].stages[e.workflow.current_stage].active),source:o,source_selected:!0,agent:l,agent_selected:!0}),o in this.cumulatively_loaded_sources||(this.cumulatively_loaded_sources[o]={name:o,selected:!0}),l in this.cumulatively_loaded_agents||(this.cumulatively_loaded_agents[l]={name:l,selected:!0})}},mounted(){this.loaded=!1,this.refresh()}}),st={key:0},at=_("h1",null,"Loading...",-1),rt=[at],it={key:1},nt={key:0},ct={key:2},dt={key:3},ut={key:4};function _t(e,t,o,l,r,f){const a=P("ProjectTable"),c=P("TodoDisplay"),d=P("WrokflowChart");return n(),Q(re,{class:"patchpageclass"},{default:i(()=>[e.loaded?h("",!0):(n(),u("div",st,rt)),e.loaded?(n(),u("div",it,[e.tab!=="workflow"?(n(),u("h1",nt,y(e.patch_data.name),1)):h("",!0),e.tab!=="workflow"?(n(),Q(X,{key:1,modelValue:e.tab,"onUpdate:modelValue":t[0]||(t[0]=g=>e.tab=g),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:i(()=>[s(N,{name:"projects",label:"Projects"}),s(N,{name:"todos",label:"Todos"})]),_:1},8,["modelValue"])):h("",!0),e.tab==="projects"?(n(),u("div",ct,[_("h2",null,[p(" Projects "),s(m,{label:"Pick from workflow",color:"primary",onClick:e.btn_click_workflow,class:"float-right"},null,8,["onClick"])]),_("div",null,[s(a,{ref:"ProjectTableRef",projects:e.filtered_loaded_projects,prefiltered:!0,cumulatively_loaded_stages:e.cumulatively_loaded_stages,cumulatively_loaded_agents:e.cumulatively_loaded_agents,cumulatively_loaded_sources:e.cumulatively_loaded_sources,onFilterchanged:e.projecttablefilterchanged},null,8,["projects","cumulatively_loaded_stages","cumulatively_loaded_agents","cumulatively_loaded_sources","onFilterchanged"])]),s(m,{color:"primary",label:"Add Project",onClick:e.clicknewproject},null,8,["onClick"])])):h("",!0),e.tab==="todos"?(n(),u("div",dt,[s(c,{patch_id:e.patch_data.id},null,8,["patch_id"])])):h("",!0),e.tab==="workflow"?(n(),u("div",ut,[s(d,{patch_data:e.patch_data,onOnclickstage:e.onchartclickstage},null,8,["patch_data","onOnclickstage"])])):h("",!0)])):h("",!0)]),_:1})}var qt=q(ot,[["render",_t]]);export{qt as default};