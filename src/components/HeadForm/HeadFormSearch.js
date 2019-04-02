/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { 
    Form,
    Button 
} from 'antd';

import {InputIcon, SelectCompone, SelectDateRang} from '../FormTool';

class HeadForm extends React.Component {
  static propTypes = {
    formData: PropTypes.array,
  };

  static defaultProps = {
    formData: [],
  };

  constructor(props) {
        super(props);
        this.state = {}
  }

  render () {
    const {formData, handleSubmit, getFieldDecorator, form, Reset} = this.props;
    const handleReset = () => {form.resetFields(); if(typeof Reset === 'function') Reset(); }
    const formInputRend = formData.map((value) => {
      switch (value.type){
        case 'InputIcon':
          return (
            <React.Fragment key={value.label}>
              {InputIcon(value, getFieldDecorator)}
            </React.Fragment>
          );
        case 'SelectCompone':
            return (
              <React.Fragment key={value.label}>
                {SelectCompone(value, getFieldDecorator)}
              </React.Fragment>
            )
        case 'SelectDateRang':
            return (
              <React.Fragment key={value.label}>
                {SelectDateRang(value, getFieldDecorator)}
              </React.Fragment>
            )
        default:
      }
    })
      
    return (
      <Form layout="inline" onSubmit={handleSubmit}>
        {formInputRend}
        <Button type="primary" icon="search" htmlType="submit">查找</Button>
        <Button style={{"marginLeft": '10px'}} onClick={handleReset} icon="redo">重置</Button>
      </Form>
    )
  }
}
export default HeadForm