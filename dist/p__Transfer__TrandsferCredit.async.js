(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[30],{uFKH:function(e,t,a){"use strict";a.r(t);a("y8nQ");var n,l,o,r=a("Vl3Y"),d=(a("g9YV"),a("wCAj")),c=(a("IzEo"),a("bx4M")),i=(a("14J3"),a("BMrR")),u=(a("jCWc"),a("kPKH")),x=a("2Taf"),s=a.n(x),m=a("vZ4D"),p=a.n(m),b=a("l4Ni"),y=a.n(b),I=a("ujKo"),k=a.n(I),f=a("MhPg"),h=a.n(f),D=a("q1tI"),g=a.n(D),v=a("MuoO"),E=a("zHco"),w=a("KJZU"),C=a("ymND"),N=a.n(C),S=(n=Object(v["connect"])(),n((o=function(e){function t(e){var a;s()(this,t),a=y()(this,k()(t).call(this,e)),a.onClick=function(e,t){console.log("xxxx")},a.handEdit=function(e){e.preventDefault()},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){e||console.log("Received values of form: ",t)})};var n=[{value:"1",label:"\u6b63\u5e38"},{value:"0",label:"\u7981\u7528"}],l=[{type:"InputIcon",label:"\u8ba2\u5355\u53f7",name:"ordercoder",ruless:[],placeholder:"\u8ba2\u5355\u53f7",typeIco:"user"},{type:"InputIcon",label:"\u5916\u90e8\u8ba2\u5355\u53f7",name:"autic",ruless:[],placeholder:"\u5916\u90e8\u8ba2\u5355\u53f7",typeIco:"book"},{type:"SelectCompone",label:"\u72b6\u6001\uff1a",name:"statue",options:n},{type:"InputIcon",label:"\u8fd8\u6b3e\u7533\u8bf7\u4eba",name:"apply",ruless:[],placeholder:"\u8fd8\u6b3e\u7533\u8bf7\u4eba",typeIco:"book"},{type:"SelectDateRang",label:"\u7533\u8bf7\u65f6\u95f4",name:"rechargeTime",ruless:[],placeholder:"\u7533\u8bf7\u65f6\u95f4",typeIco:"book"}],o=[{type:"primary",ico:"edit",hangClick:a.handEdit,labe:"\u5bfc\u51fa"}],r={columns:[{title:"\u8ba2\u5355\u53f7",dataIndex:"id",key:"id"},{title:"\u5916\u90e8\u8ba2\u5355\u7f16\u53f7",dataIndex:"outId",key:"outId"},{title:"\u7533\u8bf7\u4eba",dataIndex:"apply",key:"orderId"},{title:"\u8fd8\u6b3e\u91d1\u989d(\u5143)",dataIndex:"refund",key:"refund"},{title:"\u624b\u7eed\u8d39\uff08\u79ef\u5206\uff09",dataIndex:"integral",key:"integral"},{title:"\u652f\u4ed8\u79ef\u5206",dataIndex:"pay",key:"pay"},{title:"\u8fd8\u6b3e\u72b6\u6001",dataIndex:"statue",key:"statue"},{title:"\u94f6\u884c\u540d\u79f0",dataIndex:"brandName",key:"brandName"},{title:"\u94f6\u884c\u5361\u53f7",dataIndex:"brankId",key:"brankId"},{title:"\u5907\u6ce8",dataIndex:"remark",key:"remark"},{title:"\u8fd4\u56de\u4fe1\u606f",dataIndex:"returnInfo",key:"returnInfo"},{title:"\u63d0\u4ea4\u65f6\u95f4",dataIndex:"submittime",key:"submittime"},{title:"\u786e\u8ba4\u65f6\u95f4",dataIndex:"okcreater",key:"okcreater"}]},d=[{id:"John2",outId:"xxxx",apply:"xxxx",integral:"xxxx",pay:"xxxx",statue:"xxx",brandName:"xxx",brankId:"xxx",remark:"xxx",returnInfo:"xxx",submittime:"xxx",okcreater:"xxx"}];return a.state={formData:l,tableData:r,data:d,buttonData:o},a}return h()(t,e),p()(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.formData,n=t.buttonData,l=t.tableData,o=t.data,r={onChange:function(e,t){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",t)},getCheckboxProps:function(e){return{disabled:"Disabled User"===e.name,name:e.name}}};return g.a.createElement(E["a"],null,g.a.createElement(c["a"],{bordered:!1},g.a.createElement(i["a"],null,g.a.createElement(u["a"],null,g.a.createElement(w["c"],{formData:a,handleSubmit:this.handleSubmit,getFieldDecorator:e}))),g.a.createElement(i["a"],null,g.a.createElement(u["a"],null,g.a.createElement("div",{className:N.a.addButton},g.a.createElement(w["a"],{buttonData:n}))))),g.a.createElement(d["a"],{columns:l.columns,dataSource:o,bordered:!0,rowSelection:r}))}}]),t}(g.a.Component),l=o))||l),J=r["a"].create({name:"list"})(S);t["default"]=J},ymND:function(e,t,a){e.exports={addButton:"antd-pro-pages-transfer-trandsfer-credit-addButton"}}}]);