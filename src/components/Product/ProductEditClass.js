/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    Tag,
    Input,
    Icon,
    message
  } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import {ProductClassAddApi, ProductClassApi, ProductClassDeleApi} from '@/services/api';

class ProductAddAndUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
      visible: false,
      productClass: {},
      data: []
    };
  }

  init = (productClass) => {
    this.setState({
        productClass
    });
    this.getData(productClass);
    // return typeof(userInfo.id) === 'undefined' ? this.setState({status: 'add'}) : this.setState({status: 'update'});
  }

  getData =(productClass) =>{
    const tags = [];
    ProductClassApi(productClass.productCategoryId,{}).then(res => {
        if(res.status === 200){
            for(let i= 0; i < res.data.result.length; i+=1){
                tags.push(res.data.result[i].productCategoryName);
            }
            this.setState({
                tags,
                productClass,
                data: res.data.result
            })
        }
    })
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    const {data, productClass} = this.state;
    const c = this.getProundctClassId(data, removedTag);;
    ProductClassDeleApi(c.productCategoryId).then(res =>{
        const re = JSON.parse(res);
        if(re.status === 200){
            message.info('删除成功');
            this.setState({ tags });
            this.getData(productClass);
        }else{
            console.log(re.data);
            message.error(re.data);
        }
    })
   
  }

  getProundctClassId = (data, name) =>{
    for(let i = 0; i < data.length ; i+=1){
        if(name === data[i].productCategoryName){
            return data[i]
        }
    }
    return null
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  saveInputRef = input => this.input = input

  forMap = (tag) => {
    const tagElem = (
      <Tag 
        closable 
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  }

  handleInputConfirm = () => {
    const { inputValue, productClass } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const params = {
        name: inputValue,
        parentId: productClass.productCategoryId
      }
      ProductClassAddApi(params).then(res =>{
        if(res.status === 200){
          message.info('增加成功');
        }else{
          message.info('分类创建失败,名称重复');
        }
      })
      tags = [...tags, inputValue];
    }
    this.getData(productClass);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
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
    const { tags, inputVisible, inputValue, visible } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <div>
        <Modal
          title='运营商查看'
          transparent
          style={{ top: 100 }}
          maskClosable={false}
          visible={visible}
          onCancel={this.onClose}
          onOk={this.onClose}
        >
          <div style={{ marginBottom: 16 }}>
            <TweenOneGroup 
              enter={{
              scale: 0.8, opacity: 0, type: 'from', duration: 100,
              onComplete: (e) => {
                e.target.style = '';
              },
            }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              appear={false}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
            )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              <Icon type="plus" /> 新建运营商
            </Tag>
            )}
        </Modal>
      </div>
    );
  }
}

export default ProductAddAndUpdate;

