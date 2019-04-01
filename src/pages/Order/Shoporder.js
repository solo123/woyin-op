/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Tag,
  message
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearchTwo, HeadFootButton} from '@/components/HeadForm';
import {RechargMerchantRechargesPOST,findOrderInfo} from '@/services/api';
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
      {type: 'InputIcon' ,label: '商户登录账号', name: 'userAccount', ruless:[] , placeholder: '充值对象登录号', typeIco: 'book'},
      {type: 'SelectCompone', label: '充值人员类型', name: 'roleType', options: option},
      {type: 'SelectCompone', label: '状态：', name: 'state', options: option},
      {type: 'InputIcon' ,label: '充值对象名称', name: 'merchantName', ruless:[] , placeholder: '充值对象名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '批次号', name: 'batchNum', ruless:[] , placeholder: '批次号', typeIco: 'user'},
      {type: 'SelectDateRang' ,label: '充值时间', name: 'rechargeTime', ruless:[] , placeholder: '充值时间', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.handMerchInterAppaly, labe: '充值审核'},
      {type: 'primary', ico: 'edit', hangClick: this.handMerchInterAnace, labe: '充值拒绝 '}  
    ];
    const tableData = {columns: 
      [
        {title: '充值订单编号', dataIndex: 'orderId', key: 'orderId'},
        // {title: '批次号', dataIndex: 'batchNum', key: 'batchNum'},
        {title: '充值对象登录号', dataIndex: 'userAccount', key: 'userAccount'},
        {title: '充值对象名称', dataIndex: 'merchantName', key: 'merchantName'},
        {title: '充值对象类型', dataIndex: 'roleType', key: 'rechargeType'},
        // {title: '充值类型', dataIndex: 'type', key: 'type', width: 100},
        // {title: '加款方式', dataIndex: 'mode', key: 'mode', width: 100},
        {title: '订单积分', dataIndex: 'balance', key: 'balance'},
        {title: '状态', dataIndex: 'state', key: 'statue' ,render: state => {
          switch(state){
            case 1: return  <Tag color="green">新建</Tag>
            case 2: return  <Tag color="blue">同意</Tag>
            case -1: return  <Tag color="red">拒绝</Tag>
            default: return <Tag color="red">其他</Tag>
          }
        }},
        {title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 120},
     ],
     data: []
    };
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
      tableData,
      params: {
        orderId: '',
        userAccount: '',
        roleType: '',
        merchantName: '',
        batchNum: '',
        state: '',
        startTime: '',
        endTime: ''
      }
    }
  }
  
  componentWillMount () {
   this.getData();
  }
  
  getData = (param) => {
    const {tableData} = this.state;
    findOrderInfo(param).then(res => {
      if(res.status === 200){
       res.data.data.forEach(item => {
          const order = {};
          order.orderId = item.orderId ;
          order.userAccount = item.userAccount ;
          order.key = item.orderId ;
          order.roleType = item.roleType ;
          order.merchantName = item.merchantName ;
          order.balance = item.balance ;
          order.batchNum = item.batchNum ;
          order.createTime = item.createTime ;
          order.state = item.state ;
          tableData.data.push(order);
        });
        this.setState({
          tableData
        })
      }
    })
  }

  // 同意
  handMerchInterAppaly = (e) => {
    const {withDrawList} = this.state;
    if(withDrawList.length <= 0) return;
    
    withDrawList.forEach(item => {
      const params = {
        orderId: item.key,
        state: 2
      }
      RechargMerchantRechargesPOST(params).then(res => {
        if(res.status === 200){
          message.info('操作成功');
        }else{
          message.error('操作失败');
        }
      });
    })
  }

  // 拒绝
  handMerchInterAnace = (e) => {
    const {withDrawList} = this.state;
    if(withDrawList.length <= 0) return;
    withDrawList.forEach(item => {
      const params = {
        orderId: item.key,
        state: -1
      }
      RechargMerchantRechargesPOST(params).then(res => {
        if(res.status === 200){
          message.info('操作成功');
        }else{
          message.error('操作失败');
        }
      });
    })
  }

  onSelectedRows = (selectedRowKeys, selectedRows) => {
    this.setState({
      withDrawList: selectedRows
  });
  }

  handEdit = (e) => {
    e.preventDefault();
  }

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
      onChange: this.onSelectedRows
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
          scroll={{ x: 1200 }}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;