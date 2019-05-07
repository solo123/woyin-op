/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'dva';
import { 
  Row,
  Col,
  Card,
  Form,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table2} from '@/components/TableList/TableListPage';
import {HeadFormSearch} from '@/components/HeadForm';
import {gerMerchantHuiInfo} from '@/services/api';
import {statuesRend} from '@/utils/renderUtils';
import {timeChangData} from '@/utils/utils';
import styles from './Info.less';

@connect()
class BalanceInfo extends Component {
  constructor(props){
    super(props);
    const formDatas = [
      {type: 'InputIcon', label: '商户登录帐户', name: 'userAccount', ruless:[], placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon', label: '商户名称', name: 'merchantName', ruless:[], placeholder: '商户名称', typeIco: 'book'},
      {type: 'InputIcon', label: '用户手机号码', name: 'userPhoneNo', ruless:[], placeholder: '用户手机号码', typeIco: 'book'},
      {type: 'InputIcon', label: '用户名称', name: 'userName', ruless:[], placeholder: '用户名称', typeIco: 'book'},
    ];
    const STATUSITEMS = [
      {key: 0, describe: ['green', '未激活']},
      {key: 1, describe: ['blue', '正常']},
      {key: 2, describe: ['red', '冻结']},
      {key: 3, describe: ['red', '没激活']}
    ];
    const tableData = {
      columns: [
        {title: '用户名', dataIndex: 'userName', key: 'userName'},
        {title: '用户手机号码', dataIndex: 'userPhoneNo', key: 'userPhoneNo'},
        {title: '用户备注', dataIndex: 'remark', key: 'remark'},
        // {title: '用户冻结时间', dataIndex: 'freezeTime', key: 'freezeTime'},
        // {title: '用户更新时间', dataIndex: 'updateTime', key: 'updateTime'},
        {title: '状态', dataIndex: 'status', key: 'status', render: status => (statuesRend(status, STATUSITEMS))},
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
        pageSize: 20 ,
        page: 1,
        totalCount: 10,
      }
    }
  }

  componentWillMount () {
    this.getData(this.state.params);
  }

  handleSubmit = values => {
    const {params} = this.state;
    params.userAccount = values.userAccount;
    params.merchantName = values.merchantName;
    params.userPhoneNo = values.userPhoneNo;  
    params.userName = values.userName;
    this.getData(params);
  }

  getData = (params) => {
    const param = {
      ...params,
      count: params.pageSize
    };
    const {tableData} = this.state;
    
    gerMerchantHuiInfo(param).then(res => {
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
          params:{
            ...params,
            totalCount: res.data.totalCount
          }
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
                getData={this.getData} 
                formData={formData} 
                handleSubmit={this.handleSubmit} 
                form={this.props.form} 
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
    );
  }
}
const BalanceInfos = Form.create({ name: 'list' })(BalanceInfo);
export default BalanceInfos;
