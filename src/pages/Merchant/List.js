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
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  MerchantAddOrUpdate, 
  MemberUpload, 
  InterUpload, 
  MerchantInfo, 
  MemberApplayInter,
  MemberApplayData} from '@/components/Merchant';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {getMerchantListApi} from '@/services/api';
import styles from './List.less'

@connect(({ merchant, loading }) => ({
  merchant,
  submitting: loading.effects['merchant/setMerchant'],
}))
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    const formDatas = [
      {type: 'InputIcon' ,label: '商户登录帐户', name: 'userAccount', ruless:[] , placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon' ,label: '商户名称', name: 'merchantName', ruless:[] , placeholder: '角商户名称色编码', typeIco: 'book'},
      {type: 'InputIcon' ,label: '手机号', name: 'phoneNum', ruless:[] , placeholder: '手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'status', options: option}
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.handAdd, labe: '添加'},
      // {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'},
      // {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '冻结/解冻'},
    ];
    const tableData = {
      columns: [
        {title: '商户登录帐户', dataIndex: 'logo', key: 'logo'},
        {title: '商户名称', dataIndex: 'name', key: 'name'},
        {title: '商户地址', dataIndex: 'site', key: 'site'},
        {title: '联系人', dataIndex: 'linkman', key: 'linkman'},
        {title: '手机号', dataIndex: 'phone', key: 'phone'},
        {title: '固定电话', dataIndex: 'telephone', key: 'telephone'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
        {title: '创建时间', dataIndex: 'creatertime', key: 'creatertime'},
        {title: '冻结时间', dataIndex: 'freezing', key: 'freezing'},
        {title: '解冻时间', dataIndex: 'unfreezing', key: 'unfreezing'},
        {title: '详情', dataIndex: 'find', key: 'find', render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeDetails(texts, record)}}>详情</a>)},
        {title: '操作', dataIndex: 'action', key: 'action',fixed: 'right', 
         render: (texts, record) => (
           <span>
             <a href="javascript:void(0)" onClick={()=> {this.onHangInter(texts, record)}}>上传会员积分</a> | 
             <a href="javascript:void(0)" onClick={()=> {this.onHangApplayData(texts, record)}}>上传数据审核</a> | 
             <a href="javascript:void(0)" onClick={()=> {this.onHangApplayInter(texts, record)}}>会员发分审核</a>
           </span>)},
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
    // const {dispatch} = this.props
    // dispatch({
    //   type: 'merchant/getMerchantList',
    // })
  }

  onHangeDetails = (texts, record) => {
    this.MerchantInfo.int(record);
    this.MerchantInfo.showModal();
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

  onChangePage = (page, pageSize)=>{
    const {param} = this.state;
    param.count = this.state.limit;
    param.page = page;
    this.getAllData(param);
  }

  getAllData = (params) => {
    getMerchantListApi(params).then(res=>{
      if(res.status === 200){
        const {data} = res.data;
        const merchantList = [];
        const {tableData} = this.state;
        for(let i = 0; i < data.length; i+=1){
          const merch = {};
          merch.key = data[i].merchantId;
          merch.logo =  data[i].accountId;
          merch.name = data[i].merchantName;
          merch.site =  data[i].merchantAddr;
          merch.linkman =  data[i].contactMan;
          merch.phone =  data[i].phoneNum;
          merch.telephone =  data[i].telNum;
          merch.statue =  data[i].status===1 ? '正确' : '错误';
          merch.creatertime =  data[i].createTime;
          merch.find =  data[i].id;
          merch.freezing =  data[i].frozenTime;
          merch.unfreezing =  data[i].unFrozenTime;
          merchantList.push(merch);
        }
        tableData.data = merchantList;
        this.setState(
          {
            tableData,
            count: res.data.totalCount
          }
        );
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form; 
    const {tableData} = this.state;
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
              <HeadFormSearch formData={formData} handleSubmit={this.handleSubmit} form={this.props.form} getFieldDecorator={getFieldDecorator} />
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
          rowSelection={rowSelection}
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: limit ,// 每页的条数
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
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;