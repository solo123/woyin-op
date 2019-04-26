/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearchTwo} from '@/components/HeadForm';
import {statuesRend} from '@/utils/renderUtils';
import {timeChangData} from '@/utils/utils';
import {GetOrderForBuyLisApi} from '@/services/api';
import styles from './FindBuyOrder.less';

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
    const formDatas = [
      {type: 'InputIcon' ,label: '购买订单编号', name: 'reqStreamId', ruless:[] , placeholder: '购买订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '登录手机号', name: 'logo', ruless:[] , placeholder: '登录手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'status',style:{width:'196px'},  options: option},
      {type: 'InputIcon', label: '购买对象名称',name: 'userName', ruless:[] , placeholder: '购买对象名称', typeIco: 'book'},
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
      {title: '创建日期', dataIndex: 'startTime', key: 'startTime'},
      ],
     data: []
    };

    this.state = {
      option,
      formData: formDatas,
      tableData,
      // buttonData: buttonDatas, 
      params:{
        reqStreamId: null,
        userName: null,
        status: null,
        startTime: null,
        endTime: null,
        page: 1,
        pageSize: 10,
        totalCount: 10,
      }
    }
  }
  
  componentWillMount () {
    this.getData();
  }

  getData = (params) => {
    const {tableData} = this.state;
    tableData.data = [];
    GetOrderForBuyLisApi(params).then(res=>{
      if(res.status===200 && res.data.data){
        res.data.data.forEach(element => {
          const p = {
            ...element,
            startTime: timeChangData(element.startTime),
            key: element.reqStreamId
          };
          tableData.data.push(p);
        });
        this.setState({
          tableData,
          params: {
            ...params,
            totalCount: res.data.totalCount
          }
        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {params} = this.state;
    this.props.form.validateFields((err, values) => {
      if(!err){
        const value = values;
        if(typeof values.rechargeTime !== 'undefined'){
          value.startTime = timeChangData(values.rechargeTime[0].toDate());
          value.endTime = timeChangData(values.rechargeTime[1].toDate());
        }
        delete value.rechargeTime;
        const param = {
          ...params,
          ...value,
          state: this.getV(value.state)
        }
        this.setState({params: param});
        this.getData(param)
      }
    })
  }

  getV = (key) => {
    const {option} = this.state;
    for(let i = 0 ; i < option.length ; i+=1){
       if(option[i].label === key){
         return option[i].value
       }
    }
  }

  Reset = () => {
    const params = {
      reqStreamId: null,
      userName: null,
      status: null,
      startTime: null,
      endTime: null,
      page: 1,
      pageSize: 10,
      totalCount: 10,
    }
    this.getData(params);
  }

  onChangePage = (page) => {
    const {params} = this.state;
    params.page = page;
    this.getData(params);
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, tableData, params} = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearchTwo 
                formData={formData} 
                Reset={this.Reset} 
                form={this.props.form} 
                handleSubmit={this.handleSubmit} 
                getFieldDecorator={getFieldDecorator} 
              />
            </Col>
          </Row>
        </Card>
        <Table
          columns={tableData.columns}
          dataSource={tableData.data} 
          bordered
          // rowSelection={rowSelection}
          pagination={{
            pageSize: params.pageSize,
            total: params.totalCount,
            onChange: this.onChangePage
          }}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;