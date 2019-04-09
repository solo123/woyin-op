import React from 'react';
import {
    Form, 
    Button,
  } from 'antd';

export default ({label, placeholder, onClick}) => (
  <Form.Item
    label={label}
  >
    <Button type="dashed" block onClick={onClick}>{placeholder}</Button>
  </Form.Item>
)