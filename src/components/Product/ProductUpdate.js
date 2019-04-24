/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {ProductEditApi} from '@/services/api';
import {isNumber} from '@/utils/validate';

class ProductUpdate extends React.Component {
  constructor(props) {
    super(props);
    const optionStatus = [{
      value: 1,
      label: '正在销售',
    }, {
      value: 2,
      label: '停止销售',
    }];
    const optionCanRefund = [{
        value: 1,
        label: '支持',
      }, {
        value: 2,
        label: '不支持',
      }];
    this.state = {
      visible: false,
      formData: [
        {type: 'InputIcon' ,label: '产品名称', name: 'productName',initialValue: null, ruless:[{required: true}] , placeholder: '产品名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '产品现价/分', name: 'cost',initialValue: null, ruless:[{required: true, pattern: isNumber, message: '请输入正确的值'}] , placeholder: '产品现价/分', typeIco: 'user'},
        {type: 'InputIcon' ,label: ' 产品进价/元', name: 'purchasePrice',initialValue: null, ruless:[{required: false,  pattern: isNumber, message: '请输入正确的值'}] , placeholder: '产品进价/元', typeIco: 'team'},
        {type: 'InputIcon' ,label: '产品售价/元', name: 'salesPrice',initialValue: null, ruless:[{required: false, pattern: isNumber,message: '请输入正确的值' }] , placeholder: '产品售价/元', typeIco: 'team'},
        {type: 'SelectCompone', label: '状态：',style: {}, name: 'status',initialValue: null, options: optionStatus},
        {type: 'SelectCompone', label: '是否支持退款', name: 'canRefund',initialValue: null, options: optionCanRefund},
      ]
    };
  }

  init = (product) => {
    const {formData} = this.state;
    if(this.AddInfo){
       this.AddInfo.setFieldsValue({
        productName: product.productName,
        cost: product.cost,
        purchasePrice: product.purchasePrice,
        salesPrice: product.salesPrice,
        status: product.status===1 ? '正在销售' : '停止销售',
        canRefund: product.canRefund===1 ? '支持' : '不支持',
       });
    }else{
        formData[0].initialValue = product.productName;
        formData[1].initialValue = product.cost;
        formData[2].initialValue = product.purchasePrice;
        formData[3].initialValue = product.salesPrice;
        formData[4].initialValue = product.status===1 ? '正在销售' : '停止销售';
        formData[5].initialValue = product.canRefund===1 ? '支持' : '不支持';
        this.setState({
            formData,
            product
        })
    }
    // this.AddInfo.resetFields(()=>({productName: 'test'}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {product} = this.state;
    this.AddInfo.validateFields((err, values) => {
      if (!err){
        const value = values;
        if(values.status=== '正在销售' || values.status==='1'){
            value.status = 1
        }else{
            value.status = 2
        }
        if(values.canRefund=== '支持' || values.canRefund==='1'){
            value.canRefund = 1
        }else{
            value.canRefund = 2
        }
        value.cost = value.cost;
        value.purchasePrice =value.purchasePrice;
        value.salesPrice = value.salesPrice;
        try {
            ProductEditApi(product.productId,value).then(res => {
                if(res.status === 200){
                 message.info('修改产品成功');
                 this.onClose();
                 this.props.Reset();
                }
              })
        } catch (error) {}
      }
    });
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

  render() {
    const {formData, visible} = this.state;
    return (
      <div>
        <Modal
          title='更新产品'
          transparent
          style={{ top: 100 }}
          maskClosable={false}
          visible={visible}
          onCancel={this.onClose}
          onOk={this.handleSubmit}
        >
          <AddInfo ref={(c) => {this.AddInfo = c;}} data={formData} handleSubmit={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

export default ProductUpdate;

