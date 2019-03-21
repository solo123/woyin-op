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

  render () {
    const {formData, handleSubmit, getFieldDecorator} = this.props;
    // eslint-disable-next-line react/destructuring-assignment
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
        <Form layout="inline" onSubmit={handleSubmit}>
          <Row gutter={{ md: 6}}>
            {one}
          </Row>
          <Row gutter={{ md: 8}}>
            {two}
          </Row>
          <div className={styles.addButton}>
            <Button type="primary" icon="search" htmlType="submit">查找</Button>
            <Button style={{"marginLeft": '10px'}} icon="redo">重置</Button>
          </div>
        </Form>
      )
    }
}
export default HeadFormTow