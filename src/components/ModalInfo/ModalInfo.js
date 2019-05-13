/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
  } from 'antd';

class ProductAddAndUpdate extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      visible: false,
      info: {
          title: null,
          content: null
      }
    };
  }

  showModal = (info) => {
    this.setState({
      info,
      visible: true,
    });
  }

  onClose = () => {
      this.setState({
        visible: false,
      });
  }

  handleSubmit = (e) => {
    this.props.onOk();
    this.onClose();
  }

  render() {
    const {visible, info} = this.state;
    return (
      <div>
        <Modal
          title={info.title}
          transparent
          style={{ top: 100 }}
          maskClosable={false}
          visible={visible}
          onCancel={this.onClose}
          onOk={this.handleSubmit}
        >
          {info.content}
        </Modal>
      </div>
    );
  }
}

export default ProductAddAndUpdate;

