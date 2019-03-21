import React from 'react';
import {
    Form,
    DatePicker
  } from 'antd';

const  handChangs = (value) => (value);
const {RangePicker } = DatePicker;

export default ({label ,name, options, handChang},getFieldDecorator) => (
  <Form.Item
    label={label}
  >
    {getFieldDecorator(name)(
      <RangePicker />
  )}
  </Form.Item>
)