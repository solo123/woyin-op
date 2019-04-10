import React from 'react';
import {
    Form, 
    Checkbox,
    Row,
    Col
  } from 'antd';

export default ({label, options, ruless, initialValue}, getFieldDecorator) => (
  <Form.Item
    label={label}
  >
    {getFieldDecorator("checkbox-group", {rules: ruless, initialValue,
    })(
      <Checkbox.Group style={{ width: "100%" }}>
        <Row>
          {options.map(res =>( <Col key={res.label} span={8}><Checkbox value={res.label}>{res.label}</Checkbox></Col>))}
        </Row>
      </Checkbox.Group>
    )}
  </Form.Item>
)