import{_ as c,d as _,r as h,o as e,K as i,ar as s,e as o,t as a,c as p,bc as m,a as l,af as f}from"./index.973cf71c.js";import{T as g,g as u}from"./TutorialCard.b7950cbc.js";const v=_({name:"TrainingTutorial",components:{TutorialCard:g},data(){return{}},computed:{tutorials(){const t=this;return u.glob_tutorials.filter(function(r){return r.id===t.$route.params.tutorial})},next_tutorial(){const t=this;if(typeof t.tutorials[0].next=="undefined")return;const n=u.glob_tutorials.filter(function(r){return r.id===t.tutorials[0].next});if(n.length===1)return n[0]}},methods:{back_to_tutorial_list(){this.$router.push("/tools/training")}}}),T={class:"tutorial-page"},y={key:0},k=o("h1",null,"Tutorial Not Found",-1),C=[k],b={key:1},B={class:"col"},$=["src"],N=o("h2",null,"Video",-1),V={key:0},x={key:2},D=o("h1",null,"Next step...",-1),w=o("p",null,"We recommend you watch this tutorial next",-1),E={align:"center"};function F(t,n,r,I,K,P){const d=h("TutorialCard");return e(),i("div",T,[t.tutorials.length!==1?(e(),i("div",y,C)):s("",!0),t.tutorials.length===1?(e(),i("div",b,[o("div",null,[o("h1",null,a(t.tutorials[0].name),1),o("div",B,[o("div",null,[o("img",{alt:"Item Picture",src:"/training/"+t.tutorials[0].id+".png",style:{height:"80px"}},null,8,$)]),o("div",null,a(t.tutorials[0].description),1)]),N,typeof t.tutorials[0].youtubevidref=="undefined"?(e(),i("div",V," Coming soon... ")):s("",!0),(e(),p(m(t.tutorials[0].component)))])])):s("",!0),typeof t.tutorials[0].next!="undefined"?(e(),i("div",x,[D,w,o("div",null,[l(d,{tutorial:t.next_tutorial},null,8,["tutorial"])])])):s("",!0),o("div",E,[l(f,{color:"positive",label:"Back to tutorial list",onClick:t.back_to_tutorial_list},null,8,["onClick"])])])}var W=c(v,[["render",F]]);export{W as default};