import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TabelList from '@/components/TableList/TableList';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import styles from './BalanceInfo.less'

@connect()
class Recharge extends React.Component {
  constructor(props){
    super(props);
    const formDatas = [
      {type: 'InputIcon' ,label: '商户登录帐户', name: 'logo', ruless:[] , placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon' ,label: '商户名称', name: 'name', ruless:[] , placeholder: '角商户名称色编码', typeIco: 'book'},
      {type: 'InputIcon' ,label: '手机号', name: 'name', ruless:[] , placeholder: '手机号', typeIco: 'book'},
      {type: 'InputIcon' ,label: '会员名称', name: 'name', ruless:[] , placeholder: '会员名称', typeIco: 'book'},
    ];
    const ColumnDatas = {data: 
      [
        {title: '商户登录帐户', dataIndex: 'logo', key: 'logo'},
        {title: '商户名称', dataIndex: 'name', key: 'name'},
        {title: '会员编号', dataIndex: 'code', key: 'code'},
        {title: '会员名称', dataIndex: 'balanname', key: 'balanname'},
        {title: '手机号', dataIndex: 'phone', key: 'phone'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
        {title: '创建时间', dataIndex: 'creatertime', key: 'creatertime'},
        {title: '冻结时间', dataIndex: 'freezing', key: 'freezing'},
        {title: '解冻时间', dataIndex: 'unfreezing', key: 'unfreezing'}, 
     ],
     dataEnd: {title: '操作', dataIndex: 'actions', key: 'actions', onAction: [{label: '详情',onClick: this.createMember}]}
    };
    const datas =  [
      {key: '1', logo: 'John2', name: '322', code: 'New York No. 1 Lake Park', balanname: 'developer', phone: '11888', statue: '88-88', creatertime: '正常', freezing: '2018-01-01', unfreezing: '2018-14-15'}, 
      {key: '2', logo: 'John3', name: '321', code: 'New York No. 1 Lake Park', balanname: 'developer', phone: '11888', statue: '88-88', creatertime: '正常', freezing: '2018-01-01', unfreezing: '2018-01-02'}, 
      {key: '3', logo: 'John4', name: '323', code: 'New York No. 1 Lake Park', balanname: 'developer', phone: '11888', statue: '88-88', creatertime: '正常', freezing: '2018-01-01', unfreezing: '2018-01-14'}, 
    ];
    this.state = {
      formData: formDatas,
      ColumnData: ColumnDatas,
      data: datas
    }
  }
  
  componentWillMount () {

  }

  createMember = (texts, record) => {

  }

  hangClick = (e) => {
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
    const { formData, buttonData, ColumnData, data } = this.state;
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
        </Card>
        <TabelList data={data} ColumnData={ColumnData} rowSelection={rowSelection} />
      </PageHeaderWrapper>
    )
  }
}
const Recharges = Form.create({ name: 'list' })(Recharge);
export default Recharges;