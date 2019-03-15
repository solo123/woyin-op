import React, { Component } from 'react';
import { connect } from 'dva';
import {validateEmailReg } from '@/utils/validate';
import {
    Form, 
    Tabs,
    Button,
    Input,
  } from 'antd';
import {LabelInput} from '@/components/FormTool';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {formMessage} from '@/utils/utils';
import styles from './ResetPaswrod.less';

@connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['resPassword/resPassword'],
  }))
class ResetPaswrod extends Component {
    state = {
        newPassword: '',
        newPasswordTwo: '',
        formEmail: {
            userName : {label: formMessage('app.ResetPaswrod.name'), name: 'userName',ruless: [{ required: true, message: '请输入用户名!' }] ,placeholder :'请输入用户名'},
            email : {label: formMessage('app.ResetPaswrod.emails'), name: 'email',ruless: [{ required: true, message: '邮箱格式有误!', pattern: validateEmailReg}] ,placeholder :'请输入邮箱'},
            validateCode: {label: 'app.ResetPaswrod.validateCode', name: 'validateCode',ruless: [{ required: true,message: '校验码错误!' }], placeholder: '请在邮箱查收校验码'},
            newPassword:  {label: 'app.ResetPaswrod.newsPassword', name: 'newPassword',ruless: [{ required: true, message: '两次密码不一致，请重新输入!' }] ,placeholder :'请输入新的密码'},
            newPasswordTwo:  {label: 'app.ResetPaswrod.newsPasswordTwo', name: 'newPasswordTwo',ruless: [{ required: true, message: '两次密码不一致，请重新输入!' }] ,placeholder :'请输入再次输入密码确认'},
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // eslint-disable-next-line react/destructuring-assignment
        const { dispatch } = this.props;
        const { type } = this.state;
        // eslint-disable-next-line react/destructuring-assignment
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const {newPassword, newPasswordTwo, formEmail} = this.state;
            if (newPassword !== newPasswordTwo) {
                formEmail.newPassword.ruless[0].validateStatus = 'error';
                formEmail.newPasswordTwo.ruless[0].validateStatus = 'error';
                this.setState({
                    newPassword,
                    newPasswordTwo,
                    formEmail
                })
               
            }else{
              dispatch({
                type: 'resPassword/resPassword',
                payload: {
                  ...values,
                  type
                }
              })
              console.log('Received values of form: ', values);
            }
          }
        });
      }

    handleEmailChange = (e) => {
        e.preventDefault();
        const { formEmail } = this.state;
        const { value } = e.target;
        if (formEmail.email.validate(value)) {
            formEmail.email.validateStatue = true;
        }else{
            formEmail.email.validateStatue = false;
        }
        this.setState({
             formEmail
        });
    }

    handleValidateCode = (e) => {
        e.preventDefault();
    }

    sendEmail = e => {
        e.preventDefault();
    }

    handPassword = e => {
        // eslint-disable-next-line prefer-const
        let {newPassword, newPasswordTwo, formEmail} = this.state;
        const  {value} = e.target;
        const  {name} = e.target;
        newPassword = name === 'newPassword' ? value : newPassword;
        newPasswordTwo = name === 'newPasswordTwo' ? value : newPasswordTwo;
        if (newPassword !== newPasswordTwo) {
            formEmail[name].ruless[0].validateStatus = 'error';
        }else{
            formEmail.newPassword.ruless[0].validateStatus = 'success';
            formEmail.newPasswordTwo.ruless[0].validateStatus = 'success';
        }
        this.setState({
            newPassword,
            newPasswordTwo,
            formEmail
        })
    }
    

    findPasswordByEmails = () => {
        // eslint-disable-next-line react/destructuring-assignment ,no-unused-vars
        const { getFieldDecorator } = this.props.form;
        const {formEmail} = this.state;
        const inputItemPassword = (label, name, ruless, placeholder) => {
            return (
              <Form.Item
                label={label}
                validateStatus={ruless[0].validateStatus=== 'error'? 'error' : ''}
                help={ruless[0].validateStatus ==='error' ? ruless[0].message: ''}
              >
                {getFieldDecorator(name)(
                  <Input.Password placeholder={placeholder} name={name} onChange={value => {this.handPassword(value)}} />)}
              </Form.Item>
            )
        }
        
        return (
          <Form style={{textAlign: 'center'}} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onSubmit={this.handleSubmit}>
            {LabelInput(formEmail.userName, getFieldDecorator)}
            {LabelInput(formEmail.email, getFieldDecorator)}
            
            <Form.Item
              label={formMessage(formEmail.validateCode.label)}
            >
              {getFieldDecorator(formEmail.validateCode.name, {rules: formEmail.validateCode.ruless})(
                <div className={styles.validateCode}>
                  <Input name={formEmail.validateCode.name} onChange={value => {this.handleValidateCode(value)}} placeholder={formEmail.validateCode.placeholder} /> 
                  <Button type="primary" onClick={this.sendEmail}><FormattedMessage id='app.ResetPaswrod.sendEmails' /></Button>
                </div> 
               )}
            </Form.Item>
            {inputItemPassword(formMessage(formEmail.newPassword.label), formEmail.newPassword.name, formEmail.newPassword.ruless, formEmail.newPassword.placeholder)}
            {inputItemPassword(formMessage(formEmail.newPasswordTwo.label), formEmail.newPasswordTwo.name, formEmail.newPasswordTwo.ruless, formEmail.newPasswordTwo.placeholder)}
            <a style={{ float: 'right' }} href="/user/login">
              <FormattedMessage id="app.rturen.logo" />
            </a>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="app.ResetPaswrod.submitting" />
            </Button>
          </Form>
        )
    }

    render() {
        return(
          <div className={styles.main}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab={`${formatMessage({id : 'app.findPwasswordEmial'})}`} key="1">
                {this.findPasswordByEmails()}
              </Tabs.TabPane>
            </Tabs>
          </div>
        )
    }
}

const ResetPaswrods = Form.create({ name: 'normal_login' })(ResetPaswrod);
export default  ResetPaswrods