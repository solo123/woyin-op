/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {ProductAddApi,ProductClassApi} from '@/services/api';
import {isNumber} from '@/utils/validate';

class ProductAddAndUpdate extends React.Component {
  constructor(props) {
    super(props);
    const option = [
      {value: '1',label: '可用'}, 
      {value: '0',label: '冻结'}];
    this.state = {
      visible: false,
      formData: [
        {type: 'InputIcon' ,label: '产品名称', name: 'productName', ruless:[{required: true, message: '请输入产品名称'}] , placeholder: '产品名称', typeIco: 'user'},
        {type: 'SelectCompone' ,label: '产品分类',handChang: this.handSelectChang,options: option, name: 'fatherId', ruless:[{required: true,  message: '请选择产品分类'}] , placeholder: '产品分类编号', typeIco: 'user'},
        {type: 'SelectCompone' ,label: '运营商',options: option, name: 'productCategoryId', ruless:[{required: true, message: '请选选择运营商'}] , placeholder: '产品分类编号', typeIco: 'user'},
        {type: 'InputIcon' ,label: '产品现价/分', name: 'cost', ruless:[{required: true, pattern: isNumber,message: '请输入正确的数值'}] , placeholder: '产品现价/分', typeIco: 'user'},
        {type: 'InputIcon' ,label: '产品售价/元', name: 'salesPrice', ruless:[{required: true, pattern: isNumber,message: '请输入正确的数值'}] , placeholder: '产品售价/元', typeIco: 'team'},
        {type: 'InputIcon' ,label: ' 产品进价/元', name: 'purchasePrice', ruless:[{required: true, pattern: isNumber,message: '请输入正确的数值'}] , placeholder: '产品进价/元', typeIco: 'team'},
      ]
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    }, this.getClass);
  }

  onClose = () => {
      this.setState({
        visible: false,
      });
  }

  getClass = () => {
    const {formData} = this.state;
    ProductClassApi(0, {}).then(res => {
      if(res.status === 200){
        const dataClass = [];
        res.data.productCategories.forEach(element => {
          const po = {
            value: element.productCategoryId,
            label: element.productCategoryName,
          }
          dataClass.push(po);
        });
        formData[1].options = dataClass;
        this.setState({
          formData
        })
      }
    })
  }

  handSelectChang = (value) => {
    const {formData} = this.state;
    ProductClassApi(value, {}).then(res => {
      if(res.status === 200 && res.data.count){
        const dataClass = [];
        res.data.productCategories.forEach(element => {
          const po = {
            value: element.productCategoryId,
            label: element.productCategoryName,
          }
          dataClass.push(po);
        });
        formData[2].options = dataClass;
      }else{
        formData[2].options = [];
      }
      this.setState({
        formData
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.AddInfo.validateFields((err, values) => {
      if (!err){
        const formData = new FormData();
        formData.append("productName", values.productName);
        formData.append("productCategoryId", values.productCategoryId);
        formData.append("cost", parseInt(values.cost, 10));
        formData.append("productCode", 0);
        // formData.append("salesPrice", values.salesPrice);
        formData.append("purchasePrice", parseInt(values.purchasePrice, 10));
        formData.append("salesPrice", values.salesPrice);
        ProductAddApi(formData).then(res => {
          if(res.status === 200){
            message.info('添加产品成功');
            this.onClose();
            this.props.Reset();
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

