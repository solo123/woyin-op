import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RoleSet from '@/components/System/Role-set';
import {RoleAddOrUpdate, RoleUser} from '@/components/System';
import TabelList from '@/components/TableList/TableList';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import styles from './Recharge.less'

@connect()
class Recharge extends React.Component {
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
      {type: 'InputIcon' ,label: '商户登录帐户', name: 'logo', ruless:[] , placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon' ,label: '商户名称', name: 'name', ruless:[] , placeholder: '角商户名称色编码', typeIco: 'book'},
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.hangClick, labe: '代充值'},
    ];
    const ColumnDatas = {data: 
      [
        {title: '商户登录帐户', dataIndex: 'logo', key: 'logo'},
        {title: '商户名称', dataIndex: 'name', key: 'name'},
        {title: '商户地址', dataIndex: 'site', key: 'site'},
        {title: '联系人', dataIndex: 'linkman', key: 'linkman'},
        {title: '手机号', dataIndex: 'phone', key: 'phone'},
        {title: '固定电话', dataIndex: 'telephone', key: 'telephone'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
        {title: '创建时间', dataIndex: 'creatertime', key: 'creatertime'},
     ],
    dataEnd: {}
    };
    const datas =  [
      {key: '1', logo: 'John2', name: '322', site: 'New York No. 1 Lake Park', linkman: 'developer', phone: '11888', telephone: '88-88', statue: '正常', creatertime: '2018-01-01'}, 
      {key: '2', logo: 'John3', name: '321', site: 'New York No. 1 Lake Park', linkman: 'developer', phone: '11888', telephone: '88-88', statue: '正常', creatertime: '2018-01-01'}, 
      {key: '3', logo: 'John4', name: '323', site: 'New York No. 1 Lake Park', linkman: 'developer', phone: '11888', telephone: '88-88', statue: '正常', creatertime: '2018-01-01'}, 
    ];
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
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
          <Row>
            <Col>
              <div className={styles.addButton}>
                <HeadFootButton buttonData={buttonData} />
              </div>
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