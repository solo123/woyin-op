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
import {getMerchantListApi, GetvouchersListById, getMerchantAccApi} from '@/services/api';
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
      {type: 'SelectCompone', label: '商户：', handChang: this.handChang1, style:{width: '198px'},ruless:[{required: true}], name: 'MerchantId', options: option},
      {type: 'SelectCompone', label: '商户帐户：',disabled: true, style:{width: '198px'}, ruless:[{required: true}], name: 'balance_id', options: option},
      {type: 'SelectDateRang' ,label: '时间', name: 'rechargeTime', ruless:[] , placeholder: '时间', typeIco: 'book'},
    ];
  
    const tableData = {columns:
      [
        // {title: '流水编号', dataIndex: 'id', key: 'id'},
        {title: '凭证名称', dataIndex: 'Name', key: 'Name'},
        {title: '操作名称', dataIndex: 'docType', key: 'docType'},
        {title: '操作编号', dataIndex: 'docId', key: 'docId'},
        {title: '变动前账户可用余额', dataIndex: 'beforeAmount', key: 'beforeAmount'},
        {title: '余额变动数额', dataIndex: 'amount', key: 'amount'},
        {title: '变动后账户可用余额', dataIndex: 'afterAmount', key: 'afterAmount'},
        // {title: '变动前账户冻结余额', dataIndex: 'afterBlock', key: 'afterBlock'},
        {title: '冻结余额变动数额', dataIndex: 'blockAmount', key: 'blockAmount'},
        {title: '变动后账户冻结余额', dataIndex: 'afterBlock', key: 'afterBlock'},
        {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt'},
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
        page_size: 20,
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
                  value: elem.MerchantId,
                  label: elem.MerchantName,
                  key: elem.MerchantId
              });
          })
          formData[0].options = option
          this.setState({
              formData
          })
      }
    })
  }

  handChang1 = (value) => {
    const {formData} = this.state;
    const options = [];
    getMerchantAccApi({merchantId: value}).then(res => {
      if(res.status === 200 && res.data){
        res.data.forEach(elem => {
          options.push({
              value: elem.BalanceId,
              label: elem.Currency,
              key: elem.BalanceId
          });
      })

      if(options.length>0){
        formData[1].options = options;
        formData[1].disabled = false;
      }else{
        formData[1].disabled = true;
      }
      }else{
        formData[1].disabled = true;
      }
      this.setState({formData})
    })
  }

  onHangeDetails = (texts, record) => {
    this.WaterDetails.showModal(record.id);
  }

  getData = (params) => {
    const {tableData} = this.state;
    const param = {
      ...params,
      count: params.page_size
    }
    tableData.data = [];
    if(!param.balance_id) return
  
    GetvouchersListById(param).then(res => {
      if(res.status ===200 && res.data.count){
        res.data.histories.forEach(element => {
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
   
    const params = values;
    const p = {
        ...params,
        page: 1,
        page_size: 20,
    };
    if(typeof values.rechargeTime !== 'undefined'){
      p['q_a.createdAt_gte'] = timeChangData(values.rechargeTime[0].toDate());
      p['q_a.createdAt_lte'] = timeChangData(values.rechargeTime[1].toDate());
    }
    
    delete p.rechargeTime;
    delete p.MerchantId;

    this.getData(p);
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