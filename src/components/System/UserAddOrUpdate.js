import { formatMessage } from 'umi/locale';
import React from 'react';
import { 
    Modal,
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {GetRoleList, AddUserByRole} from '@/services/api';

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
      // {type: 'SelectCompone', style:{width: '198px'}, label: '角色', name: 'rol', options: option},
      formData: [
        {type: 'InputIcon' ,label: '帐号', name: 'userAccount', ruless:[{required: true}] , placeholder: '登录帐号', typeIco: 'user'},
        {type: 'InputIcon' ,label: '密码', name: 'password', ruless:[{required: true}] , placeholder: '用户密码', typeIco: 'user'},
        // {type: 'InputIcon' ,label: '确认密码', name: 'password', ruless:[{required: true}] , placeholder: '用户名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '姓名', name: 'userName', ruless:[{required: true}] , placeholder: '描述信息', typeIco: 'user'},
        {type: 'InputIcon' ,label: '电话', name: 'phoneNum', ruless:[{required: true}] , placeholder: '描述信息', typeIco: 'user'},
        {type: 'InputIcon' ,label: '邮箱', name: 'email', ruless:[{required: true}] , placeholder: '描述信息', typeIco: 'user'},
        {type: 'SelectCompone',  style:{width: '198px'}, label: '角色', name: 'roleId', options: groupOp},
        {type: 'RadioGroupComponent', label: '状态：', name: 'state', value: option}
        ]
    };
  }

  showModal = e => {
    e.preventDefault();
    this.GetRoleList();
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
      AddUserByRole(values).then(res => {
        console.log(res);
      })
    });
    this.setState({
      visible: false,
    });
  }

  GetRoleList = () =>{
    const {formData} = this.state;
    const param = {
      page_size: 100,
    }
    const groupOp = [];
    GetRoleList(param).then(res=>{
        if(res.status === 200 && res.data){
          
          for(let i = 0; i <  res.data.length; i+=1){
            const temp = {value: res.data[i].RoleId, label: res.data[i].RoleName};
            groupOp.push(temp);
          }
          formData[6].options = groupOp;
        }
        this.setState({formData});
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

