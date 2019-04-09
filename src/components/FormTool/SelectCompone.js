import React from 'react';
import {
    Form,
    Select
  } from 'antd';

const {Option} = Select;
const handChangs = (value) => (value);

export default ({label ,name, options,style, handChang,initialValue=null},getFieldDecorator) => {
  const option = options.map(d => <Option key={d.value}>{d.label}</Option>);
  return(
    <Form.Item
      label={label}
    >
      {getFieldDecorator(name,{initialValue})(
        <Select style={style} onChange={typeof(handChang) === 'function' ? handChang : handChangs} placeholder="请选择"> 
          {option}
        </Select>
      )}
    </Form.Item>
)}