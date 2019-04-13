/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  message
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearchTwo, HeadFootButton} from '@/components/HeadForm';
import {RechargMerchantRechargesPOST,findOrderInfo} from '@/services/api';
import {timeChangData} from '@/utils/utils';
import {statuesRend} from '@/utils/renderUtils';
import styles from './Shoporder.less';

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: '1',label: '新建'}, 
      {value: '-1',label: '拒绝'}
    ];
    const headForm = {
      formData: [
        {type: 'InputIcon', label: '充值订单编号', name: 'orderId', ruless:[], placeholder: '充值订单编号', typeIco: 'user'},
        {type: 'InputIcon', label: '商户登录账号', name: 'userAccount', ruless:[], placeholder: '充值对象登录号', typeIco: 'book'},
        {type: 'SelectCompone', label: '充值人员类型', name: 'roleType',style:{width: '198px'}, options: option},
        {type: 'SelectCompone', label: '状态：', name: 'state',style:{width: '198px'}, options: option},
        {type: 'InputIcon', label: '充值对象名称', name: 'merchantName',ruless:[], placeholder: '充值对象名称', typeIco: 'user'},
        {type: 'InputIcon', label: '批次号', name: 'batchNum', ruless:[],placeholder: '批次号', typeIco: 'user'},
        {type: 'SelectDateRang', label: '充值时间', name: 'rechargeTime',ruless:[], placeholder: '充值时间', typeIco: 'book'},
      ],
      buttonData: [
        {type: 'primary', ico: 'plus', hangClick: this.handMerchInterAppaly, labe: '充值审核'},
        {type: 'primary', ico: 'edit', hangClick: this.handMerchInterAnace, labe: '充值拒绝 '}  
      ]
    }
    const STATUSITEMS = [
      {key: 1, describe: ['green', '新建']},
      {key: 2, describe: ['green', '同意']},
      {key: -1, describe: ['red', '拒绝']},
    ]
    const tableData = {
      columns:[
        {title: '充值订单编号', dataIndex: 'orderId', key: 'orderId', width: 250},
        {title: '充值对象登录号', dataIndex: 'userAccount', key: 'userAccount', width: 200},
        {title: '充值对象名称', dataIndex: 'merchantName', key: 'merchantName', width: 200},
        {title: '充值对象类型', dataIndex: 'roleType', key: 'rechargeType', width: 150},
        {title: '订单积分', dataIndex: 'balance', key: 'balance', width: 150},
        {title: '状态', dataIndex: 'state', key: 'state' ,render: state => (statuesRend(state, STATUSITEMS))},
        {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
     ],
     data: []
    };
    this.state = {
      tableData,
      headForm
    }
  }
  
  componentWillMount () {
    this.getData();
  }
  
  getData = (param) => {
    const {tableData} = this.state;
    tableData.data = [];
    findOrderInfo(param).then(res => {
      if(res.status === 200){
        res.data.data.forEach(item => {
          const order = {};
          order.orderId = item.orderId;
          order.userAccount = item.userAccount;
          order.key = item.orderId;
          order.roleType = item.roleType;
          order.merchantName = item.merchantName;
          order.balance = item.balance;
          order.batchNum = item.batchNum;
          order.createTime = item.createTime;
          order.state = item.state;
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

  Reset = ()=> {
    this.getData();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let startTime = null;
    let endTime = null;
    this.props.form.validateFields((err, values) => {
      if(typeof values.rechargeTime !== 'undefined'){
        startTime = timeChangData(values.rechargeTime[0].toDate());
        endTime = timeChangData(values.rechargeTime[1].toDate());
      }
      console.log(values);
      const params = {
        ...values,
        endTime,
        startTime,
        rechargeTime: null
      };
      if(!err){
        this.getData(params);
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { tableData, headForm } = this.state;
    const rowSelection = {
      onChange: this.onSelectedRows
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearchTwo 
                formData={headForm.formData} 
                Reset={this.Reset} 
                form={this.props.form} 
                handleSubmit={this.handleSubmit} 
                getFieldDecorator={getFieldDecorator} 
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.addButton}>
                <HeadFootButton buttonData={headForm.buttonData} />
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