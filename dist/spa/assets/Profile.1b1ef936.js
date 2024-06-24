import{_ as v,v as k,N as n,y as m,z as y,A as u,C as i,H as d,D as a,E as p,F as I,G as C,B as s,ae as c,a7 as f,aq as h,af as P,ag as g,ad as b,b5 as M,ao as T,aZ as S}from"./index.e57f4910.js";import{Q as E}from"./QPage.cdd50cc7.js";import{C as V}from"./ClosePopup.ea533e33.js";import{u as w}from"./backend_connection.2b1e6bae.js";import"./axios.6e1fcf85.js";function N(e,t){const l=document.createElement("textarea");l.value=e,document.body.appendChild(l),l.focus(),l.select();try{const _=document.execCommand("copy")?"successful":"unsuccessful";console.log("Fallback: Copying text command was "+_)}catch(r){t("Fallback: Oops, unable to copy"+r)}document.body.removeChild(l)}function A(e,t,l){if(!navigator.clipboard){N(e,l);return}navigator.clipboard.writeText(e).then(function(){t.ok()},function(r){callbackHelper.callbackWithSimpleError("Copy Failed: "+r)})}var D={copyTextToClipboard2:A};const F=k({name:"ProfilePage",setup(){return{backend_connection_store:w()}},components:{},data(){return{enterpimsdialog:{visible:!1,number:"",first_name:"",last_name:""}}},computed:{isLoggedin(){return this.backend_connection_store.isLoggedin},user_profile(){return this.backend_connection_store.user_profile},pimsverfiylink(){const e=window.location.origin+"/#/v/"+this.user_profile.pims.verify_code+"/"+this.user_profile.pims.number;return"Robert - Please verify my PIMS "+this.user_profile.pims.first_name+"/"+this.user_profile.pims.last_name+" ("+this.user_profile.pims.number+') <a href="'+e+'" target="_new">'+e+"</a>"}},methods:{clickcopypimsverfiylink(){const e=this,t={ok:function(l){n.create({color:"bg-grey-2",message:"Copied text to clipboard "+e.pimsverfiylink,timeout:2e3})},error:function(l){n.create({color:"negative",message:"Copy to clipboard failed",timeout:2e3})}};D.copyTextToClipboard2(this.pimsverfiylink,t)},logout(){this.backend_connection_store.logout(),this.$router.push("/tools")},clickenterpimsinformation(){this.enterpimsdialog.number="",this.enterpimsdialog.first_name="",this.enterpimsdialog.last_name="",this.enterpimsdialog.visible=!0},pimsinfo(){const e=this;let t="Enter PIMS details";this.user_profile.pims.state==="WAITINGVERIFICATION"&&(t="Change PIMS details"),this.$q.dialog({title:"PIMS Membership Details",message:"Extra site features are available to users who have a verified PIMS membership.",html:!0,ok:{push:!0,label:t,color:"secondary"},cancel:{push:!0,label:"Close",color:"primary"}}).onOk(()=>{e.clickenterpimsinformation()})},enterpimsdialogclick(){const e=["numberref","first_nameref","last_nameref"];for(const r of e)this.$refs[r].validate();for(const r of e)if(this.$refs[r].hasError)return;const t={number:this.enterpimsdialog.number,first_name:this.enterpimsdialog.first_name,last_name:this.enterpimsdialog.last_name},l={ok:this.submitpimsinfo_success,error:this.submitpimsinfo_fail};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/me/pimsdetails",method:"POST",data:t,callback:l}),this.enterpimsdialog.visible=!1},submitpimsinfo_success(e){this.backend_connection_store.update_user_profile({user_profile:e.data}),n.create({color:"bg-grey-2",message:"New PIMS details saved - Please request Verification",timeout:2e3})},submitpimsinfo_fail(e){console.log("ERROR failed to update PIMS information ",e),n.create({color:"bg-grey-2",message:"Failed to update PIMS information "+e,timeout:2e3})},deleteaccount(){const e=this;this.$q.dialog({title:"Delete Account",message:"Deleting your account will wipe all your user data from our system. This inclues all saved properties. Are you sure? (Type DELETE below to confirm)",html:!1,ok:{push:!0,label:"Delete",color:"red"},cancel:{push:!0,label:"Cancel",color:"primary"},prompt:{model:"",type:"text"}}).onOk(t=>{if(t.trim()!=="DELETE"){n.create({color:"red",message:"Failed - You must type DELETE in the text box",timeout:2e3});return}const l={ok:function(r){e.logout(),n.create({color:"bg-grey-2",message:"User account deleted",timeout:2e3})},error:function(r){n.create({color:"bg-grey-2",message:"Account deletion failed "+r,timeout:2e3})}};this.backend_connection_store.call_api({apiprefix:"privateUserAPIPrefix",url:"/me/delete",method:"GET",data:t,callback:l})})}},mounted(){this.isLoggedin||this.$router.push("/tools")}}),L={rows:""},R=i("h3",{style:{margin:"0px"}},"User Profile",-1),$=i("h4",null,"Details",-1),x={class:"section"},O={class:"section"},Q={key:0},U=i("div",null,"PIMS Membership details not entered - Extra site features are available to Academy/PIMS members.",-1),B={align:"center"},z={key:1},q=i("div",null,"PIMS details entered but not verified. To verify please send a message in the Samuel Leeds Academy chat with the following text:",-1),G=["innerHTML"],H={key:2},W=i("div",null,[i("h5",null,"PIMS member")],-1),Y={key:3},Z=i("div",null,"Extra site features are available to Academy/PIMS members. PIMS Membership details verification failed",-1),j={align:"center"},J={class:"bottom-buttons"},K=i("div",{class:"text-h6"},"Your PIMS membership details",-1),X=i("div",null,[a("Details must match what appears on the "),i("a",{href:"https://www.thepims.co.uk/members/",target:"_new"},"PIMS website"),a(".")],-1);function ee(e,t,l,r,_,ie){return m(),y(E,{class:"flex flex-center"},{default:u(()=>[i("div",L,[R,$,i("div",x,[i("div",null,"User: "+d(e.user_profile.name),1),i("div",null,"Email: "+d(e.user_profile.email),1),i("div",null,[a("Roles: "),i("ul",null,[(m(!0),p(C,null,I(e.user_profile.roles,o=>(m(),p("div",{key:o},[i("li",null,d(o),1)]))),128))])])]),i("div",O,[i("h4",null,[a("PIMS Membership "),s(c,{round:"",dense:"",flat:"",icon:"info",onClick:e.pimsinfo},null,8,["onClick"])]),e.user_profile.pims.state==="NOTENTERED"?(m(),p("div",Q,[U,i("div",B,[s(c,{label:"Enter PIMS information",color:"primary",onClick:e.clickenterpimsinformation},null,8,["onClick"])]),i("div",null,[a("PIMS Membership verified: "),s(f,{name:"cancel",color:"red",size:"32px"})])])):h("",!0),e.user_profile.pims.state==="WAITINGVERIFICATION"?(m(),p("div",z,[q,i("div",{class:"pimstext",onClick:t[0]||(t[0]=(...o)=>e.clickcopypimsverfiylink&&e.clickcopypimsverfiylink(...o))},[i("div",{innerHTML:e.pimsverfiylink},null,8,G),a("\xA0 "),s(f,{class:"float-right",name:"content_copy",size:"16px"})]),i("div",null,[a("PIMS Membership verified: "),s(f,{name:"cancel",color:"red",size:"32px"})])])):h("",!0),e.user_profile.pims.state==="VERIFIED"?(m(),p("div",H,[W,i("div",null,d(e.user_profile.pims.first_name)+" "+d(e.user_profile.pims.last_name)+" - PIMS number "+d(e.user_profile.pims.number),1),i("div",null,[a("PIMS Membership verified: "),s(f,{name:"check_box",color:"green",size:"32px"})])])):h("",!0),e.user_profile.pims.state==="VERIFICATIONFAILED"?(m(),p("div",Y,[Z,i("div",j,[s(c,{label:"Retry entering PIMS information",color:"primary",onClick:e.clickenterpimsinformation},null,8,["onClick"])]),i("div",null,[a("PIMS Membership verified: "),s(f,{name:"cancel",color:"red",size:"32px"})])])):h("",!0)]),i("div",J,[s(c,{class:"bottom-button",onClick:e.logout,color:"secondary",label:"Logout"},null,8,["onClick"]),s(c,{class:"bottom-button",onClick:e.deleteaccount,color:"red",label:"Delete my account"},null,8,["onClick"])])]),s(S,{modelValue:e.enterpimsdialog.visible,"onUpdate:modelValue":t[4]||(t[4]=o=>e.enterpimsdialog.visible=o),persistent:""},{default:u(()=>[s(P,null,{default:u(()=>[s(g,null,{default:u(()=>[K]),_:1}),s(g,{class:"q-pt-none"},{default:u(()=>[X,s(b,{modelValue:e.enterpimsdialog.number,"onUpdate:modelValue":t[1]||(t[1]=o=>e.enterpimsdialog.number=o),label:"PIMS Number",rules:[o=>o.trim().length>4||"Minimum 5 characters",o=>o.trim().match(/^\d+$/)!==null||"Numeric characters only"],ref:"numberref"},null,8,["modelValue","rules"]),s(b,{modelValue:e.enterpimsdialog.first_name,"onUpdate:modelValue":t[2]||(t[2]=o=>e.enterpimsdialog.first_name=o),label:"First Name",rules:[o=>o.trim().length>1||"Minimum 2 characters"],ref:"first_nameref"},null,8,["modelValue","rules"]),s(b,{modelValue:e.enterpimsdialog.last_name,"onUpdate:modelValue":t[3]||(t[3]=o=>e.enterpimsdialog.last_name=o),label:"Last Name",rules:[o=>o.trim().length>1||"Minimum 2 characters"],ref:"last_nameref"},null,8,["modelValue","rules"])]),_:1}),s(M,{align:"right"},{default:u(()=>[T(s(c,{flat:"",label:"Cancel"},null,512),[[V]]),s(c,{flat:"",label:"Submit for Verification",color:"secondary",onClick:e.enterpimsdialogclick},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}var ae=v(F,[["render",ee]]);export{ae as default};