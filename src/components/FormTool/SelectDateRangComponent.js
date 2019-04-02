import React from 'react';
import {
    Form,
    DatePicker
  } from 'antd';

const {RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

export default ({label ,name},getFieldDecorator) => (
  <Form.Item
    label={label}
  >
    {getFieldDecorator(name)(
      <RangePicker format={dateFormat} />
  )}
  </Form.Item>
)