import { formatMessage } from 'umi/locale';
import React from 'react';
import { 
    Modal,
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';

class UserAddOrUpdate extends React.Component {
  constructor(props) {
    super(props);
    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    const groupOp = [
      {value: '1', label: '管理员'},
      {value: '2', label: '销售'},
      {value: '3', label: '财务'},
    ]
    this.state = {
      visible: false,
      formData: [
        {type: 'InputIcon' ,label: '帐号', name: 'logo', ruless:[{required: true}] , placeholder: '登录帐号', typeIco: 'user'},
        {type: 'InputIcon' ,label: '密码', name: 'password', ruless:[{required: true}] , placeholder: '用户密码', typeIco: 'user'},
        {type: 'InputIcon' ,label: '确认密码', name: 'logoname', ruless:[{required: true}] , placeholder: '用户名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '姓名', name: 'describe', ruless:[{required: true}] , placeholder: '描述信息', typeIco: 'user'},
        {type: 'InputIcon' ,label: '电话', name: 'describe', ruless:[{required: true}] , placeholder: '描述信息', typeIco: 'user'},
        {type: 'InputIcon' ,label: '邮箱', name: 'describe', ruless:[{required: true}] , placeholder: '描述信息', typeIco: 'user'},
        {type: 'CheckboxComponents', label: '角色组：', name: 'statue', options: groupOp},
        {type: 'RadioGroupComponent', label: '状态：', name: 'statue', value: option}
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
          style={{ top: 100 }}
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

export default UserAddOrUpdate;

