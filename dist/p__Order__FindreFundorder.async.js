(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[25],{Iku0:function(e,t,a){"use strict";a.r(t);a("y8nQ");var d,r,n,l=a("Vl3Y"),o=(a("g9YV"),a("wCAj")),i=(a("IzEo"),a("bx4M")),p=(a("14J3"),a("BMrR")),c=(a("jCWc"),a("kPKH")),u=a("2Taf"),I=a.n(u),s=a("vZ4D"),m=a.n(s),y=a("l4Ni"),h=a.n(y),k=a("ujKo"),f=a.n(k),w=a("MhPg"),b=a.n(w),g=a("q1tI"),x=a.n(g),v=a("MuoO"),D=a("zHco"),N=a("KJZU"),T=a("QdbH"),E=a.n(T),J=(d=Object(v["connect"])(),d((n=function(e){function t(e){var a;I()(this,t),a=h()(this,f()(t).call(this,e)),a.handEdit=function(e){e.preventDefault()},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){e||console.log("Received values of form: ",t)})};var d=[{type:"InputIcon",label:"\u9000\u6b3e\u7f16\u53f7",name:"ordercoder",ruless:[],placeholder:"\u9000\u6b3e\u7f16\u53f7",typeIco:"user"},{type:"InputIcon",label:"\u4ea7\u54c1\u7f16\u53f7",name:"logo",ruless:[],placeholder:"\u4ea7\u54c1\u7f16\u53f7",typeIco:"book"},{type:"InputIcon",label:"\u8d2d\u4e70\u8ba2\u5355\u7f16\u53f7",name:"rechargeLogo",ruless:[],placeholder:"\u8d2d\u4e70\u8ba2\u5355\u7f16\u53f7",typeIco:"user"},{type:"InputIcon",label:"\u8d2d\u4e70\u8ba2\u5355\u8be6\u60c5\u7f16\u53f7",name:"number",ruless:[],placeholder:"\u8d2d\u4e70\u8ba2\u5355\u8be6\u60c5\u7f16\u53f7",typeIco:"user"},{type:"SelectDateRang",label:"\u9000\u6b3e\u8ba2\u5355\u65f6\u95f4",name:"rechargeTime",ruless:[],placeholder:"\u9000\u6b3e\u8ba2\u5355\u65f6\u95f4",typeIco:"book"}],r={columns:[{title:"\u9000\u6b3e\u7f16\u53f7",dataIndex:"id",key:"id",width:100},{title:"\u8d2d\u4e70\u8ba2\u5355\u7f16\u53f7",dataIndex:"orderId",key:"orderId",width:100},{title:"\u8d2d\u4e70\u8ba2\u5355\u8be6\u7ec6\u7f16\u53f7",dataIndex:"orderInfoId",key:"orderInfoId",width:140},{title:"\u7533\u8bf7\u9000\u6b3e\u79ef\u5206",dataIndex:"applyIntegral",key:"applyIntegral",width:100},{title:"\u5b9e\u9645\u9000\u6b3e\u79ef\u5206",dataIndex:"integral",key:"integral",width:100},{title:"\u4ea7\u54c1\u7f16\u53f7",dataIndex:"productId",key:"productId",width:80},{title:"\u4ea7\u54c1\u540d\u79f0",dataIndex:"productName",key:"productName",width:80},{title:"\u72b6\u6001",dataIndex:"statue",key:"statue",width:80},{title:"\u9000\u6b3e\u7533\u8bf7\u4eba\u7f16\u53f7",dataIndex:"applyOrder",key:"applyOrder",width:120},{title:"\u9000\u6b3e\u7533\u8bf7\u4eba",dataIndex:"apply",key:"apply",width:100},{title:"\u9000\u6b3e\u7533\u8bf7\u65f6\u95f4",dataIndex:"applyTime",key:"applyTime",width:120},{title:"\u5b8c\u6210\u65f6\u95f4",dataIndex:"succeedTiem",key:"succeedTiem",width:80},{title:"\u5ba1\u6838\u4eba\u7f16\u53f7",dataIndex:"auditId",key:"auditId",width:80},{title:"\u5ba1\u6838\u4eba",dataIndex:"audit",key:"audit",width:120},{title:"\u5907\u6ce8",dataIndex:"remark",key:"remark",width:120}]},n=[{key:"1",id:"John2",orderId:"322",orderInfoId:"New York No",applyIntegral:"developer",integral:"11888",productId:"88-88",productName:"\u6b63\u5e38",statue:"2018-01-01",applyOrder:"\u8be6\u60c5",apply:"2019-11-11",applyTime:"2018-11-12",succeedTiem:"2018",auditId:"2019",audit:"111",remark:"112"},{key:"2",id:"John2",orderId:"322",orderInfoId:"New York No",applyIntegral:"developer",integral:"11888",productId:"88-88",productName:"\u6b63\u5e38",statue:"2018-01-01",applyOrder:"\u8be6\u60c5",apply:"2019-11-11",applyTime:"2018-11-12",succeedTiem:"2018",auditId:"2019",audit:"111",remark:"112"},{key:"3",id:"John2",orderId:"322",orderInfoId:"New York No",applyIntegral:"developer",integral:"11888",productId:"88-88",productName:"\u6b63\u5e38",statue:"2018-01-01",applyOrder:"\u8be6\u60c5",apply:"2019-11-11",applyTime:"2018-11-12",succeedTiem:"2018",auditId:"2019",audit:"111",remark:"112"}];return a.state={formData:d,tableData:r,data:n},a}return b()(t,e),m()(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.formData,d=(t.buttonData,t.tableData),r=t.data,n={onChange:function(e,t){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",t)},getCheckboxProps:function(e){return{disabled:"Disabled User"===e.name,name:e.name}}};return x.a.createElement(D["a"],null,x.a.createElement(i["a"],{bordered:!1},x.a.createElement(p["a"],null,x.a.createElement(c["a"],null,x.a.createElement(N["c"],{formData:a,handleSubmit:this.handleSubmit,getFieldDecorator:e}))),x.a.createElement(p["a"],null,x.a.createElement(c["a"],null,x.a.createElement("div",{className:E.a.addButton},"\u603b\u79ef\u5206\uff1a")))),x.a.createElement(o["a"],{columns:d.columns,dataSource:r,bordered:!0,rowSelection:n,scroll:{x:2e3}}))}}]),t}(x.a.Component),r=n))||r),O=l["a"].create({name:"list"})(J);t["default"]=O},QdbH:function(e,t,a){e.exports={addButton:"antd-pro-pages-order-findre-fundorder-addButton"}}}]);