/* eslint-disable no-script-url */
import React, { Component } from 'react';
import { connect } from 'dva';
import { 
  Row, 
  Col,
  Card,
  Form
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RoleSet from '@/components/System/Role-set';
import TabelList from '@/components/TableList/TableList';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import UserAddUpdate from '@/components/System/User-add-update';
import UserRole from '@/components/System/User-role';
import styles from './User.less';

const component = {};
let data = null;
let ColumnData = null;
let formData = null;
let buttonData = null;
@connect()
class SearchList extends Component {
  componentWillMount () {
    ColumnData = {data: 
      [
        {title: '登录帐号', dataIndex: 'logo', key: 'logo'},
        {title: '用户名称', dataIndex: 'name', key: 'name'},
        {title: '描述', dataIndex: 'describe', key: 'describe'},
        {title: '创建日期', dataIndex: 'createrdata', key: 'createrdata'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
     ],
    dataEnd: {title: '操作', dataIndex: 'actions', key: 'actions', onAction: [{label: '角色',onClick: this.handUserRole}]
    }};
    data =  [
      {key: '1', logo: 'John', name: '张三', describe: 'New York No. 1 Lake Park', createrdata: '2018-8-12', statue: '正常'}, 
      {key: '2', logo: 'John2', name: '刘备', describe: 'New York No. 1 Lake Park', createrdata: '2018-8-13', statue: '正常'}, 
      {key: '3', logo: 'John3', name: '痝', describe: 'New York No. 1 Lake Park', createrdata: '2018-8-14', statue: '正常'}, 
    ];
    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    formData = [
      {type: 'InputIcon' ,label: '用户名称：', name: 'name', ruless:[] , placeholder: '角色名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '登录帐户：', name: 'code', ruless:[] , placeholder: '角色编码', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option}
    ];
    buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddUser, labe: '添加'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '重置密码'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '删除'},
    ]
   }

  componentDidMount() {
    // To disabled submit button at the beginning.
    component.RoleSet  = this.RoleSet;
    component.UserAddUpdate = this.UserAddUpdate;
    console.log(this.UserAddUpdate);
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
    // const { match, children, location } = this.props;
    const { getFieldDecorator } = this.props.form;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
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
        <TabelList data={data} ColumnData={ColumnData} rowSelection={rowSelection} />
        <UserAddUpdate ref={(c) => {this.UserAddUpdate = c}} />
        <RoleSet ref={(c) => { this.RoleSet = c; }} />
        <UserRole ref={(c) => { this.UserRole = c;}}  />
      </PageHeaderWrapper>
    );
  }
}
const SearchLists = Form.create({ name: 'SearchList' })(SearchList);
export default SearchLists;
