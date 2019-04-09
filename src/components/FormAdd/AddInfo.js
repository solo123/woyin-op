import React from 'react';
import { 
    Form
  } from 'antd';
  import {
    InputIcon, 
    SelectCompone, 
    LabelInput,
    ButtonComponents} from '../FormTool';

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
              )
          default:
        }
      
    });
    const handleSubmit = (e) => {
      e.preventDefault();
    }
    return (
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onSubmit={handleSubmit} style={{textAlign: "center"}}>
          {formInputRend}
        </Form>
      </div>
    );
  }
}
const AddInfos = Form.create({ name: 'UserAddUpdate' })(AddInfo);
export default AddInfos;

