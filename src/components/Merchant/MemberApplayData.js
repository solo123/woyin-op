import React from 'react';
import { 
    Modal,
    Table,
    Row,
    Col,
    Button,
    Tag,
    message
  } from 'antd';
  import {UploadInterView, SubmintExcekData, SubmintExceCancel} from '@/services/api';
  import styles from './MemberApplayData.less';

  class MemberApplayData extends React.Component{
      
    constructor(props) {
        super(props);    
        const palyInfo = {
          columns:[
            {title: '商户编号',key: 'merchantId',dataIndex: 'merchantId', render:this.rowRander}, 
            {title: '操作人编号',key: 'userId',dataIndex: 'userId', render: this.rowRander}, 
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
            palyInfo,
            merchantId: null,
            limit: 8,
            page: 1,
            count: 1
        }
    }

    int = (memberInfo) => {
        this.setState({
          merchantId: memberInfo.key
        })
        const {limit, page} = this.state;
        const params = {
          merchantId: memberInfo.key,
          limit, 
          page,
        }
        this.getDataHttp(params);
    }

    rowRander = (value, row, index) => {
        const {limit, count} = this.state;
        const obj = {
          children: value,
          props: {},
        };
          const start = 0;
          const end = limit;
          if (index === start) {
            obj.props.rowSpan = limit;
          }
          // These two are merged into above cell
          if (index > start && index <=end) {
            obj.props.rowSpan = 0;
          }
          return obj;
    }

    onChangePage = (page) => {
        const {limit, merchantId} = this.state;
        const params = {
          merchantId,
          limit, 
          page,
        }
        this.getDataHttp(params);
    }

    getDataHttp = (params) => {
        const {palyInfo} = this.state;
        palyInfo.data = [];
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
                palyInfo,
                count: res.data.count
              })
            }
        })
    }

    // 确认数据正确
    onHangSubmit = (e) => {
        const {merchantId} = this.state;
        const params = {merchantId};
        SubmintExcekData(params).then(res => {
          if(res.status === 200){
            message.info('确认成功');
            this.onClose();
          }
        })
    }

    // 数据错误不提交
    onHangCancel = (e) => {
        const {merchantId} = this.state;
        const params = {merchantId};
        SubmintExceCancel(params).then( res => {
          if(res.status === 200){
            message.info('取消成功');
            this.onClose();
          }
        })
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
        const {visible, palyInfo, count, limit} = this.state;
        return(
          <Modal
            title='上传数据待审核'
            transparent
            width={1500}
            style={{ top: 100}}
            maskClosable={false}
            visible={visible}
            onCancel={this.onClose}
            onOk={this.onClose}
          >
            <Table 
              bordered
              columns={palyInfo.columns} 
              dataSource={palyInfo.data}
              footer={() => '总分：100  总数据：18条'}
              pagination={{
                pageSize: limit ,// 每页的条数
                total: count,
                onChange: this.onChangePage
               }}
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