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
import styles from './Shoporder.less'

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
      {type: 'InputIcon' ,label: '充值订单编号', name: 'ordercoder', ruless:[] , placeholder: '充值订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '充值对象登录号', name: 'logo', ruless:[] , placeholder: '充值对象登录号', typeIco: 'book'},
      {type: 'SelectCompone', label: '充值人员类型', name: 'type', options: option},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option},
      {type: 'InputIcon' ,label: '充值对象名称', name: 'rechargeLogo', ruless:[] , placeholder: '充值对象名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '批次号', name: 'number', ruless:[] , placeholder: '批次号', typeIco: 'user'},
      {type: 'SelectDateRang' ,label: '充值时间', name: 'rechargeTime', ruless:[] , placeholder: '充值时间', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddRole, labe: '充值审核'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出'}
    ];
    const tableDatas = {columns: 
      [
        {title: '充值订单编号', dataIndex: 'ordercode', key: 'ordercode', width: 120},
        {title: '批次号', dataIndex: 'number', key: 'number', width: 100},
        {title: '充值对象登录号', dataIndex: 'rechargeLogo', key: 'rechargeLogo', width: 180},
        {title: '充值对象名称', dataIndex: 'rechargeName', key: 'rechargeName', width: 160},
        {title: '充值对象类型', dataIndex: 'rechargeType', key: 'rechargeType', width: 160},
        {title: '充值类型', dataIndex: 'type', key: 'type', width: 100},
        {title: '加款方式', dataIndex: 'mode', key: 'mode', width: 100},
        {title: '订单积分', dataIndex: 'orderInteg', key: 'orderInteg', width: 100},
        {title: '状态', dataIndex: 'statue', key: 'statue', width: 80},
        {title: '申请人ID', dataIndex: 'applyId', key: 'applyId', width: 140},
        {title: '申请人', dataIndex: 'apply', key: 'apply', width: 80},
        {title: '审核人', dataIndex: 'audit', key: 'audit', width: 80},
        {title: '备注', dataIndex: 'remark', key: 'remark', width: 80},
        {title: '日志信息', dataIndex: 'jourInfo', key: 'jourInfo', width: 120},
        {title: '扩展属性', dataIndex: 'extend', key: 'extend', width: 120},
        {title: '创建时间', dataIndex: 'createrTime', key: 'createrTime', width: 120},
     ]
    };
    const datas =  [
      {key: '1', ordercode: 'John2', number: '322', rechargeLogo: 'New York No', rechargeName: 'developer', rechargeType: '11888', type: '88-88', mode: '正常', orderInteg: '2018-01-01', statue: '详情', applyId:'2019-11-11', apply: '2018-11-12',audit: '2018', remark: '2019', jourInfo: '111', extend: '112', createrTime: '12'}, 
      {key: '2', ordercode: 'John2', number: '322', rechargeLogo: 'New York No', rechargeName: 'developer', rechargeType: '11888', type: '88-88', mode: '正常', orderInteg: '2018-01-01', statue: '详情', applyId:'2019-11-11', apply: '2018-11-12',audit: '2018', remark: '2019', jourInfo: '111', extend: '112', createrTime: '12'}, 
      {key: '3', ordercode: 'John2', number: '322', rechargeLogo: 'New York No', rechargeName: 'developer', rechargeType: '11888', type: '88-88', mode: '正常', orderInteg: '2018-01-01', statue: '详情', applyId:'2019-11-11', apply: '2018-11-12',audit: '2018', remark: '2019', jourInfo: '111', extend: '112', createrTime: '12'}, 
    ];
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
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
          scroll={{ x: 2000 }}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;