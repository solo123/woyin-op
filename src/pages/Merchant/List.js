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
  Modal
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {MerchantAddOrUpdate, MemberAllAdd} from '@/components/Merchant';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import styles from './List.less'

@connect()
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
      {type: 'InputIcon' ,label: '商户登录帐户', name: 'logo', ruless:[] , placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon' ,label: '商户名称', name: 'name', ruless:[] , placeholder: '角商户名称色编码', typeIco: 'book'},
      {type: 'InputIcon' ,label: '手机号', name: 'phone', ruless:[] , placeholder: '手机号', typeIco: 'book'},
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
        {title: '操作', dataIndex: 'action', key: 'action',  render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeAddUser(texts, record)}}>批量创建会员</a>)},
     ],
     data: [
      {key: '1', logo: 'John2', name: '322', site: 'New York No. 1 Lake Park', linkman: 'developer', phone: '11888', telephone: '88-88', statue: '正常', creatertime: '2018-01-01', find: '详情', freezing:'2019-11-11', unfreezing: '2018-11-12'}, 
      {key: '2', logo: 'John3', name: '321', site: 'New York No. 1 Lake Park', linkman: 'developer', phone: '11888', telephone: '88-88', statue: '正常', creatertime: '2018-01-01', find: '详情', freezing:'2019-11-11', unfreezing: '2018-11-12'}, 
      {key: '3', logo: 'John4', name: '323', site: 'New York No. 1 Lake Park', linkman: 'developer', phone: '11888', telephone: '88-88', statue: '正常', creatertime: '2018-01-01', find: '详情', freezing:'2019-11-11', unfreezing: '2018-11-12'}, 
     ]
    }
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
      tableData: tableDatas,
      selectUserData: null,
    }
  }
  
  componentWillMount () {

  }

  onHangeDetails = (texts, record) => {
    console.log(texts);
    console.log(record);
  }

  onHangeAddUser = (texts, record) => {
    console.log(texts);
    console.log(record);
    this.MemberAllAdd.showModal();
  }

  handAdd = (e) => {
    this.MerchantAddOrUpdate.showModal(e);
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log('Received values of form: ', values);
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form; 
    const { formData, buttonData, tableData } = this.state;
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
        />
        <MerchantAddOrUpdate ref={(c) => {this.MerchantAddOrUpdate = c;}} />
        <MemberAllAdd ref={(c) => {this.MemberAllAdd = c}} />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;