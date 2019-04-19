/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    Row,
    Col,
    Table
  } from 'antd';
import {GetVouchersDetails} from '@/services/api';
import styles from './WaterDetails.less'

class MemberProducZ extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        visible: false,
        // prodInfo,
        data:{
            Voucher:{},
            Merchant: {}
        }
    }
  }

  showModal = (id) => {
    this.setState({
        visible: true,
      });
    GetVouchersDetails(id).then(res => {
        this.setState({
            data: res.data
        })
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const {visible, data} = this.state;
    const columns = [
      {title: '标签1',dataIndex: 'label1'}, 
      {title: '数值1',dataIndex: 'value1'}, 
      {title: '标签2',dataIndex: 'label2'}, 
      {title: '数值2',dataIndex: 'value2'}
    ];
    const data1 = [
      {key: '1', label1: '状态', value1: '已完成', label2: '业务：', value2: data.Voucher.DocType},
      {key: '2', label1: '应付金额：', value1: data.Voucher.Amount, label2: '实际金额：', value2: data.Voucher.BlockAmount},
      {key: '3', label1: '支付时间：', value1: data.Voucher.CreateTime, label2: '帐户ID：', value2: data.Voucher.AccountId},
      {key: '4', label1: '用户名：', value1: data.Voucher.AccountId, label2: '手机号：', value2: data.Merchant.phoneNum},
      {key: '5', label1: '所属商户：', value1: data.Merchant.merchantName, label2: '业务订单号：', value2: data.Voucher.DocId},
      {key: '6', label1: '支付方式：', value1: data.Voucher.DocType, label2: '支付流水号：', value2: data.Voucher.DocId}
    ];
    return (
      <Modal
        title='流水详情'
        transparent
        style={{ top: 100 }}
        width={1000}
        maskClosable={false}
        visible={visible}
        onCancel={this.onClose}
        onOk={this.onClose}
      >
        <Table
          columns={columns}
          dataSource={data1}
          pagination={false}
          bordered
          showHeader={false}
        //   title={() => '流水详情'}
        />,
      </Modal>
    )
  }
}

export default MemberProducZ;