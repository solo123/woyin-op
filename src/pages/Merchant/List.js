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
  Divider
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {MerchantAddOrUpdate, MemberUpload, InterUpload, MerchantInfo} from '@/components/Merchant';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
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
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option}
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.handAdd, labe: '添加'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '冻结/解冻'},
    ];
    const tableDatas = {
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
        {title: '操作', dataIndex: 'action', key: 'action',  render: (texts, record) => (<span><a href="javascript:void(0)" onClick={()=> {this.onHangInter(texts, record)}}>会员充值积分</a></span>)},
     ],
     data: []
    }
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
      tableData: tableDatas,
      selectUserData: null,
    }
  }
  
  componentWillMount (){
    const {dispatch} = this.props
    dispatch({
      type: 'merchant/getMerchantList',
    })
  }

  onHangeDetails = (texts, record) => {
    this.MerchantInfo.showModal();
    console.log(texts);
    console.log(record);
  }

  onHangeAddUser = (texts, record) => {
    console.log(texts);
    console.log(record);
    this.MemberUpload.showModal();
  }

  onHangInter = (texts, record) => {
    console.log(texts);
    console.log(record);
    this.InterUpload.showModal();
  }

  handAdd = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'merchant/opendMerchantAdd'
    })
  }

  handEdit = (e) => {
    e.preventDefault();
    const {selectUserData} = this.state;
    console.log(selectUserData);
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
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

  // 查询条件表单提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const {dispatch} = this.props;
        dispatch({
          type: 'merchant/getMerchantList',
          payload:{
            ...values
          }
        })
      }
    })
  }

  // 获取商户列表，并且清洗数据
  rinseData = (data) => {
    // const data = list;
    const {tableData} = this.state;
    const merchantList = [];
    for(let i = 0; i < data.length; i+=1){
      const merch = {};
      merch.key = i;
      merch.logo =  data[i].MerchantInfo.accountId;
      merch.name = data[i].MerchantInfo.merchantName;
      merch.site =  data[i].MerchantInfo.merchantAddr;
      merch.linkman =  data[i].MerchantInfo.contactMan;
      merch.phone =  data[i].MerchantInfo.phoneNum;
      merch.telephone =  data[i].MerchantInfo.telNum;
      merch.statue =  data[i].MerchantInfo.state;
      merch.creatertime =  data[i].MerchantInfo.createTime;
      merch.find =  data[i].MerchantInfo.id;
      merch.freezing =  data[i].MerchantInfo.frozenTime;
      merch.unfreezing =  data[i].MerchantInfo.unFrozenTime;
      merchantList.push(merch);
    }
    tableData.data = merchantList;
    return tableData
  }

  render () {
    const { getFieldDecorator } = this.props.form; 
    const {list} = this.props.merchant;
    const tableData = this.rinseData(list);
    const { formData, buttonData } = this.state;
    const rowSelection = {
      type: 'radio',
      onChange: this.getCheckUser
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch formData={formData} handleSubmit={this.handleSubmit} getFieldDecorator={getFieldDecorator} />
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
          scroll={{ x: 1700 }}
        />
        <MerchantAddOrUpdate />
        <MemberUpload ref={c => {this.MemberUpload = c}} />
        <InterUpload ref={c => {this.InterUpload = c}} />
        <MerchantInfo ref={c => {this.MerchantInfo = c}} />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;