import React, { Component } from 'react';
import { connect } from 'dva';
import { 
  Table, 
  Divider, 
  Tag, 
  Input,
  Form, 
  Icon,  
  Button,
  Cascader,
  Row, 
  Col,
  Card
} from 'antd';
import styles from './Role.less'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RoleAddOrUpdate from '@/components/System/Role-add-update';
import RoleSet from '@/components/System/Role-set';


const { Column } = Table;

const data = [{
  key: '1',
  firstName: 'John',
  lastName: 'Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  firstName: 'Jim',
  lastName: 'Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  firstName: 'Joe',
  lastName: 'Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];
const component = {};
@connect()
class SearchList extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    component.RoleSet  = this.RoleSet;
  }

  handleSubmit = value => {
    console.log(value);
  };

  onChange = (value) => {
    console.log(value);
  }

  handleRoleAddOrUpdate = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/no-string-refs ,no-shadow
    
    const {RoleAddOrUpdate } = this.refs;
    RoleAddOrUpdate.showModal(e);
  }

  handRoleSet = (texts, record) => {
    console.log(component.RoleSet);
    const {RoleSet} = component;
    console.log(RoleSet)
    RoleSet.onShow();
  }

  render() {

    const { match, children, location } = this.props;
    const options = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item
                  label="角色名称："
                >
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="角色名称" />
                </Form.Item>
                <Form.Item
                  label="角色编码："
                >
                  <Input prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="角色编码" />
                </Form.Item>
                <Form.Item
                  label="状态："
                >
                  <Cascader options={options} onChange={this.onChange} placeholder="请选择" />
                </Form.Item>
                <Button type="primary" icon="search">查找</Button>
                <Button style={{"marginLeft": '10px'}} icon="redo">重置</Button>
              </Form>
            </Col>
          </Row>
          <div className={styles.addButton}>
            <Button type="primary" icon="plus" onClick={(e) => this.handleRoleAddOrUpdate(e)}>添加</Button>
            <Button icon="redo">修改</Button>
          </div>
        </Card>
         
        <Table 
          dataSource={data} 
          bordered
          rowSelection={rowSelection}
        >
          <Column
            title="角色名称"
            dataIndex="firstName"
            key="firstName"
          />
          <Column
            title="Last Name"
            dataIndex="lastName"
            key="lastName"
          />
          <Column
            title="角色编码"
            dataIndex="age"
            key="age"
          />
          <Column
            title="角色描述"
            dataIndex="address"
            key="address"
          />
          <Column
            title="状态"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <span>
                {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
              </span>
              )}
          />
          <Column
            title="操作"
            key="action"
            render={(texts, record) => (
              <span>
                <a href="javascript:;">成员</a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={()=> {this.handRoleSet(texts, record)}}>权限</a>
              </span>
              )}
          />
        </Table>
            
        <RoleAddOrUpdate ref='RoleAddOrUpdate' />
        <RoleSet ref={(c) => { this.RoleSet = c; }} />
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
