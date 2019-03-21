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
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import styles from './List.less';

const component = {};
let formData = null;
let buttonData = null;
@connect()
class SearchList extends Component {
  componentWillMount () {


    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    formData = [
      {type: 'InputIcon' ,label: '商户登录号', name: 'name', ruless:[] , placeholder: '角色名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '商户名称', name: 'code', ruless:[] , placeholder: '角色编码', typeIco: 'book'},
      {type: 'SelectDateRang', label: '创建时间', name: 'statue', options: option}
    ];
    buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddUser, labe: '还款审核'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出'},
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
       
      </PageHeaderWrapper>
    );
  }
}
const SearchLists = Form.create({ name: 'SearchList' })(SearchList);
export default SearchLists;
