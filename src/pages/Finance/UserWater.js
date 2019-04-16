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
import {GetUserWaterApi, getMerchantListApi} from '@/services/api';
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
      {type: 'InputIcon' ,label: '用户名', name: 'userName', ruless:[] , placeholder: '购买订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '登录手机号', name: 'userPhoneNo', ruless:[] , placeholder: '登录手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '商户：', style:{width: '198px'},name: 'merchantId', options: option},
    ];
  
    const tableData = {columns:
      [
        {title: '用户名', dataIndex: 'userName', key: 'userName'},
        {title: '手机号码', dataIndex: 'userPhoneNo', key: 'userPhoneNo'},
        {title: '账户余额', dataIndex: 'balance', key: 'balance'},
        {title: '所属商户', dataIndex: 'merchantName', key: 'merchantName'},
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
    const {formData, params} = this.state;
    const option = [];
    getMerchantListApi().then(res => {
        if(res.status===200 && res.data.data){
            res.data.data.forEach(elem => {
                option.push({
                    value: elem.merchantId,
                    label: elem.merchantName,
                    key: elem.merchantId
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

  getData = (params) => {
    const {tableData} = this.state;
    tableData.data = [];
    GetUserWaterApi(params).then(res => {
      if(res.status ===200 && res.data.data){
        res.data.data.forEach(element => {
            const d = {
                ...element,
                key: element.userPhoneNo+element.balance
            }
            tableData.data.push(d);
        });

        this.setState({
            params:{
                ...params,
                totalCount: res.data.totalCount
            },
            tableData})
      }
    })
  }

  Reset = () => {
    const params = {
        username: '',
        userPhoneNo: '',
        merchantId: '',
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