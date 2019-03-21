import React from 'react';
import { 
    Modal,
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo'

class ParameterAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            formData: [
              {type: 'InputIcon' ,label: '参数名', name: 'name', ruless:[] , 参数名: '登录帐号', typeIco: 'user'},
              {type: 'InputIcon' ,label: '参数说明', name: 'describe', ruless:[] , placeholder: '参数说明', typeIco: 'user'},
              {type: 'InputIcon' ,label: '私有参数编号', name: 'code', ruless:[] , placeholder: '私有参数编号', typeIco: 'user'},
              {type: 'InputIcon' ,label: '参数值', name: 'value', ruless:[] , placeholder: '参数值', typeIco: 'user'},
             
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

    handleSubmit = e => {
        this.AddInfo.validateFields((err, values) => {
            console.log(values);
        });
    }

    render () {
        const {visible, formData} = this.state;
        
        return (
          <Modal
            title='添加参数'
            transparent
            style={{ top: 300 }}
            maskClosable={false}
            visible={visible}
            onCancel={this.onClose}
            onOk={this.handleSubmit}
          >
            <AddInfo ref={(c) => {this.AddInfo = c ;}} data={formData} />
          </Modal>
        )
    }
}

export default ParameterAdd;