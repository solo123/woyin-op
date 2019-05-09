import React from 'react';
import { connect } from 'dva';
import { 
    Row, 
    Col,
    Table,
    Card
  } from 'antd';
import {
    MerchantAddOrUpdate, 
    MemberApplayInter,
    MemberApplayData} from '@/components/Merchant';
import {routerRedux} from 'dva/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import LocalStr from '@/utils/LocalStr';
import {getMerchantPlayApi, getMerchantAccApi} from '@/services/api';
import {HeadFootButton} from '@/components/HeadForm';
import {statuesRend} from '@/utils/renderUtils';
import styles from './MerchantInfo.less';

@connect()
class MerchantInfo extends React.Component{
  constructor(props) {
    super(props);
    const merchanLogo ={};
    const palyInfo = {};
    const STATUSITEMS = [
      {key: 0, describe: ['green', '正常']},
      {key: 1, describe: ['red', '错误']}
    ]
    merchanLogo.columns = [
      {title: '账户编号',key: 'BalanceId',dataIndex:'BalanceId' }, 
      {title: '对象编号',key: 'merchantId',dataIndex: 'MerchantId' }, 
      {title: '对象类型',key: 'Status',dataIndex: 'Status'}, 
      {title: '账户积分',key: 'Amount',dataIndex: 'Amount'}, 
      {title: '可用积分',key: 'BlockAmount',dataIndex: 'BlockAmount'}, 
      // {title: '冻结积分',key: 'freezeBalance',dataIndex: 'freezeBalance'}, 
      {title: '状态',key: '',render: Status => (statuesRend(Status, STATUSITEMS))}
    ];
    const buttonData = [
      // {type: 'primary', hangClick: this.handAdd, labe: '添加'},
      // {type: 'primary', hangClick: this.onHangApplayInter, labe: '会员发分审核'},
      {type: 'primary', hangClick: this.onHangGoPround, labe: '产品折扣管理'},
      {type: 'primary', hangClick: this.onHangRateMang, labe: '费率管理'},
    ];
    merchanLogo.data = [];
    palyInfo.columns = [
      {title: '操作员登录账号',key: 'MerchantAccount',dataIndex: 'MerchantAccount',}, 
      {title: '操作员编号',key: 'UserId',dataIndex: 'UserId',}, 
      {title: '操作员名称',key: 'UserName',dataIndex: 'UserName',}, 
      {title: '创建时间	',key: 'CreatedAt',dataIndex: 'CreatedAt',}, 
      {title: '状态',key: 'state',dataIndex: 'state',render: statue => (statuesRend(statue, STATUSITEMS))}
    ];
    palyInfo.data = []
    const info = [
      [
        {label: '商户编号:',value: ''},
        {label: '商户名称:',value: ''},
        {label: '状态:',value: ''}],
      [
        {label: '联系人:',value: ''},
        {label: '创建时间:',value: ''},
        {label: '转让费率(%):',value: ''}],
      [
        {label: '商户地址:',value: ''},
        {label: '手机号码:',value: ''},
        {label: '固定电话:',value: ''}
      ]
      ]
      this.state={
        merchanLogo,
        info,
        palyInfo,
        buttonData
      }
    }

    componentDidMount(){
      this.int();
    }

    onHangApplayInter = () => {
      const MeInfo = JSON.parse(LocalStr.get("merchantInfo"));
      this.MemberApplayInter.int(MeInfo); 
      this.MemberApplayInter.showModal();
    }

    onHangGoPround = () =>{
      const MeInfo = JSON.parse(LocalStr.get("merchantInfo"));
      LocalStr.set("merchantId",  MeInfo.key);
      this.props.dispatch(routerRedux.push({
        pathname: '/merchant/memberproduct',
      }));
    }

    onHangRateMang = () => {

    }

    int = () => {
      const MeInfo = JSON.parse(LocalStr.get("merchantInfo"));
      const {info, palyInfo, merchanLogo} = this.state;
  
      info[0][0].value = MeInfo.key;
      info[0][1].value = MeInfo.MerchantName;
      info[0][2].value = MeInfo.statue === 1 ? '可用':'冻结';
      info[1][0].value = MeInfo.Contact;
      info[1][1].value = MeInfo.CreatedAt;
      info[1][2].value = MeInfo.find;
      info[2][0].value = MeInfo.MerchantAddr;
      info[2][1].value = MeInfo.Mobile;
      info[2][2].value = MeInfo.Tel;
      getMerchantPlayApi({merchantId: MeInfo.key}).then((res) => {
        if(res.status === 200){
          for(let i = 0; i<res.data.data.length; i+=1){
            const paly = {};
            paly.key =  res.data.data[i].UserId;
            paly.MerchantId =  res.data.data[i].MerchantId;
            paly.UserId =  res.data.data[i].UserId;
            paly.UserName =  res.data.data[i].UserName;
            paly.CreatedAt =  res.data.data[i].CreatedAt;
            paly.Status =  res.data.data[i].Status;
            palyInfo.data.push(paly);
           
            this.setState({
              info,
              palyInfo,
            });
          }
        }
      })

      getMerchantAccApi({merchantId: MeInfo.key} ).then(ress => {
        if(ress.status === 200){
          merchanLogo.data = [];
          for(let j = 0; j<ress.data.length; j+=1){
            const merchan = {};
            merchan.key = ress.data[j].MerchantId;
            merchan.MerchantId = MeInfo.key;
            merchan.BalanceId = ress.data[j].BalanceId;
            merchan.Amount = ress.data[j].Amount;
            merchan.userBalance = parseInt(ress.data[j].Amount, 10) - parseInt(ress.data[j].BlockAmount, 10);
            merchan.BlockAmount = ress.data[j].BlockAmount;
            merchan.Status = ress.data[j].Status;
            merchanLogo.data.push(merchan);
          }
        }
        this.setState({
        //  info,
          merchanLogo
        });
      })
    }

    render () {
        const {merchanLogo, info, palyInfo, buttonData} = this.state;

        return (
          <PageHeaderWrapper>
            <Card bordered>
              <Row>
                <Col>
                  <div className={styles.addButton}>
                    <HeadFootButton buttonData={buttonData} />
                  </div>
                </Col>
              </Row>
            </Card>
            <div style={{background: '#fff'}}>
              <Row><Col className={styles.title}> 商户个人信息：</Col></Row>
              {
              info.map((item) =>(
                <Row className={styles.row} key={item[0].label}>
                  <Col span={2} className={styles.col}>{item[0].label}</Col>
                  <Col span={5} className={styles.col}>{item[0].value}</Col>
                  <Col span={4} className={styles.col}>{item[1].label}</Col>
                  <Col span={5} className={styles.col}>{item[1].value}</Col>
                  <Col span={4} className={styles.col}>{item[2].label}</Col>
                  <Col span={4} className={styles.col}>{item[2].value}</Col>
                </Row>
                ))
              }
              <Row>
                <Col style={{padding: '10px'}}>商户操作员信息:
                  <Table 
                    pagination={false} 
                    columns={palyInfo.columns} 
                    dataSource={palyInfo.data}
                    scroll={{ y: 300 }}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{padding: '10px'}}>商户帐户信息：
                  <Table 
                    columns={merchanLogo.columns} 
                    dataSource={merchanLogo.data} 
                  />
                </Col>
              </Row>
            </div>
            <MemberApplayInter ref={c => {this.MemberApplayInter = c}} />
          </PageHeaderWrapper>
      )
    }
}

export default MerchantInfo