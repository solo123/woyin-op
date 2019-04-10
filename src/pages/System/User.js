/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-script-url */
import React, { Component } from 'react';
import { connect } from 'dva';
import { 
  Row, 
  Col,
  Card,
  Form,
  Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RoleSet from '@/components/System/Role-set';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import UserAddUpdate from '@/components/System/UserAddOrUpdate';
import UserRole from '@/components/System/User-role';
import styles from './User.less';

let formData = null;
let buttonData = null;
@connect()
class SearchList extends Component {

  constructor(props){
    super(props);
    const tableData = {
      Columns:[
        {title: '帐号', dataIndex: 'logo', key: 'logo'},
        {title: '角色', dataIndex: 'name', key: 'name'},
        {title: '电话', dataIndex: 'phone', key: 'phone'},
        {title: '邮箱', dataIndex: 'email', key: 'email'},
        {title: '创建日期', dataIndex: 'createrdata', key: 'createrdata'},
        {title: '机构名称', dataIndex: 'describe', key: 'describe'},
        {title: '操作', dataIndex: 'action', key: 'action', width: 80, render: (texts, record) => (<a href="javascript:;" onClick={()=> {this.onClick(texts, record)}}>操作</a>)},
        // {title: '状态', dataIndex: 'statue', key: 'statue'},
     ],
     data:  []
    }
    this.state = {
      tableData
    }
  }

  componentWillMount () {

    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    formData = [
      {type: 'InputIcon' ,label: '用户名称：', name: 'name', ruless:[] , placeholder: '角色名称', typeIco: 'user'},
      // {type: 'InputIcon' ,label: '登录帐户：', name: 'code', ruless:[] , placeholder: '角色编码', typeIco: 'book'},
      {type: 'SelectCompone', style:{width: '198px'}, label: '状态：', name: 'statue', options: option}
    ];
    buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddUser, labe: '添加'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '禁用'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '删除'},
    ]
  
   }

  componentDidMount() {
    // To disabled submit button at the beginning.
    // component.RoleSet  = this.RoleSet;
    // component.UserAddUpdate = this.UserAddUpdate;
    // console.log(this.UserAddUpdate);
  }

  handUserRole = (texts, record) => {
    this.UserRole.onShow();
  }

  handAddUser = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/no-string-refs ,no-shadow
    this.UserAddUpdate.showModal(e);
  }

  handEdit = (e) => {
    e.preventDefault();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log('Received values of form: ', values);
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {tableData} = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
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
          columns={tableData.Columns}
          dataSource={tableData.data} 
          bordered
          rowSelection={rowSelection}
          // scroll={{ x: 1000 }}
        />
        <UserAddUpdate ref={(c) => {this.UserAddUpdate = c}} />
        <RoleSet ref={(c) => { this.RoleSet = c; }} />
        <UserRole ref={(c) => { this.UserRole = c;}}  />
      </PageHeaderWrapper>
    );
  }
}
const SearchLists = Form.create({ name: 'SearchList' })(SearchList);
export default SearchLists;
