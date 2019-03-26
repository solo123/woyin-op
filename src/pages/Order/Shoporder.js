/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearchTwo, HeadFootButton} from '@/components/HeadForm';
import {findOrderInfo} from '@/services/api';
import styles from './Shoporder.less'

@connect()
class List extends React.Component {
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
      {type: 'InputIcon' ,label: '充值订单编号', name: 'orderId', ruless:[] , placeholder: '充值订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '充值对象登录号', name: 'userAccount', ruless:[] , placeholder: '充值对象登录号', typeIco: 'book'},
      {type: 'SelectCompone', label: '充值人员类型', name: 'roleType', options: option},
      {type: 'SelectCompone', label: '状态：', name: 'state', options: option},
      {type: 'InputIcon' ,label: '充值对象名称', name: 'merchantName', ruless:[] , placeholder: '充值对象名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '批次号', name: 'batchNum', ruless:[] , placeholder: '批次号', typeIco: 'user'},
      {type: 'SelectDateRang' ,label: '充值时间', name: 'rechargeTime', ruless:[] , placeholder: '充值时间', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddRole, labe: '充值审核'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出'}
    ];
    const tableData = {columns: 
      [
        {title: '充值订单编号', dataIndex: 'orderId', key: 'orderId', width: 120},
        {title: '批次号', dataIndex: 'batchNum', key: 'batchNum', width: 100},
        {title: '充值对象登录号', dataIndex: 'userAccount', key: 'userAccount', width: 180},
        {title: '充值对象名称', dataIndex: 'merchantName', key: 'merchantName', width: 160},
        {title: '充值对象类型', dataIndex: 'roleType', key: 'rechargeType', width: 160},
        // {title: '充值类型', dataIndex: 'type', key: 'type', width: 100},
        // {title: '加款方式', dataIndex: 'mode', key: 'mode', width: 100},
        {title: '订单积分', dataIndex: 'balance', key: 'balance', width: 100},
        {title: '状态', dataIndex: 'statue', key: 'state', width: 80},
        // {title: '申请人ID', dataIndex: 'applyId', key: 'applyId', width: 140},
        // {title: '申请人', dataIndex: 'apply', key: 'apply', width: 80},
        // {title: '审核人', dataIndex: 'audit', key: 'audit', width: 80},
        // {title: '备注', dataIndex: 'remark', key: 'remark', width: 80},
        // {title: '日志信息', dataIndex: 'jourInfo', key: 'jourInfo', width: 120},
        // {title: '扩展属性', dataIndex: 'extend', key: 'extend', width: 120},
        {title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 120},
     ],
     data: []
    };
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
      tableData
    }
  }
  
  componentWillMount () {
    this.getData();
  }

  
  getData = (param) => {
    const {tableData} = this.state;
    findOrderInfo(param).then(res => {
      if(res.status === 200){
       res.data.forEach(item => {
          const order = {};
          order.balance = item.balance;
          order.batchNum = item.batchNum;
          order.createTime = item.createTime;
          order.id = item.id;
          order.merchantId = item.merchantId;
          order.merchantName = item.merchantName;
          order.orderId = item.orderId;
          order.roleType = item.roleType;
          order.state = item.state;
          order.userAccount = item.userAccount;
          order.key = item.orderId;
          tableData.data.push(order);
        });
        this.setState({
          tableData
        })
      }
    })
  }

  createMember = (texts, record) => {

  }

  handEdit = (e) => {
    e.preventDefault();
  }

  // 查询
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log('Received values of form: ', values);
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, buttonData, tableData } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearchTwo formData={formData} handleSubmit={this.handleSubmit} getFieldDecorator={getFieldDecorator} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.addButton}>
                <HeadFootButton buttonData={buttonData} />
              </div>
            </Col>
          </Row>
        </Card>
        <Table
          columns={tableData.columns}
          dataSource={tableData.data} 
          bordered
          rowSelection={rowSelection}
          scroll={{ x: 2000 }}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;