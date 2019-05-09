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
import {GetUserLogoListApi, GetRoleList} from '@/services/api';
import styles from './User.less';


let buttonData = null;
@connect()
class UserList extends Component {

  constructor(props){
    super(props);
    const tableData = {
      Columns:[
        {title: '帐号', dataIndex: 'userAccount', key: 'userAccount'},
        {title: '姓名', dataIndex: 'userName', key: 'userName'},
        {title: '角色', dataIndex: 'roleName', key: 'roleName'},
        // {title: '电话', dataIndex: 'phone', key: 'phone'},
        {title: '邮箱', dataIndex: 'email', key: 'email'},
        // {title: '创建日期', dataIndex: 'createrdata', key: 'createrdata'},
        // {title: '机构名称', dataIndex: 'describe', key: 'describe'},
        {title: '操作', dataIndex: 'action', key: 'action', width: 80, render: (texts, record) => (<a href="javascript:;" onClick={()=> {this.onClick(texts, record)}}>操作</a>)},
        // {title: '状态', dataIndex: 'statue', key: 'statue'},
     ],
     data:  []
    }
    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    const formData = [
      {type: 'InputIcon' ,label: '查询条件', name: 'condition', ruless:[] , placeholder: '帐户,角色,邮箱', typeIco: 'user'},
      {type: 'SelectCompone', style:{width: '198px'}, label: '状态：', name: 'state', options: option},
      {type: 'SelectCompone', style:{width: '198px'}, label: '角色', name: 'rol', options: option}
    ];
    buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddUser, labe: '添加'},
      // {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '禁用'},
      // {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'},
      // {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '删除'},
    ]
    this.state = {
      tableData,
      formData,
      params: {
        state: null,
        condition: null,
        page: 1,
        count: 10,
        totalCount: 0,
      }
    }
  }

  componentWillMount () {
    const {formData} = this.state;
    const options = [];
    GetRoleList().then(res => {
      res.data.forEach(elem => {
        options.push({ value: elem.RoleId ,label: elem.RoleName})
      })
    })
    formData[2].options = options;
    console.log(formData);
    this.setState({formData})
  }

  componentDidMount() {
    const {params} = this.state;
    //this.getData(params);
  }

  getData(params) {
    const {tableData} = this.state;
    tableData.data = [];
    GetUserLogoListApi(params).then(res => {
      if(res.status === 200 && res.data.totalCount){
        res.data.data.forEach(element => {
          const elem = {
            ...element,
            key: element.userId
          };
          tableData.data.push(elem);
        });
        const para = {
          ...params,
          totalCount: res.data.totalCount
        }
        this.setState({
          tableData,
          params: para
        })
      }
    })
  }

  handUserRole = (texts, record) => {
    this.UserRole.onShow();
  }

  handAddUser = (e) => {
    e.preventDefault();
    this.UserAddUpdate.showModal(e);
  }

  handEdit = (e) => {
    e.preventDefault();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {params} = this.state;
    this.props.form.validateFields((err, values) => {
      if(!err){
        const d = {
          condition: values.condition,
          state: values.state,
          totalCount: params.totalCount,
          page: 1,
        };
        this.setState({
          params: d
        }, this.getData(d))
      }
    })
  }

  resData = () => {
    this.setState({
      params: {
        state: null,
        condition: null,
        page: 1,
        count: 10,
        totalCount: 0,
      }
    },this.getData({
      state: null,
      condition: null,
      page: 1,
      count: 10,
      totalCount: 0,
    }))
  }

  onChangePage = (page) =>{
    const {params} = this.state;
    params.page = page;
    this.getData(params);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {tableData, params, formData} = this.state;
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
              <HeadFormSearch 
                form={this.props.form}
                formData={formData} 
                Reset={this.resData} 
                handleSubmit={this.handleSubmit} 
                getFieldDecorator={getFieldDecorator} 
              />
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
          pagination={{
            pageSize: params.count,
            total: params.totalCount,
            onChange: this.onChangePage
           }}
          // scroll={{ x: 1000 }}
        />
        <UserAddUpdate ref={(c) => {this.UserAddUpdate = c}} />
        <RoleSet ref={(c) => { this.RoleSet = c; }} />
        <UserRole ref={(c) => { this.UserRole = c;}}  />
      </PageHeaderWrapper>
    );
  }
}
const UserLists = Form.create({ name: 'SearchList' })(UserList);
export default UserLists;
