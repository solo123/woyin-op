import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearchTwo, HeadFootButton} from '@/components/HeadForm';
import styles from './MerchantWater.less'

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
      {type: 'InputIcon' ,label: '购买订单编号', name: 'ordercoder', ruless:[] , placeholder: '购买订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '登录手机号', name: 'logo', ruless:[] , placeholder: '登录手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option},
      {type: 'InputIcon', label: '购买对象名称',name: 'logo', ruless:[] , placeholder: '购买对象名称', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '购买时间', name: 'rechargeTime', ruless:[] , placeholder: '购买时间', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出'}
    ];
    const tableDatas = {columns: 
      [
        {title: '购买订单编号', dataIndex: 'id', key: 'id'},
        {title: '登录手机号', dataIndex: 'phone', key: 'phone'},
        {title: '购买对象名称', dataIndex: 'buyName', key: 'buyName'},
        {title: '购买对象类型', dataIndex: 'buyType', key: 'buyType'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
        {title: '积分', dataIndex: 'integral', key: 'integral'},
        {title: '创建日期', dataIndex: 'createrTime', key: 'createrTime'},
        {title: '操作', dataIndex: 'action', key: 'action', width: 80, render: (texts, record) => (<a href="javascript:;" onClick={()=> {this.onClick(texts, record)}}>操作</a>)},
     ]
    };
    const datas =  [
      {key: '1', id: 'John2', phone: 'xxxx', buyName: 'xxxx', buyType: 'xxxx', statue: 'xxxx', integral: 'xxx', createrTime:'2018-01-09'}, 
     ];
    this.state = {
      formData: formDatas,
      tableData: tableDatas,
      data: datas,
      buttonData: buttonDatas
    }
  }
  
  componentWillMount () {

  }

  onClick = (texts, record) => {
    console.log('xxxx');
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

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, buttonData, tableData, data } = this.state;
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
              <HeadFormSearchTwo formData={formData} handleSubmit={this.handleSubmit} getFieldDecorator={getFieldDecorator} />
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
          dataSource={data} 
          bordered
          rowSelection={rowSelection}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;