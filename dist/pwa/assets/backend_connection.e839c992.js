import{a0 as k,P as d}from"./index.0e433a18.js";import{a as _}from"./axios.6e1fcf85.js";const f="https://api.metcarob.com/property_backend/v0",l={infoAPIPrefix:{url:"/public/api/info",add_token:!1},loginAPIPrefix:{url:"/public/api/login",add_token:!1},privateUserAPIPrefix:{url:"/private/api/user",add_token:!0},privateAdminAPIPrefix:{url:"/private/api/admin",add_token:!0}},i=Object.freeze({notconnected:0,connecting:1,connected:2,failed:3,logininprogress:4,loggedin:5});function m(e,n){return Object.keys(e).filter(function(t){return e[t]===n})[0]}function u(){return{pims:{state:""}}}function g(){return{login_token:"",refresh_token:""}}function h(){return{api_calls_to_make:[],running:!1}}const v=60*60*42;function p({frontend_instance:e,refresh_token:n,user_id:t,server_info_response:o}){const r=parseInt(o.data.Derived.APIAPP_REFRESH_TOKEN_TIMEOUT)/v,s={frontend_instance:e,refresh_token:n,user_id:t};d.set("loginRefreshToken",s,{secure:!window.location.href.includes("localhost"),expires:r})}function P(){return d.has("loginRefreshToken")}function y(){return d.get("loginRefreshToken")}function I(){return d.remove("loginRefreshToken")}const R=k("backendConnectionStore",{state:()=>({connection_state:{state:i.notconnected,error:"",server_info_response:{}},user_profile:u(),login_info:g(),api_caller:h()}),getters:{security_role_cansave(e){return this.isLoggedin?this.hasRole({role:e.connection_state.server_info_response.data.Derived.security_role_cansave}):!1},frontendInstance(e){return new URL(window.location.href).host==="evernetproperties.com"?"prod":"dev"},connectionStateString(e){let n=m(i,e.connection_state.state);return e.connection_state.state===i.failed&&(n+=" ("+e.connection_state.error+")"),n+" ("+this.frontendInstance+")"},isConnected(e){return!(e.connection_state.state===i.notconnected||e.connection_state.state===i.connecting)},isLogininprogress(e){return e.connection_state.state===i.logininprogress},isLoggedin(e){return e.connection_state.state===i.loggedin},hasRole(e){const n=this;return function({role:t}){return n.isLoggedin?e.user_profile.roles.includes(t):!1}}},actions:{connect(e){if(this.connection_state.state===i.connecting){console.log("backend_connection Call to connect while already connecting - ignoring call");return}if(this.connection_state.state!==i.notconnected){typeof e!="undefined"&&e.ok({});return}var n={method:"GET",url:f+l.infoAPIPrefix.url+"/serverinfo"};_(n).then(t=>{this._connection_complete_success(t,e)},t=>{this._connection_complete_fail(t,e)})},_connection_complete_success(e,n){if(this.connection_state.state=i.connected,this.connection_state.error="",this.connection_state.server_info_response=e,P()){const o=y();if(this.frontendInstance!==o.frontend_instance){console.log("Read a refresh token cookie but frontend instance mismatched",o.frontend_instance);return}var t=this;this.connection_state.state=i.logininprogress,t.get_new_token_using_refresh_token({user_id:o.user_id,refresh_token:o.refresh_token,success_fn:function(){t.connection_state.state=i.loggedin,console.log("Sucessful login"),typeof n!="undefined"&&n.ok(e)},fail_fn:function(){t.connection_state.state=i.connected,console.log("Refresh token failed"),typeof n!="undefined"&&n.ok(e)}})}else typeof n!="undefined"&&n.ok(e)},_connection_complete_fail(e,n){this.connection_state.state=i.failed,this.connection_state.error=JSON.stringify(e),this.connection_state.server_info_response={},typeof n!="undefined"&&n.error(e)},login(e,n){const t=this,o=function(r){t._login_callback_from_google(r,e)};this.connection_state.state=i.logininprogress,window.google.accounts.id.initialize({client_id:n,callback:o}),window.google.accounts.id.prompt()},_login_callback_from_google(e,n){const t={frontend_instance:this.frontendInstance,google_response:e};var o={method:"POST",url:f+l.loginAPIPrefix.url+"/login",data:t};_(o).then(r=>{this._login_complete_success(r,n)},r=>{console.log("Error resposne from login - ",r.response),this.connection_state.state=i.connected,typeof n!="undefined"&&n.error(r)})},_login_complete_success(e,n){console.log("_login_complete_success reached"),this.connection_state.state=i.loggedin,this.user_profile=e.data.user_profile,this.login_info.login_token=e.data.login_token,this.login_info.refresh_token=e.data.refresh_token,p({frontend_instance:this.frontendInstance,refresh_token:e.data.refresh_token,user_id:this.user_profile.id,server_info_response:this.connection_state.server_info_response}),typeof n!="undefined"&&n.ok(e)},logout(){I(),this.connection_state.state=i.connected,this.user_profile=u(),this.login_info=g(),this.api_caller=h()},update_user_profile({user_profile:e,then:n}){this.user_profile=e,typeof n!="undefined"&&n()},call_api({apiprefix:e,url:n,method:t,data:o,callback:r}){this.api_caller.api_calls_to_make.push({apiprefix:e,url:n,method:t,data:o,callback:r}),this.api_caller.running||(this.api_caller.running=!0,this.process_all_api_calls())},process_all_api_calls(){if(this.api_caller.api_calls_to_make.length===0){this.api_caller.running=!1;return}const e=this.api_caller.api_calls_to_make.shift();this.process_all_api_calls_make_individual_call({cur_api_call_to_make:e,refresh_tried:!1})},process_all_api_calls_make_individual_call({cur_api_call_to_make:e,refresh_tried:n}){const t=this,o={ok:function(s){e.callback.ok(s),t.process_all_api_calls()},error:function(s){if(typeof s.response!="undefined"&&s.response.status===401&&!n){console.log("API Error - got 401 trying to update refresh token"),t.get_new_token_using_refresh_token({user_id:t.user_profile.id,refresh_token:t.login_info.refresh_token,success_fn:function(){t.process_all_api_calls_make_individual_call({cur_api_call_to_make:e,refresh_tried:!0})},fail_fn:function(){console.log("Refresh token failed - logging out user"),t.api_caller.running=!1,t.logout()}});return}console.log("error response",s.response),e.callback.error(s),t.process_all_api_calls()}};var r={method:e.method,url:f+l[e.apiprefix].url+e.url,data:e.data,headers:{"Content-Type":"application/json"}};if(l[e.apiprefix].add_token){if(!this.isLoggedin){o.error({message:"Need to be logged in to make this call"});return}r.headers.Authorization="Bearer "+this.login_info.login_token}_(r).then(s=>{o.ok(s)},s=>{o.error(s)})},get_new_token_using_refresh_token({user_id:e,refresh_token:n,success_fn:t,fail_fn:o}){const r={frontend_instance:this.frontendInstance,user_id:e,refresh_token:n};var s={method:"POST",url:f+l.loginAPIPrefix.url+"/refresh",data:r};const c=this;_(s).then(a=>{c.user_profile=a.data.user_profile,c.login_info.login_token=a.data.login_token,c.login_info.refresh_token=a.data.refresh_token,p({frontend_instance:c.frontendInstance,refresh_token:a.data.refresh_token,user_id:c.user_profile.id,server_info_response:c.connection_state.server_info_response}),t()},a=>{o()})}}});export{R as u};