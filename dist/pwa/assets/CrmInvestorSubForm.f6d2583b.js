import{g as E,j as R,v as q,ab as w,ac as I,B as A,q as U,x as j,u as k,ad as D,a1 as x,a3 as Q,ae as T,af as $,d as z,_ as L,o as N,K as O,e as r,a as m,w as W,ag as b,Q as B}from"./index.0e8ded48.js";var K=E({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(o,{slots:s,emit:c}){const v=k(),u=R(null);let d=0;const e=[];function h(t){const i=typeof t=="boolean"?t:o.noErrorFocus!==!0,p=++d,V=(n,a)=>{c("validation"+(n===!0?"Success":"Error"),a)},C=n=>{const a=n.validate();return typeof a.then=="function"?a.then(l=>({valid:l,comp:n}),l=>({valid:!1,comp:n,err:l})):Promise.resolve({valid:a,comp:n})};return(o.greedy===!0?Promise.all(e.map(C)).then(n=>n.filter(a=>a.valid!==!0)):e.reduce((n,a)=>n.then(()=>C(a).then(l=>{if(l.valid===!1)return Promise.reject(l)})),Promise.resolve()).catch(n=>[n])).then(n=>{if(n===void 0||n.length===0)return p===d&&V(!0),!0;if(p===d){const{comp:a,err:l}=n[0];if(l!==void 0&&console.error(l),V(!1,a),i===!0){const F=n.find(({comp:P})=>typeof P.focus=="function"&&D(P.$)===!1);F!==void 0&&F.comp.focus()}}return!1})}function y(){d++,e.forEach(t=>{typeof t.resetValidation=="function"&&t.resetValidation()})}function _(t){t!==void 0&&x(t);const i=d+1;h().then(p=>{i===d&&p===!0&&(o.onSubmit!==void 0?c("submit",t):t!==void 0&&t.target!==void 0&&typeof t.target.submit=="function"&&t.target.submit())})}function g(t){t!==void 0&&x(t),c("reset"),Q(()=>{y(),o.autofocus===!0&&o.noResetFocus!==!0&&f()})}function f(){T(()=>{if(u.value===null)return;const t=u.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||u.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||u.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(u.value.querySelectorAll("[tabindex]"),i=>i.tabIndex>-1);t!=null&&t.focus({preventScroll:!0})})}q($,{bindComponent(t){e.push(t)},unbindComponent(t){const i=e.indexOf(t);i>-1&&e.splice(i,1)}});let S=!1;return w(()=>{S=!0}),I(()=>{S===!0&&o.autofocus===!0&&f()}),A(()=>{o.autofocus===!0&&f()}),Object.assign(v.proxy,{validate:h,resetValidation:y,submit:_,reset:g,focus:f,getValidationComponents:()=>e}),()=>U("form",{class:"q-form",ref:u,onSubmit:_,onReset:g},j(s.default))}});const M=z({name:"CrmInvestorSubForm",data(){return{first_name:"",last_name:"",phone_mobile:"",email1:""}},computed:{postSubscribeUrl(){const o=window.location.href.split("/");return o[0]+"//"+o[2]+"/postsubscribe"}},methods:{onSubmit(){console.log("TODO onSubmit")},onReset(){this.first_name="",this.last_name="",this.phone_mobile="",this.email1=""}}}),G={class:"fit row wrap justify-center items-center content-center"},H={class:"fit row wrap justify-center items-center content-center"},J=r("div",{class:"form_heading"},"Apply for investor list",-1),X=r("div",{class:"flex-break"},null,-1),Y=r("div",{class:"flex-break"},null,-1),Z=r("input",{name:"campaign_id",id:"campaign_id",type:"hidden",value:"34e56d3d-9962-a6e1-b970-657865ca5495"},null,-1),ee=["value"],te=r("input",{name:"assigned_user_id",id:"assigned_user_id",type:"hidden",value:"57d17220-c1e8-056b-f46f-654cc8c17b7c"},null,-1),oe=r("input",{name:"moduleDir",id:"moduleDir",type:"hidden",value:"Leads"},null,-1);function ne(o,s,c,v,u,d){return N(),O("div",G,[r("div",H,[J,X,m(K,{onReset:o.onReset,class:"q-gutter-md",action:"https://suitecrm.metcarob.com/index.php?entryPoint=WebToPersonCapture",method:"post",name:"WebToLeadForm",id:"WebToLeadForm"},{default:W(()=>[m(b,{filled:"",color:"grey",modelValue:o.first_name,"onUpdate:modelValue":s[0]||(s[0]=e=>o.first_name=e),label:"First Name *",name:"first_name","lazy-rules":"",class:"form-input",rules:[e=>e&&e.length>0||"Please type something"]},null,8,["modelValue","rules"]),m(b,{filled:"",color:"grey",modelValue:o.last_name,"onUpdate:modelValue":s[1]||(s[1]=e=>o.last_name=e),name:"last_name",label:"Last Name","lazy-rules":"",class:"form-input"},null,8,["modelValue"]),Y,m(b,{filled:"",color:"grey",modelValue:o.phone_mobile,"onUpdate:modelValue":s[2]||(s[2]=e=>o.phone_mobile=e),name:"phone_mobile",label:"Phone *","lazy-rules":"",class:"form-input",rules:[e=>e&&e.length>0||"Please type something"]},null,8,["modelValue","rules"]),m(b,{filled:"",color:"grey",modelValue:o.email1,"onUpdate:modelValue":s[3]||(s[3]=e=>o.email1=e),name:"email1",label:"Email *","lazy-rules":"",class:"form-input",rules:[e=>e&&e.length>0||"Please type something"]},null,8,["modelValue","rules"]),Z,r("input",{name:"redirect_url",id:"redirect_url",type:"hidden",value:o.postSubscribeUrl},null,8,ee),te,oe,r("div",null,[m(B,{label:"Submit",type:"submit",color:"grey"}),m(B,{label:"Reset",type:"reset",color:"lightgrey",flat:"",class:"q-ml-sm"})])]),_:1},8,["onReset"])])])}var le=L(M,[["render",ne]]);export{le as C};