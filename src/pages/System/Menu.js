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
import {HeadFootButton} from '@/components/HeadForm';

const component = {};
let data = null;
let ColumnData = null;
let buttonData = null;
@connect()
class SearchList extends Component {
  componentWillMount () {
    ColumnData = {data: 
      [
        {title: '菜单名称', dataIndex: 'menuname', key: 'menuname'},
        {title: '菜单链接', dataIndex: 'menuurl', key: 'menuurl'},
        {title: '描述', dataIndex: 'describe', key: 'describe'},
        {title: '创建日期', dataIndex: 'createrdata', key: 'createrdata'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
     ],
    dataEnd: {}
    };
    data =  [
      {key: '1', menuname: '系统管理', menuurl: '张三', describe: 'New York No. 1 Lake Park', createrdata: '2018-8-12', statue: '正常', 
      children: [
          {key: '11', menuname: '角色管理', menuurl: '张三', describe: 'New York No. 1 Lake Park', createrdata: '2018-8-12', statue: '正常'},
          {key: '12', menuname: '用户管理', menuurl: '张三', describe: 'New York No. 1 Lake Park', createrdata: '2018-8-12', statue: '正常'}
      ]
    }, 
      {key: '2', menuname: '商户管理', menuurl: '刘备', describe: 'New York No. 1 Lake Park', createrdata: '2018-8-13', statue: '正常'}, 
      {key: '3', menuname: '订单管理', menuurl: '痝', describe: 'New York No. 1 Lake Park', createrdata: '2018-8-14', statue: '正常'}, 
    ];

    buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddRole, labe: '添加'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '删除'},
    ]
   }

  componentDidMount() {
    // To disabled submit button at the beginning.
    component.RoleSet  = this.RoleSet;
    component.RoleAddOrUpdate = this.RoleAddOrUpdate;
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
              <HeadFootButton buttonData={buttonData} />
            </Col>
          </Row>
        </Card>
        <TabelList data={data} ColumnData={ColumnData} rowSelection={rowSelection} ExpandAllRows />
        <RoleAddOrUpdate ref={(c) => {this.RoleAddOrUpdate = c}} />
        <RoleSet ref={(c) => { this.RoleSet = c; }} />
      </PageHeaderWrapper>
    );
  }
}
const SearchLists = Form.create({ name: 'SearchList' })(SearchList);
export default SearchLists;
