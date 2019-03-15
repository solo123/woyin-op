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
import styles from './Parameter.less';

const component = {};
let data = null;
let ColumnData = null;
let formData = null;
let buttonData = null;
@connect()
class Parameter extends Component {
  componentWillMount () {
    ColumnData = {data: 
      [
        {title: '参数编号', dataIndex: 'paracode', key: 'paracode'},
        {title: '私有参数编号', dataIndex: 'privacode', key: 'privacode'},
        {title: '参数名', dataIndex: 'name', key: 'name'},
        {title: '参数说明', dataIndex: 'describe', key: 'describe'},
        {title: '参数值', dataIndex: 'value', key: 'value'},
     ],
    dataEnd: {}
  };
    data =  [
      {key: '1', paracode: 'John', privacode: '张三', name: 'New York No. 1 Lake Park', describe: '2018-8-12', value: '正常'}, 
      {key: '2', paracode: 'John2', privacode: '刘备', name: 'New York No. 1 Lake Park', describe: '2018-8-13', value: '正常'}, 
      {key: '3', paracode: 'John3', privacode: '痝', name: 'New York No. 1 Lake Park', describe: '2018-8-14', value: '正常'}, 
    ];
    formData = [
      {type: 'InputIcon' ,label: '参数名', name: 'name', ruless:[] , placeholder: '参数名', typeIco: 'user'},
      {type: 'InputIcon' ,label: '私有参数编号', name: 'code', ruless:[] , placeholder: '私有参数编号', typeIco: 'book'},
    ];
    buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddRole, labe: '添加'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '删除'},
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
              <div className={styles.addButtons}>
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
const Parameters = Form.create({ name: 'SearchList' })(Parameter);
export default Parameters;
