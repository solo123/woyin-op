/* eslint-disable no-script-url */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearch} from '@/components/HeadForm';
import {routerRedux} from 'dva/router';
import {Table2} from '@/components/TableList/TableListPage';
import {GetUserWaterApi, getMerchantListApi} from '@/services/api';
import LocalStr from '@/utils/LocalStr';
import styles from './UserWater.less';

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: '1',label: '正常'},
      {value: '0',label: '禁用',}
    ];
    const formData = [
      {type: 'InputIcon' ,label: '用户名', name: 'q_userName_like', ruless:[] , placeholder: '用户名', typeIco: 'user'},
      {type: 'InputIcon' ,label: '手机号码', name: 'q_userPhoneNo_like', ruless:[] , placeholder: '手机号码', typeIco: 'book'},
      {type: 'SelectCompone', label: '商户：', style:{width: '198px'},name: 'q_merchantName_eq', options: option},
    ];
  
    const tableData = {columns:
      [
        {title: '序号', dataIndex: 'xh', key: 'xh'},
        {title: '帐户编号', dataIndex: 'BalanceId', key: 'BalanceId'},
        {title: '用户名', dataIndex: 'UserName', key: 'UserName'},
        {title: '手机号码', dataIndex: 'UserPhoneNo', key: 'UserPhoneNo'},
        {title: '账户余额', dataIndex: 'Amount', key: 'Amount'},
        {title: '所属商户', dataIndex: 'MerchantName', key: 'MerchantName'},
        {title: '详情', dataIndex: 'find', key: 'find', render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeDetails(texts, record)}}>详情</a>)},
      ],
      data:[]
    };
  
    this.state = {
      formData,
      tableData,
      params:{
        username: '',
        userPhoneNo: '',
        merchantId: '',
        page:1,
        page_size: 20,
        totalCount: 0,
      }
    }
  }
  
  componentWillMount () {
    const {formData, params} = this.state;
    const option = [];
    getMerchantListApi().then(res => {
      if(res.status===200 && res.data.data){
          res.data.data.forEach(elem => {
            option.push({
              value: elem.MerchantName,
              label: elem.MerchantName,
              key: elem.MerchantId
            });
          })
          formData[2].options = option
          this.setState({
            formData
          })
        }
    })
    this.getData(params);
  }

  onHangeDetails = (texts, record) => {
    LocalStr.set("wateruserid",  record.BalanceId);
    LocalStr.set("waterusertype",  2);
    this.props.dispatch(routerRedux.push({
      pathname: '/finance/WaterDetails',
    }));
  }

  getData = (params) => {
    const {tableData} = this.state;
    tableData.data = [];
    let i =0;
    GetUserWaterApi(params).then(res => {
      if(res.status ===200 && res.data.total){
        res.data.data.forEach(element => {
          i+=1;
          const d = {
            ...element,
            xh: i,
            key: element.BalanceId
          }
          tableData.data.push(d);
        });

        this.setState({
          params:{
            ...params,
            totalCount: res.data.total
          },tableData})
      }
    })
  }

  handleSubmit = (values) => {
    const params = values;
    this.getData(params)
 
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, tableData, params} = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch 
                formData={formData} 
                // Reset={this.Reset}
                getData={this.getData}
                form={this.props.form} 
                handleSubmit={this.handleSubmit} 
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
          // scroll={{ x: 1200 }}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;