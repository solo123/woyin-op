import React from 'react';
import { 
    Modal,
    Table,
    Row,
    Col,
    Button,
    Tag
  } from 'antd';
  import {UploadInterView} from '@/services/api';
  import styles from './MemberApplayData.less';

  class MemberApplayData extends React.Component{
      
    constructor(props) {
        super(props);
        const palyInfo = {
            columns:[
                {title: '商户编号',key: 'userAccount',dataIndex: 'userAccount',width: 100}, 
                {title: '操作人编号',key: 'userId',dataIndex: 'userId'}, 
                {title: '会员名称',key: 'memberName',dataIndex: 'memberName'},
                {title: '手机号',key: 'mobile',dataIndex: 'mobile'}, 
                {title: '金额',key: 'points',dataIndex: 'points'}, 
                {title: '凭证号',key: 'memo',dataIndex: 'memo'}, 
                {title: '标题',key: 'remark',dataIndex: 'remark'}, 
                {title: '数据状态',key: 'importStatus',dataIndex: 'importStatus',render: importStatus => (
                  <span>
                    <Tag color={importStatus === 2 ? 'geekblue' : 'red'} key={importStatus}>{importStatus === 2 ? '正常' : '异常'}</Tag>
                  </span>
                )}, 
                {title: '数据创建时间',key: 'createTime',dataIndex: 'createTime'}, 
            ],
            data: []
        };
        this.state={
            visible: false,
            palyInfo
        }
    }

    int = (memberInfo) => {
        const {palyInfo} = this.state;
        const params = {
            merchantId: memberInfo.key,
            limit: '',
            page: '',
        }
        UploadInterView(params).then(res => {
            if(res.status === 200){
                res.data.result.forEach(item => {
                    const user = {};
                    user.createTime = item.createTime ;
                    user.id = item.id ;
                    user.key = item.id ;
                    user.importStatus = item.importStatus;
                    user.memberName = item.memberName ;
                    user.memo = item.memo ;
                    user.merchantId = item.merchantId ;
                    user.mobile = item.mobile ;
                    user.points = item.points ;
                    user.remark = item.remark ;
                    user.sn = item.sn ;
                    user.userId = item.userId ;
                    palyInfo.data.push(user);
                });
                this.setState({
                    palyInfo
                })
            }
        })
    }

    // 确认数据正确
    onHangSubmit = (e) => {
        
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

    render () {
        const {visible, palyInfo} = this.state;
        return(
          <Modal
            title='上传数据待审核'
            transparent
            width={1000}
            style={{ top: 100}}
            maskClosable={false}
            visible={visible}
            onCancel={this.onClose}
            onOk={this.onClose}
          >
            <Table 
              columns={palyInfo.columns} 
              dataSource={palyInfo.data}
            />
            <Row>
              <Col className={styles.buttonGroup}>
                <Button type="primary" onClick={this.onHangSubmit}>提交</Button>
                <Button onClick={this.onHangSubmit}>拒绝</Button>
              </Col>
            </Row>
          </Modal>
          
        )
    }
  }

  export default MemberApplayData;