(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[22],{Tn17:function(e,t,a){e.exports={inforow:"antd-pro-pages-merchant-member-product-inforow",addButton:"antd-pro-pages-merchant-member-product-addButton"}},m0uM:function(e,t,a){"use strict";a.r(t);a("y8nQ");var n,r,c,o=a("Vl3Y"),d=(a("IzEo"),a("bx4M")),s=(a("14J3"),a("BMrR")),i=(a("jCWc"),a("kPKH")),l=a("p0pE"),u=a.n(l),p=(a("miYZ"),a("tsqr")),h=a("2Taf"),m=a.n(h),g=a("vZ4D"),y=a.n(g),f=a("l4Ni"),b=a.n(f),I=a("ujKo"),C=a.n(I),D=a("MhPg"),_=a.n(D),q=a("q1tI"),k=a.n(q),v=a("MuoO"),x=a("dCQc"),w=a("KJZU"),E=a("zHco"),S=a("nz3n"),P=a("8joG"),R=a("TESu"),j=a("BtQg"),O=a("+n12"),M=a("Tn17"),T=a.n(M),B=(n=Object(v["connect"])(),n((c=function(e){function t(e){var a;m()(this,t),a=b()(this,C()(t).call(this,e)),a.getClassData=function(e,t){var n=a.state.headForm,r=[];Object(x["x"])(e,{}).then(function(e){200===e.status&&e.data.productCategories&&(e.data.productCategories.forEach(function(e){var t={value:e.productCategoryId,label:e.productCategoryName};r.push(t)}),n.formData[t].options=r,a.setState({headForm:n}))})},a.handChang1=function(e){a.getClassData(e,1)},a.handChang2=function(e){a.getClassData(e,2)},a.handAdd=function(e,t){var n=a.state,r=n.tableDatas,c=n.params,o=a.getDataByKey(r.data,t.productId);a.MemberProducZ.showModal(o,c.merchantId)},a.handUpdate=function(e,t){var n=a.state,r=n.tableDatas,c=n.params,o=a.getDataByKey(r.data,t.productId);a.MemberProducZ.showModal(o,c.merchantId)},a.handDele=function(e){e.preventDefault();var t=a.state.selectedRows;t.forEach(function(e){if("-"===e.discount)return p["a"].error("\u65e0\u6cd5\u5220\u9664\uff0c\u6ca1\u6709\u6298\u6263"),null;Object(x["s"])(e.discountId).then(function(e){var t=JSON.parse(e);200===t.status&&(p["a"].info("\u5220\u9664\u6210\u529f"),a.Reset())})})},a.getDataByKey=function(e,t){for(var a=e.length,n=0;n<a;n+=1)if(e[n].productId===t)return e[n];return null},a.handleSubmit=function(e){var t=e;"undefined"!==typeof t.rechargeTime&&(t["q_p.createdAt_gte"]=Object(O["e"])(t.rechargeTime[0].toDate()),t["q_p.createdAt_lte"]=Object(O["e"])(t.rechargeTime[1].toDate())),t["q_p.status_eq"]=e.q_p.status_eq,t["q_cc.productCategoryId"]=e.q_cc.productCategoryId_eq1?e.q_cc.productCategoryId_eq1:e.q_cc.productCategoryId_eq,t["q_cc.productCategoryId"]=e.q_cc.productCategoryId_eq2?e.q_cc.productCategoryId_eq2:t["q_cc.productCategoryId"],delete t.rechargeTime,t.page_size=20,a.getData(t)},a.onHandSelectRow=function(e,t){a.setState({selectedRows:t})},a.Reset=function(){var e={page_size:20,merchantId:a.state.params.merchantId};a.getData(e)},a.getData=function(e){var t=a.state.tableDatas;t.data=[];var n=u()({},e,{limit:e.page_size}),r=0;Object(x["q"])(n).then(function(n){try{200===n.status&&(n.data.merchantProductDiscounts.forEach(function(e){r+=1;var a=u()({},e,{xh:r,key:e.productId,salesOkPrice:"-"===e.discount?e.salesPrice:(e.salesPrice*e.discount).toFixed(2)});t.data.push(a)}),a.setState({tableDatas:t,params:u()({},e,{totalCount:n.data.count})}))}catch(e){}})};var n=[{value:"1",label:"\u6b63\u5728\u9500\u552e"},{value:"2",label:"\u505c\u6b62\u9500\u552e"}],r=[],c={formData:[{type:"SelectCompone",label:"\u4e00\u7ea7\u5206\u7c7b",style:{width:"196px"},handChang:a.handChang1,name:"q_cc.productCategoryId_eq",ruless:[],options:r},{type:"SelectCompone",label:"\u4e8c\u7ea7\u5206\u7c7b",style:{width:"196px"},handChang:a.handChang2,name:"q_cc.productCategoryId_eq1",ruless:[],options:r},{type:"SelectCompone",label:"\u4e09\u7ea7\u5206\u7c7b",style:{width:"196px"},handChang:a.handChang3,name:"q_cc.productCategoryId_eq2",ruless:[],options:r},{type:"SelectCompone",label:"\u72b6\u6001\uff1a",style:{width:"193px"},name:"q_p.status_eq",options:n},{type:"InputIcon",label:"\u4ea7\u54c1\u540d\u79f0",name:"q_productName_like",ruless:[],placeholder:"\u4ea7\u54c1\u540d\u79f0",typeIco:"user"},{type:"SelectDateRang",label:"\u521b\u5efa\u65f6\u95f4",name:"rechargeTime",ruless:[],placeholder:"\u521b\u5efa\u65f6\u95f4",typeIco:"book"}],buttonData:[{type:"primary",ico:"edit",hangClick:a.handDele,labe:"\u5220\u9664\u6298\u6263"}]},o=[{key:1,describe:["green","\u6b63\u5728\u9500\u552e"]},{key:2,describe:["green","\u505c\u6b62\u9500\u552e"]}],d=[{key:1,describe:["green","\u652f\u6301"]},{key:2,describe:["green","\u4e0d\u652f\u6301"]}],s={columns:[{title:"\u5e8f\u53f7",dataIndex:"xh",key:"xh"},{title:"\u4ea7\u54c1\u7f16\u53f7",dataIndex:"productId",key:"productId"},{title:"\u4ea7\u54c1\u540d\u79f0",dataIndex:"productName",key:"productName"},{title:"\u4ef7\u503c",dataIndex:"cost",key:"cost"},{title:"\u8fdb\u8d27\u4ef7",dataIndex:"purchasePrice",key:"purchasePrice"},{title:"\u9500\u552e\u4ef7",dataIndex:"salesPrice",key:"salesPrice"},{title:"\u5b9a\u4ef7",dataIndex:"salesOkPrice",key:"salesOkPrice"},{title:"\u4ea7\u54c1\u72b6\u6001",dataIndex:"status",key:"status",render:function(e){return Object(R["b"])(e,o)}},{title:"\u662f\u5426\u652f\u6301\u9000\u6b3e",dataIndex:"canRefund",key:"canRefund",render:function(e){return Object(R["b"])(e,d)}},{title:"\u521b\u5efa\u65e5\u671f",dataIndex:"createdAt",key:"createdAt"},{title:"\u6298\u6263",dataIndex:"discount",key:"discount"},{title:"\u64cd\u4f5c",dataIndex:"action",key:"action",render:function(e,t){return t.discount>0?k.a.createElement("a",{href:"javascript:void(0)",onClick:function(){a.handUpdate(e,t)}},"\u7f16\u8f91"):k.a.createElement("a",{href:"javascript:void(0)",onClick:function(){a.handAdd(e,t)}},"\u6dfb\u52a0")}}],data:[]},i={merchantId:a.props.location.params,productName:"",cost:"",status:"",productCategoryId:"",startTime:"",endTime:"",page_size:20,page:1};return a.state={tableDatas:s,headForm:c,params:i,selectedRows:{}},a}return _()(t,e),y()(t,[{key:"componentWillMount",value:function(){var e=this.state.params,t=u()({},e,{merchantId:j["a"].get("merchantId")});this.getClassData(0,0),this.setState({params:e}),this.getData(t)}},{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a=this.state,n=a.tableDatas,r=a.headForm,c=a.params;this.onHandSelectRow;return k.a.createElement(E["a"],null,k.a.createElement(d["a"],{bordered:!1},k.a.createElement(s["a"],null,k.a.createElement(i["a"],null,k.a.createElement(w["b"],{form:this.props.form,Reset:this.Reset,formData:r.formData,handleSubmit:this.handleSubmit,getFieldDecorator:t}))),k.a.createElement(s["a"],null,k.a.createElement(i["a"],null,k.a.createElement("div",{className:T.a.addButton},k.a.createElement(w["a"],{buttonData:r.buttonData}))))),k.a.createElement(S["a"],{tableData:n,params:c,getData:this.getData,scroll:{x:1300}}),k.a.createElement(P["d"],{ref:function(t){e.MemberProducZ=t},Reset:this.Reset}))}}]),t}(k.a.Component),r=c))||r),N=o["a"].create({name:"list"})(B);t["default"]=N}}]);