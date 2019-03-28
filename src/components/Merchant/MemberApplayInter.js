/* eslint-disable no-script-url */
import React from 'react';
import { 
    Modal,
    Table,
    Row,
    Col,
    Tag,
    message
  } from 'antd';
  import {
      GetBatchIdList, 
      GetBatchMerchantList, 
      SendInterApplyOk,
      SendInterApplyCancel} from '@/services/api';
  import styles from './MemberApplayInter.less';

  class MemberApplayData extends React.Component{
      
    constructor(props) {
        super(props);
        // 批次号数据
        const batchList = {
            columns:[
                {title: '商户编号',key: 'merchantId',dataIndex: 'merchantId',width: 100}, 
                {title: '批次编号',key: 'batchId',dataIndex: 'batchId'}, 
                {title: '该批次操作人的编号',key: 'userId',dataIndex: 'userId'},
                {title: '该批次发分的总条数',key: 'usersNum',dataIndex: 'usersNum'}, 
                {title: '该批次发分的总分数',key: 'points',dataIndex: 'points'},  
                {title: '数据状态',key: 'importStatus',dataIndex: 'importStatus',render: importStatus => (
                  <span>
                    {
                      (
                        importStatus=>{
                            switch(importStatus){
                                case 1: return  <Tag color='geekblue'>已审核</Tag>
                                case 2: return  <Tag color='geekblue'>未提交</Tag>
                                case 3: return  <Tag color='geekblue'>发分失败</Tag>
                                case 4: return  <Tag color='geekblue'>正在发分</Tag>
                                default:
                            }
                        }
                        )(importStatus)
                    }
                   
                  </span>
                )},
                {title: '操作',dataIndex: 'action',render: (texts, records) => (
                  <span>
                    <a href="javascript:void(0)" onClick={()=> {this.onHangBatchOk(texts, records)}}>确认</a> | 
                    <a href="javascript:void(0)" onClick={()=> {this.onHangBatchCaner(texts, records)}}>拒绝</a>
                  </span>)}
            ],
            data: []
        };
      
        const memberList = {
            columns:[
                {title: '商户编号',key: 'merchantId',dataIndex: 'merchantId',width: 100}, 
                {title: '会员编号',key: 'userId',dataIndex: 'userId'}, 
                {title: '商户名称',key: 'memberName',dataIndex: 'userId'},
                {title: '电话',key: 'mobile',dataIndex: 'usersNum'}, 
                {title: '积分',key: 'points',dataIndex: 'points'}
            ],
            data:[]
        }
       
        this.state={
            visible: false,
            batchList,
            merchantId: null,
            limit: 5,
            page: 1,
            count: 1,
            memberList,
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
            memberInfo
        }
        this.getDataHttp(params);
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
        const {batchList} = this.state;
        batchList.data = [];
        GetBatchIdList(params).then(res => {
            if(res.status === 200 && res.data.result){
                res.data.result.forEach((item) => {     
                    const batch = {};              
                    batch.batchId = item.batchId ;
                    batch.merchantId = item.merchantId ;
                    batch.userId = item.userId ;
                    batch.usersNum = item.usersNum ;
                    batch.points = item.points ;
                    batch.importStatus = item.importStatus ;
                    batch.key =  batch.batchId;
                    batchList.data.push(batch);
                });
                this.setState({
                    batchList,
                    count:  res.data.count
                });
            }
        })
    }

    resgetDataHttp = () => {
        const {limit, merchantId } = this.state;
        const params = {
            merchantId,
            limit, 
            page: 1,
        }
        this.getDataHttp(params);
    }

    getMermenchData = (params) => {
        const {memberList} = this.state;
        memberList.data = [];
        GetBatchMerchantList(params).then(res => {
            if(res.status === 200){
                const member = {};
                res.data.result.forEach(item =>{
                    member.merchantId = item.merchantId ;
                    member.userId = item.userId ;
                    member.memberName = item.memberName ;
                    member.mobile = item.mobile ;
                    member.points = item.points ;
                    memberList.data.push(member);
                })
                this.setState({
                    memberList,
                });
            }
        })
    }

    onHangBatchOk = (texts, records) =>{
        const params = {
            merchantId: records.merchantId,
            batchId: records.batchId
        }
        SendInterApplyOk(params).then(res => {
            if(res.status === 200){
                this.resgetDataHttp();
                message.info('发分成功');
            }else{
                message.error('发分失败');
            }
        })
    }

    onHangBatchCaner =  (texts, records) =>{
        const params = {
            merchantId: records.merchantId,
            batchId: records.batchId
        }
        SendInterApplyCancel(params).then(res=>{
            if(res.status === 200){
                message.info('取消成功');
            }else{
                message.error('取消失败');
            }
        })
    }

    onHangonDoubleClick = (e, records) => {
        const params = {
            batchId:  records.batchId
        }
        this.getMermenchData(params);
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

    render () {
        const {visible, batchList, count, limit, memberList} = this.state;

        return(
          <Modal
            title='上传数据待审核'
            transparent
            width={1300}
            style={{ top: 100}}
            maskClosable={false}
            visible={visible}
            onCancel={this.onClose}
            onOk={this.onClose}
          >
            <Row>
              <Col>
                <h4>批次号列表：</h4>
                <Table 
                  columns={batchList.columns} 
                  dataSource={batchList.data}
                  onRow={(records) => {
                    return {
                      onDoubleClick: (event) => {this.onHangonDoubleClick(event, records)},
                    };
                  }}
                  pagination={{
                    pageSize: limit ,
                    total: count,
                    onChange: this.onChangePage
                }}
                />
              </Col>
              <Col>
                <h4>批次号内数据：(注：双击批次号可查看对应批次号内数据)</h4>
                <Table 
                  columns={memberList.columns} 
                  dataSource={memberList.data}
                  pagination={{
                    pageSize: limit ,
                }}
                />
              </Col>
            </Row>
          </Modal>
          
        )
    }
  }

  export default MemberApplayData;