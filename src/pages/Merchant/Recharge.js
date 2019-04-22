/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Modal,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {MemberRecharges} from '@/components/Merchant';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {RechargeGetMerList} from '@/services/api';
import {statuesRend} from '@/utils/renderUtils';
import styles from './Recharge.less'

@connect()
class Recharge extends React.Component {
  constructor(props){
    super(props);
    const cureeMerchId = null;
    const formDatas = [
      {type: 'InputIcon', label: '商户登录帐户', name: 'userAccount', ruless:[], placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon', label: '商户名称', name: 'merchantName', ruless:[], placeholder: '商户名称', typeIco: 'book'},
    ];
    const buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.hangClick, labe: '代充值'}
    ];
    const STATUSITEMS = [
      {key: 1, describe: ['blue', '正常']},
      {key: 2, describe: ['red', '冻结']}
    ];
    const tableData = {
      columns:[
        {title: '商户登录帐户', dataIndex: 'userAccount'},
        {title: '商户名称', dataIndex: 'merchantName'},
        {title: '商户地址', dataIndex: 'merchantAddr'},
        {title: '联系人', dataIndex: 'contactMan'},
        {title: '手机号', dataIndex: 'phoneNum'},
        {title: '固定电话', dataIndex: 'telNum'},
        {title: '状态', dataIndex: 'status', render: status => (statuesRend(status, STATUSITEMS))},
        {title: '创建时间', dataIndex: 'createTime'},
        {title: '操作', dataIndex: 'action', key: 'action' ,render:(texts, record)=>(<a href="javascript:void(0)" onClick={()=> { this.hangClick(texts, record)}}>充值</a>)}
     ],
     data :[]
    };

    this.state = {
      formData: formDatas,
      buttonData,
      tableData,
      cureeMerchId,
      limit: 10,
      count: 1,
      params: {
        userAccount: null,
        merchantName: null,
        count: null,
        page: null,
      },
    }
  }
  
  componentWillMount () {
    const params = {
      count: this.state.limit,
      page: 1
    }
    this.geGetMerList(params);
  }

  geGetMerList = (params) => {
    RechargeGetMerList(params).then(res => {
      if(res.status === 200) {
        this.dataRinse(res.data.data);
        this.setState({
          count: res.data.totalCount
        })
      }
    })
  }

  hangClick = (texts, record) => {
    const cureeMerchId = record.key;
    if(cureeMerchId){
      this.MemberRecharges.showModal(cureeMerchId);
    }else{
      Modal.info({
        title: '信息提醒',
        content: '选选择要充值的商户！',
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.setState({
          params: values
        })
        RechargeGetMerList(values).then(res => {
          if(res.status === 200){
            this.dataRinse(res.data.data);
          }
        })
      }
    })
  }

  onChangePage = (page, pageSize) => {
    const {params} = this.state;
    params.count = this.state.limit;
    params.page = page;
    this.geGetMerList(params);
  }

  hangelRowChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      cureeMerchId: selectedRows[0].key
    })
  }

  Reset = () => {
    this.geGetMerList();
  }

  dataRinse = (data) => {
    const {tableData} = this.state;
    tableData.data = [];
    for(let i = 0; i < data.length; i+=1){
      const mer = {};
      mer.key = data[i].accountId;
      mer.userAccount = data[i].userAccount;
      mer.merchantName = data[i].merchantName;
      mer.merchantAddr = data[i].merchantAddr;
      mer.contactMan = data[i].contactMan;
      mer.phoneNum = data[i].phoneNum;
      mer.telNum = data[i].telNum;
      mer.status = data[i].status;
      mer.createTime = data[i].createTime;
      tableData.data.push(mer);
    }
    this.setState({
      tableData
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, tableData, buttonData, limit, count } = this.state;
    const rowSelection = {
      type: 'radio',
      onChange: this.hangelRowChange
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch formData={formData} Reset={this.Reset} handleSubmit={this.handleSubmit} form={this.props.form} getFieldDecorator={getFieldDecorator} />
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <div className={styles.addButton}>
                <HeadFootButton buttonData={buttonData} />
              </div>
            </Col>
          </Row> */}
        </Card>
        <Table
          columns={tableData.columns}
          dataSource={tableData.data} 
          bordered
          // rowSelection={rowSelection}
          pagination={{
            pageSize: limit ,// 每页的条数
            total: count,
            onChange: this.onChangePage
           }}
        />
        <MemberRecharges ref={c => {this.MemberRecharges = c}} />
      </PageHeaderWrapper>
    )
  }
}
const Recharges = Form.create({ name: 'list' })(Recharge);
export default Recharges;