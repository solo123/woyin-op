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
import {WaterDetails} from '@/components/Finance';
import {GetvouchersListById, getMerchantListApi} from '@/services/api';
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
      {type: 'InputIcon' ,label: '用户名', name: 'userName', ruless:[] , placeholder: '购买订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '手机号码', name: 'userPhoneNo', ruless:[] , placeholder: '登录手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '商户：', style:{width: '198px'},name: 'merchantId', options: option},
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
        // {title: '账户对应用户的名称', dataIndex: 'userName', key: 'userName'},
        // {title: '详情', dataIndex: 'find', key: 'find', render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeDetails(texts, record)}}>详情</a>)},
      ],
      data:[]
    };
  
    this.state = {
      formData,
      tableData,
      params:{
        accountId: '',
        type: '',
        page:1,
        count: 10,
        totalCount: 0,
      }
    }
  }
  
  componentWillMount () {
    const {formData, tableData} = this.state;
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
        formData[2].options = option
          this.setState({
            formData
        })
        }
    })
    if(LocalStr.get("waterusertype") === 1){
        tableData.columns.push({title: '详情', dataIndex: 'find', key: 'find', render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeDetails(texts, record)}}>详情</a>)})
    }
    this.setState({tableData})
    this.getData({
      balance_id: LocalStr.get("wateruserid"),
      type: LocalStr.get("waterusertype"),
      page:1,
      page_size: 20,
      totalCount: 0,
    });
  }

  onHangeDetails = (texts, record) => {
    this.WaterDetails.showModal(record.id);
    // LocalStr.set("wateruserid",  record.key);
    // this.props.dispatch(routerRedux.push({
    //   pathname: '/finance/WaterDetails',
    // }));
  }

  getData = (params) => {
    console.log(params);
    const {tableData} = this.state;
    tableData.data = [];
    GetvouchersListById(params).then(res => {
      if(res.status ===200 && res.data.data){
        res.data.data.forEach(element => {
          const d = {
          ...element,
          key: element.id
          }
          tableData.data.push(d);
        });

        this.setState({
          params:{
            ...params,
            totalCount: res.data.total
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
          scroll={{ x: 1800 }}
          pagination={{
            current: params.page,
            pageSize: params.count,
            total: params.totalCount,
            onChange: this.onChangePage
          }}
          bordered
        //   rowSelection={rowSelection}
        />
        <WaterDetails ref={c => {this.WaterDetails = c}} />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;