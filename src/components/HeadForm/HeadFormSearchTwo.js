/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { 
    Form,
    Button,
    Row,
    Col 
} from 'antd';
import {InputIcon, SelectCompone, SelectDate, SelectDateRang} from '../FormTool';
import styles from './HeadFormSearchTwo.less'

class HeadFormTow extends React.Component {
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
    const rendComp = value => {
    switch (value.type){
      case 'InputIcon':
        return (
          <React.Fragment key={value.label}>
            <Col md={6}>
              {InputIcon(value, getFieldDecorator)}
            </Col>
          </React.Fragment>
        );
      case 'SelectCompone':
          return (
            <React.Fragment key={value.label}>
              <Col md={6}>
                {SelectCompone(value, getFieldDecorator)}
              </Col>
            </React.Fragment>
          )
      case 'SelectDate':
          return (
            <Col md={6} key={value.label}>
              {SelectDate(value, getFieldDecorator)}
            </Col>
          )
      case 'SelectDateRang':
          return (
            <Col md={8} key={value.label}>
              {SelectDateRang(value, getFieldDecorator)}
            </Col>
          )
      default:
      }
    }
      
  // 进行分行处理
  const one = formData.map( (value, index) => {
    if(index <=3){
      return rendComp(value, index);
    }
  });

  const two = formData.map( (value, index) => {
    if(index >3 && index <= 6){
      return rendComp(value, index);
    }
  })
      
  return (
    <Form layout="inline" onSubmit={(e)=>(this.Submit(e, handleSubmit))}>
      <Row gutter={{ md: 6}}>
        {one}
      </Row>
      <Row gutter={{ md: 8}}>
        {two}
      </Row>
      <div className={styles.addButton}>
        <Button type="primary" icon="search" htmlType="submit">查找</Button>
        <Button style={{"marginLeft": '10px'}} onClick={handleReset} icon="redo">重置</Button>
      </div>
    </Form>
    )
  }
}
export default HeadFormTow