/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {isNumber} from '@/utils/validate'
import {RechargMerchantRecharges, MerchantAccountsWall} from '@/services/api'

class MerchantWall extends React.Component {
  constructor(props) {
    super(props);
    const option = [
        {value: '1',label: '冻结'}, 
        {value: '2',label: '解结'}
    ];
    this.state = {
      mercharId: null,
      visible: false,
      formData: [
        {type: 'LabelInput' ,label: '商户ID', name: 'merchantId', value: '1111', ruless:[] , placeholder: '1234', typeIco: 'user'},
        // {type: 'LabelInput' ,label: '帐户类型', name: 'currency', value: '1111', ruless:[] , placeholder: '1234', typeIco: 'user'},
        {type: 'LabelInput' ,label: '总积分', name: 'Amount', value: '1111', ruless:[] , placeholder: '1234', typeIco: 'user'},
        {type: 'InputIcon' ,label: '申请操作积分', name: 'balance', ruless:[{required: true, message: '请输入你的积分',pattern:isNumber}] , placeholder: '输入充值积分', typeIco: 'user'},
        {type: 'SelectCompone', label: '冻结/解冻：', name: 'operate',ruless:[{required: true, message: '请选择',pattern:isNumber}], options: option}  
      ]
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {account} = this.state;
    const params = new FormData();
    this.AddInfo.validateFields((err, values) => {
    if (!err){
        const freeze = values.operate===1 ? true : false;
        params.append('currency', account.Currency);
        params.append('amount', values.balance);
        params.append('freeze',freeze );
        MerchantAccountsWall( params, account.MerchantId).then(res => {
            message.info(res.msg);
        })
     }
    });
    // this.AddInfo.validateFields((err, values) => {
    //   if (!err){
    //     const formData = new FormData();
    //     formData.append("merchantId", mercharId);
    //     formData.append("balance", values.balance);
    //     RechargMerchantRecharges(formData).then(res => {
    //         if(res.status === 200){
    //             message.info('充值成功');
    //         }else{
    //             message.info(res.msg);
    //         }
    //         this.onClose();
    //     })
    //   }
    // });
  }

  showModal = (account) => {
    const {formData} = this.state;
    formData[0].placeholder = account.MerchantId;
    formData[1].placeholder = account.Amount;
    // console.log(account);
    this.setState({
      visible: true,
      account
     // mercharId,
     // formData
    });
  }

  onClose = () => {
        this.setState({
        visible: false,
        });
    }

  render() {
    const {formData, visible} = this.state;
    
    return (
      <div>
        <Modal
          title='商户钱包'
          transparent
          style={{ top: 100 }}
          maskClosable={false}
          visible={visible}
          onCancel={this.onClose}
          onOk={this.handleSubmit}
        >
          <AddInfo ref={(c) => {this.AddInfo = c ;}} data={formData} handleSubmit={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

export default MerchantWall;

