(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{au8D:function(e,a,t){"use strict";t.r(a);t("y8nQ");var n,r,o,u=t("Vl3Y"),c=(t("g9YV"),t("wCAj")),s=(t("IzEo"),t("bx4M")),l=(t("14J3"),t("BMrR")),m=(t("jCWc"),t("kPKH")),i=(t("+BJd"),t("mr32")),d=t("2Taf"),p=t.n(d),h=t("vZ4D"),f=t.n(h),b=t("l4Ni"),N=t.n(b),k=t("ujKo"),I=t.n(k),g=t("MhPg"),y=t.n(g),D=t("q1tI"),v=t.n(D),T=t("MuoO"),E=t("KJZU"),P=t("dCQc"),C=t("zHco"),x=(t("bi2v"),n=Object(T["connect"])(),n((o=function(e){function a(e){var t;p()(this,a),t=N()(this,I()(a).call(this,e)),t.onChangePage=function(e){var a=t.state.params;a.page=e,t.getData(a)},t.handleSubmit=function(e){e.preventDefault(),t.props.form.validateFields(function(e,a){if(!e){var n=t.state.params;n.userAccount=a.userAccount,n.merchantName=a.merchantName,n.userPhoneNo=a.userPhoneNo,n.userName=a.userName,t.getData(n)}})},t.getData=function(e){Object(P["n"])(e).then(function(e){if(200===e.status){var a=t.state,n=a.tableData,r=a.params;n.data=[],e.data.data.forEach(function(e){var a={key:e.userId,userName:e.userName,userPhoneNo:e.userPhoneNo,nickName:e.nickName,remark:e.remark,freezeTime:e.freezeTime,updateTime:e.updateTime,status:e.status,createTime:e.createTime};n.data.push(a)}),r.totalCount=e.data.totalCount,t.setState({tableData:n,params:r})}})};var n=[{type:"InputIcon",label:"\u5546\u6237\u767b\u5f55\u5e10\u6237",name:"userAccount",ruless:[],placeholder:"\u5546\u6237\u767b\u5f55\u5e10\u6237",typeIco:"user"},{type:"InputIcon",label:"\u5546\u6237\u540d\u79f0",name:"merchantName",ruless:[],placeholder:"\u5546\u6237\u540d\u79f0",typeIco:"book"},{type:"InputIcon",label:"\u7528\u6237\u624b\u673a\u53f7\u7801",name:"userPhoneNo",ruless:[],placeholder:"\u7528\u6237\u624b\u673a\u53f7\u7801",typeIco:"book"},{type:"InputIcon",label:"\u7528\u6237\u540d\u79f0",name:"userName",ruless:[],placeholder:"\u7528\u6237\u540d\u79f0",typeIco:"book"}],r={columns:[{title:"\u7528\u6237\u540d",dataIndex:"userName",key:"userName"},{title:"\u7528\u6237\u624b\u673a\u53f7\u7801",dataIndex:"userPhoneNo",key:"userPhoneNo"},{title:"\u7528\u6237\u5907\u6ce8",dataIndex:"remark",key:"remark"},{title:"\u7528\u6237\u51bb\u7ed3\u65f6\u95f4",dataIndex:"freezeTime",key:"freezeTime"},{title:"\u7528\u6237\u66f4\u65b0\u65f6\u95f4",dataIndex:"updateTime",key:"updateTime"},{title:"\u72b6\u6001",dataIndex:"status",key:"status",render:function(e){switch(e){case 0:return v.a.createElement(i["a"],{color:"green"},"\u672a\u6fc0\u6d3b");case 1:return v.a.createElement(i["a"],{color:"blue"},"\u6b63\u5e38");case 2:return v.a.createElement(i["a"],{color:"red"},"\u51bb\u7ed3");default:return v.a.createElement(i["a"],{color:"red"},"\u5176\u4ed6")}}},{title:"\u7528\u6237\u7ec4\u521b\u5efa\u65f6\u95f4",dataIndex:"createTime",key:"createTime"}],data:[]};return t.state={formData:n,tableData:r,params:{userAccount:"",merchantName:"",userPhoneNo:"",userName:"",count:10,page:1,totalCount:10}},t}return y()(a,e),f()(a,[{key:"componentWillMount",value:function(){this.getData(this.state.params)}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,a=this.state,t=a.formData,n=a.tableData,r=a.params;return v.a.createElement(C["a"],null,v.a.createElement(s["a"],{bordered:!1},v.a.createElement(l["a"],null,v.a.createElement(m["a"],null,v.a.createElement(E["b"],{formData:t,handleSubmit:this.handleSubmit,form:this.props.form,getFieldDecorator:e})))),v.a.createElement(c["a"],{columns:n.columns,dataSource:n.data,bordered:!0,scroll:{x:1200},pagination:{pageSize:r.count,total:r.totalCount,onChange:this.onChangePage}}))}}]),a}(D["Component"]),r=o))||r),w=u["a"].create({name:"list"})(x);a["default"]=w},bi2v:function(e,a,t){e.exports={addButton:"antd-pro-pages-merchant-info-addButton"}}}]);