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
import {gerMerchantHuiInfo, InactiveUserList} from '@/services/api';
import {statuesRend} from '@/utils/renderUtils';
import {timeChangData} from '@/utils/utils';
import styles from './Info.less';

@connect()
class BalanceInfo extends Component {
  constructor(props){
    super(props);
    const formDatas = [
      {type: 'InputIcon', label: '活跃时间最小值', name: 'minInactiveDays', ruless:[], placeholder: '活跃时间最小值', typeIco: 'user'},
      {type: 'InputIcon', label: '活跃时间最大值', name: 'maxInactiveDays', ruless:[], placeholder: '活跃时间最大值', typeIco: 'book'},
      {type: 'InputIcon', label: '最小金额', name: 'minAmount', ruless:[], placeholder: '最小金额', typeIco: 'book'},
      {type: 'InputIcon', label: '最大金额', name: 'maxAmount', ruless:[], placeholder: '最大金额', typeIco: 'book'},
    ];
    const STATUSITEMS = [
      {key: 0, describe: ['green', '新建']},
      {key: 1, describe: ['blue', '正常']},
      {key: 2, describe: ['red', '冻结']},
    
    ];
    const tableData = {
      columns: [
        {title: '账号id', dataIndex: 'userId', key: 'userId'},
        {title: '用户名', dataIndex: 'userName', key: 'userName'},
        {title: '用户手机号', dataIndex: 'userPhoneNo', key: 'userPhoneNo'},
        {title: '账户余额', dataIndex: 'amount', key: 'amount'},
        {title: '账户冻结金额', dataIndex: 'blockAmount', key: 'blockAmount'},
        {title: '状态', dataIndex: 'status', key: 'status', render: status => (statuesRend(status, STATUSITEMS))},
        {title: '所属商户', dataIndex: 'merchantName', key: 'merchantName'},
        {title: '未活跃时间', dataIndex: 'diff', key: 'diff'},
      ],
      data: []
    }
    this.state = {
      formData: formDatas,
      tableData,
      params: {
  
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
    params.minInactiveDays = values.minInactiveDays;
    params.maxInactiveDays = values.maxInactiveDays;
    params.minAmount = values.minAmount;  
    params.maxAmount = values.maxAmount;
    this.getData(params);
  }

  getData = (params) => {
    const param = {
      ...params,
      size: params.page_size
    };
    const {tableData} = this.state;
    tableData.data = [];
    InactiveUserList(param).then(res => {
      if(res.status === 200 && res.data.count){
       
        res.data.data.forEach(element => {
          const d = {
            ...element,
            key: element.userId,
          }
          tableData.data.push(d);
        });
      
      }
      this.setState({
        tableData,
        params:{
          ...params,
          totalCount: res.data.count
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
