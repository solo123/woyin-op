(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[39],{OpuS:function(e,t,a){e.exports={addButton:"antd-pro-pages-transfer-transfer-order-list-addButton"}},wVyE:function(e,t,a){"use strict";a.r(t);a("y8nQ");var n,o,l,r=a("Vl3Y"),c=(a("g9YV"),a("wCAj")),d=(a("IzEo"),a("bx4M")),i=(a("14J3"),a("BMrR")),u=(a("jCWc"),a("kPKH")),s=a("2Taf"),m=a.n(s),p=a("vZ4D"),x=a.n(p),h=a("l4Ni"),y=a.n(h),b=a("ujKo"),f=a.n(b),I=a("MhPg"),k=a.n(I),w=a("q1tI"),g=a.n(w),v=a("MuoO"),D=a("zHco"),E=a("KJZU"),S=a("OpuS"),C=a.n(S),P=(n=Object(v["connect"])(),n((l=function(e){function t(e){var a;m()(this,t),a=y()(this,f()(t).call(this,e)),a.onClick=function(e,t){console.log("xxxx")},a.handEdit=function(e){e.preventDefault()},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){e||console.log("Received values of form: ",t)})};var n=[{value:"1",label:"\u6b63\u5e38"},{value:"0",label:"\u7981\u7528"}],o=[{type:"InputIcon",label:"\u8f6c\u8d60\u8ba2\u5355\u7f16\u53f7",name:"orderId",ruless:[],placeholder:"\u8f6c\u8d60\u8ba2\u5355\u7f16\u53f7",typeIco:"user"},{type:"InputIcon",label:"\u8f6c\u8d60\u4eba\u624b\u673a\u53f7",name:"phone",ruless:[],placeholder:"\u8f6c\u8d60\u4eba\u624b\u673a\u53f7",typeIco:"book"},{type:"SelectCompone",label:"\u72b6\u6001\uff1a",name:"statue",options:n},{type:"InputIcon",label:"\u88ab\u8f6c\u8d60\u4eba\u624b\u673a\u53f7",name:"whyPhon",ruless:[],placeholder:"\u88ab\u8f6c\u8d60\u4eba\u624b\u673a\u53f7",typeIco:"book"},{type:"SelectDateRang",label:"\u8f6c\u8d60\u65f6\u95f4",name:"time",ruless:[],placeholder:"\u8f6c\u8d60\u65f6\u95f4",typeIco:"book"}],l=[{type:"primary",ico:"edit",hangClick:a.handEdit,labe:"\u5bfc\u51fa"}],r={columns:[{title:"\u8f6c\u8d60\u8ba2\u5355\u7f16\u53f7",dataIndex:"orderId",key:"orderId"},{title:"\u8f6c\u8d60\u4eba\u59d3\u540d",dataIndex:"name",key:"name"},{title:"\u8f6c\u8d60\u4eba\u624b\u673a\u53f7",dataIndex:"phone",key:"phone"},{title:"\u88ab\u8f6c\u8d60\u4eba\u59d3\u540d",dataIndex:"whyname",key:"whyname"},{title:"\u88ab\u8f6c\u8d60\u4eba\u624b\u673a\u53f7",dataIndex:"whyPhon",key:"whyPhon"},{title:"\u72b6\u6001",dataIndex:"statue",key:"statue"},{title:"\u8f6c\u589e\u79ef\u5206",dataIndex:"interage",key:"interage"},{title:"\u624b\u7eed\u8d39",dataIndex:"commission",key:"commission"}]},c=[{orderId:"1",name:"John2",phone:"xxxx",whyname:"xxxx",whyPhon:"xxxx",statue:"xxxx",interage:"xxx",commission:"xxx"}];return a.state={formData:o,tableData:r,data:c,buttonData:l},a}return k()(t,e),x()(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.formData,n=t.buttonData,o=t.tableData,l=t.data,r={onChange:function(e,t){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",t)},getCheckboxProps:function(e){return{disabled:"Disabled User"===e.name,name:e.name}}};return g.a.createElement(D["a"],null,g.a.createElement(d["a"],{bordered:!1},g.a.createElement(i["a"],null,g.a.createElement(u["a"],null,g.a.createElement(E["c"],{formData:a,handleSubmit:this.handleSubmit,getFieldDecorator:e}))),g.a.createElement(i["a"],null,g.a.createElement(u["a"],null,g.a.createElement("div",{className:C.a.addButton},g.a.createElement(E["a"],{buttonData:n}))))),g.a.createElement(c["a"],{columns:o.columns,dataSource:l,bordered:!0,rowSelection:r}))}}]),t}(g.a.Component),o=l))||o),J=r["a"].create({name:"list"})(P);t["default"]=J}}]);