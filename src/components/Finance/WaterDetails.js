/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    Row,
    Col,
    InputNumber,
    message,
    Table
  } from 'antd';
import {MemberProductZAddApi, MemberProductZEdit} from '@/services/api';
import styles from './WaterDetails.less'

class MemberProducZ extends React.Component {

  constructor(props) {
    super(props);
    const prodInfo = [
        {label: '产品名称', value: '老白干'},
        {label: '价值', value: '30'},
        {label: '进货价', value: '1000'},
        {label: '销售价', value: '1200'},
        {label: '产品类型', value: '话费'},
        {label: '运营商', value:'中国移动'},
        {label: '产品状态', value: '可用'},
        {label: '是否支持退款', value:'支持'},
        {label: '产品编号', value:'333333'}
    ];
    this.state = {
        visible: false,
        // prodInfo,
        params: {
            value:0.00,
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

  showModal = (params, merchantId) => {

    this.setState({
        visible: true,
      });
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
    const {visible} = this.state;
  
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
          <Col className="gutter-row" span={4}>
            <div className="gutter-box">已完成</div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div className="gutter-box">业务：充话费</div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div className="gutter-box">应付金额：10600</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">实际金额：100</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">支付时间：1000</div>
          </Col>
        </Row>
        <div className={styles.rowBorder}>
          <Row>
            <Col className="gutter-row" span={4}>
              <div className="gutter-box">帐户ID</div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="gutter-box">用户名：</div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="gutter-box">手机号：</div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="gutter-box">所属商户：</div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="gutter-box">业务订单号：</div>
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
            <Col className="gutter-row" span={4}>
              <div className="gutter-box">支付方式</div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div className="gutter-box">支付流水号</div>
            </Col>
          </Row>
        </div>
      </Modal>
    )
  }
}

export default MemberProducZ;