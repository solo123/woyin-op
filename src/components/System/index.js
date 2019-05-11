import React from 'react';
import { 
    Modal,
  } from 'antd';
import RoleAddOrUpdate from './Role-add-update';
import RoleUser from './Role-user';
import RoleAdds from './RoleAdd';

class System extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onClose = () => {

  }

  handleOk = () => {

  }

  render() {
    const {visible} = this.state;

    return (
      <div>
        <Modal
          title='系统管理'
          transparent
          style={{ top: 300 }}
          maskClosable={false}
          visible={visible}
          onCancel={this.onClose}
          onOk={this.handleOk}
        />
      </div>
    );
  }
}

export {
  RoleAdds,
  System,
  RoleAddOrUpdate,
  RoleUser
}
   

