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
import {GetTransferOrderApi} from '@/services/api';
import styles from './FindBuyOrder.less';

@connect()
class TransferOrderList extends React.Component {
  constructor(props){
    super(props);
    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    const formDatas = [
      {type: 'InputIcon' ,label: '订单Id', name: 'orderId', ruless:[] , placeholder: '订单Id', typeIco: 'user'},
      {type: 'InputIcon' ,label: '转赠账号', name: 'fromAccount', ruless:[] , placeholder: '转赠账号', typeIco: 'book'},
      {type: 'InputIcon' ,label: '接收转赠的账号', name: 'toAccount', ruless:[] , placeholder: '接收转赠的账号', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '购买时间', name: 'rechargeTime', ruless:[] , placeholder: '购买时间', typeIco: 'book'},
    ];
    const tableData = {columns: 
      [
        {title: '订单ID', dataIndex: 'orderId', key: 'orderId'},
        {title: '转赠人姓名', dataIndex: 'fromName', key: 'fromName'},
        {title: '转赠账号', dataIndex: 'fromAccount', key: 'fromAccount'},
        {title: '接收人姓名', dataIndex: 'toName', key: 'toName'},
        {title: '接收转赠的账号', dataIndex: 'toAccount', key: 'toAccount'},
        {title: '转赠积分', dataIndex: 'num', key: 'num'},
        {title: '手续费', dataIndex: 'poundage', key: 'poundage'},
        {title: '创建日期', dataIndex: 'createTime', key: 'createTime'},
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
        }
        this.setState({params: param});
        this.getData(param)
      }
    })
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
              <HeadFormSearchTwo formData={formData} Reset={this.Reset} form={this.props.form} handleSubmit={this.handleSubmit} getFieldDecorator={getFieldDecorator} />
            </Col>
          </Row>
        </Card>
        <Table
          columns={tableData.columns}
          dataSource={tableData.data} 
          bordered
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
const TransferOrderLists = Form.create({ name: 'TransferOrderList' })(TransferOrderList);
export default TransferOrderLists;