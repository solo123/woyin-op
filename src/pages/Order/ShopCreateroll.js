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
import styles from './ShopCreateroll.less'

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
      {type: 'InputIcon' ,label: '对象登录帐号', name: 'logo', ruless:[] , placeholder: '购买订单编号', typeIco: 'user'},
      {type: 'InputIcon' ,label: '批次号', name: 'id', ruless:[] , placeholder: '登录手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', name: 'statue', options: option},
      {type: 'InputIcon', label: '对象类型',name: 'type', ruless:[] , placeholder: '购买对象名称', typeIco: 'book'},
      {type: 'SelectDateRang' ,label: '时间', name: 'time', ruless:[] , placeholder: '时间', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '电子券审核'},
      {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出Excel'}
    ];
    const tableDatas = {columns: 
      [
        {title: '批次编号', dataIndex: 'id', key: 'id'},
        {title: '对象登录账号', dataIndex: 'objLogo', key: 'objLogo'},
        {title: '对象名称', dataIndex: 'objName', key: 'objName'},
        {title: '对象类型', dataIndex: 'objType', key: 'objType'},
        {title: '批次号', dataIndex: 'batchId', key: 'batchId'},
        {title: '类型', dataIndex: 'type', key: 'type'},
        {title: '总笔数', dataIndex: 'count', key: 'count'},
        {title: '成功笔数', dataIndex: 'scusseed', key: 'scusseed'},
        {title: '失败笔数', dataIndex: 'defeated', key: 'defeated'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
        {title: '总积分', dataIndex: 'countIntegral', key: 'countIntegral'},
        {title: '成功(积分)', dataIndex: 'scusseedInt', key: 'scusseedInt'},
        {title: '失败(积分)', dataIndex: 'defeatedInt', key: 'defeatedInt'},
        {title: '申请人编号', dataIndex: 'applyId', key: 'applyId'},
        {title: '申请人名', dataIndex: 'applyName', key: 'applyName'},
        {title: '审核人名', dataIndex: 'auditName', key: 'auditName'},
        {title: '备注', dataIndex: 'remark', key: 'remark'},
        {title: '创建时间', dataIndex: 'createrTime', key: 'createrTime'},
        {title: '查看', dataIndex: 'view', key: 'view'},
     ]
    };
    const datas =  [
      {key: '1', id: 'John2', objLogo: 'xxxx', objName: 'xxxx', objType: 'xxxx', batchId: 'xxxx', type: 'xxx', count:'2018-01-09',scusseed: 'xx',defeated: 'xx',statue: 'xx',countIntegral: 'xx',scusseedInt: 'xx',defeatedInt: 'xx',applyId: 'xx',applyName: 'xx',auditName: 'xx',remark: 'xx',createrTime: 'xx',view: 'xx'}, 
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
const Lists = Form.create({ name: 'list' })(List);
export default Lists;