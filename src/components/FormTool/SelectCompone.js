import React from 'react';
import {
    Form,
    Select
  } from 'antd';

const {Option} = Select;
const handChangs = (value) => (value);

export default ({label ,name, options,style, ruless, handChang,initialValue=null},getFieldDecorator) => {
  const option = options.map(d => <Option key={d.value}>{d.label}</Option>);
  return(
    <Form.Item
      label={label}
    >
      {
        (() => {
          if(initialValue){
            return (
              getFieldDecorator(name,{rules: ruless ,initialValue})(
                <Select 
                  style={style} 
                  onChange={typeof(handChang) === 'function' ? handChang : handChangs} 
                  placeholder="请选择"
                > 
                  {option}
                </Select>
              )
            )
          }
            return (
              getFieldDecorator(name,{rules: ruless })(
                <Select 
                  style={style} 
                  onChange={typeof(handChang) === 'function' ? handChang : handChangs} 
                  placeholder="请选择"
                > 
                  {option}
                </Select>
              )
            )
          
        })()
      }

    </Form.Item>
)}