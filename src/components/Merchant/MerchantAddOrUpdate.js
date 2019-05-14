/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {addMerchantApi} from '@/services/api';


const formDataAdd = [
        {type: 'InputIcon' ,label: '商户名称', name: 'merchantName', ruless:[{required: true}] , placeholder: '商户名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '地址', name: 'merchantAddr', ruless:[{required: true}] , placeholder: '地址', typeIco: 'inbox'},
        {type: 'InputIcon' ,label: '联系人', name: 'contact', ruless:[{required: true}] , placeholder: '联系人', typeIco: 'team'},
        {type: 'InputIcon' ,label: '手机号码', name: 'mobile', ruless:[{required: true}] , placeholder: '手机号码', typeIco: 'phone'},
        {type: 'InputIcon' ,label: '固定电话', name: 'tel', ruless:[{required: true}] , placeholder: '固定电话', typeIco: 'pushpin'},
        {type: 'InputIcon' ,label: '登录账号', name: 'userAccount', ruless:[{required: true}] , placeholder: '登录账号', typeIco: 'user'},
        {type: 'InputIcon' ,label: '登录账号用户名', name: 'userName', ruless:[{required: true}] , placeholder: '登录账号用户名', typeIco: 'user'},
        {type: 'InputIcon' ,label: '登陆密码', name: 'password', ruless:[{required: true}] , placeholder: '登陆密码', typeIco: 'team'},
    ]
const formDataUpdate = [
      {type: 'InputIcon' ,label: '商户名称', name: 'merchantName', ruless:[{required: true}] , placeholder: '商户名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '地址', name: 'merchantAddr', ruless:[{required: true}] , placeholder: '地址', typeIco: 'inbox'},
      {type: 'InputIcon' ,label: '联系人', name: 'contact', ruless:[{required: true}] , placeholder: '联系人', typeIco: 'team'},
      {type: 'InputIcon' ,label: '手机号码', name: 'mobile', ruless:[{required: true}] , placeholder: '手机号码', typeIco: 'phone'},
      {type: 'InputIcon' ,label: '固定电话', name: 'tel', ruless:[{required: true}] , placeholder: '固定电话', typeIco: 'pushpin'},
  ]
class MerchantAddOrUpdate extends React.Component {
  constructor(props) {
    super(props);
    const option = [
      {value: '1',label: '可用'}, 
      {value: '2',label: '冻结'}
    ];
    this.state = {
      status: 'add',
      visible: false,
      formData: []
    };
  }

  componentDidMount(){

  }

  init = (userInfo) => {
    return typeof(userInfo.id) === 'undefined' ? this.setState({status: 'add'}) : this.setState({status: 'update'});
  }

  updateData = (data) => {
    const formDatas = formDataUpdate;
    this.setState({formData: formDatas});
    this.setState({status: 'update'})
    if(!this.AddInfo){
      formDatas[0].initialValue = data.MerchantName;
      formDatas[1].initialValue = data.MerchantAddr;
      formDatas[2].initialValue = data.Contact;
      formDatas[3].initialValue = data.Mobile;
      formDatas[4].initialValue = data.Tel;
      this.setState({formData: formDataUpdate})


    }else{

      this.AddInfo.setFieldsValue(
        {merchantName: data.MerchantName, 
        merchantAddr: data.MerchantAddr,
        contact: data.Contact,
        mobile: data.Mobile,
        tel:  data.Tel
      }
      );

    }
    this.showModal();
  }

  addData = () => {
    const formDatas = formDataAdd;
    this.setState({formData: formDatas})
    this.showModal();
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

  hangUpdateInfo = () => {
    this.onClose();
  }

  hangAddInfo = ()=>{
    this.AddInfo.validateFields((err, values) => {
      if (!err){
        const formData = new FormData();
        formData.append("merchantName", values.merchantName);
        formData.append("merchantAddr", values.merchantAddr);
        formData.append("contact", values.contact);
        formData.append("mobile", values.mobile);
        formData.append("tel", values.tel);
        formData.append("password", values.password);
        formData.append("userName", values.userName);
        formData.append("userAccount", values.userAccount);
        addMerchantApi(formData).then(res => {
         if(res.status === 200){
          message.info('添加商户成功');
          this.onClose();
         }else{
          message.info('添加商户失败，可能是登录账户重复！！');
         }
       })
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {status} = this.state;
    if(status === 'update'){
      this.hangUpdateInfo();
    }else{
      this.hangAddInfo();
    }
  }

  render() {
    const {formData, visible, childRang} = this.state;
    return (
      <div>
        <Modal
          title='添加商户'
          width={500}
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

