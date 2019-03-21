import { formatMessage } from 'umi/locale';
import React from 'react';
import { 
    Modal,
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';

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
      visible: false,
      status: 'add',
      formData: [
        {type: 'InputIcon' ,label: '商户名称', name: 'name', ruless:[] , placeholder: '商户名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '联系人', name: 'linkaman', ruless:[] , placeholder: '联系人', typeIco: 'team'},
        {type: 'InputIcon' ,label: '手机号码', name: 'phone', ruless:[] , placeholder: '手机号码', typeIco: 'phone'},
        {type: 'InputIcon' ,label: '固定电话', name: 'fixedPhone', ruless:[] , placeholder: '固定电话', typeIco: 'pushpin'},
        {type: 'InputIcon' ,label: '地址', name: 'address', ruless:[] , placeholder: '地址', typeIco: 'inbox'},
        {type: 'SelectCompone', label: '状态：', name: 'statue', options: option}
      ]
    };
  }

  init = (userInfo) => {
    return typeof(userInfo.id) === 'undefined' ? this.setState({status: 'add'}) : this.setState({status: 'update'});
  }

  showModal = e => {
    e.preventDefault();
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
    const {status} = this.state;
    this.AddInfo.validateFields((err, values) => {
      if (!err){
        if (status === 'add'){
            console.log(values);
        }else if (status === 'update') {
            console.log(values);
        }
      }
    });
    this.setState({
      visible: false,
    });
  }

  render() {
    const {visible, formData} = this.state;
    
    return (
      <div>
        <Modal
          title={`${formatMessage({ id : 'system.role-add-role'})}`}
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

