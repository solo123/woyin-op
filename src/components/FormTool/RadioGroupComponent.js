import React from 'react';
import {
    Form, 
    Radio
}from 'antd';

const RadioGroup = Radio.Group;

export default ({label, value, name, ruless}, getFieldDecorator) => (
  <Form.Item
    label={label}
  >
    {getFieldDecorator(name, {rules: ruless})(
      <RadioGroup>
        {value.map((res)=>(<Radio key={res.value} value={res.value}>{res.label}</Radio>))}
      </RadioGroup>
      )}
  </Form.Item>
  )