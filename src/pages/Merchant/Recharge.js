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
import {MemberRecharges} from '@/components/Merchant';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {RechargeGetMerList} from '@/services/api';
import styles from './Recharge.less'

@connect()
class Recharge extends React.Component {
  constructor(props){
    super(props);
    const cureeMerchId = null;
    const formDatas = [
      {type: 'InputIcon' ,label: '商户登录帐户', name: 'userAccount', ruless:[] , placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon' ,label: '商户名称', name: 'merchantName', ruless:[] , placeholder: '商户名称', typeIco: 'book'},
    ];
    const buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.hangClick, labe: '代充值'},
    ];
    const tableData = {
      columns:[
        {title: '商户登录帐户', dataIndex: 'userAccount',},
        {title: '商户名称', dataIndex: 'merchantName', },
        {title: '商户地址', dataIndex: 'merchantAddr', },
        {title: '联系人', dataIndex: 'contactMan',},
        {title: '手机号', dataIndex: 'phoneNum', },
        {title: '固定电话', dataIndex: 'telNum', },
        {title: '状态', dataIndex: 'status', },
        {title: '创建时间', dataIndex: 'createTime', },
     ],
     data :[]
    };

    this.state = {
      formData: formDatas,
      buttonData,
      tableData,
      cureeMerchId
    }
  }
  
  componentWillMount () {
    this.geGetMerList();
  }


  geGetMerList = (params) => {
    RechargeGetMerList(params).then(res => {
      if(res.status === 200) {
        this.dataRinse(res.data);
      }
    })
  }

  hangClick = (e) => {
    e.preventDefault();
    const {cureeMerchId} = this.state;
    if(cureeMerchId){
      this.MemberRecharges.showModal(cureeMerchId);
    }else{
      alert('请选择数据信息')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.form.validateFields((err, values) => {
      if(!err){
        RechargeGetMerList(values).then(res => {
          if(res.status === 200){
            this.dataRinse(res.data);
          }
        })
      }
    })
  }

  onChangePage = (page, pageSize) => {
    console.log(page, pageSize);
  }

  hangelRowChange = (selectedRowKeys, selectedRows) => {
    const cureeMerchId = selectedRows[0].key
    this.setState({
      cureeMerchId
    })
  }

  dataRinse = (data) => {
    const {tableData} = this.state;
    tableData.data = [];
    for(let i = 0; i < data.length; i+=1){
      const mer = {};
      mer.key = data[i].accountId;
      mer.userAccount = data[i].userAccount;
      mer.merchantName = data[i].merchantName;
      mer.merchantAddr = data[i].merchantAddr;
      mer.contactMan = data[i].contactMan;
      mer.phoneNum = data[i].phoneNum;
      mer.telNum = data[i].telNum;
      mer.status = data[i].status===1 ? '正常' : '禁止';
      mer.createTime = data[i].createTime;
      tableData.data.push(mer);
    }
    this.setState({
      tableData
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, tableData, buttonData } = this.state;
    const rowSelection = {
      type: 'radio',
      onChange: this.hangelRowChange
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
          dataSource={tableData.data} 
          bordered
          rowSelection={rowSelection}
          pagination={{
            pageSize: 3,
            onChange: this.onChangePage
           }
          }
        />
        <MemberRecharges ref={c => {this.MemberRecharges = c}} />
      </PageHeaderWrapper>
    )
  }
}
const Recharges = Form.create({ name: 'list' })(Recharge);
export default Recharges;