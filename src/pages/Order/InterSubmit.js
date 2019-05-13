/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  message,
  Modal
} from 'antd';
import {withdrawList, withdrawApplay, OrderTotals} from '@/services/api';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table2} from '@/components/TableList/TableListPage';
import {ModalInfo} from '@/components/ModalInfo';
import {statuesRend} from '@/utils/renderUtils';
import {timeToYmdH} from '@/utils/utils';
import styles from './InterSubmit.less';

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: '0',label: '全部'}, 
      {value: '10',label: '新建'}, 
      {value: '11',label: '受理成功'},
      {value: '12',label: '处理成功'},
      {value: '13',label: '失败'},
      {value: '14',label: '待审核'},
      {value: '15',label: '审核通过'},
      {value: '16',label: '审核拒绝'},
      {value: '17',label: '确认'}
    ];
    const headForm = {
      formData: [
        {type: 'SelectCompone', label: '状态：',style: {width: '198px'}, name: 'q_status_eq', options: option, defaultValue: '新建'}
      ],
      buttonData: [
        {type: 'primary', hangClick: this.handWithDrawAppaly, labe: '批量转让审核'}
      ]
    }

    const STATUSITEMS = [
      {key: 10, describe: ['green','新建']},
      {key: 11, describe: ['green','受理成功']},
      {key: 12, describe: ['green','处理成功']},
      {key: 13, describe: ['green','失败']},
      {key: 14, describe: ['green','待审核']},
      {key: 15, describe: ['green','审核通过']},
      {key: 16, describe: ['green','审核拒绝']},
      {key: 17, describe: ['green','确认']},
    ]
    const tableData = {columns: [
      {title: '序号', dataIndex: 'xh', key: 'xh'},
      {title: '银行名称', dataIndex: 'bankName', key: 'bankName'},
      {title: '银行卡号', dataIndex: 'bankCard', key: 'bankCard'},
      {title: '持卡人姓名', dataIndex: 'cardHoldName', key: 'cardHoldName'},
      {title: '持卡人手机号', dataIndex: 'userPhoneNo', key: 'userPhoneNo'},
      {title: '提现渠道', dataIndex: 'channelId', key: 'channelId'},
      {title: '提现积分', dataIndex: 'amount', key: 'amount'},
      {title: '状态', dataIndex: 'status', key: 'status',render: status => (statuesRend(status, STATUSITEMS))},
      {title: '手续费', dataIndex: 'poundage', key: 'poundage'},  
      // {title: '更新时间', dataIndex: 'updateTime', key: 'updateTime'},
      {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
     ],
     data: []
    };
    this.state = {
      option,
      headForm,
      tableData,
      withDrawList: [],
      params:{
        status: 10,
        page: 1,
        page_size: 20,
        totalCount: 0
      }
    }
  }
  
  componentWillMount () {
    const {params} = this.state;
    this.getData(params);
  }

  getOrderTotals = (params) => {
    OrderTotals(params, 2).then(res => {
      console.log(res);
    })
  }

  getData = (param) => {
    const {tableData} = this.state;
    tableData.data = [];
    const params = {
      ...param,
      limit: param.pageSize
    }
    
    if(params.q_status_eq==="0") delete params.q_status_eq;
    withdrawList(params).then(res => {
      if(res.status === 200 && res.data.data){
        this.getOrderTotals(params);
        let i=0;
        res.data.data.forEach(item => {
          i+=1;
          const order = {
            ...item,
            key: item.orderId,
            // updateTime: item.createdAt,
            createTime: item.createdAt,    
            xh: i
          };    
          tableData.data.push(order);
        });
        this.setState({
          tableData,
          params:{
            ...param,
            totalCount: res.data.count
          }
         
        })
      }
    })
  }
  
  handWithDrawAppaly = (e) => {
    const {withDrawList} = this.state;
    if(withDrawList.length <= 0) {
      Modal.info({
        title: '信息提醒',
        content: '请选择要充值审核的商户',
      })
      return;
    }

    const info = {};
    info.title = '你确认要修改以下成员状态为冻结？？';
    info.content = withDrawList.map(item => (<p>【持卡人姓名】：{item.cardHoldName}  【积分】：{item.amount}</p>))

    this.ModalInfo.showModal(info);
  }

  handWithDrawAppalyOk = () =>{
    const {withDrawList} = this.state;
    withDrawList.forEach(item => {
      const params = {
        bankCard: item.bankCard,
        bankCode: item.bankCode,
        bankName: item.bankName,
        bankcardtype: 1,
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
        message.error(res.msg);
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

  handleSubmit = (values) => {
    const params = {
      q_status_eq: this.getV(values.q_status_eq),
      page_size: 20
    };
    this.getData(params);
  }

  getV = (key) => {
   const {option} = this.state;
   for(let i = 0 ; i < option.length ; i+=1){
      if(option[i].value === key || option[i].label === key){
         return option[i].value
      }
   }
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { tableData ,headForm , params} = this.state;
    const rowSelection = {
      onChange: this.selectedRowKeys
    };
    this.props.form.getFieldDecorator('state', {initialValue: '新建'})
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch 
                formData={headForm.formData} 
                handleSubmit={this.handleSubmit} 
                form={this.props.form} 
                getData={this.getData} 
                getFieldDecorator={getFieldDecorator} 
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.addButton}>
                <HeadFootButton buttonData={headForm.buttonData} />
              </div>
            </Col>
          </Row>
        </Card>
        {/* <Table
          columns={tableData.columns}
          dataSource={tableData.data} 
          bordered
          rowSelection={rowSelection}
          pagination={{
            pageSize: limit,
            total: count,
            onChange: this.onChangePage
           }}
          scroll={{ x: 1300 }}
        /> */}
        <Table2
          tableData={tableData}
          rowSelection={rowSelection}
          params={params}
          getData={this.getData}
          // scroll={{ x: 1300 }}
        />
        <ModalInfo ref={(c) => {this.ModalInfo = c}} onOk={this.handWithDrawAppalyOk} />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;