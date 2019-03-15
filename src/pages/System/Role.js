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
import {RoleAddOrUpdate} from '@/components/System';
import TabelList from '@/components/TableList/TableList';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import styles from './Role.less';

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
        {title: '角色名称', dataIndex: 'firstName', key: 'firstName'},
        {title: '角色编码', dataIndex: 'code', key: 'code'},
        {title: '角色描述', dataIndex: 'describe', key: 'describe'},
        {title: '状态', dataIndex: 'tags', key: 'tags'},
     ],
    dataEnd: {title: '操作', dataIndex: 'actions', key: 'actions', onAction: [{label: '成员',onClick: this.handRoleSet},{label: '权限',onClick: this.handRoleSet}]
    }};
    data =  [
      {key: '1', firstName: 'John', code: 32, describe: 'New York No. 1 Lake Park', tags: 'developer'}, 
      {key: '2', firstName: 'Jim', code: 42, describe: 'London No. 1 Lake Park',tags: 'loser'}, 
      {key: '3', firstName: 'Joe', code: 32, describe: 'Sidney No. 1 Lake Park', tags: 'teacher',}
    ];
    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    formData = [
      {type: 'InputIcon' ,label: '角色名称', name: 'name', ruless:[] , placeholder: '角色名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '角色编码：', name: 'code', ruless:[] , placeholder: '角色编码', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option}
    ];
    buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddRole, labe: '添加'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'},
    ]
   }

  componentDidMount() {
    // To disabled submit button at the beginning.
    component.RoleSet  = this.RoleSet;
    component.RoleAddOrUpdate = this.RoleAddOrUpdate;
  }

  handRoleSet = (texts, record) => {
    console.log(component.RoleSet);
    const {RoleSet} = component;
    RoleSet.onShow();
  }

  handAddRole = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/no-string-refs ,no-shadow
    this.RoleAddOrUpdate.showModal(e);
  }

  handEdit = (e) => {
    e.preventDefault();
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

    const handleSubmit = (e) => {
      e.preventDefault();
      // eslint-disable-next-line react/destructuring-assignment
      this.props.form.validateFields((err, values) => {
        if(!err){
          console.log('Received values of form: ', values);
        }
      })
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch formData={formData} handleSubmit={handleSubmit} getFieldDecorator={getFieldDecorator} />
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
        <RoleAddOrUpdate ref={(c) => {this.RoleAddOrUpdate = c}} />
        <RoleSet ref={(c) => { this.RoleSet = c; }} />
      </PageHeaderWrapper>
    );
  }
}
const SearchLists = Form.create({ name: 'SearchList' })(SearchList);
export default SearchLists;
