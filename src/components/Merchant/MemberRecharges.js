/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {isNumber} from '@/utils/validate'
import {RechargMerchantRecharges} from '@/services/api'


class MemberRecharges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mercharId: null,
      visible: false,
      formData: [
        {type: 'LabelInput' ,label: '商户名称', name: 'merchantId', value: '1111', ruless:[] , placeholder: '1234', typeIco: 'user'},
        {type: 'InputIcon' ,label: '申请充值积分', name: 'balance', ruless:[{required: true, message: '请输入你要充值的积分',pattern:isNumber}] , placeholder: '输入充值积分', typeIco: 'user'},
      ]
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {mercharId} = this.state;
    this.AddInfo.validateFields((err, values) => {
      if (!err){
        const formData = new FormData();
        formData.append("merchantId", mercharId);
        formData.append("balance", values.balance);
        RechargMerchantRecharges(formData).then(res => {
            if(res.status === 200){
                message.info('充值成功');
            }else{
                message.info(res.msg);
            }
            this.onClose();
        })
      }
    });
  }

  
  showModal = (mercharId) => {
    const {formData} = this.state;
    formData[0].placeholder = mercharId;
    this.setState({
      visible: true,
      mercharId,
      formData
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
          title='代商户充值'
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

export default MemberRecharges;

