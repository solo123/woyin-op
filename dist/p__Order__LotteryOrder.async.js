(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[25],{oaDL:function(e,t,a){"use strict";a.r(t);a("y8nQ");var n,o,l,c=a("Vl3Y"),i=(a("g9YV"),a("wCAj")),r=(a("IzEo"),a("bx4M")),u=(a("14J3"),a("BMrR")),d=(a("jCWc"),a("kPKH")),s=a("2Taf"),m=a.n(s),x=a("vZ4D"),p=a.n(x),y=a("l4Ni"),b=a.n(y),h=a("ujKo"),f=a.n(h),k=a("MhPg"),g=a.n(k),I=a("q1tI"),v=a.n(I),D=a("MuoO"),E=a("zHco"),T=a("KJZU"),w=a("ssUi"),C=a.n(w),J=(n=Object(D["connect"])(),n((l=function(e){function t(e){var a;m()(this,t),a=b()(this,f()(t).call(this,e)),a.onClick=function(e,t){console.log("xxxx")},a.handEdit=function(e){e.preventDefault()},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){e||console.log("Received values of form: ",t)})};var n=[{value:"1",label:"\u6b63\u5e38"},{value:"0",label:"\u7981\u7528"}],o=[{type:"InputIcon",label:"\u8d2d\u4e70\u8ba2\u5355\u7f16\u53f7",name:"logo",ruless:[],placeholder:"\u8d2d\u4e70\u8ba2\u5355\u7f16\u53f7",typeIco:"user"},{type:"InputIcon",label:"\u767b\u5f55\u624b\u673a\u53f7",name:"phone",ruless:[],placeholder:"\u767b\u5f55\u624b\u673a\u53f7",typeIco:"book"},{type:"SelectCompone",label:"\u72b6\u6001\uff1a",style:{width:"198px"},name:"statue",options:n},{type:"InputIcon",label:"\u8d2d\u4e70\u5bf9\u8c61\u540d\u79f0",name:"buyname",ruless:[],placeholder:"\u8d2d\u4e70\u5bf9\u8c61\u540d\u79f0",typeIco:"book"},{type:"SelectDateRang",label:"\u8d2d\u4e70\u65f6\u95f4",name:"time",ruless:[],placeholder:"\u8d2d\u4e70\u65f6\u95f4",typeIco:"book"}],l=[{type:"primary",ico:"edit",hangClick:a.handEdit,labe:"\u5bfc\u51fa"}],c={columns:[{title:"\u8d2d\u4e70\u8ba2\u5355\u7f16\u53f7",dataIndex:"id",key:"id"},{title:"\u767b\u5f55\u624b\u673a\u53f7",dataIndex:"phone",key:"phone"},{title:"\u8d2d\u4e70\u5bf9\u8c61\u540d\u79f0",dataIndex:"buyName",key:"buyName"},{title:"\u8d2d\u4e70\u5bf9\u8c61\u7c7b\u578b",dataIndex:"buyType",key:"buyType"},{title:"\u72b6\u6001",dataIndex:"statue",key:"statue"},{title:"\u79ef\u5206",dataIndex:"integral",key:"integral"},{title:"\u521b\u5efa\u65e5\u671f",dataIndex:"creatueTime",key:"creatueTime"},{title:"\u64cd\u4f5c",dataIndex:"action",key:"action",render:function(e,t){return v.a.createElement("a",{href:"javascript:;",onClick:function(){a.onClick(e,t)}},"\u64cd\u4f5c")}}]},i=[{key:"1",id:"John2",phone:"xxxx",buyName:"xxxx",buyType:"xxxx",statue:"statue",integral:"integral",creatueTime:"creatueTime",action:"action"},{key:"2",id:"John2",phone:"xxxx",buyName:"xxxx",buyType:"xxxx",statue:"statue",integral:"integral",creatueTime:"creatueTime",action:"action"},{key:"3",id:"John2",phone:"xxxx",buyName:"xxxx",buyType:"xxxx",statue:"statue",integral:"integral",creatueTime:"creatueTime",action:"action"}];return a.state={formData:o,tableData:c,data:i,buttonData:l},a}return g()(t,e),p()(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.formData,n=t.buttonData,o=t.tableData,l=t.data,c={onChange:function(e,t){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",t)},getCheckboxProps:function(e){return{disabled:"Disabled User"===e.name,name:e.name}}};return v.a.createElement(E["a"],null,v.a.createElement(r["a"],{bordered:!1},v.a.createElement(u["a"],null,v.a.createElement(d["a"],null,v.a.createElement(T["c"],{formData:a,handleSubmit:this.handleSubmit,getFieldDecorator:e}))),v.a.createElement(u["a"],null,v.a.createElement(d["a"],null,v.a.createElement("div",{className:C.a.addButton},v.a.createElement(T["a"],{buttonData:n}))))),v.a.createElement(i["a"],{columns:o.columns,dataSource:l,bordered:!0,rowSelection:c}))}}]),t}(v.a.Component),o=l))||o),N=c["a"].create({name:"list"})(J);t["default"]=N}}]);