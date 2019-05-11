/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {Form} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table2} from '@/components/TableList/TableListPage';
import {GetOrderForBuyLisApi, repayOrdersHistory} from '@/services/api';
// import {HeadFormSearch} from '@/components/HeadForm';
import {statuesRend} from '@/utils/renderUtils';
import {timeChangData} from '@/utils/utils';
import LocalStr from '@/utils/LocalStr';

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: '10',label: '待付款'}, 
      {value: '11',label: '处理中'},
      {value: '12',label: '成功'},
      {value: '13',label: '失败'},
      {value: '14',label: '取消'},
    ];
    const formData = [
      {type: 'InputIcon' ,label: '购买订单编号', name: 'q_reqStreamId_like', ruless:[] , placeholder: '购买订单编号', typeIco: 'user'},
      // {type: 'InputIcon' ,label: '登录手机号', name: 'logo', ruless:[] , placeholder: '登录手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'q_status_eq',style:{width:'196px'},  options: option},
      {type: 'InputIcon', label: '购买对象名称',name: 'q_userName_like', ruless:[] , placeholder: '购买对象名称', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '购买时间', name: 'rechargeTime', ruless:[] , placeholder: '购买时间', typeIco: 'book'},
    ];

    const group = [
        {key: 1, describe: ['green', '超级管理员']},
        {key: 2, describe: ['green', '普通用户']},

      ];
    const tableData = {columns: [
      {title: '订单编号', dataIndex: 'uid', key: 'uid'},
      {title: '用户名', dataIndex: 'username', key: 'username'},
      {title: '姓名', dataIndex: 'name', key: 'name'},
      {title: '最后登陆时间', dataIndex: 'last_login_time', key: 'last_login_time'},
      {title: '用户组', dataIndex: 'status', key: 'status', render: status => (statuesRend(status, group))},
      ],
     data: []
    };

    this.state = {
      option,
      formData,
      tableData,
      // buttonData: buttonDatas, 
      params:{
        reqStreamId: null,
        userName: null,
        status: null,
        startTime: null,
        endTime: null,
        page: 1,
        page_size: 20,
        totalCount: 10,
      }
    }
  }
  
  componentWillMount () {
    const order = JSON.parse(LocalStr.get("orderId"));
    this.setState({order})
    this.getData(order);
  }

  getData = (params) => {
    const {tableData} = this.state;
    tableData.data = [];
    repayOrdersHistory(params.orderId).then(res=>{
      if(res.status===200 && res.data){
        res.data.data.forEach(element => {
          const p = {
            ...element,
            startTime: timeChangData(element.startTime),
            key: element.reqStreamId
          };
          tableData.data.push(p);
        });
      }
      this.setState({
        tableData,
        params: {
          ...params,
        }
      })
    })
  }

  handleSubmit = (values) => {
    const params = values;

    if(typeof params.rechargeTime !== 'undefined'){
      params.q_startTime_gt = timeChangData(values.rechargeTime[0].toDate());
      params.q_startTime_lt = timeChangData(values.rechargeTime[1].toDate());
    }
    delete params.rechargeTime;

    this.getData({
      ...params,
      state: this.getV(params.status)
    })
  }

  getV = (key) => {
    const {option} = this.state;
    for(let i = 0 ; i < option.length ; i+=1){
       if(option[i].value === key || option[i].label === key){
         return option[i].value
       }
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, tableData, params} = this.state;
   
    return (
      <PageHeaderWrapper>
        {/* <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch 
                formData={formData} 
                getData={this.getData} 
                form={this.props.form} 
                handleSubmit={this.handleSubmit} 
                getFieldDecorator={getFieldDecorator} 
              />
            </Col>
          </Row>
        </Card> */}
        <Table2
          tableData={tableData}
          // rowSelection={rowSelection}
          params={params}
          getData={this.getData}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;