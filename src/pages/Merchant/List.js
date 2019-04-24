/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-script-url */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Modal,
} from 'antd'
import {
  MerchantAddOrUpdate, 
  MemberUpload, 
  InterUpload, 
  MerchantInfo, 
  MemberApplayInter,
  MemberApplayData} from '@/components/Merchant';
import {routerRedux} from 'dva/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {getMerchantListApi} from '@/services/api';
import {statuesRend, hreRend} from '@/utils/renderUtils';
import {timeChangData} from '@/utils/utils';
import LocalStr from '@/utils/LocalStr';
import styles from './List.less';

@connect(({ merchant, loading }) => ({
  merchant,
  submitting: loading.effects['merchant/setMerchant'],
}))
class List extends React.Component {

  constructor(props){
    super(props);
    const option = [
      {value: '1',label: '可用'}, 
      {value: '2',label: '冻结'}
    ];
    const formDatas = [
      {type: 'InputIcon' ,label: '商户登录帐户', name: 'userAccount', ruless:[] , placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon' ,label: '商户名称', name: 'merchantName', ruless:[] , placeholder: '商户名称', typeIco: 'book'},
      {type: 'InputIcon' ,label: '手机号', name: 'phoneNum', ruless:[] , placeholder: '手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', style:{width: '198px'}, name: 'status', options: option}
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.handAdd, labe: '添加'},
    ];
    const STATUSITEMS = [
      {key: 1, describe: ['green', '可用']},
      {key: 2, describe: ['red', '冻结']}
    ]
    const hreReng = [
      // {onClick: this.onHangInter, label: '批量会员发分 |'},
      // {onClick: this.onHangApplayData, label: '上传数据审核 |'},
      {onClick: this.onHangApplayInter, label: '会员发分审核 | '},
      {onClick: this.onHangGoPround, label: '商户产品管理'},
    ]
    const tableData = {
      columns: [
        {title: '商户登录帐户', dataIndex: 'userAccount', key: 'userAccount'},
        {title: '商户名称', dataIndex: 'merchantName', key: 'merchantName'},
        {title: '商户地址', dataIndex: 'merchantAddr', key: 'merchantAddr'},
        {title: '联系人', dataIndex: 'contactMan', key: 'contactMan'},
        {title: '手机号', dataIndex: 'phoneNum', key: 'phoneNum'},
        {title: '固定电话', dataIndex: 'telNum', key: 'telNum'},
        {title: '状态', dataIndex: 'statue', key: 'statue', render: statue => {
          return statuesRend(statue, STATUSITEMS)
        }},
        {title: '创建时间', dataIndex: 'creatertime', key: 'creatertime'},
        // {title: '冻结时间', dataIndex: 'freezing', key: 'freezing'},
        // {title: '解冻时间', dataIndex: 'unfreezing', key: 'unfreezing'},
        {title: '详情', dataIndex: 'find', key: 'find', render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeDetails(texts, record)}}>详情</a>)},
      //  {title: '操作', dataIndex: 'action', key: 'action',fixed: 'right',width: 220, render:(texts, record)=>(hreRend(hreReng, texts, record)) },
      ],
      data: []
    }
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
      tableData,
      selectUserData: null,
      limit: 10,
      count: 0,
      param: {
        userAccount: '',
        merchantName: '',
        phoneNum: '',
        status: '',
      }
    }
}
  
componentWillMount (){
  const params = {
    count: this.state.limit,
    page: 1
  }
  this.getAllData(params);
}

onHangeDetails = (texts, record) => {
  // this.MerchantInfo.int(record);
  // this.MerchantInfo.showModal();

  LocalStr.set("merchantInfo", JSON.stringify(record));
  
  this.props.dispatch(routerRedux.push({
    pathname: '/merchant/MerchantInfo'
  }));
}

onHangApplayData = (texts, record) => {
  this.MemberApplayData.int(record);
  this.MemberApplayData.showModal();
}

onHangApplayInter = (texts, record) => {
  this.MemberApplayInter.int(record);
  this.MemberApplayInter.showModal();
}

onHangeAddUser = (texts, record) => {
  this.MemberUpload.showModal();
}

onHangInter = (texts, record) => {
  this.InterUpload.showModal(record.key);
}

handAdd = (e) => {
  e.preventDefault();
  this.MerchantAddOrUpdate.showModal();
}

onHangGoPround = (texts, record) =>{
  LocalStr.set("merchantId",  record.key);
  this.props.dispatch(routerRedux.push({
    pathname: '/merchant/memberproduct',
  }));
}

handEdit = (e) => {
  e.preventDefault();
  const {selectUserData} = this.state;
  if (selectUserData !== null){
    this.MerchantAddOrUpdate.showModal(e);
  }else{
    Modal.error({
      title: '商户修改错误',
      content: '请先选择商户信息，再进行修改...',
    })
  }
}

getCheckUser = (selectedRowKeys, selectedRows) => {
  this.setState({selectUserData: selectedRows});
}

handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if(!err){
      const param = {
        userAccount: values.userAccount,
        merchantName: values.merchantName,
        phoneNum: values.phoneNum,
        status: values.status=== undefined ? '' : values.status[0],
      }
      this.getAllData(param);
      this.setState({
      param
      })
    }
  })
}

onChangePage = (page)=>{
  const {param} = this.state;
  param.count = this.state.limit;
  param.page = page;
  this.getAllData(param);
}

Reset = () => {
  this.getAllData();
}

getAllData = (params) => {
  getMerchantListApi(params).then(res=>{
    try {
      if(res.status === 200){
        const {data} = res.data;
        const merchantList = [];
        const {tableData} = this.state;
        for(let i = 0; i < data.length; i+=1){
          const merch = {
            ... data[i],
            key: data[i].merchantId,
            statue: data[i].status,
            creatertime: timeChangData(data[i].createTime),
            find: data[i].id
          };
          merchantList.push(merch);
        }
        tableData.data = merchantList;
        this.setState({
          tableData,
          count: res.data.totalCount
        }
        );
      }
    } catch (error) {
      console.error('网络接口异常');
    }
  });
}

render () {
  const { getFieldDecorator } = this.props.form;
  const { tableData } = this.state;
  const { formData, buttonData, limit, count } = this.state;
  const rowSelection = {
    type: 'radio',
    onChange: this.getCheckUser
  };
  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Row>
          <Col>
            <HeadFormSearch Reset={this.Reset} formData={formData} handleSubmit={this.handleSubmit} form={this.props.form} getFieldDecorator={getFieldDecorator} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={styles.addButton}>
              <HeadFootButton buttonData={buttonData} />
            </div>
          </Col>
        </Row>
      </Card>
      <Table
        columns={tableData.columns}
        dataSource={tableData.data} 
        bordered
        // rowSelection={rowSelection}
        // scroll={{ x: 1300 }}
        pagination={{
          pageSize: limit ,
          total: count,
          onChange: this.onChangePage
        }}
      />
      <MerchantAddOrUpdate ref={c => {this.MerchantAddOrUpdate = c}} />
      <MemberUpload ref={c => {this.MemberUpload = c}} />
      <InterUpload ref={c => {this.InterUpload = c}} />
      <MerchantInfo ref={c => {this.MerchantInfo = c}} />
      <MemberApplayData ref={c => {this.MemberApplayData = c}} />
      <MemberApplayInter ref={c => {this.MemberApplayInter = c}} />
    </PageHeaderWrapper>
  )
}}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;