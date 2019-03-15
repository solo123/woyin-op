import React from 'react';
import {
    Form,
    Cascader
  } from 'antd';

const  handChangs = (value) => (value);

export default ({label ,name, options, handChang},getFieldDecorator) => (
  <Form.Item
    label={label}
  >
    {getFieldDecorator(name)(
      <Cascader options={options} onChange={typeof(handChang) === 'function' ? handChang : handChangs} placeholder="请选择" />
  )}
  </Form.Item>
)