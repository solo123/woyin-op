import React from 'react';
import { 
    Form,
    Row,
    Col
  } from 'antd';
  import {
    InputIcon, 
    SelectCompone, 
    LabelInput,
    ButtonComponents,
    CheckboxComponents,
    RadioGroupComponent} from '../FormTool';

class AddInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    // e.preventDefault();
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const {getFieldDecorator} = this.props.form;
    const {data} = this.props;
    const formInputRend = data.map( (value) => {
      switch (value.type){
          case 'LabelInput':
            return (
              <React.Fragment key={value.label}>
                {LabelInput(value, getFieldDecorator)}
              </React.Fragment>
            );
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
              );
          case 'ButtonComponents':
              return(
                <React.Fragment key={value.label}>
                  {ButtonComponents(value)}
                </React.Fragment>
              );
          case 'CheckboxComponents':
              return(
                <React.Fragment key={value.label}>
                  {CheckboxComponents(value, getFieldDecorator)}
                </React.Fragment>
              )
          case 'RadioGroupComponent':
              return(
                <React.Fragment key={value.label}>
                  {RadioGroupComponent(value,getFieldDecorator)}
                </React.Fragment>
              )
          default:
        }
      
    });
    const handleSubmit = (e) => {
      e.preventDefault();
    }
    return (
      <div>
        {/* <Form labelCol={{ span: 6 }} wrapperCol={{ span: 6 }} onSubmit={handleSubmit} style={{textAlign: "center"}}>
          {formInputRend}
        </Form> */}
        {
          (()=>{
            if(formInputRend.length> 10){
              const one = formInputRend%2 === 0 ? formInputRend.length/2 : (formInputRend.length/2)+1;
              return(
                <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} onSubmit={handleSubmit} style={{textAlign: "center"}}>
                  <Row>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      {formInputRend.slice(0,one)}
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      {formInputRend.slice(one,formInputRend.length)}
                    </Col>
                  </Row>
                </Form>
              )
            }
            return (
              <Form labelCol={{ span: 6 }} wrapperCol={{ span: 6 }} onSubmit={handleSubmit} style={{textAlign: "center"}}>
                {formInputRend}
              </Form>
            )
          })()
        }

      </div>
    );
  }
}
const AddInfos = Form.create({ name: 'UserAddUpdate' })(AddInfo);
export default AddInfos;

