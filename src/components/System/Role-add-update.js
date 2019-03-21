import { formatMessage } from 'umi/locale';
import React from 'react';
import { 
    Modal
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';

class RoleAddOrUpdate extends React.Component {
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
        {type: 'InputIcon' ,label: '角色名称', name: 'logo', ruless:[] , placeholder: '角色名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '角色编码', name: 'password', ruless:[] , placeholder: '角色编码', typeIco: 'user'},
        {type: 'InputIcon' ,label: '角色描述', name: 'logoname', ruless:[] , placeholder: '角色描述', typeIco: 'user'},
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

  handleOk = e => {
    this.AddInfo.validateFields((err, values) => {
      console.log(values);
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
          onOk={this.handleOk}
        >
          <AddInfo ref={(c) => { this.AddInfo = c; }} data={formData} />
        </Modal>
      </div>
    );
  }
}

export default RoleAddOrUpdate;

