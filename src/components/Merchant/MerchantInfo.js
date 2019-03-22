import React from 'react';
import { 
    Modal,
    Row, 
    Col,
    Table,
    Divider
  } from 'antd';

import styles from './MerchantInfo.less';

class MerchantInfo extends React.Component{
    constructor(props) {
        super(props);
        const merchanLogo ={};
        merchanLogo.columns = [
            {title: '账户编号',key: 'name',}, 
            {title: '对象编号',key: 'age',}, 
            {title: '对象类型',key: 'address',}, 
            {title: '账户积分',key: 'tags',}, 
            {title: '可用积分',key: 'action',}, 
            {title: '冻结积分',key: '',}, 
            {title: '账户类型',key: '',}, 
            {title: '状态',key: '',}];
        merchanLogo.data = []
        this.state={
            visible: true,
            merchanLogo
        }
    }

    showModal = () => {
        // e.preventDefault();
        this.setState({
          visible: true,
        });
      }

    onClose = () => {
        this.setState({
          visible: false,
        });
    }


    render () {
        const {visible,merchanLogo} = this.state;

        return (
          <Modal
            title='商户详情'
            transparent
            width={1000}
            style={{ top: 100}}
            maskClosable={false}
            visible={visible}
            onCancel={this.onClose}
            onOk={this.handleSubmit}
          >
            <div>
              <Row><Col> 商户个人信息：</Col></Row>
              <Row>
                <Col span={8} className={styles.col} style={{border: '1px silid #999'}}>商户编号:2018112110252996201</Col>
                <Col span={8}>商户名称:xxxxxx</Col>
                <Col span={8}>状态:正常</Col>
              </Row>
              <Row>
                <Col span={8} style={{border: '1px silid #999'}}>联系人:2018112110252996201</Col>
                <Col span={8}>创建时间:xxxxxx</Col>
                <Col span={8}>转让费率(%):正常</Col>
              </Row>
              <Row>
                <Col span={8} style={{border: '1px silid #999'}}>商户地址:2018112110252996201</Col>
                <Col span={8}>手机号码:xxxxxx</Col>
                <Col span={8}>固定电话:正常</Col>
              </Row>
              <Row>
                <Col>
                  商户操作员信息:
                  <Table columns={merchanLogo.columns} dataSource={merchanLogo.data} />
                </Col>
              </Row>
              <Row>
                <Col>
                  商户帐户信息：
                  <Table columns={merchanLogo.columns} dataSource={merchanLogo.data} />
                </Col>
              </Row>
            </div>
          </Modal>

    )
    }
}

export default MerchantInfo