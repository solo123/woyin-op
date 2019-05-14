/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
} from 'antd';
import {GetOrderForBuyLisApi, OrderTotals} from '@/services/api';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table2} from '@/components/TableList/TableListPage';
import {HeadFormSearch} from '@/components/HeadForm';
import {statuesRend} from '@/utils/renderUtils';
import {timeChangData} from '@/utils/utils';
import styles from './FindBuyOrder.less';

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: 0 ,label: '全部'}, 
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
    const PRODUCTSTATUE = [
      {key: 10, describe: ['green', '待付款']},
      {key: 11, describe: ['green', '处理中']},
      {key: 12, describe: ['green', '成功']},
      {key: 13, describe: ['green', '失败']},
      {key: 14, describe: ['green', '取消']},
    ];
    const tableData = {columns: [
      {title: '序号', dataIndex: 'xh', key: 'xh'},
      {title: '订单编号', dataIndex: 'reqStreamId', key: 'reqStreamId'},
      {title: '登录手机号', dataIndex: 'userPhoneNo', key: 'userPhoneNo'},
      {title: '用户名', dataIndex: 'userName', key: 'userName'},
      {title: '所属商户', dataIndex: 'merchantName', key: 'merchantName'},
      {title: '产品名', dataIndex: 'productName', key: 'productName'},
      {title: '产品类型', dataIndex: 'productType', key: 'productType'},
      {title: '实际价值（折扣后）', dataIndex: 'Actual', key: 'Actual'},
      {title: '产品价值（折扣前）', dataIndex: 'productValue', key: 'productValue'},
      {title: '折扣率', dataIndex: 'discount', key: 'discount'},
      {title: '状态', dataIndex: 'status', key: 'status', render: status => (statuesRend(status, PRODUCTSTATUE))},
      {title: '创建日期', dataIndex: 'createdAt', key: 'createdAt'},
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

  getOrderTotals = (params) => {
    OrderTotals(params, 3).then(res => {
      console.log(res);
    })
  }

  getData = (params) => {
    const {tableData} = this.state;
    tableData.data = [];
    if(params.q_status_eq==="0") delete params.q_status_eq;
    GetOrderForBuyLisApi(params).then(res=>{
      if(res.status===200 && res.data.data){
        this.getOrderTotals(params);
        let i = 0;
        res.data.data.forEach(element => {
          i +=1;
          const p = {
            ...element,
            startTime: timeChangData(element.startTime),
            key: element.reqStreamId,
            xh: i
          };
          tableData.data.push(p);
        });
      }
      this.setState({
        tableData,
        params: {
          ...params,
          totalCount: res.data.total
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