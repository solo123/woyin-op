/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table2} from '@/components/TableList/TableListPage';
import {BalanceDateList} from '@/services/api';
import {HeadFormSearch} from '@/components/HeadForm';
import {statuesRend} from '@/utils/renderUtils';
import {timeChangData, timeChangDataTime} from '@/utils/utils';
import styles from './MerchantInfo.less';

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
      {type: 'InputIcon' ,label: '所属商户编号', name: 'q_merchantId_eq', ruless:[] , placeholder: '所属商户编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '用户编号', name: 'q_userId_eq', ruless:[] , placeholder: '用户编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '用户名称模糊查询', name: 'q_userName_like', ruless:[] , placeholder: '用户名称模糊查询', typeIco: 'user'},
      {type: 'InputIcon' ,label: '用户账号', name: 'q_userAccount_eq', ruless:[] , placeholder: '用户账号', typeIco: 'user'},
      {type: 'DatePickerTime' ,label: '创建时间', name: 'q_createdAt_eq',initialValue:'2019-05-17 00:00:00', ruless:[{required: true, message: '请选择时间节点'}]},
      // {type: 'InputIcon' ,label: '登录手机号', name: 'logo', ruless:[] , placeholder: '登录手机号', typeIco: 'book'},
    ];
    const PRODUCTSTATUE = [
      {key: 10, describe: ['green', '待付款']},
      {key: 11, describe: ['green', '处理中']},
      {key: 12, describe: ['green', '成功']},
      {key: 13, describe: ['green', '失败']},
      {key: 14, describe: ['green', '取消']},
    ];
    const tableData = {columns: [
      {title: '序号', dataIndex: 'xh', key: 'xh'},
      {title: '用户名', dataIndex: 'userName', key: 'userName'},
      {title: '登陆帐户', dataIndex: 'userAccount', key: 'userAccount'},
      {title: '所属商户', dataIndex: 'merchantId', key: 'merchantId'},
      {title: '积分', dataIndex: 'amount', key: 'amount'},
      {title: '冻结积分', dataIndex: 'blockAmount', key: 'blockAmount'},
      {title: '可用积分', dataIndex: 'availableAmount', key: 'availableAmount'},
      {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt'},
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
    const {params} = this.state;
    this.getData(params);
  }

  getData = (params) => {
    const {tableData} = this.state;
    tableData.data = [];
    BalanceDateList(params).then(res=>{
      if(res.status===200 && res.data.count){
        let i =0;
        res.data.balanceDates.forEach(element => {
          const p = {
            ...element,
            xh: i+=1, 
            key: element.userId
          };
          tableData.data.push(p);
        });
      }
      this.setState({
        tableData,
        params: {
          ...params,
          totalCount: res.data.count
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

    params.q_createdAt_eq = timeChangDataTime(values.q_createdAt_eq.toDate());
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
        <Card bordered={false}>
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
        </Card>
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