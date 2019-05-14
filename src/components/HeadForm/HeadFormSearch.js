/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { 
    Form,
    Button 
} from 'antd';

import {
  InputIcon, 
  SelectCompone, 
  SelectDateRang,
  CascaderComponents,
  DatePickerTime
} from '../FormTool';

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
  
  /**
   * 进行数据提交的部分处理
   * 把数据清洗剥离出来，只返回表单数据
   */
  Submit = (e, resolve) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if(!err){
          resolve(values);
        }
    })
  }

  // 重置查询数据，返回重置后的字段值
  Reset = (formData) => {
    let params = {};
    formData.forEach(elem=>{
      params[elem.type] = null;
      if(elem.type === 'SelectDateRang'){
        params.startTime = null;
        params.endTime = null;
      }
    })

    params = {
      ...params,
      page: 1,
      page_size: 20,
      totalCount: 10
    }
    
    return params;
  }

  render () {
    const {formData, handleSubmit, getFieldDecorator, form, getData, Reset} = this.props;
    const handleReset = () => {
      form.resetFields(); 
      if(typeof getData === 'function') getData(this.Reset(formData)); 
      if(typeof Reset === 'function') Reset(); 
    }
    const formInputRend = formData.map((value) => {
      switch (value.type){
        case 'InputIcon':
          return (
            <React.Fragment key={value.label}>
              {InputIcon(value, getFieldDecorator)}
            </React.Fragment>
          )
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
        case 'CascaderComponents':
          return(
            <React.Fragment key={value.label}>
              {CascaderComponents(value, getFieldDecorator)}
            </React.Fragment>
          )
        case 'DatePickerTime':
          return(
            <React.Fragment key={value.label}>
              {DatePickerTime(value, getFieldDecorator)}
            </React.Fragment>
          )
        default:
      }
    })
      
    return (
      <Form layout="inline" onSubmit={(e)=>(this.Submit(e, handleSubmit))}>
        {formInputRend}
        <Button type="primary" icon="search" htmlType="submit">查找</Button>
        <Button style={{"marginLeft": '10px'}} onClick={handleReset} icon="redo">重置</Button>
      </Form>
    )
  }
}
export default HeadForm