import { WhiteSpace, WingBlank } from 'antd-mobile';
import { formatMessage, FormattedMessage } from 'umi/locale';
import React from 'react';
import { 
    Modal,
    Input,
    Form, 
    Select
  } from 'antd';

const { Option} = Select;

class RoleAddOrUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formData: [
          {label: 'system.role-name', name: 'name', placeholder: 'system.role-name-pl', value: ''},
          {label: 'system.role-code', name: 'code', placeholder: 'system.role-code-pl', value: ''},
          {label: 'system.role-describe', name: 'describe', placeholder: 'system.role-describe-pl', value: ''},
      ],
      selectData: {
          labe: 'system.role-statue',
          data: ['system.role-option1', 'system.role-option2'],
          value: [1, 0]
      }
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
    this.setState({
      visible: false,
    });
  }

  onChange = (e) => {

  }

  render() {
    const formRender = () => {

        const inputItem = this.state.formData.map( ele => 
            <div style={{ marginBottom: 16 }} key={ele.label}>
                <Form.Item label={`${formatMessage({ id : ele.label})}`}>
                    <Input   placeholder={`${formatMessage({ id : ele.placeholder})}`} />
                </Form.Item>
            </div>
        )
        
        const selectItem = this.state.selectData.data.map( ele => 
            <Option value={ele}  key>{formatMessage({id: ele})}</Option>
        )
        return (
            <Form layout="inline" onSubmit={this.handleSubmit} style={{textAlign: "center"}}>
               {inputItem}
               <div style={{ marginBottom: 16 }}>
                    <Form.Item label={`${formatMessage({ id : this.state.selectData.labe})}`}>
                        <Select defaultValue="lucy" style={{ width: 120 }}  onChange={this.onChange}>
                            {selectItem}
                        </Select>
                    </Form.Item>
                </div>
            </Form>
      )
    }
    return (
      <div>
        <Modal
          title={`${formatMessage({ id : 'system.role-add-role'})}`}
          transparent
          style={{ top: 300 }}
          maskClosable={false}
          visible={this.state.visible}
          onCancel={this.onClose}
          onOk={this.handleOk}
        >
            {formRender()}
        </Modal>
      </div>
    );
  }
}

export default RoleAddOrUpdate;
