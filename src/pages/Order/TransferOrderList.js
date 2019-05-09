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
import {HeadFormSearch} from '@/components/HeadForm';
import {statuesRend} from '@/utils/renderUtils';
import {Table2} from '@/components/TableList/TableListPage';
import {timeChangData} from '@/utils/utils';
import {GetTransferOrderApi} from '@/services/api';
import styles from './FindBuyOrder.less';

@connect()
class TransferOrderList extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: '1',label: '正常'}, 
      {value: '0',label: '禁用'}
    ];
    const formDatas = [
      {type: 'InputIcon' ,label: '订单Id', name: 'q_orderId_like', ruless:[] , placeholder: '订单Id', typeIco: 'user'},
      {type: 'InputIcon' ,label: '转赠账号', name: 'q_form_like', ruless:[] , placeholder: '转赠账号', typeIco: 'book'},
      {type: 'InputIcon' ,label: '接收转赠的账号', name: 'q_toAccount_like', ruless:[] , placeholder: '接收转赠的账号', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '购买时间', name: 'rechargeTime', ruless:[] , placeholder: '购买时间', typeIco: 'book'},
    ];
    const tableData = {columns: 
      [
        {title: '订单ID', dataIndex: 'Id', key: 'Id'},
        {title: '转赠人姓名', dataIndex: 'fromName', key: 'fromName'},
        {title: '转赠账号', dataIndex: 'fromAccount', key: 'fromAccount'},
        {title: '接收人姓名', dataIndex: 'toName', key: 'toName'},
        {title: '接收转赠的账号', dataIndex: 'toAccount', key: 'toAccount'},
        {title: '转赠积分', dataIndex: 'num', key: 'num'},
        {title: '手续费', dataIndex: 'poundage', key: 'poundage'},
        {title: '创建日期', dataIndex: 'createdAt', key: 'createdAt'},
      ],
     data: []
    };

    this.state = {
      formData: formDatas,
      tableData,
      params:{
        orderId: null,
        fromAccount: null,
        toAccount: null,
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
    GetTransferOrderApi(params).then(res=>{
      if(res.status===200 && res.data.data){
        res.data.data.forEach(element => {
          const p = {
            ...element,
            createTime: timeChangData(element.createTime),
            key: element.orderId
          };
          tableData.data.push(p);
        });
        this.setState({
          tableData,
          params: {
            ...params,
            totalCount: res.data.total
          }
        })
      }
    })
  }

  handleSubmit = (values) => {
    const params = values;

    if(typeof values.rechargeTime !== 'undefined'){
      params.q_createTime_gt = timeChangData(values.rechargeTime[0].toDate());
      params.q_createTime_lt = timeChangData(values.rechargeTime[1].toDate());
    }

    delete params.rechargeTime;
    this.getData(params)
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
          scroll={{ x: 1200 }}
        />
      </PageHeaderWrapper>
    )
  }
}
const TransferOrderLists = Form.create({ name: 'TransferOrderList' })(TransferOrderList);
export default TransferOrderLists;