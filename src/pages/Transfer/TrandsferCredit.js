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
import styles from './TrandsferCredit.less';

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
      {type: 'InputIcon' ,label: '订单号', name: 'ordercoder', ruless:[] , placeholder: '订单号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '外部订单号', name: 'autic', ruless:[] , placeholder: '外部订单号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option},
      {type: 'InputIcon', label: '还款申请人',name: 'apply', ruless:[] , placeholder: '还款申请人', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '申请时间', name: 'rechargeTime', ruless:[] , placeholder: '申请时间', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出'}
    ];
    const tableDatas = {columns: 
      [
        {title: '订单号', dataIndex: 'id', key: 'id'},
        {title: '外部订单编号', dataIndex: 'outId', key: 'outId'},
        {title: '申请人', dataIndex: 'apply', key: 'orderId'},
        {title: '还款金额(元)', dataIndex: 'refund', key: 'refund'},
        {title: '手续费（积分）', dataIndex: 'integral', key: 'integral'},
        {title: '支付积分', dataIndex: 'pay', key: 'pay'},
        {title: '还款状态', dataIndex: 'statue', key: 'statue'},
        {title: '银行名称', dataIndex: 'brandName', key: 'brandName'},
        {title: '银行卡号', dataIndex: 'brankId', key: 'brankId'},
        {title: '备注', dataIndex: 'remark', key: 'remark'},
        {title: '返回信息', dataIndex: 'returnInfo', key: 'returnInfo'},
        {title: '提交时间', dataIndex: 'submittime', key: 'submittime'},
        {title: '确认时间', dataIndex: 'okcreater', key: 'okcreater'},
     ]
    };
    const datas =  [
      {
        id: 'John2', 
        outId: 'xxxx', 
        apply: 'xxxx', 
        integral: 'xxxx', 
        pay: 'xxxx', 
        statue: 'xxx', 
        brandName: 'xxx',
        brankId: 'xxx',
        remark: 'xxx',
        returnInfo: 'xxx',
        submittime: 'xxx',
        okcreater: 'xxx',
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
        />
      </PageHeaderWrapper>
    )
  }
}
const Transferaudits = Form.create({ name: 'list' })(Transferaudit);
export default Transferaudits;