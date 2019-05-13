/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  message,
  Modal
} from 'antd'
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {RechargMerchantRechargesPOST,repayOrdersList, repayOrdersAction} from '@/services/api';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table2} from '@/components/TableList/TableListPage';
import {statuesRend} from '@/utils/renderUtils';
import {timeChangData} from '@/utils/utils';
import LocalStr from '@/utils/LocalStr';
import {routerRedux} from 'dva/router';
import styles from './List.less';

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: '1',label: '新建'}, 
      {value: '-1',label: '拒绝'}
    ];
    const option1 = [
      {value: '1',label: '商户'}
    ];
    const headForm = {
      formData: [
        {type: 'InputIcon', label: '充值订单编号', name: 'q_orderId_like', ruless:[], placeholder: '充值订单编号', typeIco: 'user'},
        {type: 'InputIcon', label: '商户登录账号', name: 'q_userAccount_like', ruless:[], placeholder: '商户登录账号', typeIco: 'book'},
        // {type: 'SelectCompone', label: '充值人员类型', name: 'roleType',style:{width: '198px'}, options: option1},
        {type: 'SelectCompone', label: '状态：', name: 'q_state_eq',style:{width: '198px'}, options: option},
        // {type: 'InputIcon', label: '充值对象名称', name: 'merchantName',ruless:[], placeholder: '充值对象名称', typeIco: 'user'},
        // {type: 'InputIcon', label: '批次号', name: 'batchNum', ruless:[],placeholder: '批次号', typeIco: 'user'},
        {type: 'SelectDateRang', label: '充值时间', name: 'rechargeTime',ruless:[], placeholder: '充值时间', typeIco: 'book'},
      ],
      buttonData: [
        {type: 'primary', ico: 'plus', hangClick: this.handMerchInterAppaly, labe: '还款审核'},
        {type: 'primary', ico: 'edit', hangClick: this.handMerchInterAnace, labe: '还款拒绝 '}  
      ]
    }
    const STATUSITEMS = [
      {key: 1, describe: ['green', '新建']},
      {key: 2, describe: ['green', '同意']},
      {key: -1, describe: ['red', '拒绝']},
    ]
    const tableData = {
      columns:[
        {title: '订单编号', dataIndex: 'orderId', key: 'orderId'},
        {title: '登录号', dataIndex: 'userAccount', key: 'userAccount'},
        {title: '对象名称', dataIndex: 'merchantName', key: 'merchantName'},
        {title: '充值对象类型', dataIndex: 'roleType', key: 'roleType'},
        {title: '积分', dataIndex: 'balance', key: 'balance'},
        {title: '还款方式', dataIndex: 'rechargeType', key: 'rechargeType'},
        {title: '状态', dataIndex: 'state', key: 'state' ,render: state => (statuesRend(state, STATUSITEMS))},
        {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt'},
        {title: '操作', dataIndex: 'action', key: 'action', render: (texts, record) => (<a href="javascript:;" onClick={()=> {this.onClick(texts, record)}}>还款记录</a>)},
     ],
     data: []
    };
    this.state = {
      tableData,
      headForm,
      params: {
        page_size: 20,
        totalCount: 0,
      }
    }
  }
  
  componentWillMount () {
    const {params} = this.state;
    this.getData(params);
  }
  
  getData = (param) => {
    const {tableData} = this.state;
    tableData.data = [];
    repayOrdersList().then(res => {
      if(res.status === 200){
        res.data.data.forEach(item => {
          const order = {
            ...item,
            key: item.orderId,
          };
          tableData.data.push(order);
        });
        const params = {
          ...param,
          totalCount: res.data.total
        }
       
        this.setState({
          params,
          tableData
        })
      }
    })
  }

  onClick = (texts, record) => {
    LocalStr.set("orderId", JSON.stringify(record));
    this.props.dispatch(routerRedux.push({
      pathname: '/repayment/repaymenthiston'
    }));
  }

  // 同意
  handMerchInterAppaly = (e) => {
    const {withDrawList} = this.state;
    if(typeof withDrawList === 'undefined') {
      Modal.info({
        title: '信息提醒',
        content: '请选择要审核的订单！',
      })
      return
    }
    withDrawList.forEach(item => {
      this.handRepayOrdersAction(item.key, 2); 
    })
  }

  // 拒绝
  handMerchInterAnace = (e) => {
    const {withDrawList} = this.state;
    if(typeof withDrawList === 'undefined') {
      Modal.info({
        title: '信息提醒',
        content: '请选择要审核的订单',
      })
      return;
    }
    withDrawList.forEach(item => {
      this.handRepayOrdersAction(item.key, -1); 
    })
  }

  // 订单审核操作
  handRepayOrdersAction = (orderId, operate) => {
    const formData = new FormData();
    formData.append("operate", operate);
    repayOrdersAction(formData, orderId).then(res => {
      if(res.status === 200){
        message.info('操作成功');
      }else{
        message.error('操作失败');
      }
    });
  }

  onSelectedRows = (selectedRowKeys, selectedRows) => {
    this.setState({
      withDrawList: selectedRows
    });
  }

  handleSubmit = (values) => {
    const params = values;
    if(typeof values.rechargeTime !== 'undefined'){
      params.q_createTime_gt = timeChangData(values.rechargeTime[0].toDate());
      params.q_createTime_lt = timeChangData(values.rechargeTime[1].toDate());
    }
    delete params.rechargeTime;
    this.getData(params);
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { tableData, headForm , params} = this.state;
    const rowSelection = {
      onChange: this.onSelectedRows
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          {/* <Row>
            <Col>
              <HeadFormSearch 
                formData={headForm.formData} 
                getData={this.getData} 
                form={this.props.form} 
                handleSubmit={this.handleSubmit} 
                getFieldDecorator={getFieldDecorator} 
              />
            </Col>
          </Row> */}
          <Row>
            <Col>
              <div>
                <HeadFootButton buttonData={headForm.buttonData} />
              </div>
            </Col>
          </Row>
        </Card>
        <Table2
          tableData={tableData}
          rowSelection={rowSelection}
          params={params}
          getData={this.getData}
          // scroll={{ x: 1200 }}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;