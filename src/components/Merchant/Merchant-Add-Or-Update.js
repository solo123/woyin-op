/* eslint-disable react/destructuring-assignment */
import { connect } from 'dva';
import React from 'react';
import { 
    Modal,
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';

@connect(({ merchant, loading }) => ({
  merchant,
  submitting: loading.effects['merchant/setMerchant'],
}))
class MerchantAddOrUpdate extends React.Component {
  constructor(props) {
    super(props);
    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    this.state = {
      status: 'add',
      formData: [
        {type: 'InputIcon' ,label: '商户登陆帐户', name: 'userName', ruless:[] , placeholder: '商户登陆帐户', typeIco: 'user'},
        {type: 'InputIcon' ,label: '商户名称', name: 'merchantName', ruless:[] , placeholder: '商户名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '联系人', name: 'contactMan', ruless:[] , placeholder: '联系人', typeIco: 'team'},
        {type: 'InputIcon' ,label: '登陆密码', name: 'password', ruless:[] , placeholder: '登陆密码', typeIco: 'team'},
        {type: 'InputIcon' ,label: '手机号码', name: 'phoneNum', ruless:[] , placeholder: '手机号码', typeIco: 'phone'},
        {type: 'InputIcon' ,label: '固定电话', name: 'telNum', ruless:[] , placeholder: '固定电话', typeIco: 'pushpin'},
        {type: 'InputIcon' ,label: '地址', name: 'merchantAddr', ruless:[] , placeholder: '地址', typeIco: 'inbox'},
        {type: 'InputIcon' ,label: '转让费率', name: 'transferRate', ruless:[] , placeholder: '转让费率', typeIco: 'inbox'},
       // {type: 'SelectCompone', label: '状态：', name: 'state', options: option}
      ]
    };
  }

  init = (userInfo) => {
    return typeof(userInfo.id) === 'undefined' ? this.setState({status: 'add'}) : this.setState({status: 'update'});
  }

  onClose = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'merchant/closeMerchantAdd'
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {status} = this.state;
    this.AddInfo.validateFields((err, values) => {
      if (!err){
        if (status === 'add'){
            const { dispatch } = this.props;
            dispatch({
              type: 'merchant/addMerchant',
              payload: {
                ...values
              }
            })
        }else if (status === 'update') {
            console.log(values);
        }
      }
    });
  }

  render() {
    const {formData} = this.state;
    const { visibe } = this.props.merchant;
    // console.log(this.props);
    return (
      <div>
        <Modal
          title='添加商户'
          transparent
          style={{ top: 100 }}
          maskClosable={false}
          visible={visibe}
          onCancel={this.onClose}
          onOk={this.handleSubmit}
        >
          <AddInfo ref={(c) => {this.AddInfo = c ;}} data={formData} handleSubmit={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

export default MerchantAddOrUpdate;

