import React from 'react';
import { 
    Modal,
    Row, 
    Col,
    Table
  } from 'antd';
import {getMerchantPlayApi, getMerchantAccApi} from '@/services/api';
import styles from './MerchantInfo.less';

class MerchantInfo extends React.Component{
    constructor(props) {
        super(props);
        const merchanLogo ={};
        const palyInfo = {};
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
        palyInfo.columns = [
          {title: '操作员登录账号',key: 'userAccount',dataIndex: 'userAccount',}, 
          {title: '操作员编号',key: 'userId',dataIndex: 'userId',}, 
          {title: '操作员名称',key: 'userName',dataIndex: 'userName',}, 
          {title: '创建时间	',key: 'createTime',dataIndex: 'createTime',}, 
          {title: '状态',key: 'state',dataIndex: 'state',}];
        palyInfo.data = []
        const info = [
          [
            {label: '商户编号:',value: ''},
            {label: '商户名称:',value: ''},
            {label: '状态:',value: ''}
          ],
          [
            {label: '联系人:',value: ''},
            {label: '创建时间:',value: ''},
            {label: '转让费率(%):',value: ''}
          ],
          [
            {label: '商户地址:',value: ''},
            {label: '手机号码:',value: ''},
            {label: '固定电话:',value: ''}
          ]
        ]
        this.state={
            visible: false,
            merchanLogo,
            info,
            palyInfo
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

    int = (merchantInfo) => {
      const {info, palyInfo, merchanLogo} = this.state;
      info[0][0].value = merchantInfo.key;
      info[0][1].value = merchantInfo.name;
      info[0][2].value = merchantInfo.state;
      info[1][0].value = merchantInfo.linkman;
      info[1][1].value = merchantInfo.creatertime;
      info[1][2].value = merchantInfo.remark;
      info[2][0].value = merchantInfo.site;
      info[2][1].value = merchantInfo.phone;
      info[2][2].value = merchantInfo.telephone;
      getMerchantPlayApi(merchantInfo.key).then((res) => {
        if(res.status === 200){
          for(let i = 0; i<res.data.length; i+=1){
            const paly = {};
            paly.userAccount =  res.data[i].userAccount;
            paly.userId =  res.data[i].userId;
            paly.userName =  res.data[i].userName;
            paly.createTime =  res.data[i].createTime;
            paly.state =  res.data[i].state === 1 ? '正常' : '禁止';
            palyInfo.data.push(paly);
          }
        }
       
        getMerchantAccApi( merchantInfo.key ).then(ress => {
          if(ress.status === 200){
            for(let j = 0; j<res.data.length; j+=1){
              const merchan = {};
              merchan.merchantId = ress.data[j].merchantId
              merchan.accountId = ress.data[j].accountId
              merchan.balance = ress.data[j].balance
              merchan.freezeBalance = ress.data[j].freezeBalance
              merchan.status = ress.data[j].status === 1 ? '正常' : '禁止';
              merchanLogo.data.push(merchan);
            }
          }
          this.setState({
            info,
            palyInfo,
            merchanLogo
          });
        })
      })
     
    }

    render () {
        const {visible, merchanLogo, info, palyInfo} = this.state;
        // console.log(palyInfo);
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
              <Row className={styles.row}>
                <Col span={2} className={styles.col}>{info[0][0].label}</Col>
                <Col span={5} className={styles.col}>{info[0][0].value}</Col>
                <Col span={4} className={styles.col}>{info[0][1].label}</Col>
                <Col span={5} className={styles.col}>{info[0][1].value}</Col>
                <Col span={4} className={styles.col}>{info[0][2].label}</Col>
                <Col span={4} className={styles.col}>{info[0][2].value}</Col>
              </Row>
              <Row className={styles.row}>
                <Col span={2} className={styles.col}>{info[1][0].label}</Col>
                <Col span={5} className={styles.col}>{info[1][0].value}</Col>
                <Col span={4} className={styles.col}>{info[1][1].label}</Col>
                <Col span={5} className={styles.col}>{info[1][1].value}</Col>
                <Col span={4} className={styles.col}>{info[1][2].label}</Col>
                <Col span={4} className={styles.col}>{info[1][2].value}</Col>
              </Row>
              <Row className={styles.row}>
                <Col span={2} className={styles.col}>{info[2][0].label}</Col>
                <Col span={5} className={styles.col}>{info[2][0].value}</Col>
                <Col span={4} className={styles.col}>{info[2][1].label}</Col>
                <Col span={5} className={styles.col}>{info[2][1].value}</Col>
                <Col span={4} className={styles.col}>{info[2][2].label}</Col>
                <Col span={4} className={styles.col}>{info[2][2].value}</Col>
              </Row>
              <Row>
                <Col>
                  商户操作员信息:
                  <Table pagination={false} columns={palyInfo.columns} dataSource={palyInfo.data} />
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