/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'dva';
import { 
  Table,
  Row,
  Col,
  Card,
  Form,
} from 'antd';
import {HeadFormSearch} from '@/components/HeadForm';
import {gerMerchantHuiInfo} from '@/services/api';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {statuesRend} from '@/utils/renderUtils';
import {timeChangData} from '@/utils/utils';
import styles from './merchantBalanceInfo.less';

@connect()
class BalanceInfo extends Component {
  constructor(props){
    super(props);
    const formDatas = [
      {type: 'InputIcon', label: '商户登录帐户', name: 'userAccount', ruless:[], placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon', label: '商户名称', name: 'merchantName', ruless:[], placeholder: '商户名称', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '时间', name: 'rechargeTime', ruless:[] , placeholder: '时间', typeIco: 'book'},
    ];
    const STATUSITEMS = [
      {key: 0, describe: ['green', '未激活']},
      {key: 1, describe: ['blue', '正常']},
      {key: 2, describe: ['red', '冻结']},
      {key: 3, describe: ['red', '没激活']}
    ];
    const tableData = {
      columns: [
        {title: '成员ID', dataIndex: 'userName', key: 'userName'},
        {title: '商户名称', dataIndex: 'userPhoneNo', key: 'userPhoneNo'},
        {title: '成员名称', dataIndex: 'remark', key: 'remark'},
        // {title: '用户冻结时间', dataIndex: 'freezeTime', key: 'freezeTime'},
        // {title: '用户更新时间', dataIndex: 'updateTime', key: 'updateTime'},
        // {title: '状态', dataIndex: 'status', key: 'status', render: status => (statuesRend(status, STATUSITEMS))},
        {title: '登录账号', dataIndex: 'createTime', key: 'createTime'},
        {title: '账户当前积分', dataIndex: 'createTime', key: 'createTime'},
        {title: '当前账户可用积分', dataIndex: 'createTime', key: 'createTime'},
        {title: '当前账户冻结积分', dataIndex: 'createTime', key: 'createTime'}
      ],
      data: []
    }
    this.state = {
      formData: formDatas,
      tableData,
      params: {
        userAccount: '' ,
        merchantName: '' ,
        userPhoneNo: '' ,
        userName: '' ,
        count: 10 ,
        page: 1,
        totalCount: 10,
      }
    }
  }

  componentWillMount () {
    this.getData(this.state.params);
  }

  onChangePage = (page) => {
    const {params} = this.state;
    params.page = page;
    this.getData(params);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const {params} = this.state;
        params.userAccount = values.userAccount;
        params.merchantName = values.merchantName;
        params.userPhoneNo = values.userPhoneNo;
        params.userName = values.userName;
        this.getData(params);
      }
    })
  };

  Reset = () => {
    const params = {
      userAccount: '',
      merchantName: '',
      userPhoneNo: '',
      userName: '',
      count: 10,
      page: 1,
      totalCount: 10,
    }
    this.getData(params);
  }

  getData = (params) => {
    const param = params;
    const {tableData} = this.state;
    gerMerchantHuiInfo(params).then(res => {
      if(res.status === 200){
        tableData.data = [];
        res.data.data.forEach(element => {
          const d = {
            ...element,
            createTime: timeChangData(element.createTime),
            key: element.userId,
          }
          tableData.data.push(d);
        });
        param.totalCount = res.data.totalCount;
        this.setState({
          tableData,
          params
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form; 
    const { formData, tableData, params } = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch 
                Reset={this.Reset} 
                formData={formData} 
                handleSubmit={this.handleSubmit} 
                form={this.props.form} 
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
          </Row>
        </Card>
        <Table
          columns={tableData.columns}
          dataSource={tableData.data}
          bordered
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: params.count,
            total: params.totalCount,
            onChange: this.onChangePage
           }}
        />
      </PageHeaderWrapper>
    );
  }
}
const BalanceInfos = Form.create({ name: 'list' })(BalanceInfo);
export default BalanceInfos;
