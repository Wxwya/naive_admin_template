import{d as u,U as s,V as d,a4 as C,W as o,X as r,Z as i,a6 as S,n as h,D as $,a5 as x,c as z,a7 as N,a8 as w,a3 as b,$ as v,F as k,a1 as j,Y as g,l as y}from"../@vue/@vue.BZ-2lvD_.js";import{N as B,F as T,G as P,H as V,I as H,J as X,a as D}from"../naive-ui/naive-ui.Bx5jQSU5.js";import{_ as F}from"../index.vue_vue_type_script_setup_true_lang/index.vue_vue_type_script_setup_true_lang.Be392PSz.js";import"../date-fns/date-fns.DgTlckns.js";import"../@babel/@babel.DUG-posk.js";import"../vooks/vooks.BV93TVnv.js";import"../evtd/evtd.w6UMCrcr.js";import"../treemate/treemate.D2QaFNcx.js";import"../vueuc/vueuc.C6QCelCy.js";import"../seemly/seemly.rOhaFQXL.js";import"../@css-render/@css-render.DfiQm-CI.js";import"../vdirs/vdirs.C-cKVzqF.js";import"../@juggle/@juggle.C8OzoCMD.js";import"../css-render/css-render.Dn4q1iwL.js";import"../@emotion/@emotion.WldOFDRm.js";import"../lodash-es/lodash-es.CJQM_G14.js";import"../date-fns-tz/date-fns-tz.trE61v3i.js";import"../async-validator/async-validator.CRbnkQr6.js";const I=u({__name:"index",props:{tooltipConfig:{type:Object,default:()=>{}},popConfig:{type:Object,default:()=>{}},popText:{type:String,default:""},tooltipText:{type:String,default:""},icon:{type:String,default:""},iconSize:{type:[Number,String],default:24}},setup(e){return(p,_)=>{const t=B,l=T,m=P;return s(),d(m,N(w(e.popConfig)),C({trigger:o(()=>[r(l,h({trigger:"hover"},e.tooltipConfig),{trigger:o(()=>[$(p.$slots,"default")]),default:o(()=>[i("span",null,x(e.tooltipText),1)]),_:3},16)]),default:o(()=>[z(" "+x(e.popText),1)]),_:2},[e.icon?{name:"icon",fn:o(()=>[r(t,{size:e.iconSize},{default:o(()=>[i("span",{class:S(e.icon)},null,2)]),_:1},8,["size"])]),key:"0"}:void 0]),1040)}}}),O=u({__name:"index",props:{pane:{type:Boolean,default:!1},tablist:{type:Array,default:()=>[]}},setup(e){const p=t=>u({render(){return typeof t=="function"?t():t}}),_=t=>{const l={...t};return delete l.children,l};return(t,l)=>{const m=V,c=H,f=X;return s(),d(f,h({type:"line",animated:""},t.$attrs),C({default:o(()=>[e.pane?(s(!0),v(k,{key:0},b(e.tablist,(n,a)=>(s(),d(m,h({key:a,ref_for:!0},_(n)),{default:o(()=>[n.children?(s(),d(j(p(n.children)),{key:0})):g("",!0)]),_:2},1040))),128)):g("",!0),e.pane?g("",!0):(s(!0),v(k,{key:1},b(e.tablist,(n,a)=>(s(),d(c,{key:a,name:n},null,8,["name"]))),128))]),_:2},[b(t.$slots,(n,a)=>({name:a,fn:o(()=>[$(t.$slots,a,{slot:n})])}))]),1040)}}}),R={class:"p-4"},A=i("div",{class:"border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4"},"按钮用法",-1),E={class:"py-10"},G=i("div",{class:"border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4"},"tabs示例(默认不是使用面板)",-1),J={class:"py-10"},L=i("div",{class:"border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4"},"tabs示例使用面板",-1),U={class:"py-10"},W=i("div",{class:"border-0 border-l-4 border-solid border-green-400 text-2xl font-bold pl-4"},"信息弹窗提示",-1),Y={class:"py-10"},me=u({__name:"index",setup(e){const p=[{name:"tabs1",children:y("div",{},"Hello1")},{name:"tabs2",children:y("div",{},"Hello2")},{name:"tabs3",children:y("div",{},"Hello3")}],_=()=>{window.$msg.info("是的")},t=()=>{window.$msg.info("并不")};return(l,m)=>{const c=F,f=D,n=O,a=I;return s(),v("div",R,[A,i("div",E,[r(f,null,{default:o(()=>[r(c,{type:"info",iconSize:30,size:"large",text:"按钮111",icon:"iconify-color emojione-v1--baby-chick"}),r(c,{type:"error",text:"error"}),r(c,{tertiary:"",circle:"",iconSize:"30",icon:"iconify-color emojione-v1--bear-face",size:"large"})]),_:1})]),G,i("div",J,[r(n,{tablist:["tab1","tab2","tab3"]})]),L,i("div",U,[r(n,{pane:!0,tablist:p})]),W,i("div",Y,[r(a,{icon:"iconify-color emojione-v1--airplane","pop-config":{onPositiveClick:_,onNegativeClick:t},"tooltip-config":{placement:"bottom"},"pop-text":"确认删除吗","tooltip-text":"删除"},{default:o(()=>[r(c,{type:"error",text:"error"})]),_:1},8,["pop-config"])])])}}});export{me as default};