/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {addMerchantApi} from '@/services/api';

class MerchantAddOrUpdate extends React.Component {
  constructor(props) {
    super(props);
    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    this.state = {
      status: 'add',
      visible: false,
      formData: [
        {type: 'InputIcon' ,label: '商户登陆帐户', name: 'userName', ruless:[{required: true}] , placeholder: '商户登陆帐户', typeIco: 'user'},
        {type: 'InputIcon' ,label: '商户名称', name: 'merchantName', ruless:[{required: true}] , placeholder: '商户名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '联系人', name: 'contactMan', ruless:[{required: true}] , placeholder: '联系人', typeIco: 'team'},
        {type: 'InputIcon' ,label: '登陆密码', name: 'password', ruless:[{required: true}] , placeholder: '登陆密码', typeIco: 'team'},
        {type: 'InputIcon' ,label: '手机号码', name: 'phoneNum', ruless:[{required: true}] , placeholder: '手机号码', typeIco: 'phone'},
        {type: 'InputIcon' ,label: '固定电话', name: 'telNum', ruless:[{required: true}] , placeholder: '固定电话', typeIco: 'pushpin'},
        {type: 'InputIcon' ,label: '地址', name: 'merchantAddr', ruless:[{required: true}] , placeholder: '地址', typeIco: 'inbox'},
        {type: 'InputIcon' ,label: '转让费率', name: 'transferRate', ruless:[{required: true}] , placeholder: '转让服务费', typeIco: 'inbox'},
       // {type: 'SelectCompone', label: '状态：', name: 'state', options: option}
      ]
    };
  }

  init = (userInfo) => {
    return typeof(userInfo.id) === 'undefined' ? this.setState({status: 'add'}) : this.setState({status: 'update'});
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
 }

  onClose = () => {
      this.setState({
        visible: false,
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.AddInfo.validateFields((err, values) => {
      if (!err){
        const formData = new FormData();
        formData.append("merchantName", values.merchantName);
        formData.append("merchantAddr", values.merchantAddr);
        formData.append("contactMan", values.contactMan);
        formData.append("phoneNum", values.phoneNum);
        formData.append("telNum", values.telNum);
        formData.append("password", values.password);
        formData.append("userName", values.userName);
        formData.append("transferRate", values.transferRate);
        // formData.append("authority", payload.authority);
        formData.append("userAccount", values.userAccount);
        addMerchantApi(formData).then(res => {
         if(res.result === 'success'){
          message.info('添加商户成功');
          this.onClose();
         }
       })
      }
    });
  }

  render() {
    const {formData, visible} = this.state;
    return (
      <div>
        <Modal
          title='添加商户'
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

export default MerchantAddOrUpdate;

