(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[38],{"5UeQ":function(e,a,t){e.exports={addButton:"antd-pro-pages-transfer-transferaudit-addButton"}},bl06:function(e,a,t){"use strict";t.r(a);t("y8nQ");var n,l,r,o=t("Vl3Y"),d=(t("g9YV"),t("wCAj")),i=(t("IzEo"),t("bx4M")),c=(t("14J3"),t("BMrR")),x=(t("jCWc"),t("kPKH")),u=t("2Taf"),p=t.n(u),m=t("vZ4D"),s=t.n(m),y=t("l4Ni"),k=t.n(y),I=t("ujKo"),b=t.n(I),f=t("MhPg"),h=t.n(f),v=t("q1tI"),g=t.n(v),C=t("MuoO"),D=t("zHco"),E=t("KJZU"),w=t("5UeQ"),N=t.n(w),S=(n=Object(C["connect"])(),n((r=function(e){function a(e){var t;p()(this,a),t=k()(this,b()(a).call(this,e)),t.onClick=function(e,a){console.log("xxxx")},t.handEdit=function(e){e.preventDefault()},t.handleSubmit=function(e){e.preventDefault(),t.props.form.validateFields(function(e,a){e||console.log("Received values of form: ",a)})};var n=[{value:"1",label:"\u6b63\u5e38"},{value:"0",label:"\u7981\u7528"}],l=[{type:"InputIcon",label:"\u8f6c\u8ba9\u7f16\u53f7",name:"ordercoder",ruless:[],placeholder:"\u8f6c\u8ba9\u7f16\u53f7",typeIco:"user"},{type:"InputIcon",label:"\u5ba1\u6838\u4eba\u5458\u540d",name:"autic",ruless:[],placeholder:"\u5ba1\u6838\u4eba\u5458\u540d",typeIco:"book"},{type:"SelectCompone",label:"\u5bf9\u8c61\u7c7b\u578b",name:"type",options:n},{type:"SelectCompone",label:"\u72b6\u6001\uff1a",name:"statue",options:n},{type:"InputIcon",label:"\u8f6c\u8ba9\u7533\u8bf7\u4eba\u540d",name:"apply",ruless:[],placeholder:"\u8f6c\u8ba9\u7533\u8bf7\u4eba\u540d",typeIco:"book"},{type:"InputIcon",label:"\u5546\u6237\u540d\u79f0",name:"merchant",ruless:[],placeholder:"\u5546\u6237\u540d\u79f0",typeIco:"book"},{type:"SelectDateRang",label:"\u8f6c\u8ba9\u65f6\u95f4",name:"rechargeTime",ruless:[],placeholder:"\u8f6c\u8ba9\u65f6\u95f4",typeIco:"book"}],r=[{type:"primary",ico:"edit",hangClick:t.handEdit,labe:"\u8f6c\u8ba9\u5ba1\u6838"},{type:"primary",ico:"edit",hangClick:t.handEdit,labe:"\u5bfc\u51fa"}],o={columns:[{title:"\u67e5\u770b",dataIndex:"find",key:"find"},{title:"\u8f6c\u8ba9\u7f16\u53f7",dataIndex:"id",key:"id"},{title:"\u5916\u90e8\u8ba2\u5355\u7f16\u53f7",dataIndex:"orderId",key:"orderId"},{title:"\u5bf9\u8c61\u7c7b\u578b",dataIndex:"type",key:"type"},{title:"\u8f6c\u8ba9\u79ef\u5206",dataIndex:"integral",key:"integral"},{title:"\u72b6\u6001",dataIndex:"statue",key:"statue"},{title:"\u8f6c\u8ba9\u7533\u8bf7\u4eba\u7f16\u53f7",dataIndex:"applyId",key:"applyId"},{title:"\u8f6c\u8ba9\u7533\u8bf7\u4eba\u540d",dataIndex:"applyName",key:"applyName"},{title:"\u6240\u5c5e\u5546\u6237",dataIndex:"merchant",key:"merchant"},{title:"\u5ba1\u6838\u4eba\u540d",dataIndex:"audit",key:"audit"},{title:"\u624b\u7eed\u8d39\uff08\u79ef\u5206\uff09",dataIndex:"service",key:"service"},{title:"\u6301\u5361\u4eba\u540d\u79f0",dataIndex:"cardName",key:"cardName"},{title:"\u624b\u673a\u53f7",dataIndex:"phone",key:"phone"},{title:"\u94f6\u884c\u4ee3\u7801",dataIndex:"bankId",key:"bankId"},{title:"\u94f6\u884c\u540d\u79f0",dataIndex:"bankName",key:"bankName"},{title:"\u94f6\u884c\u5361\u53f7",dataIndex:"bankCard",key:"bankCard"},{title:"\u5907\u6ce8",dataIndex:"remark",key:"remark"},{title:"\u8fd4\u56de\u4fe1\u606f",dataIndex:"returnInfo",key:"returnInfo"},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"createrTime",key:"createrTime"},{title:"\u64cd\u4f5c",dataIndex:"action",key:"action",width:80,render:function(e,a){return g.a.createElement("a",{href:"javascript:;",onClick:function(){t.onClick(e,a)}},"\u64cd\u4f5c")}}]},d=[{find:"1",id:"John2",orderId:"xxxx",type:"xxxx",integral:"xxxx",statue:"xxxx",applyId:"xxx",applyName:"xxx",merchant:"xxx",audit:"xxx",service:"xxx",cardName:"xxx",phone:"xxx",bankId:"xxx",bankName:"xxx",bankCard:"xxx",remark:"xxx",returnInfo:"xxx",createrTime:"xxx"}];return t.state={formData:l,tableData:o,data:d,buttonData:r},t}return h()(a,e),s()(a,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,a=this.state,t=a.formData,n=a.buttonData,l=a.tableData,r=a.data,o={onChange:function(e,a){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",a)},getCheckboxProps:function(e){return{disabled:"Disabled User"===e.name,name:e.name}}};return g.a.createElement(D["a"],null,g.a.createElement(i["a"],{bordered:!1},g.a.createElement(c["a"],null,g.a.createElement(x["a"],null,g.a.createElement(E["c"],{formData:t,handleSubmit:this.handleSubmit,getFieldDecorator:e}))),g.a.createElement(c["a"],null,g.a.createElement(x["a"],null,g.a.createElement("div",{className:N.a.addButton},g.a.createElement(E["a"],{buttonData:n}))))),g.a.createElement(d["a"],{columns:l.columns,dataSource:r,bordered:!0,rowSelection:o,scroll:{x:2e3}}))}}]),a}(g.a.Component),l=r))||l),j=o["a"].create({name:"list"})(S);a["default"]=j}}]);