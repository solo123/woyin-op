import React from 'react';
import { 
    Modal,
    Upload, 
    Icon, 
    message,
    Button,
    Table,
    Card,
    Col,
    Row
  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {statuesRend, hreRend} from '@/utils/renderUtils';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import LocalStr from '@/utils/LocalStr';
import {
  SubmitRecPoints,
  uploadRecPointsFile,
  GetUploadRecPintData,
  DeleDataSubmitRecPoints
} from '@/services/api';
import styles from './MemberInterAll.less';

const confirm = Modal.confirm;

class InterUpload extends React.Component {

  constructor(props) {
    super(props);
    const STATUSITEMS = [
      {key: 1, describe: ['green', '正常']},
      {key: 0, describe: ['red', '异常']},
    ];
    const tableData = {columns:
      [
        {title: 'id', dataIndex: 'id', key: 'id'},
        {title: '状态', dataIndex: 'isValid', key: 'isValid', render: status =>(statuesRend(status, STATUSITEMS))},
        // {title: 'isValid', dataIndex: 'isValid', key: 'isValid'},
        {title: '序号', dataIndex: 'T1', key: 'T1'},
        {title: '会员名称', dataIndex: 'T2', key: 'T2'},
        {title: '手机号', dataIndex: 'T3', key: 'T3'},
        {title: '金额', dataIndex: 'T4', key: 'T4'},
        {title: '备注', dataIndex: 'T5', key: 'T5'},
        {title: 't6', dataIndex: 'T6', key: 'T6'},
        {title: 't7', dataIndex: 't7', key: 't7'},
        {title: 't8', dataIndex: 't8', key: 't8'},
        {title: 't9', dataIndex: 't9', key: 't9'},
        {title: 't10', dataIndex: 't10', key: 't10'},
        // {title: 't6', dataIndex: 'action', key: 'action', render: (texts, record) => (<a href="javascript:;" onClick={()=> {this.onClick(texts, record)}}>操作</a>)},
     ],
     data: []
    };
    const buttonData = [
    //   {type: 'primary', hangClick: this.handDeleData, labe: '删除数据'},
      {type: 'primary', hangClick: this.handDeleDataAll, labe: '清空数据'},
      {type: 'primary', ico: 'plus', hangClick: this.handSubmit, labe: '提交审核'}
    ]
    this.state = {
      fileList: [],
      uploading: false,
      dataVisib: false,
      tableData,
      buttonData,
      withDrawList: []
  };
  }


  componentWillMount (){
    const MeInfo = JSON.parse(LocalStr.get("merchantInfo"));
    this.setState({MeInfo});
  }
  

  handleUpload = () => {
    const { fileList ,MeInfo} = this.state;
    const formData = new FormData();
    fileList.forEach(element => {
      formData.append('file', element);
    });
    formData.append('merchantId', MeInfo.MerchantId);
    uploadRecPointsFile(formData).then(res => {
      if(res.status === 200){
        message.info('上传成功');
       // this.onClose();
      }else{
        message.error('上传失败，请检查格式是否正确');
      }
      this.setState({
        fileList: [],
        uploading: false,
      });
    })
  }

  handSubmit = () => {
    const {MeInfo} = this.state;
    const formData = new FormData();
    formData.append('merchantId', MeInfo.MerchantId);
    confirm({
      title: '信息确认',
      content: '您确定要把数据提交审核？',
      onOk : () => {
       
        SubmitRecPoints(formData).then(res => {
          if(res.status === 200){
            message.success('提交数据成功');
            this.GetExelData();
          }else{
            message.success('提交数据失败');
          }
        })
      },
    });
   
  }

  GetUploadExec = () => {
    const {MeInfo} = this.state;
   
    GetUploadRecPintData({merchantId: MeInfo.MerchantId}).then( res => {
      if(res.status === 200){
        if(res.data.count>0){
          message.success('数据解析成功');
         this.GetExelData();
        }else{
          message.error('目前没有数据,或者你上传的数据有问题，请先上传数据！');
        }
      }else{
        message.success('数据文件还在解析中')
      }
    })
  }

  GetExelData = () =>{
    const {tableData, MeInfo} = this.state;
    tableData.data = [];
    GetUploadRecPintData({merchantId: MeInfo.MerchantId}).then(res => {
      if(res.status === 200 && res.data.count){
        res.data.currents.forEach(ele => {
          tableData.data.push({...ele,key: ele.id})
        })
        // const params = {
        //   ...param,
        //   totalCount: res.data.totalCount,
        //   page: param.page
        // }
        this.setState({tableData, dataVisib:true})
      }else{
        this.setState({tableData, dataVisib:false})
      }
      console.log(res);
    })
  }

  handDeleData = () => {
    const {withDrawList} = this.state;
    const list = [];
    if(withDrawList.length <= 0) {
      Modal.info({
        title: '信息提醒',
        content: '请选择要删除的数据',
      })
      return ;
    }
    withDrawList.forEach(item => {
      list.push(item.id);
    })
    const params = {status: 2,list}
    this.DetelData(params);
  }

  handDeleDataAll = () => {
    const { MeInfo } = this.state;
    confirm({
      title: '信息确认',
      content: '您确定要把所有数据清空？',
      onOk : () => {
        const formData = new FormData();
        formData.append('status', 1);
        formData.append('merchantId',  MeInfo.MerchantId);
        DeleDataSubmitRecPoints(formData).then(res => {
          const re = JSON.parse(res);
          if(re.status === 200){
            message.success('数据清空成功');
            this.setState({dataVisib:false})
            
            // this.DetelData(formData);
          }else{
            message.success('数据清空失败');
          }
        })
      },
    });
  }

  DetelData = (params) =>{
    DeleDataSubmitRecPoints(params).then(res => {
      const re = JSON.parse(res);
      if(re.status === 200){
        message.success('删除数据成功');
        this.GetExelData();
      }else{
        message.success('删除数据失败');
      }
    })
  }

  selectedRowKeys = (selectedRowKeys, selectedRows) => {
    this.setState({
      withDrawList: selectedRows
    });
  }

  Download = () => {
    window.open('/批量扣分.xlsx');
  }

  render() {
    const {uploading, fileList, tableData, buttonData , dataVisib} = this.state;
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
    const rowSelection = {
      onChange: this.selectedRowKeys
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col span={3}>
              <Button
                type="dashed"
                onClick={this.Download}
                style={{ marginRight: 5 }}
              >
                <Icon type="file-text" theme="outlined" />{'模板下载'}
              </Button>
            </Col>
            <Col span={5}>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传文件
                </Button>
              </Upload>
            </Col>
            <Col span={6}>
              <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginLeft: 16 }}
              > 
                {uploading ? '上传中' : '开始上传' }
              </Button>
            </Col>
            <Col span={10}>
              <Button
                type="primary"
                onClick={this.GetUploadExec}
                style={{ marginLeft: 16 }}
              >
                {'显示上传的数据'}
              </Button>
            </Col>
          </Row>
          <div style={{display: dataVisib ? '' : 'none'}}>
            <Row>
              <Col>
                <div className={styles.addButton}>
                  <HeadFootButton buttonData={buttonData} />
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        <Table
          style={{display: dataVisib ? '' : 'none'}}
          columns={tableData.columns}
          dataSource={tableData.data} 
          bordered
          rowSelection={rowSelection}
        />
      </PageHeaderWrapper>
    )
  }
}

export default InterUpload;