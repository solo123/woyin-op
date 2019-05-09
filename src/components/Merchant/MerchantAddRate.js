/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import LocalStr from '@/utils/LocalStr';
import {MecharAddRate} from '@/services/api';

class MerchantAddOrUpdate extends React.Component {
  constructor(props) {
    super(props);
    const option = [
      {value: '1',label: '积分代卖（赎回）手续费'}, 
      {value: '2',label: '信用卡还款手续费'},
      {value: '3',label: '积分转赠手续费'}
    ];
    this.state = {
      visible: false,
      formData: [
        {type: 'InputIcon' ,label: '单笔费用(分数)', name: 'singleRate', ruless:[{required: true}] , placeholder: '单笔费用(分数)', typeIco: 'user'},
        {type: 'InputIcon' ,label: '百分比费用', name: 'percentRate', ruless:[{required: true}] , placeholder: '百分比费用', typeIco: 'inbox'},
        {type: 'SelectCompone' ,label: '费率类型',name: 'type', options: option},
        {type: 'InputIcon' ,label: '区间1', name: 'minEchelon', ruless:[{required: true}] , placeholder: '区间1', typeIco: 'phone'},
        {type: 'InputIcon' ,label: '区间2', name: 'maxEchelon', ruless:[{required: true}] , placeholder: '区间2', typeIco: 'user'}
      ]
    };
  }

  showModal = () => {
  
    this.setState({
      visible: true,
    });
 }

  onClose = () => {
      this.setState({
        visible: false,
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.AddInfo.validateFields((err, values) => {
      if (!err){
        const formData = new FormData();
        formData.append("singleRate", values.singleRate);
        formData.append("percentRate", values.percentRate);
        formData.append("type", values.type);
        formData.append("minEchelon", values.minEchelon);
        formData.append("maxEchelon", values.maxEchelon);
        MecharAddRate(formData).then(res => {
        if(res.status === 200){
          message.info(res.data);
          this.onClose();
        }else{
          message.info('添加费率失败，可能是登录账户重复！！');
        }
       })
      }
    });
  }

  render() {
    const {formData, visible} = this.state;
    return (
      <div>
        <Modal
          title='添加费率'
          width={500}
          transparent
          style={{ top: 100 }}
          maskClosable={false}
          visible={visible}
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

