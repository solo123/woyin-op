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
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import styles from './ProductInfo.less'

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
      {type: 'InputIcon' ,label: '产品名称', name: 'ordercoder', ruless:[] , placeholder: '购买订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '产品类型', name: 'logo', ruless:[] , placeholder: '登录手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option}
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '添加'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'}
    ];
    const tableDatas = {columns: 
      [
        {title: '产品编号', dataIndex: 'id', key: 'id'},
        {title: '产品类型', dataIndex: 'type', key: 'type'},
        {title: '产品名称', dataIndex: 'name', key: 'name'},
        {title: '价值', dataIndex: 'value', key: 'value'},
        {title: '进货价', dataIndex: 'purchasing', key: 'purchasing'},
        {title: '销售价', dataIndex: 'sales', key: 'sales'},
        {title: '产品状态', dataIndex: 'statue', key: 'statue'},
        {title: '是否支持退款', dataIndex: 'yesorno', key: 'yesorno', },
        {title: '创建日期', dataIndex: 'creater', key: 'creater', },
     ]
    };
    const datas =  [
      {key: '1', id: 'John2', type: 'xxxx', name: 'xxxx', value: 'xxxx', purchasing: 'xxxx', sales: 'xxx', statue:'2018-01-09', yesorno: '不',creater: 'ss' }, 
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