/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {ProductAddApi,ProductClassApi, ProductClassAddApi} from '@/services/api';
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
        {type: 'InputIcon' ,label: '分类名称', name: 'productCategoryName', ruless:[{required: true, message: '请输入分类名称'}] , placeholder: '分类名称', typeIco: 'user'},
        {type: 'SelectCompone' ,label: '产品类型1',handChang: this.handSelectChang,options: option, name: 'productCategoryId', ruless:[{required: false}] , placeholder: '产品分类编号', typeIco: 'user'},
        {type: 'SelectCompone' ,label: '产品类型2',options: option, disabled: true, name: 'productCategoryId2', ruless:[{required: false}]},
        // {type: 'SelectCompone' ,label: '产品类型3',options: option, disabled: true, name: 'productCategoryId3', ruless:[{required: false}]},
        // {type: 'InputIcon' ,label: '产品现价/分', name: 'cost', ruless:[{required: true, pattern: isNumber,message: '请输入正确的数值'}] , placeholder: '产品现价/分', typeIco: 'user'},
        // {type: 'InputIcon' ,label: '产品售价/元', name: 'salesPrice', ruless:[{required: true, pattern: isNumber,message: '请输入正确的数值'}] , placeholder: '产品售价/元', typeIco: 'team'},
        // {type: 'InputIcon' ,label: ' 产品进价/元', name: 'purchasePrice', ruless:[{required: true, pattern: isNumber,message: '请输入正确的数值'}] , placeholder: '产品进价/元', typeIco: 'team'},
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
   this.getClassData(value, 2);
   
  }

  handSelectChang2 = (value) => {
    this.getClassData(value, 3);
  }

  getClassData = (classId, index) => {
    const {formData} = this.state;
    ProductClassApi(classId, {}).then(res => {
      if(res.status === 200 && res.data.count){
        const dataClass = [];
        res.data.productCategories.forEach(element => {
          const po = {
            value: element.productCategoryId,
            label: element.productCategoryName,
          }
          dataClass.push(po);
        });
        formData[index].options = dataClass;
        formData[index].disabled = false;
      }else{
        formData[index].disabled = true;
        formData[index].options = [];
      }
      this.setState({
        formData
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.AddInfo.validateFields((err, values) => {
      const value = values;
      if (!err){
        // console.log(values);
        const formData = new FormData();
        value.productCategoryId = values.productCategoryId2 ? values.productCategoryId2 : values.productCategoryId;
        
        formData.append("productCategoryName", values.productCategoryName);
        if(values.productCategoryId){
          formData.append("parentId", values.productCategoryId);
        }else{
          formData.append("parentId", '');
        }
        
       
        ProductClassAddApi(formData).then(res => {
          if(res.status === 200){
            message.info('添加产品分类成功');
            this.onClose();
            // this.props.Reset();
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

