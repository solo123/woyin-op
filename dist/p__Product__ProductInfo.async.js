(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[38],{"aP+s":function(e,t,a){"use strict";a.r(t);a("y8nQ");var n,o,r,d=a("Vl3Y"),c=(a("IzEo"),a("bx4M")),l=(a("14J3"),a("BMrR")),s=(a("jCWc"),a("kPKH")),i=a("p0pE"),u=a.n(i),p=(a("miYZ"),a("tsqr")),h=(a("2qtc"),a("kLXV")),m=a("2Taf"),g=a.n(m),f=a("vZ4D"),y=a.n(f),b=a("l4Ni"),D=a.n(b),I=a("ujKo"),C=a.n(I),k=a("MhPg"),v=a.n(k),x=a("q1tI"),E=a.n(x),w=a("MuoO"),S=a("dCQc"),R=a("/LDh"),P=a("KJZU"),j=a("zHco"),A=a("nz3n"),O=a("TESu"),_=a("+n12"),q=a("2A1R"),U=a.n(q),z=(n=Object(w["connect"])(),n((r=function(e){function t(e){var a;g()(this,t),a=D()(this,C()(t).call(this,e)),a.getClassData=function(e,t){var n=a.state.headForm,o=[];Object(S["x"])(e,{}).then(function(e){200===e.status&&e.data.productCategories?(e.data.productCategories.forEach(function(e){var t={value:e.productCategoryId,label:e.productCategoryName};o.push(t)}),n.formData[t].options=o,n.formData[t].disabled=!1):n.formData[t].disabled=!0,a.setState({headForm:n})})},a.handChang1=function(e){a.getClassData(e,1)},a.handChang2=function(e){a.getClassData(e,2)},a.handChang3=function(e){},a.handAdd=function(e){e.preventDefault(),a.ProductAddAndUpdate.showModal()},a.handDele=function(e){e.preventDefault();var t=a.state.selectedRows;if(0!==t.length){t.forEach(function(e){Object(S["z"])(e.productId).then(function(e){var t=JSON.parse(e);200===t.status?1:1})}),a.Reset(),p["a"].info("\u5220\u9664\u6210\u529f")}else h["a"].info({title:"\u4fe1\u606f\u63d0\u9192",content:"\u8bf7\u9009\u62e9\u8981\u5220\u9664\u7684\u4ea7\u54c1\u3002"})},a.handUpdate=function(e,t){a.ProductUpdate.init(t),a.ProductUpdate.showModal()},a.handleSubmit=function(e){var t=e;"undefined"!==typeof t.rechargeTime&&(t.q_createdAt_gte=Object(_["e"])(t.rechargeTime[0].toDate()),t.q_createdAt_lte=Object(_["e"])(t.rechargeTime[1].toDate())),t.categoryId=t.categoryId2?t.categoryId2:t.categoryId1,t.categoryId=t.categoryId3?t.categoryId3:t.categoryId,delete t.rechargeTime,t.page_size=20,a.getData(t)},a.onHandSelectRow=function(e,t){a.setState({selectedRows:t})},a.Reset=function(){var e=a.state.params;a.getData(e)},a.getData=function(e){var t=a.state.tableDatas;t.data=[];var n=0,o=u()({},e,{limit:e.pageSize});"undefined"===typeof o.cost&&null===o.cost&&delete o.cost,Object(S["B"])(o).then(function(o){200===o.status&&o.data.count&&o.data.products.forEach(function(e){n+=1;var a=u()({},e,{xh:n,key:n});t.data.push(a)}),a.setState({tableDatas:t,params:u()({},e,{totalCount:o.data.count})})})};var n=[{value:"1",label:"\u6b63\u5728\u9500\u552e"},{value:"2",label:"\u505c\u6b62\u9500\u552e"}],o=[{value:"1",label:"\u6b63\u5728\u9500\u552e"}],r=[],d=[],c={formData:[{type:"SelectCompone",label:"\u4ea7\u54c1\u7c7b\u578b1",name:"categoryId1",handChang:a.handChang1,style:{width:"196px"},ruless:[{required:!0,message:"\u8bf7\u9009\u62e9\u4ea7\u54c1\u7c7b\u578b"}],options:o},{type:"SelectCompone",label:"\u4ea7\u54c1\u7c7b\u578b2",name:"categoryId2",disabled:!0,handChang:a.handChang2,style:{width:"196px"},ruless:[],options:r},{type:"SelectCompone",label:"\u4ea7\u54c1\u7c7b\u578b3",name:"categoryId3",disabled:!0,handChang:a.handChang3,style:{width:"196px"},ruless:[],options:d},{type:"SelectCompone",label:"\u72b6\u6001\uff1a",name:"q_status_eq",style:{width:"193px"},options:n},{type:"InputIcon",label:"\u4ea7\u54c1\u540d\u79f0",name:"q_productName_like",ruless:[],placeholder:"\u4ea7\u54c1\u540d\u79f0",typeIco:"user"},{type:"SelectDateRang",label:"\u521b\u5efa\u65f6\u95f4",name:"rechargeTime",ruless:[],placeholder:"\u521b\u5efa\u65f6\u95f4",typeIco:"book"}],buttonData:[{type:"primary",ico:"edit",hangClick:a.handAdd,labe:"\u6dfb\u52a0"},{type:"primary",ico:"edit",hangClick:a.handDele,labe:"\u5220\u9664"}]},l=[{key:1,describe:["green","\u6b63\u5728\u9500\u552e"]},{key:2,describe:["green","\u505c\u6b62\u9500\u552e"]}],s=[{key:1,describe:["green","\u652f\u6301"]},{key:2,describe:["green","\u4e0d\u652f\u6301"]}],i={columns:[{title:"\u5e8f\u53f7",dataIndex:"xh",key:"xh"},{title:"\u4ea7\u54c1\u7f16\u53f7",dataIndex:"productId",key:"productId"},{title:"\u4ea7\u54c1\u7f16\u7801",dataIndex:"productCode",key:"productCode"},{title:"\u4ea7\u54c1\u540d\u79f0",dataIndex:"productName",key:"productName"},{title:"\u4ef7\u503c",dataIndex:"cost",key:"cost"},{title:"\u8fdb\u8d27\u4ef7",dataIndex:"purchasePrice",key:"purchasePrice"},{title:"\u9500\u552e\u4ef7",dataIndex:"salesPrice",key:"salesPrice"},{title:"\u4ea7\u54c1\u72b6\u6001",dataIndex:"status",key:"status",render:function(e){return Object(O["b"])(e,l)}},{title:"\u662f\u5426\u652f\u6301\u9000\u6b3e",dataIndex:"canRefund",key:"canRefund",render:function(e){return Object(O["b"])(e,s)}},{title:"\u521b\u5efa\u65e5\u671f",dataIndex:"createdAt",key:"createdAt"},{title:"\u64cd\u4f5c",dataIndex:"action",key:"action",render:function(e,t){return E.a.createElement("span",null,E.a.createElement("a",{href:"javascript:void(0)",onClick:function(){a.handUpdate(e,t)}},"\u4fee\u6539"))}}],data:[]},m={page_size:20,page:1};return a.state={tableDatas:i,headForm:c,params:m,selectedRows:[]},a}return v()(t,e),y()(t,[{key:"componentWillMount",value:function(){this.getClassData(0,0);this.state.params}},{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a=this.state,n=a.tableDatas,o=a.headForm,r=a.params,d={onChange:this.onHandSelectRow};return E.a.createElement(j["a"],null,E.a.createElement(c["a"],{bordered:!1},E.a.createElement(l["a"],null,E.a.createElement(s["a"],null,E.a.createElement(P["b"],{form:this.props.form,getData:this.getData,formData:o.formData,handleSubmit:this.handleSubmit,getFieldDecorator:t}))),E.a.createElement(l["a"],null,E.a.createElement(s["a"],null,E.a.createElement("div",{className:U.a.addButton},E.a.createElement(P["a"],{buttonData:o.buttonData}))))),E.a.createElement(A["a"],{tableData:n,rowSelection:d,params:r,getData:this.getData}),E.a.createElement(R["a"],{ref:function(t){e.ProductAddAndUpdate=t},Reset:this.Reset}),E.a.createElement(R["d"],{ref:function(t){e.ProductUpdate=t},Reset:this.Reset}))}}]),t}(E.a.Component),o=r))||o),M=d["a"].create({name:"list"})(z);t["default"]=M}}]);