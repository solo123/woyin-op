(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{lTH3:function(e,t,a){"use strict";a.r(t);a("y8nQ");var n,r,o,c=a("Vl3Y"),l=(a("g9YV"),a("wCAj")),u=(a("IzEo"),a("bx4M")),i=(a("14J3"),a("BMrR")),d=(a("jCWc"),a("kPKH")),s=(a("2qtc"),a("kLXV")),m=a("2Taf"),p=a.n(m),h=a("vZ4D"),f=a.n(h),b=a("l4Ni"),g=a.n(b),y=a("ujKo"),I=a.n(y),A=a("MhPg"),D=a.n(A),k=a("q1tI"),M=a.n(k),v=a("MuoO"),N=a("8joG"),E=a("7DNP"),w=a("zHco"),C=a("KJZU"),x=a("dCQc"),H=a("TESu"),U=a("+n12"),S=a("BtQg"),j=a("weEb"),O=a.n(j),z=(n=Object(v["connect"])(function(e){var t=e.merchant,a=e.loading;return{merchant:t,submitting:a.effects["merchant/setMerchant"]}}),n((o=function(e){function t(e){var a;p()(this,t),a=g()(this,I()(t).call(this,e)),a.onHangeDetails=function(e,t){a.MerchantInfo.int(t),a.MerchantInfo.showModal()},a.onHangApplayData=function(e,t){a.MemberApplayData.int(t),a.MemberApplayData.showModal()},a.onHangApplayInter=function(e,t){a.MemberApplayInter.int(t),a.MemberApplayInter.showModal()},a.onHangeAddUser=function(e,t){a.MemberUpload.showModal()},a.onHangInter=function(e,t){a.InterUpload.showModal(t.key)},a.handAdd=function(e){e.preventDefault(),a.MerchantAddOrUpdate.showModal()},a.onHangGoPround=function(e,t){S["a"].set("merchantId",t.key),a.props.dispatch(E["routerRedux"].push({pathname:"/merchant/memberproduct"}))},a.handEdit=function(e){e.preventDefault();var t=a.state.selectUserData;null!==t?a.MerchantAddOrUpdate.showModal(e):s["a"].error({title:"\u5546\u6237\u4fee\u6539\u9519\u8bef",content:"\u8bf7\u5148\u9009\u62e9\u5546\u6237\u4fe1\u606f\uff0c\u518d\u8fdb\u884c\u4fee\u6539..."})},a.getCheckUser=function(e,t){a.setState({selectUserData:t})},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){if(!e){var n={userAccount:t.userAccount,merchantName:t.merchantName,phoneNum:t.phoneNum,status:void 0===t.status?"":t.status[0]};a.getAllData(n),a.setState({param:n})}})},a.onChangePage=function(e){var t=a.state.param;t.count=a.state.limit,t.page=e,a.getAllData(t)},a.Reset=function(){a.getAllData()},a.getAllData=function(e){Object(x["F"])(e).then(function(e){try{if(200===e.status){for(var t=e.data.data,n=[],r=a.state.tableData,o=0;o<t.length;o+=1){var c={};c.key=t[o].merchantId,c.userAccount=t[o].userAccount,c.merchantName=t[o].merchantName,c.merchantAddr=t[o].merchantAddr,c.contactMan=t[o].contactMan,c.phoneNum=t[o].phoneNum,c.telNum=t[o].telNum,c.statue=t[o].status,c.creatertime=Object(U["e"])(t[o].createTime),c.find=t[o].id,c.freezing=t[o].frozenTime,c.unfreezing=t[o].unFrozenTime,n.push(c)}r.data=n,a.setState({tableData:r,count:e.data.totalCount})}}catch(e){console.error("\u7f51\u7edc\u63a5\u53e3\u5f02\u5e38")}})};var n=[{value:"1",label:"\u53ef\u7528"},{value:"2",label:"\u51bb\u7ed3"}],r=[{type:"InputIcon",label:"\u5546\u6237\u767b\u5f55\u5e10\u6237",name:"userAccount",ruless:[],placeholder:"\u5546\u6237\u767b\u5f55\u5e10\u6237",typeIco:"user"},{type:"InputIcon",label:"\u5546\u6237\u540d\u79f0",name:"merchantName",ruless:[],placeholder:"\u89d2\u5546\u6237\u540d\u79f0\u8272\u7f16\u7801",typeIco:"book"},{type:"InputIcon",label:"\u624b\u673a\u53f7",name:"phoneNum",ruless:[],placeholder:"\u624b\u673a\u53f7",typeIco:"book"},{type:"SelectCompone",label:"\u72b6\u6001\uff1a",style:{width:"198px"},name:"status",options:n}],o=[{type:"primary",ico:"plus",hangClick:a.handAdd,labe:"\u6dfb\u52a0"}],c=[{key:1,describe:["green","\u53ef\u7528"]},{key:2,describe:["red","\u51bb\u7ed3"]}],l=[{onClick:a.onHangInter,label:"\u6279\u91cf\u4f1a\u5458\u53d1\u5206 |"},{onClick:a.onHangApplayData,label:"\u4e0a\u4f20\u6570\u636e\u5ba1\u6838 |"},{onClick:a.onHangApplayInter,label:"\u4f1a\u5458\u53d1\u5206\u5ba1\u6838 | "},{onClick:a.onHangGoPround,label:"\u5546\u6237\u4ea7\u54c1\u7ba1\u7406"}],u={columns:[{title:"\u5546\u6237\u767b\u5f55\u5e10\u6237",dataIndex:"userAccount",key:"userAccount"},{title:"\u5546\u6237\u540d\u79f0",dataIndex:"merchantName",key:"merchantName"},{title:"\u5546\u6237\u5730\u5740",dataIndex:"merchantAddr",key:"merchantAddr"},{title:"\u8054\u7cfb\u4eba",dataIndex:"contactMan",key:"contactMan"},{title:"\u624b\u673a\u53f7",dataIndex:"phoneNum",key:"phoneNum"},{title:"\u56fa\u5b9a\u7535\u8bdd",dataIndex:"telNum",key:"telNum"},{title:"\u72b6\u6001",dataIndex:"statue",key:"statue",render:function(e){return Object(H["b"])(e,c)}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"creatertime",key:"creatertime"},{title:"\u8be6\u60c5",dataIndex:"find",key:"find",render:function(e,t){return M.a.createElement("a",{href:"javascript:void(0)",onClick:function(){a.onHangeDetails(e,t)}},"\u8be6\u60c5")}},{title:"\u64cd\u4f5c",dataIndex:"action",key:"action",fixed:"right",width:400,render:function(e,t){return Object(H["a"])(l,e,t)}}],data:[]};return a.state={formData:r,buttonData:o,tableData:u,selectUserData:null,limit:10,count:0,param:{userAccount:"",merchantName:"",phoneNum:"",status:""}},a}return D()(t,e),f()(t,[{key:"componentWillMount",value:function(){var e={count:this.state.limit,page:1};this.getAllData(e)}},{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a=this.state.tableData,n=this.state,r=n.formData,o=n.buttonData,c=n.limit,s=n.count,m={type:"radio",onChange:this.getCheckUser};return M.a.createElement(w["a"],null,M.a.createElement(u["a"],{bordered:!1},M.a.createElement(i["a"],null,M.a.createElement(d["a"],null,M.a.createElement(C["b"],{Reset:this.Reset,formData:r,handleSubmit:this.handleSubmit,form:this.props.form,getFieldDecorator:t}))),M.a.createElement(i["a"],null,M.a.createElement(d["a"],null,M.a.createElement("div",{className:O.a.addButton},M.a.createElement(C["a"],{buttonData:o}))))),M.a.createElement(l["a"],{columns:a.columns,dataSource:a.data,bordered:!0,rowSelection:m,pagination:{pageSize:c,total:s,onChange:this.onChangePage}}),M.a.createElement(N["g"],{ref:function(t){e.MerchantAddOrUpdate=t}}),M.a.createElement(N["f"],{ref:function(t){e.MemberUpload=t}}),M.a.createElement(N["a"],{ref:function(t){e.InterUpload=t}}),M.a.createElement(N["h"],{ref:function(t){e.MerchantInfo=t}}),M.a.createElement(N["b"],{ref:function(t){e.MemberApplayData=t}}),M.a.createElement(N["c"],{ref:function(t){e.MemberApplayInter=t}}))}}]),t}(M.a.Component),r=o))||r),P=c["a"].create({name:"list"})(z);t["default"]=P},weEb:function(e,t,a){e.exports={addButton:"antd-pro-pages-merchant-list-addButton"}}}]);