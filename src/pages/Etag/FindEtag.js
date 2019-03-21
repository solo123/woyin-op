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
import styles from './FindEtag.less'

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
      {type: 'InputIcon' ,label: '电子券编号', name: 'ordercoder', ruless:[] , placeholder: '电子券编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '批次号', name: 'logo', ruless:[] , placeholder: '批次号', typeIco: 'book'},
      {type: 'InputIcon', label: '绑卡人登录号',name: 'logo', ruless:[] , placeholder: '绑卡人登录号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option},
      {type: 'InputIcon', label: '面值（积分）',name: 'logo', ruless:[] , placeholder: '面值（积分）', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '日期', name: 'rechargeTime', ruless:[] , placeholder: '日期', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出'}
    ];
    const tableDatas = {columns: 
      [
        {title: '电子券编号', dataIndex: 'edId', key: 'id'},
        {title: '批次号', dataIndex: 'id', key: 'phone'},
        {title: '卡号', dataIndex: 'cardId', key: 'buyName'},
        {title: '面值(积分)', dataIndex: 'valueInt', key: 'buyType'},
        {title: '商户号', dataIndex: 'commercialId', key: 'statue'},
        {title: '商户名称', dataIndex: 'commercialName', key: 'integral'},
        {title: '审核时间', dataIndex: 'applyTime', key: 'createrTime'},
        {title: '绑卡人登录号', dataIndex: 'bindLogo', key: 'createrTime'},
        {title: '绑卡人名称', dataIndex: 'bindName', key: 'createrTime'},
        {title: '绑定时间', dataIndex: 'bindTime', key: 'createrTime'},
        {title: '状态', dataIndex: 'statue', key: 'createrTime'},
        {title: '卡密错误次数', dataIndex: 'cardError', key: 'createrTime'},
        {title: '创建日期', dataIndex: 'createrDate', key: '创建日期'},
      ]
    };
    const datas =  [
      {
        key: '1', 
        edId: 'John2', 
        id: 'xxxx', 
        valueInt: 'xxxx', 
        commercialId: 'xxxx', 
        commercialName: 'xxxx', 
        applyTime: 'xxx', 
        bindLogo:'2018-01-09',
        bindName:'2018-01-09',
        bindTime:'2018-01-09',
        statue:'2018-01-09',
        cardError:'2018-01-09',
        createrDate:'2018-01-09',
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
const Lists = Form.create({ name: 'list' })(List);
export default Lists;