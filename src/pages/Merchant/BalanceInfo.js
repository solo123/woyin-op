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
      {type: 'InputIcon', label: '商户登录帐户', name: 'q_userAccount_like', ruless:[], placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon', label: '商户名称', name: 'q_merchantName_like', ruless:[], placeholder: '商户名称', typeIco: 'book'},
      {type: 'InputIcon', label: '用户手机号码', name: 'q_userPhoneNo_like', ruless:[], placeholder: '用户手机号码', typeIco: 'book'},
      {type: 'InputIcon', label: '用户名称', name: 'q_userName_like', ruless:[], placeholder: '用户名称', typeIco: 'book'},
    ];
    const STATUSITEMS = [
      {key: 0, describe: ['green', '未激活']},
      {key: 1, describe: ['blue', '正常']},
      {key: 2, describe: ['red', '冻结']},
      {key: 3, describe: ['red', '没激活']}
    ];
    const tableData = {
      columns: [
        {title: '序号', dataIndex: 'xh', key: 'xh'},
        {title: '商户登陆帐户', dataIndex: 'MerchantAccount', key: 'MerchantAccount'},
        {title: '商户名', dataIndex: 'MerchantName', key: 'MerchantName'},
        {title: '用户名', dataIndex: 'UserName', key: 'UserName'},
        {title: '手机号码', dataIndex: 'UserPhoneNo', key: 'UserPhoneNo'},
        // {title: '备注', dataIndex: 'remark', key: 'remark'},
        // {title: '用户冻结时间', dataIndex: 'freezeTime', key: 'freezeTime'},
        // {title: '用户更新时间', dataIndex: 'updateTime', key: 'updateTime'},
        {title: '状态', dataIndex: 'Status', key: 'Status', render: status => (statuesRend(status, STATUSITEMS))},
        {title: '创建时间', dataIndex: 'CreatedAt', key: 'CreatedAt'},
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
        page_size: 20 ,
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
    params.q_userAccount_like = values.q_userAccount_like;
    params.q_merchantName_like = values.q_merchantName_like;
    params.q_userPhoneNo_like = values.q_userPhoneNo_like;  
    params.q_userName_like = values.q_userName_like;
    this.getData(params);
  }

  getData = (params) => {
    const param = {
      ...params,
      page_size: params.page_size
    };
    const {tableData} = this.state;
    tableData.data = [];
    gerMerchantHuiInfo(param).then(res => {
      if(res.status === 200 && res.data.total){
        let i = 0;
        res.data.data.forEach(element => {
          i+=1;
          const d = {
            ...element,
            CreatedAt:element.CreatedAt,
            key: element.UserId,
            xh: i
          }
          tableData.data.push(d);
        });
      }
      this.setState({
        tableData,
        params:{
          ...params,
          totalCount: res.data.total
        }
      })
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
