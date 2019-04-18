/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearch} from '@/components/HeadForm';
import {routerRedux} from 'dva/router';
import {getMerchantListApi, RechargeGetMerList} from '@/services/api';
import LocalStr from '@/utils/LocalStr';
import styles from './UserWater.less';

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const formData = [
      {type: 'InputIcon' ,label: '商户名', name: 'merchantName', ruless:[] , placeholder: '商户名', typeIco: 'user'},
    ];
  
    const tableData = {columns:
      [
        {title: '商户名', dataIndex: 'merchantName', key: 'merchantName'},
        {title: '商户地址', dataIndex: 'merchantAddr', key: 'merchantAddr'},
        {title: '手机号', dataIndex: 'phoneNum', key: 'phoneNum'},
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
        count: 10,
        totalCount: 0,
      }
    }
  }
  
  componentWillMount () {
    const {params} = this.state;
    this.getData(params);
  }

  onHangeDetails = (texts, record) => {
    LocalStr.set("wateruserid",  record.key);
    LocalStr.set("waterusertype",  1);
    this.props.dispatch(routerRedux.push({
      pathname: '/finance/WaterDetails',
    }));
  }

  getData = (params) => {
    const {tableData} = this.state;
    tableData.data = [];
    getMerchantListApi(params).then(res => {
      if(res.status ===200 && res.data.data){
        res.data.data.forEach(element => {
          const d = {
            ...element,
            key: element.accountId
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

  Reset = () => {
    const params = {
      merchantName: '',
      page:1,
      count: 10,
    }
    this.setState({params}, this.getData(params))
  }

  handleSubmit = (e) => {
    const {params} = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const p = {
          ...params,
          ...values,
          page: 1
        };
        this.setState({
          params: p
        }, this.getData(p))
      }
    })
  }

  onChangePage = (page)=>{
    const {params} = this.state;
    params.page = page;
    this.setState({params},  this.getData(params));
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, tableData, params} = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch formData={formData} Reset={this.Reset} form={this.props.form} handleSubmit={this.handleSubmit} getFieldDecorator={getFieldDecorator} />
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
          pagination={{
            current: params.page,
            pageSize: params.count,
            total: params.totalCount,
            onChange: this.onChangePage
          }}
          bordered
        //   rowSelection={rowSelection}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;