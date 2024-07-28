import{d as w,_ as b,r as x,o as i,L as d,e as u,a as p,w as m,aq as f,t as _,M as P,O as z,ad as I,a7 as j,f as T,N as L,c as V,ae as C}from"./index.f5a03093.js";import{Q as N}from"./QPage.1f1af4a8.js";import{u as B}from"./backend_connection.61e955ae.js";import{b as $,Q}from"./QTable.d452c2cd.js";import{Q as W}from"./QTr.5a234d9e.js";import{C as A}from"./CommonBRRToolLink.e3917930.js";import{c as E,z as D}from"./zoom.2619b28f.js";import"./axios.6e1fcf85.js";import"./QItemLabel.1e2d52d8.js";import"./position-engine.8ac2fc14.js";const S=w({name:"ToolsCansavePatchePage",props:["projects"],components:{CommonBRRToolLink:A},setup(){return{backend_connection_store:B()}},data(){return{filter:"",columns:[{name:"address",required:!0,label:"Address",align:"left",field:"address",sortable:!0},{name:"visionandnotes",required:!0,label:"Vision and Notes",align:"left",field:"address",sortable:!0}]}},computed:{user_profile(){return this.backend_connection_store.user_profile}},methods:{onRowClick(e){this.$router.push("/tools/brrcalc?projectid="+e.id)}},mounted(){}}),U={class:"q-pa-md"},q={key:0},F={key:1},M={key:0},G={class:"projecttablehead"},H={key:0},X={key:0},Y={key:1};function J(e,o,a,t,n,s){const c=x("CommonBRRToolLink");return i(),d("div",null,[u("div",U,[p(Q,{flat:"",bordered:"",title:"Projects",rows:e.projects,columns:e.columns,filter:e.filter,"no-data-label":"I didn't find anything for you","no-results-label":"The filter didn't uncover any results","row-key":"name"},{body:m(r=>[p(W,{class:"projecttablerow",props:r,onClick:l=>e.onRowClick(r.row)},{default:m(()=>[p($,{key:"address",props:r},{default:m(()=>[r.row.loaded?f("",!0):(i(),d("div",q," Loading... ")),r.row.loaded?(i(),d("div",F,_(r.row.item.dealbasicinfo.address),1)):f("",!0)]),_:2},1032,["props"]),p($,{key:"visionandnotes",props:r},{default:m(()=>[r.row.loaded?(i(),d("div",M,[u("div",G,_(r.row.item.vision.devplan),1),typeof r.row.item.dealbasicinfo.notes!="undefined"?(i(),d("div",H,[(i(!0),d(P,null,z(r.row.item.dealbasicinfo.notes.split(" "),l=>(i(),d("div",{key:l},_(l),1))),128))])):f("",!0)])):f("",!0)]),_:2},1032,["props"])]),_:2},1032,["props","onClick"])]),"top-right":m(()=>[p(I,{borderless:"",dense:"",debounce:"300",modelValue:e.filter,"onUpdate:modelValue":o[0]||(o[0]=r=>e.filter=r),clearable:"",placeholder:"Search"},{append:m(()=>[p(j,{name:"search"})]),_:1},8,["modelValue"])]),"no-data":m(({})=>[u("div",null,[e.projects.length===0?(i(),d("div",X,[T(" No projects in this patch - use the BRR calculator to create one "),p(c)])):f("",!0),e.projects.length!==0?(i(),d("div",Y," No projects match the filter ")):f("",!0)])]),_:1},8,["rows","columns","filter"])])])}var K=b(S,[["render",J]]),Z={id:1,name:"BRR Project Workflow",initial_stage:"1",stages:{1:{name:"Lead",progression:{failed:"1.1",success:[{next_stage:"2"}]},diagram_notes:"Identify profitable strategy<BR>Find on Streetview<BR>Identify full address"},"1.1":{name:"Rejected Lead"},2:{name:"Potential",progression:{failed:"2.1",success:[{next_stage:"3"}]},diagram_notes:"Phone Agent<BR>Is property still available<BR>What is sellers situation"},"2.1":{name:"Rejected Lead"},3:{name:"Viewing Booked",progression:{failed:"3.1",success:[{next_stage:"4"}]},diagram_notes:"Market Comparables<BR>Property Condition<BR>Identify Show stoppers<BR>Evaluate potential"},"3.1":{name:"Cancelled Viewing"},4:{name:"Viewed",progression:{failed:"4.1",success:[{next_stage:"5"}]},diagram_notes:"Refurb cost (Quotes)<BR>Identify offer price<BR>Make offer"},"4.1":{name:"Unviable"},5:{name:"Offer made",progression:{success:[{next_stage:"6"},{next_stage:"7"}]},diagram_notes:"Negotiation"},6:{name:"Rejected offer",draw_col:1,progression:{success:[{next_stage:"7"}]}},7:{name:"Accepted offer"}}};function O(e,o,a){const t={items_drawn:{},cols:[-300,200,500]};v(e,o.initial_stage,o.stages[o.initial_stage],t,o,200,!1,a)}const g=130,k=400;function ee(e,o,a){let t=0;return a?t=2:typeof e.draw_col!="undefined"&&(t=e.draw_col),o.cols[t]}function v(e,o,a,t,n,s,c,r){if(Object.keys(t.items_drawn).includes(o))return;const l=ee(a,t,c),y=e.append("g").attr("transform","translate( "+l+" "+s+")");t.items_drawn[o]={pos_x:l,pos_y:s},te(y,o,a,c,r),typeof a.progression!="undefined"&&(typeof a.progression.failed!="undefined"&&(v(e,a.progression.failed,n.stages[a.progression.failed],t,n,s+150,!0,r),R(e,l,s+g,t.cols[2]-k/2,s+150+g/2)),typeof a.progression.success!="undefined"&&a.progression.success.forEach(function(h){v(e,h.next_stage,n.stages[h.next_stage],t,n,s+300,!1,r),R(e,l,s+g,t.items_drawn[h.next_stage].pos_x,t.items_drawn[h.next_stage].pos_y)}))}function R(e,o,a,t,n){e.append("line").attr("x1",o).attr("y1",a).attr("x2",t).attr("y2",n).attr("stroke","black").attr("style","stroke-width:10;").attr("marker-end","url(#triangle)")}function te(e,o,a,t,n){const s=e.append("g");let c="lightgreen";t&&(c="pink");function r(){n(o,a)}if(s.append("rect").attr("width",k).attr("height",g).attr("x",-(k/2)).attr("y",0).attr("style","fill: "+c+";stroke-width:3;stroke:rgb(0,0,0)").on("click",r),s.append("text").attr("x",0).attr("y",50).attr("text-anchor","middle").style("font-size","28px").style("font-weight","500").text(a.name),s.append("text").attr("x",0).attr("y",110).attr("text-anchor","middle").style("font-size","56px").style("font-weight","500").text("0"),typeof a.diagram_notes!="undefined"){let l=0;a.diagram_notes.split("<BR>").forEach(function(y){s.append("text").attr("x",-(k/2+20)).attr("y",l).attr("text-anchor","end").attr("alignment-baseline","text-before-edge").style("font-size","24px").style("font-weight","500").text(y),l=l+30})}}const oe=w({name:"WorkflowChart",props:["patch_data"],emits:["onclickstage"],data(){return{allzoomedelements:void 0,boudaryRect:void 0,svg:void 0,background_item_group:void 0,chartarea:{xmin:-950,xmax:950,ymin:-150,ymax:2300}}},computed:{workflow(){return Z}},methods:{initChart(){for(var e=this,o=function(t){var n=800,s=800;t.svg=E("svg").attr("style","border: 1px solid black;position:fixed; top:0; left:0; height:100%; width:100%").attr("viewBox",[-n/2,-s/2,n,s]).attr("oncontextmenu","return false;"),t.allzoomedelements=t.svg.append("g"),e.boudaryRect=t.allzoomedelements.append("rect").attr("width",t.chartarea.xmax-t.chartarea.xmin).attr("height",t.chartarea.ymax-t.chartarea.ymin).attr("x",t.chartarea.xmin).attr("y",t.chartarea.ymin).attr("style","fill: white;stroke-width:3;stroke:rgb(0,0,0)"),t.svg.call(D().extent([[0,0],[n,s]]).scaleExtent([-5,10]).on("zoom",c)),t.svg.on("dblclick.zoom",null);function c(r,l){t.allzoomedelements.attr("transform",r.transform)}return t.allzoomedelements.append("text").attr("text-anchor","middle").attr("alignment-baseline","central").attr("x",0).attr("y",-70).attr("style","font-size: 60px; font-weight: 800;").text(r=>e.workflow.name),t.allzoomedelements.append("text").attr("text-anchor","middle").attr("alignment-baseline","central").attr("x",0).attr("y",-0).attr("style","font-size: 50px; font-weight: 300;").text(r=>"Projects for patch "+e.patch_data.name),t.allzoomedelements.append("text").attr("text-anchor","middle").attr("alignment-baseline","central").attr("x",0).attr("y",60).attr("style","font-size: 40px; font-weight: 300;").text(r=>"(Note: Diagram only - workflows not yet implemented)"),t.svg.node()},a=document.getElementById("chartInsetionPoint_workflowchart");a.firstChild;)console.log("Removing old SVG"),a.removeChild(a.firstChild);a.appendChild(o(this)),this.svg.append("marker").attr("id","triangle").attr("viewBox","0 0 10 10").attr("refX","8").attr("refY","5").attr("markerUnits","strokeWidth").attr("markerWidth","4").attr("markerHeight","4").attr("orient","auto").attr("fill","black").append("path").attr("d","M 0 0 L 10 5 L 0 10 z"),O(this.allzoomedelements,this.workflow,this.click_stage_callback)},click_stage_callback(e,o){this.$emit("onclickstage",e,o)},clickDIV(){}},mounted(){this.initChart()}});function ae(e,o,a,t,n,s){return i(),d("div",{id:"chartInsetionPoint_workflowchart",onClick:o[0]||(o[0]=c=>e.clickDIV(c))})}var re=b(oe,[["render",ae]]);const ne=w({name:"ToolsCansavePatchePage",components:{ProjectTable:K,WrokflowChart:re},setup(){return{backend_connection_store:B()}},data(){return{loaded:!1,patch_data:{},loaded_projects:[],table_view:!0}},computed:{user_profile(){return this.backend_connection_store.user_profile}},methods:{onchartclickstage(e,o){console.log("clicked onchartclickstage",e,o),this.table_view=!0},clicknewproject(){this.$router.push("/tools/brrcalc?patchid="+this.$route.params.patchid)},click_brrr_card(){this.$router.push("/tools/brrcalc")},refresh(){const e=this,o={ok:e.refresh_success,error:function(a){L.create({color:"negative",message:"Failed to find patch information",timeout:2e3}),e.$router.push("/tools/cansave/patches")}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/patches/"+e.$route.params.patchid,method:"GET",data:void 0,callback:o})},refresh_success(e){this.patch_data=e.data,this.loaded_projects=this.patch_data.projects.map(function(o){return{id:o,loaded:!1,item:void 0}}),this.recursive_load_project_details(),this.loaded=!0},recursive_load_project_details(){const e=this.loaded_projects.filter(function(n){return n.loaded===!1});if(e.length===0)return;const o=e[0],a=this,t={ok:function(n){o.loaded=!0,o.item=n.data.sub_section_details,a.recursive_load_project_details()},error:function(n){o.loaded=!0,o.address="TODO LOAD FAIL",a.recursive_load_project_details()}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/projects/"+o.id,method:"GET",data:void 0,callback:t})}},mounted(){this.loaded=!1,this.refresh()}}),se={key:0},ie=u("h1",null,"Loading...",-1),le=[ie],de={key:1},ce={key:0},pe={key:1};function fe(e,o,a,t,n,s){const c=x("ProjectTable"),r=x("WrokflowChart");return i(),V(N,{class:"flex flex-center"},{default:m(()=>[e.loaded?f("",!0):(i(),d("div",se,le)),e.loaded?(i(),d("div",de,[e.table_view?(i(),d("div",ce,[u("h1",null,_(e.patch_data.name),1),u("h2",null,[T("Projects "),p(C,{color:"primary",icon:"account_tree",label:"Worlflow",onClick:o[0]||(o[0]=l=>e.table_view=!1)})]),u("div",null,[p(c,{projects:e.loaded_projects},null,8,["projects"])]),p(C,{color:"primary",label:"Add Project",onClick:e.clicknewproject},null,8,["onClick"])])):f("",!0),e.table_view?f("",!0):(i(),d("div",pe,[p(r,{patch_data:e.patch_data,onOnclickstage:e.onchartclickstage},null,8,["patch_data","onOnclickstage"])]))])):f("",!0)]),_:1})}var be=b(ne,[["render",fe]]);export{be as default};
