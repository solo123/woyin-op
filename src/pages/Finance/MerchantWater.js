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
import {Table2} from '@/components/TableList/TableListPage';
import {WaterDetails} from '@/components/Finance';
import {getMerchantListApi, GetvouchersListById} from '@/services/api';
import LocalStr from '@/utils/LocalStr';
import {routerRedux} from 'dva/router';
import {timeChangData} from '@/utils/utils';
import styles from './UserWater.less';

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [];
    const formData = [
      // {type: 'InputIcon' ,label: '商户名', name: 'merchantName', ruless:[] , placeholder: '商户名', typeIco: 'user'},
      {type: 'SelectCompone', label: '商户：', style:{width: '198px'},name: 'accountId', options: option},
      {type: 'SelectDateRang' ,label: '时间', name: 'rechargeTime', ruless:[] , placeholder: '时间', typeIco: 'book'},
    ];
  
    const tableData = {columns:
      [
        {title: '流水编号', dataIndex: 'id', key: 'id'},
        {title: '凭证名称', dataIndex: 'title', key: 'title'},
        {title: '操作名称', dataIndex: 'doc_type', key: 'doc_type'},
        {title: '操作编号', dataIndex: 'doc_id', key: 'doc_id'},
        {title: '变动前账户可用余额', dataIndex: 'before_amount', key: 'before_amount'},
        {title: '余额变动数额', dataIndex: 'amount', key: 'amount'},
        {title: '变动后账户可用余额', dataIndex: 'after_amount', key: 'after_amount'},
        {title: '变动前账户冻结余额', dataIndex: 'before_block', key: 'before_block'},
        {title: '冻结余额变动数额', dataIndex: 'block_amount', key: 'block_amount'},
        {title: '变动后账户冻结余额', dataIndex: 'after_block', key: 'after_block'},
        {title: '创建时间', dataIndex: 'create_at', key: 'create_at'},
        {title: '详情', dataIndex: 'find', key: 'find', render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeDetails(texts, record)}}>查看</a>)},
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
        pageSize: 20,
        totalCount: 0,
      }
    }
  }
  
  componentWillMount () {
    const {formData} = this.state;
    const option = [];
    getMerchantListApi().then(res => {
      if(res.status===200 && res.data.data){
          res.data.data.forEach(elem => {
              option.push({
                  value: elem.accountId,
                  label: elem.merchantName,
                  key: elem.accountId
              });
          })
          formData[0].options = option
          this.setState({
              formData
          })
      }
    })
  }

  onHangeDetails = (texts, record) => {
    this.WaterDetails.showModal(record.id);
  }

  getData = (params) => {
    const {tableData} = this.state;
    const param = {
      ...params,
      count: params.pageSize
    }
    tableData.data = [];
    if(!param.accountId) return
    GetvouchersListById(param).then(res => {
      if(res.status ===200 && res.data.voucher){
        res.data.voucher.forEach(element => {
          const d = {
            ...element,
            key: element.id
          }
          tableData.data.push(d);
        });
        this.setState({
          params:{
            ...params,
            totalCount: res.data.totalCount
          },tableData})
      }
    })
  }

  handleSubmit = (values) => {
    const {params} = this.state;
    const p = {
        ...params,
        ...values,
        type: 1,
        page: 1
    };
      if(typeof values.rechargeTime !== 'undefined'){
        p.startTime = timeChangData(values.rechargeTime[0].toDate());
        p.endTime = timeChangData(values.rechargeTime[1].toDate());
      }
      delete p.rechargeTime;
      this.setState({
           params: p
    }, this.getData(p))
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
        <WaterDetails ref={c => {this.WaterDetails = c}} />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;