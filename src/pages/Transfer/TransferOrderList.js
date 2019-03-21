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
import styles from './TransferOrderList.less';

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
      {type: 'InputIcon' ,label: '转赠订单编号', name: 'orderId', ruless:[] , placeholder: '转赠订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '转赠人手机号', name: 'phone', ruless:[] , placeholder: '转赠人手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option},
      {type: 'InputIcon', label: '被转赠人手机号',name: 'whyPhon', ruless:[] , placeholder: '被转赠人手机号', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '转赠时间', name: 'time', ruless:[] , placeholder: '转赠时间', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出'}
    ];
    const tableDatas = {columns: 
      [
        {title: '转赠订单编号', dataIndex: 'orderId', key: 'orderId'},
        {title: '转赠人姓名', dataIndex: 'name', key: 'name'},
        {title: '转赠人手机号', dataIndex: 'phone', key: 'phone'},
        {title: '被转赠人姓名', dataIndex: 'whyname', key: 'whyname'},
        {title: '被转赠人手机号', dataIndex: 'whyPhon', key: 'whyPhon'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
        {title: '转增积分', dataIndex: 'interage', key: 'interage'},
        {title: '手续费', dataIndex: 'commission', key: 'commission'} 
    ]
    };
    const datas =  [
      {
        orderId: '1', 
        name: 'John2', 
        phone: 'xxxx', 
        whyname: 'xxxx', 
        whyPhon: 'xxxx', 
        statue: 'xxxx', 
        interage: 'xxx', 
        commission: 'xxx',
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