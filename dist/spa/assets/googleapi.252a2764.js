import{b as n}from"./index.d6cdd244.js";var r=n(({app:o})=>{const e="954557855733-9fovnaaj81f4cpbceqfpn72i2e8oksaa.apps.googleusercontent.com",i="AIzaSyBBZEk5Pc3CKb79HfwePVumjIuxdamEyeU",a="https://sheets.googleapis.com/$discovery/rest?version=v4",c="https://www.googleapis.com/auth/drive.file";o.config.globalProperties.$gapi=window.gapi,o.config.globalProperties.$rjmgclientid=e,o.config.globalProperties.$rjmgapikey=i,o.config.globalProperties.$rjmgscopes=c;async function t(){await gapi.client.init({apiKey:i,discoveryDocs:[a]});function l(s){console.log("ERROR should not be using this callback")}window.google.accounts.id.initialize({client_id:i,callback:l})}window.gapi.load("client",t)});export{r as default};
