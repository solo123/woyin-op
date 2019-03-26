import React from 'react';
import { 
    Modal,
    Upload, 
    Icon, 
    message,
    Button,
    Divider 
  } from 'antd';
import reqwest from 'reqwest';
import styles from './MemberUpload.less'

class MemberAllAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        visible: false,
        fileList: [],
        uploading: false,
    }
  }

  showModal = () => {
    // e.preventDefault();
    this.setState({
      visible: true,
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
 
    // You can use any AJAX library you like
    reqwest({
      url: '//jsonplaceholder.typicode.com/posts/',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
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
        title='批量创建会员'
        transparent
        style={{ top: 100 }}
        maskClosable={false}
        visible={visible}
        onCancel={this.onClose}
        onOk={this.handleSubmit}
      >
        <div className={styles.targ}><Icon type="snippets" />模板文件下载</div>
        <Divider  />
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

export default MemberAllAdd;