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
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {MemberRecharges} from '@/components/Merchant';
import {HeadFormSearch} from '@/components/HeadForm';
import {RechargeGetMerList} from '@/services/api';
import {Table2} from '@/components/TableList/TableListPage';
import {statuesRend} from '@/utils/renderUtils';
import styles from './Recharge.less';

@connect()
class Recharge extends React.Component {
  constructor(props){
    super(props);
    const formDatas = [
      {type: 'InputIcon', label: '商户登录帐户', name: 'userAccount', ruless:[], placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon', label: '商户名称', name: 'merchantName', ruless:[], placeholder: '商户名称', typeIco: 'book'},
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
      tableData,
      params: {
        userAccount: null,
        merchantName: null,
        count: null,
        page: 1,
        pageSize: 20,
        totalCount: 0,
      }
    }
  }
  
  componentWillMount () {
    const {params} = this.state;
    this.getData(params);
  }

  getData = (params) => {
    const param = {
      ...params,
      count: params.pageSize,
    }
    RechargeGetMerList(param).then(res => {
      if(res.status === 200) {
        this.dataRinse(res.data.data);
        this.setState({
          params: {
            ...params,
            totalCount: res.data.totalCount
          }
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

  hangelRowChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      cureeMerchId: selectedRows[0].key
    })
  }

  dataRinse = (data) => {
    const {tableData} = this.state;
    tableData.data = [];
    for(let i = 0; i < data.length; i+=1){
      const mer = {
        ...data[i],
        key: data[i].merchantId
      }
      tableData.data.push(mer);
    }
    this.setState({
      tableData
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, tableData, params } = this.state;
    const rowSelection = {
      type: 'radio',
      onChange: this.hangelRowChange
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch 
                formData={formData} 
                getData={this.getData} 
                handleSubmit={this.handleSubmit} 
                form={this.props.form} 
                getFieldDecorator={getFieldDecorator} 
              />
            </Col>
          </Row>
        </Card>
        <Table2
          tableData={tableData}
          rowSelection={rowSelection}
          params={params}
          getData={this.getData}
          scroll={{ x: 1200 }}
        />
        <MemberRecharges ref={c => {this.MemberRecharges = c}} />
      </PageHeaderWrapper>
    )
  }
}
const Recharges = Form.create({ name: 'list' })(Recharge);
export default Recharges;