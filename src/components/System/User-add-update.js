import { formatMessage } from 'umi/locale';
import React from 'react';
import { 
    Modal,
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';

class UserAddUpdate extends React.Component {
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
      formData: [
        {type: 'InputIcon' ,label: '登录帐号', name: 'logo', ruless:[] , placeholder: '登录帐号', typeIco: 'user'},
        {type: 'InputIcon' ,label: '用户密码', name: 'password', ruless:[] , placeholder: '用户密码', typeIco: 'user'},
        {type: 'InputIcon' ,label: '用户名称', name: 'logoname', ruless:[] , placeholder: '用户名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '描述信息', name: 'describe', ruless:[] , placeholder: '描述信息', typeIco: 'user'},
        {type: 'SelectCompone', label: '状态：', name: 'statue', options: option}
        ]
    };
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
    this.AddInfo.validateFields((err, values) => {
      console.log(values);
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
          style={{ top: 300 }}
          maskClosable={false}
          visible={visible}
          onCancel={this.onClose}
          onOk={this.handleSubmit}
        >
          <AddInfo ref={ (c) => {this.AddInfo = c ;}} data={formData} handleSubmit={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

export default UserAddUpdate;

