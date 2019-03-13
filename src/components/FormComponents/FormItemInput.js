
import React from 'react';
import { 
    Form,
    Input} from 'antd';

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class FormItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }

  componentDidMount() {
  }

  handleNumberChange = event => {
    return event
  }

  render() {
    const {label, validateStatus, help, onChange, children, name} = this.props;
    const hangChange  = typeof(onChange)==='function' ? onChange : this.handleNumberChange
    return (
      <Form.Item
        label={label}
        validateStatus={validateStatus}
        help={help}
      >
        <Input name={name} onChange={value => {hangChange(value)}} />
        {children}
      </Form.Item>
    )
  }
}
// 标志位 用来判断是不是自定义组件
FormItemInput.typeName = 'FormItemInput';
export default FormItemInput;
