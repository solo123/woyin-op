/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-script-url */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Modal,
  message
} from 'antd'
import {
  MerchantAddOrUpdate, 
  MemberUpload, 
  InterUpload,
  MerchantInfo, 
  MemberApplayInter,
  MemberApplayData, 
  MerchantWall} from '@/components/Merchant';
import {routerRedux} from 'dva/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {getMerchantListApi, FeezeMerchant} from '@/services/api';
import {statuesRend, hreRend} from '@/utils/renderUtils';
import {Table2} from '@/components/TableList/TableListPage';
import {timeChangData} from '@/utils/utils';
import LocalStr from '@/utils/LocalStr';
import styles from './List.less';

@connect(({ merchant, loading }) => ({
  merchant,
  submitting: loading.effects['merchant/setMerchant'],
}))
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: '1',label: '可用'}, 
      {value: '2',label: '冻结'}
    ];
    const formDatas = [
      // {type: 'InputIcon',label: '商户登录帐户', name: 'userAccount', ruless:[] , placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon',label: '商户名称', name: 'q_merchantName_like', ruless:[] , placeholder: '商户名称', typeIco: 'book'},
      {type: 'InputIcon',label: '手机号', name: 'q_mobile_like', ruless:[], placeholder: '手机号', typeIco: 'book'},
      {type: 'SelectCompone', label: '状态：', style:{width: '198px'}, name: 'q_status_eq', options: option}
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.handAdd, labe: '添加'},
      {type: 'primary', hangClick: ()=>{this.handFeezeMerchant(2)}, labe: '冻结商户'},
      {type: 'primary', hangClick: ()=>{this.handFeezeMerchant(1)}, labe: '解冻商户'}
    ];
    const STATUSITEMS = [
      {key: 1, describe: ['green', '可用']},
      {key: 2, describe: ['red', '冻结']}
    ]
    const hreReng = [
      {onClick: this.onHangMerchantWall, label: '商户钱包'}
    ]
    const tableData = {
      columns: [
        {title: '序号', dataIndex: 'xh', key: 'xh'},
        {title: '商户名称', dataIndex: 'MerchantName', key: 'MerchantName'},
        {title: '商户地址', dataIndex: 'MerchantAddr', key: 'MerchantAddr'},
        {title: '联系人', dataIndex: 'Contact', key: 'Contact'},
        {title: '手机号', dataIndex: 'Mobile', key: 'Mobile'},
        {title: '固定电话', dataIndex: 'Tel', key: 'Tel'},
        {title: '状态', dataIndex: 'status', key: 'status', render: statue => {
          return statuesRend(statue, STATUSITEMS)
        }},
        {title: '创建时间', dataIndex: 'CreatedAt', key: 'CreatedAt'},
        // {title: '冻结时间', dataIndex: 'freezing', key: 'freezing'},
        // {title: '解冻时间', dataIndex: 'unfreezing', key: 'unfreezing'},
        {title: '操作', dataIndex: 'find', key: 'find', 
            render: (texts, record) => (
              <span>
                <a href="javascript:void(0)" onClick={()=> {this.onHangeDetails(texts, record)}}>详情</a> ｜ 
                <a href="javascript:void(0)" onClick={()=> {this.handUpdate(texts, record)}}>修改</a>
              </span>
        )},
        // {title: '操作', dataIndex: 'action', key: 'action',fixed: 'right',width: 220, render:(texts, record)=>(hreRend(hreReng, texts, record)) },
      ],
      data: []
    }
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
      tableData,
      selectUserData: null,
      param: {
        userAccount: '',
        merchantName: '',
        phoneNum: '',
        status: '',
        page_size: 20,
        totalCount: 0,
        page: 1
      }
    }
}
  
componentWillMount (){
  const {param} = this.state;
  this.getData(param);
}

handFeezeMerchant = (operate) => {
  const {selectUserData} = this.state;
  const params = new FormData();
  if(selectUserData){
    selectUserData.forEach(item => {
      params.append("operate", operate);
      this.handFeezeMerchantApi(params, item.key);
      this.React()
    });
  }else{
    Modal.error({
      title: '错误',
      content: '请先选择商户信息，再进行操作...',
    })
  }
}

React = () => {
  const {param} = this.state;
  this.getData(param);
}

onHangMerchantWall = () => {
  this.MerchantWall.showModal();
}

handFeezeMerchantApi = (params, merchantId) => {
  FeezeMerchant(params, merchantId).then(res => {
    message.info(res.msg);
  })
}

handFeezeMerchantWallet = (texts, record) => {
 
}

handUpdate = (texts, record) => {
  const {tableData} = this.state;
  
  this.MerchantAddOrUpdate.updateData(tableData.data[parseInt(record.xh, 10)-1]);

}

onHangeDetails = (texts, record) => {
  LocalStr.set("merchantInfo", JSON.stringify(record));
  this.props.dispatch(routerRedux.push({
    pathname: '/merchant/MerchantInfo'
  }));
}

onHangApplayData = (texts, record) => {
  this.MemberApplayData.int(record);
  this.MemberApplayData.showModal();
}

onHangApplayInter = (texts, record) => {
  this.MemberApplayInter.int(record);
  this.MemberApplayInter.showModal();
}

onHangeAddUser = (texts, record) => {
  this.MemberUpload.showModal();
}

onHangInter = (texts, record) => {
  this.InterUpload.showModal(record.key);
}

handAdd = (e) => {
  e.preventDefault();
  this.MerchantAddOrUpdate.addData();
}

onHangGoPround = (texts, record) =>{
  LocalStr.set("merchantId",  record.key);
  this.props.dispatch(routerRedux.push({
    pathname: '/merchant/memberproduct',
  }));
}

handEdit = (e) => {
  e.preventDefault();
  const {selectUserData} = this.state;
  if (selectUserData !== null){
    this.MerchantAddOrUpdate.showModal(e);
  }else{
    Modal.error({
      title: '商户修改错误',
      content: '请先选择商户信息，再进行修改...',
    })
  }
}

getCheckUser = (selectedRowKeys, selectedRows) => {
  this.setState({selectUserData: selectedRows});
}

handleSubmit = (values) => {
  const param = {
    q_merchantName_like: values.q_merchantName_like,
    q_mobile_like: values.q_mobile_like,
    q_status_eq: values.q_status_eq === undefined ? '' : values.q_status_eq[0]
  }
  this.getData(param);
}

getData = (params) => {
  const param = {
    ...params,
    page_size: params.page_size,
  }
  getMerchantListApi(param).then(res=>{
    try {
      if(res.status === 200){
        const {data} = res.data;
        const merchantList = [];
        const {tableData} = this.state;
        for(let i = 0; i < data.length; i+=1){
          const merch = {
            ... data[i],
            key: data[i].MerchantId,
            statue: data[i].status,
            xh: i+1,
            CreatedAt: data[i].CreatedAt.String,
            find: data[i].id
          };
          merchantList.push(merch);
        }
        tableData.data = merchantList;
        this.setState({
          tableData,
          param: {
            ...params,
            totalCount: res.data.total
          }
        }
        );
      }
    } catch (error) {
      console.error('网络接口异常');
    }
  });
}

render () {
  const { getFieldDecorator } = this.props.form;
  const { tableData } = this.state;
  const { formData, buttonData, param } = this.state;
  const rowSelection = {
    type: 'radio',
    onChange: this.getCheckUser
  };
  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Row>
          <Col>
            <HeadFormSearch 
              getData={this.getData} 
              formData={formData} 
              handleSubmit={this.handleSubmit} 
              form={this.props.form} 
              getFieldDecorator={getFieldDecorator} 
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={styles.addButton}>
              <HeadFootButton buttonData={buttonData} />
            </div>
          </Col>
        </Row>
      </Card>
      <Table2
        tableData={tableData}
        rowSelection={rowSelection}
        params={param}
        getData={this.getData}
        scroll={{ x: 1300 }}
      />
      <MerchantAddOrUpdate ref={c => {this.MerchantAddOrUpdate = c}} />
      <MemberUpload ref={c => {this.MemberUpload = c}} />
      <InterUpload ref={c => {this.InterUpload = c}} />
      <MerchantInfo ref={c => {this.MerchantInfo = c}} />
      <MemberApplayData ref={c => {this.MemberApplayData = c}} />
      <MemberApplayInter ref={c => {this.MemberApplayInter = c}} />
      <MerchantWall ref={c => {this.MerchantWall = c}} />
    </PageHeaderWrapper>
  )
}}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;