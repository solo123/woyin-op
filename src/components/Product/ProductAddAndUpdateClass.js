/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {ProductClassAddApi} from '@/services/api';

class ProductAddAndUpdateClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      childLeng: 0,
      formData: [
        {type: 'InputIcon' ,label: '产品类型名称', name: 'name', ruless:[{required: true}] , placeholder: '产品类型名称', typeIco: 'user'},
        {type: 'InputIcon' ,label: '运营商', name: 'child', ruless:[{required: true}] , placeholder: '运营商', typeIco: 'user'},
        {type: 'ButtonComponents' ,label: '+', placeholder: '新增', onClick: this.handAddInput}
      ]
    };
  }

  init = (productClass) => {
    this.setState({
        childLeng: 0
    })
    // return typeof(userInfo.id) === 'undefined' ? this.setState({status: 'add'}) : this.setState({status: 'update'});
  }

  handAddInput = (e) => {
    e.preventDefault();
    const {formData} = this.state;
    let {childLeng} = this.state;
    childLeng+=1;
    const news = {type: 'InputIcon' ,label: `运营商${childLeng}`, name: `child${childLeng}`, ruless:[{required: true}] , placeholder: `运营商${childLeng}`, typeIco: 'user'};
    formData.splice(formData.length-1,0,news)
    this.setState({
        formData, 
        childLeng
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {childLeng} = this.state;
    const childs = [];
    this.AddInfo.validateFields((err, values) => {
      if (!err){
        const formData = new FormData();
        formData.append("productCategoryName", values.name);
        childs.push(values.child);
        for(let i = 1; i < childLeng; i+=1){
            childs.push(values[`child${i}`]);
        }
        formData.append("child", childs.join());
        try {
            ProductClassAddApi(formData).then(res => {
                if(res.status === 200){
                 message.info('添加产品分类成功');
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
          title='新增'
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

export default ProductAddAndUpdateClass;

