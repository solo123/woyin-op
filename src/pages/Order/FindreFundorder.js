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
import {HeadFormSearchTwo } from '@/components/HeadForm';
import styles from './FindreFundorder.less'

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
      {type: 'InputIcon' ,label: '退款编号', name: 'ordercoder', ruless:[] , placeholder: '退款编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '产品编号', name: 'logo', ruless:[] , placeholder: '产品编号', typeIco: 'book'},
      // {type: 'SelectCompone', label: '产品名称',name: 'logo', ruless:[] , placeholder: '产品名称', typeIco: 'book'},
      // {type: 'SelectCompone', label: '状态：', name: 'statue', options: option},
      {type: 'InputIcon' ,label: '购买订单编号', name: 'rechargeLogo', ruless:[] , placeholder: '购买订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '购买订单详情编号', name: 'number', ruless:[] , placeholder: '购买订单详情编号', typeIco: 'user'},
      {type: 'SelectDateRang' ,label: '退款订单时间', name: 'rechargeTime', ruless:[] , placeholder: '退款订单时间', typeIco: 'book'},
    ];
  
    const tableDatas = {columns: 
      [
        {title: '退款编号', dataIndex: 'id', key: 'id', width: 100},
        {title: '购买订单编号', dataIndex: 'orderId', key: 'orderId', width: 100},
        {title: '购买订单详细编号', dataIndex: 'orderInfoId', key: 'orderInfoId', width: 140},
        {title: '申请退款积分', dataIndex: 'applyIntegral', key: 'applyIntegral', width: 100},
        {title: '实际退款积分', dataIndex: 'integral', key: 'integral', width: 100},
        {title: '产品编号', dataIndex: 'productId', key: 'productId', width: 80},
        {title: '产品名称', dataIndex: 'productName', key: 'productName', width: 80},
        {title: '状态', dataIndex: 'statue', key: 'statue', width: 80},
        {title: '退款申请人编号', dataIndex: 'applyOrder', key: 'applyOrder', width: 120},
        {title: '退款申请人', dataIndex: 'apply', key: 'apply', width: 100},
        {title: '退款申请时间', dataIndex: 'applyTime', key: 'applyTime', width: 120},
        {title: '完成时间', dataIndex: 'succeedTiem', key: 'succeedTiem', width: 80},
        {title: '审核人编号', dataIndex: 'auditId', key: 'auditId', width: 80},
        {title: '审核人', dataIndex: 'audit', key: 'audit', width: 120},
        {title: '备注', dataIndex: 'remark', key: 'remark', width: 120}
     ]
    };
    const datas =  [
      {key: '1', id: 'John2', orderId: '322', orderInfoId: 'New York No', applyIntegral: 'developer', integral: '11888', productId: '88-88', productName: '正常', statue: '2018-01-01', applyOrder: '详情', apply:'2019-11-11', applyTime: '2018-11-12',succeedTiem: '2018', auditId: '2019', audit: '111', remark: '112'}, 
      {key: '2', id: 'John2', orderId: '322', orderInfoId: 'New York No', applyIntegral: 'developer', integral: '11888', productId: '88-88', productName: '正常', statue: '2018-01-01', applyOrder: '详情', apply:'2019-11-11', applyTime: '2018-11-12',succeedTiem: '2018', auditId: '2019', audit: '111', remark: '112'}, 
      {key: '3', id: 'John2', orderId: '322', orderInfoId: 'New York No', applyIntegral: 'developer', integral: '11888', productId: '88-88', productName: '正常', statue: '2018-01-01', applyOrder: '详情', apply:'2019-11-11', applyTime: '2018-11-12',succeedTiem: '2018', auditId: '2019', audit: '111', remark: '112'}, 
    ];
    this.state = {
      formData: formDatas,
      tableData: tableDatas,
      data: datas
    }
  }
  
  componentWillMount () {

  }

  createMember = (texts, record) => {

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
                总积分：
              </div>
            </Col>
          </Row>
        </Card>
        <Table
          columns={tableData.columns}
          dataSource={data} 
          bordered
          rowSelection={rowSelection}
          scroll={{ x: 2000 }}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;