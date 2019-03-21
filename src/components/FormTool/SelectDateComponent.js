import React from 'react';
import {
    Form,
    DatePicker
  } from 'antd';

const  handChangs = (value) => (value);

export default ({label ,name, options, handChang},getFieldDecorator) => (
  <Form.Item
    label={label}
  >
    {getFieldDecorator(name)(
      <DatePicker  />
  )}
  </Form.Item>
)