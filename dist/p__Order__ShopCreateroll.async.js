(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{"gRc/":function(e,t,a){"use strict";a.r(t);a("y8nQ");var n,l,o,d=a("Vl3Y"),c=(a("g9YV"),a("wCAj")),i=(a("IzEo"),a("bx4M")),r=(a("14J3"),a("BMrR")),u=(a("jCWc"),a("kPKH")),x=a("2Taf"),s=a.n(x),p=a("vZ4D"),m=a.n(p),y=a("l4Ni"),I=a.n(y),b=a("ujKo"),k=a.n(b),f=a("MhPg"),h=a.n(f),g=a("q1tI"),v=a.n(g),D=a("MuoO"),E=a("zHco"),j=a("KJZU"),w=a("ssUi"),N=a.n(w),C=(n=Object(D["connect"])(),n((o=function(e){function t(e){var a;s()(this,t),a=I()(this,k()(t).call(this,e)),a.onClick=function(e,t){console.log("xxxx")},a.handEdit=function(e){e.preventDefault()},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){e||console.log("Received values of form: ",t)})};var n=[{value:"1",label:"\u6b63\u5e38"},{value:"0",label:"\u7981\u7528"}],l=[{type:"InputIcon",label:"\u5bf9\u8c61\u767b\u5f55\u5e10\u53f7",name:"logo",ruless:[],placeholder:"\u8d2d\u4e70\u8ba2\u5355\u7f16\u53f7",typeIco:"user"},{type:"InputIcon",label:"\u6279\u6b21\u53f7",name:"id",ruless:[],placeholder:"\u767b\u5f55\u624b\u673a\u53f7",typeIco:"book"},{type:"SelectCompone",label:"\u72b6\u6001\uff1a",name:"statue",options:n},{type:"InputIcon",label:"\u5bf9\u8c61\u7c7b\u578b",name:"type",ruless:[],placeholder:"\u8d2d\u4e70\u5bf9\u8c61\u540d\u79f0",typeIco:"book"},{type:"SelectDateRang",label:"\u65f6\u95f4",name:"time",ruless:[],placeholder:"\u65f6\u95f4",typeIco:"book"}],o=[{type:"primary",ico:"edit",hangClick:a.handEdit,labe:"\u7535\u5b50\u5238\u5ba1\u6838"},{type:"primary",ico:"edit",hangClick:a.handEdit,labe:"\u5bfc\u51faExcel"}],d={columns:[{title:"\u6279\u6b21\u7f16\u53f7",dataIndex:"id",key:"id"},{title:"\u5bf9\u8c61\u767b\u5f55\u8d26\u53f7",dataIndex:"objLogo",key:"objLogo"},{title:"\u5bf9\u8c61\u540d\u79f0",dataIndex:"objName",key:"objName"},{title:"\u5bf9\u8c61\u7c7b\u578b",dataIndex:"objType",key:"objType"},{title:"\u6279\u6b21\u53f7",dataIndex:"batchId",key:"batchId"},{title:"\u7c7b\u578b",dataIndex:"type",key:"type"},{title:"\u603b\u7b14\u6570",dataIndex:"count",key:"count"},{title:"\u6210\u529f\u7b14\u6570",dataIndex:"scusseed",key:"scusseed"},{title:"\u5931\u8d25\u7b14\u6570",dataIndex:"defeated",key:"defeated"},{title:"\u72b6\u6001",dataIndex:"statue",key:"statue"},{title:"\u603b\u79ef\u5206",dataIndex:"countIntegral",key:"countIntegral"},{title:"\u6210\u529f(\u79ef\u5206)",dataIndex:"scusseedInt",key:"scusseedInt"},{title:"\u5931\u8d25(\u79ef\u5206)",dataIndex:"defeatedInt",key:"defeatedInt"},{title:"\u7533\u8bf7\u4eba\u7f16\u53f7",dataIndex:"applyId",key:"applyId"},{title:"\u7533\u8bf7\u4eba\u540d",dataIndex:"applyName",key:"applyName"},{title:"\u5ba1\u6838\u4eba\u540d",dataIndex:"auditName",key:"auditName"},{title:"\u5907\u6ce8",dataIndex:"remark",key:"remark"},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"createrTime",key:"createrTime"},{title:"\u67e5\u770b",dataIndex:"view",key:"view"}]},c=[{key:"1",id:"John2",objLogo:"xxxx",objName:"xxxx",objType:"xxxx",batchId:"xxxx",type:"xxx",count:"2018-01-09",scusseed:"xx",defeated:"xx",statue:"xx",countIntegral:"xx",scusseedInt:"xx",defeatedInt:"xx",applyId:"xx",applyName:"xx",auditName:"xx",remark:"xx",createrTime:"xx",view:"xx"}];return a.state={formData:l,tableData:d,data:c,buttonData:o},a}return h()(t,e),m()(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.formData,n=t.buttonData,l=t.tableData,o=t.data,d={onChange:function(e,t){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",t)},getCheckboxProps:function(e){return{disabled:"Disabled User"===e.name,name:e.name}}};return v.a.createElement(E["a"],null,v.a.createElement(i["a"],{bordered:!1},v.a.createElement(r["a"],null,v.a.createElement(u["a"],null,v.a.createElement(j["c"],{formData:a,handleSubmit:this.handleSubmit,getFieldDecorator:e}))),v.a.createElement(r["a"],null,v.a.createElement(u["a"],null,v.a.createElement("div",{className:N.a.addButton},v.a.createElement(j["a"],{buttonData:n}))))),v.a.createElement(c["a"],{columns:l.columns,dataSource:o,bordered:!0,rowSelection:d,scroll:{x:2e3}}))}}]),t}(v.a.Component),l=o))||l),S=d["a"].create({name:"list"})(C);t["default"]=S}}]);