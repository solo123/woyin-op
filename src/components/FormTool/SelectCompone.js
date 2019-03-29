import React from 'react';
import {
    Form,
    Cascader,
    Select
  } from 'antd';

  const {Option} = Select;
const  handChangs = (value) => (value);

export default ({label ,name, options, handChang},getFieldDecorator) => {
  const option = options.map(d => <Option key={d.value}>{d.label}</Option>);
  return(
    <Form.Item
      label={label}
    >
      {getFieldDecorator(name)(
        <Select style={{ width: '193px' }} onChange={typeof(handChang) === 'function' ? handChang : handChangs} placeholder="请选择"> 
          {option}
        </Select>
      )}
    </Form.Item>
)}