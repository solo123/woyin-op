/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  message,
  Tag
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {withdrawList, withdrawApplay} from '@/services/api';
import {timeToYmdH} from '@/utils/utils';
import styles from './InterSubmit.less';

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [
        {value: '10',label: '新建',}, 
        {value: '11',label: '受理成功',},
        {value: '12',label: '处理成功',},
        {value: '13',label: '失败',},
        {value: '14',label: '待审核',},
        {value: '15',label: '审核通过',},
        {value: '16',label: '审核拒绝',},
        {value: '17',label: '确认',},
    ];
    const formDatas = [
      {type: 'SelectCompone', label: '状态：', name: 'state', options: option, defaultValue: '新建'},
     ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.handWithDrawAppaly, labe: '充值审核'},
    //   {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '导出'}
    ];
    const tableData = {columns: 
      [
        // {title: '订单id', dataIndex: 'orderId', key: 'orderId', width: 120},
        // {title: '用户id', dataIndex: 'userId', key: 'userId'},
        // {title: '商户id', dataIndex: 'merchantId', key: 'merchantId', width: 180},
        // {title: '外部订单id', dataIndex: 'exOrderN0', key: 'exOrderN0', width: 160},
        // {title: '所属类型', dataIndex: 'objTypeform', key: 'objTypeform', width: 160},
        // {title: '银行代号', dataIndex: 'bankCode', key: 'bankCode'},
        {title: '银行名称', dataIndex: 'bankName', key: 'bankName'},
        {title: '银行卡号', dataIndex: 'bankCard', key: 'bankCard'},
        {title: '持卡人姓名', dataIndex: 'cardHoldName', key: 'cardHoldName'},
        {title: '持卡人手机号', dataIndex: 'userPhoneNo', key: 'userPhoneNo'},
        {title: '提现渠道', dataIndex: 'channelId', key: 'channelId'},
        {title: '提现金额', dataIndex: 'amount', key: 'amount'},
        {title: '状态', dataIndex: 'status', key: 'status',render: status => (
          <span>
            {
              (
                status=>{
                    switch(status){
                        case 10: return  <Tag color='geekblue'>新建</Tag>
                        case 11: return  <Tag color='geekblue'>受理成功</Tag>
                        case 12: return  <Tag color='geekblue'>处理成功</Tag>
                        case 13: return  <Tag color='geekblue'>失败</Tag>
                        case 14: return  <Tag color='geekblue'>待审核</Tag>
                        case 15: return  <Tag color='geekblue'>审核通过</Tag>
                        case 16: return  <Tag color='geekblue'>审核拒绝</Tag>
                        case 17: return  <Tag color='geekblue'>确认</Tag>
                        default:
                    }
                }
                )(status)
            }
           
          </span>
        )},
        {title: '手续费', dataIndex: 'poundage', key: 'poundage'},
        {title: '更新时间', dataIndex: 'updateTime', key: 'updateTime'},
        {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
        // {title: '提现发起人姓名', dataIndex: 'userName', key: 'userName', width: 140},
        // {title: '审核人id', dataIndex: 'auditUser', key: 'auditUser', width: 80},
        // {title: '审核人姓名', dataIndex: 'auditUserName', key: 'auditUserName', width: 80},
        // {title: '备注信息', dataIndex: 'remark', key: 'remark', width: 80},
     ],
     data: []
    };
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
      tableData,
      limit: 10,
      count: 1,
      page: 1,
      withDrawList: [],
      params:{
        status: 10,
        page: 1,
        limit: 10,
      }
    }
  }
  
  componentWillMount () {
    const param = {
        status: 10,
        limit: this.state.limit,
        page: this.state.page
    }
    this.getData(param);
  }

  getData = (param) => {
    const {tableData} = this.state;
    tableData.data = [];
    withdrawList(param).then(res => {
      if(res.status === 200){
       res.data.withdrawal.forEach(item => {
          const order = {};
          order.key = item.orderId;
          order.userId = item.userId;
          order.merchantId = item.merchantId;
          order.exOrderN0 = item.exOrderN0;
          order.objTypeform = item.objTypeform;
          order.channelId = item.channelId;
          order.amount = item.amount;
          order.status = item.status;
          order.poundage = item.poundage;
          order.userName = item.userName;
          order.auditUser = item.auditUser;
          order.auditUserName = item.auditUserName;
          order.remark = item.remark;
          order.bankCode = item.bankCode;
          order.bankName = item.bankName;
          order.bankCard = item.bankCard;
          order.cardHoldName = item.cardHoldName;
          order.userPhoneNo = item.userPhoneNo;
          order.updateTime = timeToYmdH(item.updateTime);
          order.createTime = timeToYmdH(item.createTime);     
          tableData.data.push(order);
        });
        this.setState({
          tableData,
          count: res.data.count,
        })
      }
    })
  }

  onChangePage = (page) =>{
    const {params} = this.state;
      params.page = page;
      this.getData(params);
  }
  
  handWithDrawAppaly = (e) => {
    const {withDrawList} = this.state;
    if(withDrawList.length <= 0) return;
    withDrawList.forEach(item => {
        const params = {
          bankCard: item.bankCard,
          bankCode: item.bankCode,
          bankName: item.bankName,
          bankcardtype: 1,// item.bankcardtype,
          cardHoldName: item.cardHoldName,
          amount: item.amount,
          orderId: item.key,
          idNo: item.idNo,
          state: true
        }
    withdrawApplay(params).then(res => {
        if(res.status === 200){
            message.info('审核通过');
        }else{
            message.error('审核失败');
        }
    });
    })
  }

  selectedRowKeys = (selectedRowKeys, selectedRows) => {
    this.setState({
        withDrawList: selectedRows
    });
  }

  handEdit = (e) => {
    e.preventDefault();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const params = {
          status: values.state,
          limit: this.state.limit,
          page: this.state.page
        };
        this.getData(params);
        this.setState({
          params
        })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, buttonData, tableData, count, limit } = this.state;
    const rowSelection = {
      onChange: this.selectedRowKeys
    };
    this.props.form.getFieldDecorator('state', {initialValue: '新建'})
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch formData={formData} handleSubmit={this.handleSubmit} getFieldDecorator={getFieldDecorator} />
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
        <Table
          columns={tableData.columns}
          dataSource={tableData.data} 
          bordered
          rowSelection={rowSelection}
          pagination={{
            pageSize: limit ,// 每页的条数
            total: count,
            onChange: this.onChangePage
           }}
          scroll={{ x: 1300 }}
        />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;