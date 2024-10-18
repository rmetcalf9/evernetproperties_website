import{_,d as f,aq as y,r as u,o,c as g,w as v,N as d,e,K as n,a as s,ar as a,f as i,a7 as k,a8 as l,t as b}from"./index.4d294161.js";import{Q as w}from"./QPage.45eb7f37.js";import{u as S,a as P}from"./backend_connection.66eb1750.js";import{L as C}from"./LoginButton.f4248986.js";import{P as T}from"./ProfilePimsDetailForm.8c67357a.js";import"./axios.6e1fcf85.js";const I=f({name:"SignUpToEarlyAccessPage",components:{LoginButton:C,ProfilePimsDetailForm:T},setup(){const t=S(),r=y();return{backend_connection_store:t,route:r}},data(){return{}},computed:{isLoggedin(){return this.backend_connection_store.isLoggedin},step(){return this.isLoggedin?this.user_profile.pims.state==="VERIFIED"?50:this.user_profile.pims.state==="NOTENTERED"?2:this.user_profile.pims.state==="WAITINGVERIFICATION"?3:this.user_profile.pims.state==="VERIFICATIONFAILED"?51:99:1},user_profile(){return this.backend_connection_store.user_profile},pimsverfiylink(){const t=window.location.origin+"/#/v/"+this.user_profile.pims.verify_code+"/"+this.user_profile.pims.number;return"Robert - Please verify my PIMS "+this.user_profile.pims.first_name+"/"+this.user_profile.pims.last_name+" ("+this.user_profile.pims.number+') <a href="'+t+'" target="_new">'+t+"</a>"}},methods:{clickcopypimsverfiylink(){const t=this,r={ok:function(c){d.create({color:"bg-grey-2",message:"Copied text to clipboard "+t.pimsverfiylink,timeout:2e3})},error:function(c){d.create({color:"negative",message:"Copy to clipboard failed",timeout:2e3})}};P.copyTextToClipboard2(this.pimsverfiylink,r)},click_get_started(){this.$router.push("/tools")},click_training(){this.$router.push("/tools/training")}}}),E={rows:"",style:{"max-width":"800px"}},N=e("h2",null,"Property Pipeline Builder!",-1),L=e("h3",null,"Early access program",-1),B=e("h3",null,"Sign up",-1),M={key:0},O=e("h4",null,"Step 1",-1),D=e("p",null,"Sign into the website",-1),V={width:"100%",class:""},A={key:1},F=e("h4",null,"Step 2",-1),R=e("p",null,[i("Our early access program is limited to members of the Samuel Leeds academy. To verify this we need to check your PIMS number. Please provide details below exactly as they appear on the "),e("a",{href:"https://www.thepims.co.uk/members/",target:"_new"},"PIMS website"),i(".")],-1),$={key:2},Q=e("h4",null,"Step 3",-1),Y=e("p",null,[i('Your PIMS details have been submitted and you need to be verified. To verify your identity we confirm by verifying you from the academy "Samuel Social" app. Search for "Robert Metcalf" or '),e("a",{href:"https://groupchat.samuelleeds.com/members/d185549c/",target:"_new"},"click here to access my profile"),i(". Send following message to me:")],-1),x=["innerHTML"],U=e("p",null,"Once we have received the message we will verify you and grant you access. You will receive an email at the email address you provided.",-1),H={key:3},W=e("h4",null,"Sign up Complete!!",-1),j=e("p",null,"Congratulations! Your PIMS details have been verified and you have granted access to the program.",-1),q={style:{"margin-bottom":"10px"}},z={key:4},G=e("h4",null,"Step 2",-1),K=e("p",null,[i("Our early access program is limited to members of the Samuel Leeds academy. To verify this we need to check your PIMS number. Please provide details below exactly as they appear on the "),e("a",{href:"https://www.thepims.co.uk/members/",target:"_new"},"PIMS website"),i(".")],-1),J=e("div",{class:"signuptoearlyaccess_note"},"Verification failed. You can try re-entering your data and resubmitting.",-1),X={key:5};function Z(t,r,c,ee,te,oe){const m=u("LoginButton"),p=u("ProfilePimsDetailForm");return o(),g(w,{class:"flex justify-center signuptoearlyaccesspage"},{default:v(()=>[e("div",E,[N,L,B,t.step===1?(o(),n("div",M,[O,D,e("div",V,[s(m,{floating:!1})])])):a("",!0),t.step===2?(o(),n("div",A,[F,R,s(p,{supresscancelbutton:""})])):a("",!0),t.step===3?(o(),n("div",$,[Q,Y,e("div",{class:"pimstext",onClick:r[0]||(r[0]=(...h)=>t.clickcopypimsverfiylink&&t.clickcopypimsverfiylink(...h))},[e("div",{innerHTML:t.pimsverfiylink},null,8,x),i("\xA0 "),s(k,{class:"float-right",name:"content_copy",size:"16px"})]),U,e("div",null,[s(l,{color:"positive",label:"While you are waiting check out our training section",onClick:t.click_training},null,8,["onClick"])])])):a("",!0),t.step===50?(o(),n("div",H,[W,j,e("div",q,[s(l,{color:"positive",label:"Click here (or on \u201Ctools\u201D) to get started",onClick:t.click_get_started},null,8,["onClick"])]),e("div",null,[s(l,{label:"Or here to access our training section",onClick:t.click_training},null,8,["onClick"])])])):a("",!0),t.step===51?(o(),n("div",z,[G,K,J,s(p,{supresscancelbutton:""})])):a("",!0),t.step===99?(o(),n("div",X," NOT DONE - "+b(t.user_profile.pims.state),1)):a("",!0)])]),_:1})}var ce=_(I,[["render",Z]]);export{ce as default};
