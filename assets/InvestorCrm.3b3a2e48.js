import{_ as u,d as p,o as r,c as f,w as h,e as t,K as i,M as _,a as n,a7 as v,f as d,t as b,L as y,af as l,a8 as g,ar as c}from"./index.d28e8c48.js";import{Q as w}from"./QPage.eb06fdae.js";import{u as k}from"./backend_connection.afe2aebf.js";import{a as I}from"./axios.6e1fcf85.js";import{_ as C}from"./profile-pic.7c750275.js";const x={orig:{xnQsjsdp:"bd43a2093c2314b47f4b9de486d85207d54b805ad6322b5455c8159001d9eab5",xmIwtLD:"0ae12d7f69d3c7ea9f0497a159c39bd039032c4df1824bbb5178afa1e53cfe9dd15b6402dab2f9df9c73c98b82b2ddb8",pipeline:"Sourcers met at Networking Standard",stage:"Met"}},V=p({name:"InvestorCrmPage",components:{},data(){return{submitted:!1,features:["Add new investors you meet at events","Follow up the next day","Build process to train investors how to buy the deal","Suceed by design, not by accident","Easy to use","Doesn\u2019t break the bank"],form_data:{first_name:"",last_name:"",email:"",phone:""}}},setup(){return{backend_connection_store:k()}},computed:{frontendInstance(){return this.backend_connection_store.frontendInstance}},methods:{submit_info(){const e=this,s=x.orig;var o=new FormData;o.append("xnQsjsdp",s.xnQsjsdp),o.append("zc_gad",""),o.append("xmIwtLD",s.xmIwtLD),o.append("actionType","UG90ZW50aWFscw=="),o.append("returnURL",void 0),o.append("Potential Name",e.frontendInstance+" Website InvestorCRM"+e.form_data.last_name),o.append("Contacts.First Name",e.form_data.first_name),o.append("Contacts.Last Name",e.form_data.last_name),o.append("Contacts.Phone",e.form_data.phone),o.append("Contacts.Email",e.form_data.email),o.append("Pipeline",s.pipeline),o.append("Stage",s.stage),I({method:"post",url:"https://bigin.zoho.eu/crm/WebForm",data:o,headers:{"Content-Type":"multipart/form-data"}}).then(function(m){e.submitted=!0}).catch(function(m){console.log("Failed to register on CRM"),console.log(m)})}}}),D={class:"main-page fit row wrap justify-center items-center content-center"},F=t("h2",null,"How do you manage your investor list?",-1),M=t("div",{class:"investorcrm-flex-break"},null,-1),N={class:"flex row first-section"},S=t("div",null,[t("img",{alt:"Profile Picture",src:C,class:"investorcrm-profile-picture"})],-1),L={class:"flex column",style:{"max-width":"500px"}},P=t("div",{class:"investorcrm-para"},[d("I have met many deals sourcers and told them my investment requirements. I never hear from them and then a few months later they appear on the mastermind telling everyone "),t("b",null,"\u201CThey can\u2019t sell a deal\u201D"),d(". Is this you? Do you have an investor list? Do you follow up on new leads? Are you simply running a mailing list or are you actually "),t("b",null,"managing the relationship"),d(" you have with investors?")],-1),Q=t("div",{class:"investorcrm-para"},"It\u2019s hard work doing it properly but it doesn\u2019t have to be. I have years of experience working on CRM systems for large businesses with million pound price tags. Since getting into property I have finally found a system appropriate for Deal Sourcers which makes managing your investor workflow easy and won\u2019t break the bank. I host regular webinars to show you how this CRM can take the stress out of managing your deal pipeline, so you can focus on your investors\u2014not on the admin.",-1),T=t("div",{class:"investorcrm-flex-break"},null,-1),B=t("div",{class:"investorcrm-para-title"},"Interested?",-1),U=t("div",{class:"investorcrm-flex-break"},null,-1),R=t("div",{class:"investorcrm-para"},"Fill out the form below to secure your spot in the next session!",-1),j=t("div",{class:"investorcrm-flex-break"},null,-1),E={key:0},W={class:"row"},$={class:"row"},z={key:1},A=t("div",{class:"investorcrm-para-title"},"Thank you - we will be in touch",-1),q=[A];function G(e,s,o,m,H,K){return r(),f(w,{class:"flex flex-center"},{default:h(()=>[t("div",D,[F,M,t("div",N,[S,t("div",L,[P,Q,(r(!0),i(y,null,_(e.features,a=>(r(),i("div",{key:a,class:"investorcrm-list-item"},[n(v,{name:"check_box",color:"green",size:"32px"}),d(b(a),1)]))),128))])]),T,B,U,R,j,e.submitted?c("",!0):(r(),i("div",E,[n(l,{modelValue:e.form_data.first_name,"onUpdate:modelValue":s[0]||(s[0]=a=>e.form_data.first_name=a),label:"First Name",rules:[a=>a.trim().length>1||"Minimum 2 characters"],ref:"first_nameref"},null,8,["modelValue","rules"]),n(l,{modelValue:e.form_data.last_name,"onUpdate:modelValue":s[1]||(s[1]=a=>e.form_data.last_name=a),label:"Last Name",rules:[a=>a.trim().length>1||"Minimum 2 characters"],ref:"last_nameref"},null,8,["modelValue","rules"]),t("div",W,[n(l,{modelValue:e.form_data.phone,"onUpdate:modelValue":s[2]||(s[2]=a=>e.form_data.phone=a),label:"Phone",rules:[a=>a.trim().length>0||"Minimum 1 character"],ref:"phoneref",class:"col-grow"},null,8,["modelValue","rules"])]),t("div",$,[n(l,{modelValue:e.form_data.email,"onUpdate:modelValue":s[3]||(s[3]=a=>e.form_data.email=a),label:"Email",rules:[a=>a.trim().length>7||"Minimum 8 characters"],ref:"emailref",class:"col-grow"},null,8,["modelValue","rules"])]),n(g,{label:"Submit",color:"secondary",onClick:e.submit_info},null,8,["onClick"])])),e.submitted?(r(),i("div",z,q)):c("",!0)])]),_:1})}var ee=u(V,[["render",G]]);export{ee as default};
