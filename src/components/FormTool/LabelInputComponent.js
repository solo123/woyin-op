import React from 'react';
import {
    Form, 
    Input,
    Icon
  } from 'antd';

const  handChangs = (value) => (value);

export const LabelInput = ({label, name, ruless,disabled=true, placeholder, handChang}, getFieldDecorator) => (
  <Form.Item
    label={label}
  >
    {getFieldDecorator(name, {rules: ruless})(
      <Input placeholder={placeholder} disabled={disabled} onChange={typeof(handChang) === 'function' ? handChang : handChangs} />
    )}
  </Form.Item>
)


export const InputIcon = ({label, name, ruless, placeholder, typeIco, handChang, initialValue=null}, getFieldDecorator) => (
  <Form.Item
    label={label}
  >
    {getFieldDecorator(name, {rules: ruless, initialValue})(
      <Input prefix={<Icon type={typeIco} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={placeholder} onChange={typeof(handChang) === 'function' ? handChang : handChangs} />
    )}
  </Form.Item>
)