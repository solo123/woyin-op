/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {ProductAddApi} from '@/services/api';

class ProductAddAndUpdate extends React.Component {
  constructor(props) {
    super(props);
    const option = [{
      value: '1',
      label: '可用',
    }, {
      value: '0',
      label: '冻结',
    }];
    this.state = {
      status: 'add',
      visible: false,
      formData: [
        {type: 'InputIcon' ,label: '产品名称', name: 'productName', ruless:[{required: true}] , placeholder: '产品名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '产品分类编号', name: 'productCategoryId', ruless:[{required: true}] , placeholder: '产品分类编号', typeIco: 'user'},
        {type: 'InputIcon' ,label: '产品现价/分', name: 'cost', ruless:[{required: true}] , placeholder: '产品现价/分', typeIco: 'user'},
        {type: 'InputIcon' ,label: '产品售价/元', name: 'salesPrice', ruless:[{required: false}] , placeholder: '产品售价/元', typeIco: 'team'},
        {type: 'InputIcon' ,label: ' 产品进价/元', name: 'purchasePrice', ruless:[{required: false}] , placeholder: '产品进价/元', typeIco: 'team'},
      ]
    };
  }

  init = (userInfo) => {
    return typeof(userInfo.id) === 'undefined' ? this.setState({status: 'add'}) : this.setState({status: 'update'});
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
        formData.append("productName", values.productName);
        formData.append("productCategoryId", values.productCategoryId);
        formData.append("cost", values.cost);
        formData.append("salesPrice", values.salesPrice);
        formData.append("purchasePrice", values.purchasePrice);
        formData.append("userAccount", values.userAccount);
        try {
            ProductAddApi(formData).then(res => {
                if(res.status === 200){
                 message.info('添加产品成功');
                 this.onClose();
                }
              })
        } catch (error) {}

      }
    });
  }

  render() {
    const {formData, visible} = this.state;
    return (
      <div>
        <Modal
          title='添加产品'
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

export default ProductAddAndUpdate;

