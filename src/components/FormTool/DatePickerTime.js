import React from 'react';
import moment from 'moment';
import {
    Form,
    DatePicker
  } from 'antd';

// const  handChangs = (value) => (value);

// function range(start, end) {
//     const result = [];
//     for (let i = start; i < end; i++) {
//       result.push(i);
//     }
//     return result;
//   }
  

// function disabledDate(current) {
//     // Can not select days before today and today
//     return current && current < moment().endOf('day');
// }

// function disabledDateTime() {
//     return {
//       disabledHours: () => range(0, 24).splice(4, 20),
//       disabledMinutes: () => range(30, 60),
//       disabledSeconds: () => [55, 56],
//     };
// }

export default ({label ,name, ruless},getFieldDecorator) => (
  <Form.Item
    label={label}
  >
    {getFieldDecorator(name, {rules: ruless})(
      <DatePicker  
        format="YYYY-MM-DD HH:mm:ss"
        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      />
  )}
  </Form.Item>
)