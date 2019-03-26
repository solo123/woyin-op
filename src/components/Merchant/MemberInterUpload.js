import React from 'react';
import { 
    Modal,
    Upload, 
    Icon, 
    message,
    Button,
  } from 'antd';
import {uploadIntegralFile} from '@/services/api'
import styles from './MemberInterUpload.less'

class InterUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        visible: false,
        fileList: [],
        uploading: false,
    }
  }

  showModal = (merchantId) => {
    // e.preventDefault();
    this.setState({
      visible: true,
      merchantId
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }

  handleUpload = () => {
    const { fileList, merchantId } = this.state;
    const formData = new FormData();
    fileList.forEach(element => {
      formData.append('file', element);
    });
    formData.append('merchantId', merchantId);
    uploadIntegralFile(formData).then(res => {
      if(res.status === 200){
        message.info('积分上传成功');
        this.onClose();
      }else{
        message.error('上传失败，请检查格式是否正确');
      }
      this.setState({
        fileList: [],
        uploading: false,
      });
    })
  }


  render() {
    const {visible, uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <Modal
        title='会员充值积分'
        transparent
        style={{ top: 100 }}
        maskClosable={false}
        visible={visible}
        onCancel={this.onClose}
        onOk={this.handleSubmit}
      >
        {/* <div className={styles.targ}><Icon type="snippets" />模板文件下载</div>
        <Divider  /> */}
        <div className={styles.hint}>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 上传文件
            </Button>
          </Upload>          
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginLeft: 16 }}
          >
            {uploading ? '上传中' : '开始上传' }
          </Button>
        </div>
      </Modal>
    )

  }
}

export default InterUpload;