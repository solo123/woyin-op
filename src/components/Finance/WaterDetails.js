/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    Row,
    Col,
  } from 'antd';
import {GetVouchersDetails} from '@/services/api';
import styles from './WaterDetails.less'

class MemberProducZ extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        visible: false,
        // prodInfo,
        params: {
            value:0.00,
        },
        data:{
            Voucher:{},
            Merchant: {}
        }
    }
  }

  onChange = value => {
    const {params} = this.state;
    this.setState({
        params: {
            ...params,
            discount: value
        }
    })
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

  handleSubmit = () =>{
    const {params,statue} = this.state;
    const param = {
        ...params,
        discount: params.discount.toString()
    }
  }
  
  render() {
    const {visible, data} = this.state;
  
    return (
      <Modal
        title='流水详情'
        transparent
        style={{ top: 100 }}
        width={1000}
        maskClosable={false}
        visible={visible}
        onCancel={this.onClose}
        onOk={this.handleSubmit}
      >
        <Row>
          <Col className="gutter-row" span={2}>
            <div className="gutter-box">状态</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">已完成</div>
          </Col>
          <Col className="gutter-row" span={2}>
            <div className="gutter-box">业务：</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">{data.Voucher.DocType}</div>
          </Col>
          <Col className="gutter-row" span={2}>
            <div className="gutter-box">应付金额：</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">{data.Voucher.Amount}</div>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row" span={2}>
            <div className="gutter-box">实际金额：</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">{data.Voucher.BlockAmount}</div>
          </Col>
          <Col className="gutter-row" span={2}>
            <div className="gutter-box">支付时间：</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">{data.Voucher.CreateTime}</div>
          </Col>
        </Row>

        <div className={styles.rowBorder}>
          <Row>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">帐户ID：</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">{data.Voucher.AccountId}</div>
            </Col>
            <Col className="gutter-row" span={2}>
              <div className="gutter-box">用户名：</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">{data.Merchant.merchantName}</div>
            </Col> 
            <Col className="gutter-row" span={2}>
              <div className="gutter-box">手机号：</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">{data.Merchant.phoneNum}</div>
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">所属商户：</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">{data.Merchant.merchantName}</div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">业务订单号：</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">{data.Voucher.DocId}</div>
            </Col>
          </Row>
        </div>
        <div className={styles.playBorder}>
          <Row>
            <Col className="gutter-row" span={4}>
              <div className="gutter-box">支付信息</div>
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">支付方式：{data.Voucher.DocType}</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">支付流水号：{data.Voucher.DocId}</div>
            </Col>
          </Row>
        </div>
      </Modal>
    )
  }
}

export default MemberProducZ;