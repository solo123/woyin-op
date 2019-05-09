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

  rend = (tags)=> (<h4 style={{fontWeight: 'bold'}}>{tags}</h4>)
  
  render() {
    const {visible, data} = this.state;
    const columns = [
      {title: '标签1',dataIndex: 'label1', render: this.rend}, 
      {title: '数值1',dataIndex: 'value1'}, 
      {title: '标签2',dataIndex: 'label2', render: this.rend}, 
      {title: '数值2',dataIndex: 'value2'}
    ];
    const data1 = [
      {key: '1', label1: '状态', value1: '已完成', label2: '业务：', value2: data.title},
      {key: '2', label1: '应付金额：', value1: data.amount, label2: '支付后金额：', value2: data.afterAmount},
      {key: '3', label1: '创建时间', value1: data.createdAt, label2: '支付前金额：', value2: data.beforeAmount},
      {key: '4', label1: '用户名：', value1: data.Name, label2: '业务订单号：', value2: data.balanceId},
      // {key: '5', label1: '所属商户：', value1: data.Merchant.merchantName, label2: '业务订单号：', value2: data.balanceId},
      {key: '5', label1: '支付方式：', value1: data.docType, label2: '支付流水号：', value2: data.balanceId}
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