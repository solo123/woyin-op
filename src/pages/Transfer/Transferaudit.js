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
import styles from './Transferaudit.less';

@connect()
class Transferaudit extends React.Component {
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
      {type: 'InputIcon' ,label: '转让编号', name: 'ordercoder', ruless:[] , placeholder: '转让编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '审核人员名', name: 'autic', ruless:[] , placeholder: '审核人员名', typeIco: 'book'},
      {type: 'SelectCompone', label: '对象类型', name: 'type', options: option},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option},
      {type: 'InputIcon', label: '转让申请人名',name: 'apply', ruless:[] , placeholder: '转让申请人名', typeIco: 'book'},
      {type: 'InputIcon', label: '商户名称',name: 'merchant', ruless:[] , placeholder: '商户名称', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '转让时间', name: 'rechargeTime', ruless:[] , placeholder: '转让时间', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '转让审核'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出'}
    ];
    const tableDatas = {columns: 
      [
        {title: '查看', dataIndex: 'find', key: 'find'},
        {title: '转让编号', dataIndex: 'id', key: 'id'},
        {title: '外部订单编号', dataIndex: 'orderId', key: 'orderId'},
        {title: '对象类型', dataIndex: 'type', key: 'type'},
        {title: '转让积分', dataIndex: 'integral', key: 'integral'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
        {title: '转让申请人编号', dataIndex: 'applyId', key: 'applyId'},
        {title: '转让申请人名', dataIndex: 'applyName', key: 'applyName'},
        {title: '所属商户', dataIndex: 'merchant', key: 'merchant'},
        {title: '审核人名', dataIndex: 'audit', key: 'audit'},
        {title: '手续费（积分）', dataIndex: 'service', key: 'service'},
        {title: '持卡人名称', dataIndex: 'cardName', key: 'cardName'},
        {title: '手机号', dataIndex: 'phone', key: 'phone'},
        {title: '银行代码', dataIndex: 'bankId', key: 'bankId'},
        {title: '银行名称', dataIndex: 'bankName', key: 'bankName'},
        {title: '银行卡号', dataIndex: 'bankCard', key: 'bankCard'},
        {title: '备注', dataIndex: 'remark', key: 'remark'},
        {title: '返回信息', dataIndex: 'returnInfo', key: 'returnInfo'},
        {title: '创建时间', dataIndex: 'createrTime', key: 'createrTime'},
        {title: '操作', dataIndex: 'action', key: 'action', width: 80, render: (texts, record) => (<a href="javascript:;" onClick={()=> {this.onClick(texts, record)}}>操作</a>)},
     ]
    };
    const datas =  [
      {
        find: '1', 
        id: 'John2', 
        orderId: 'xxxx', 
        type: 'xxxx', 
        integral: 'xxxx', 
        statue: 'xxxx', 
        applyId: 'xxx', 
        applyName: 'xxx',
        merchant: 'xxx',
        audit: 'xxx',
        service: 'xxx',
        cardName: 'xxx',
        phone: 'xxx',
        bankId: 'xxx',
        bankName: 'xxx',
        bankCard: 'xxx',
        remark: 'xxx',
        returnInfo: 'xxx',
        createrTime: 'xxx',
      }, 
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
          scroll={{ x: 2000 }}
        />
      </PageHeaderWrapper>
    )
  }
}
const Transferaudits = Form.create({ name: 'list' })(Transferaudit);
export default Transferaudits;