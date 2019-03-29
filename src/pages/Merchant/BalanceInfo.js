/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'dva';
import { 
  Table,
  Row,
  Col,
  Card,
  Form,
  Tag
} from 'antd';
import {HeadFormSearch} from '@/components/HeadForm';
import {gerMerchantHuiInfo} from '@/services/api';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Info.less';

@connect()
class BalanceInfo extends Component {
  constructor(props){
    super(props);
    const formDatas = [
      {type: 'InputIcon' ,label: '商户登录帐户', name: 'userAccount', ruless:[] , placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon' ,label: '商户名称', name: 'merchantName', ruless:[] , placeholder: '商户名称', typeIco: 'book'},
      {type: 'InputIcon' ,label: '用户手机号码', name: 'userPhoneNo', ruless:[] , placeholder: '用户手机号码', typeIco: 'book'},
      {type: 'InputIcon' ,label: '用户名称', name: 'userName', ruless:[] , placeholder: '用户名称', typeIco: 'book'},
    ];
    const tableData = {
      columns: [
        {title: '用户名', dataIndex: 'userName', key: 'userName'},
        {title: '用户手机号码', dataIndex: 'userPhoneNo', key: 'userPhoneNo'},
        // {title: '用户昵称', dataIndex: 'nickName', key: 'nickName'},
        {title: '用户备注', dataIndex: 'remark', key: 'remark'},
        {title: '用户冻结时间', dataIndex: 'freezeTime', key: 'freezeTime'},
        {title: '用户更新时间', dataIndex: 'updateTime', key: 'updateTime'},
        {title: '状态', dataIndex: 'status', key: 'status', render: status => {
          switch(status){
            case 0: return  <Tag color="green">未激活</Tag>
            case 1: return  <Tag color="blue">正常</Tag>
            case 2: return  <Tag color="red">冻结</Tag>
            default: return  <Tag color="red">其他</Tag>
          }
        }},
        {title: '用户组创建时间', dataIndex: 'createTime', key: 'createTime'},
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
        totalCount: 10
      }
    }
  }

  componentWillMount() {
    this.getData(this.state.params);
  }

  onChangePage = (page)=>{
    const {params} = this.state;
    params.page = page;
    this.getData(params);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const {params} = this.state;
        params.userAccount = values.userAccount ;
        params.merchantName = values.merchantName ;
        params.userPhoneNo = values.userPhoneNo ;
        params.userName = values.userName ;
        this.getData(params);
      }
    })
  };

  getData = (params) => {
    gerMerchantHuiInfo(params).then(res => {
      if(res.status === 200){
        const {tableData, params} = this.state;
        tableData.data = [];
        res.data.data.forEach(element => {
          const d = {
            key: element.userId,
            userName: element.userName,
            userPhoneNo: element.userPhoneNo,
            nickName: element.nickName,
            remark: element.remark,
            freezeTime: element.freezeTime,
            updateTime: element.updateTime,
            status: element.status,
            createTime: element.createTime,
          }
          tableData.data.push(d);
        });
        params.totalCount = res.data.totalCount;
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
              <HeadFormSearch formData={formData} handleSubmit={this.handleSubmit} form={this.props.form} getFieldDecorator={getFieldDecorator} />
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
