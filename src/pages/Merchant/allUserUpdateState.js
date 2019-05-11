/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Radio,
  Modal,
  message
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {Table2} from '@/components/TableList/TableListPage';
import {WaterDetails} from '@/components/Finance';
import {statuesRend, hreRend} from '@/utils/renderUtils';
import {getMerchantListApi, changeUserStatus, gerMerchantHuiInfo} from '@/services/api';
import {timeChangData} from '@/utils/utils';
import styles from './Info.less';

const RadioGroup = Radio.Group;

@connect()
class List extends React.Component {
  constructor(props){
    super(props);
    const option = [];
    const STATUSITEMS = [
        {key: 0, describe: ['green', '未激活']},
        {key: 1, describe: ['green', '可用']},
        {key: 2, describe: ['red', '冻结']}
      ]
    const formData = [
      {type: 'SelectCompone', label: '商户：', style:{width: '198px'},name: 'q_merchantName_like', options: option},
      {type: 'InputIcon' ,label: '用户名称', name: 'q_userName_like', ruless:[] , placeholder: '用户名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '用户手机号码', name: 'q_userPhoneNo_like', ruless:[] , placeholder: '用户手机号码', typeIco: 'user'}
    //   {type: 'SelectDateRang' ,label: '时间', name: 'rechargeTime', ruless:[] , placeholder: '时间', typeIco: 'book'},
    ];
    const buttonDatas = [
        {type: 'primary', ico: '', hangClick: this.updateStatue, labe: '更改状态'},
      ];
    const tableData = {columns:
      [
        // {title: '流水编号', dataIndex: 'id', key: 'id'},
        {title: '序号', dataIndex: 'xh', key: 'xh'},
        {title: '商户名', dataIndex: 'MerchantName', key: 'MerchantName'},
        {title: '用户ID', dataIndex: 'UserId', key: 'UserId'},
        {title: '用户balanceId', dataIndex: 'balanceId', key: 'balanceId'},
        {title: '用户名', dataIndex: 'UserName', key: 'UserName'},
        {title: '手机号', dataIndex: 'Mobile', key: 'Mobile'},
        {title: '状态', dataIndex: 'Status', key: 'Status',render: statue => {
            return statuesRend(statue, STATUSITEMS)
          }},
        {title: '创建时间', dataIndex: 'CreatedAt', key: 'CreatedAt'},
        // {title: '变动前账户冻结余额', dataIndex: 'afterBlock', key: 'afterBlock'},
        // {title: '冻结余额变动数额', dataIndex: 'blockAmount', key: 'blockAmount'},
        // {title: '变动后账户冻结余额', dataIndex: 'afterBlock', key: 'afterBlock'},
        // {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt'},
        // {title: '详情', dataIndex: 'find', key: 'find', render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeDetails(texts, record)}}>查看</a>)},
      ],
      data:[]
    };
  
    this.state = {
      formData,
      buttonData: buttonDatas,
      tableData,
      params:{
        username: '',
        userPhoneNo: '',
        merchantId: '',
        page:1,
        page_size: 20,
        totalCount: 0,
      }
    }
  }
  
  componentWillMount () {
    const {formData} = this.state;
    const option = [];
    getMerchantListApi().then(res => {
      if(res.status===200 && res.data.data){
          res.data.data.forEach(elem => {
              option.push({
                  value: elem.MerchantName,
                  label: elem.MerchantName,
                  key: elem.MerchantId
              });
          })
          formData[0].options = option
          this.setState({
              formData,
              RadioValue: 1
          })
      }
    })
  }

  onHangeDetails = (texts, record) => {
    this.WaterDetails.showModal(record.id);
  }



  getData = (params) => {
    const {tableData} = this.state;
    const param = {
      ...params,
      count: params.page_size
    }
    tableData.data = [];
    if(!param.q_merchantName_like) return
  
    gerMerchantHuiInfo(param).then(res => {
      if(res.status ===200 && res.data.total){
        res.data.data.forEach(element => {
          const d = {
            ...element,
            balanceId: element.Balances[0].balanceId,
            key: element.UserId
          }
          tableData.data.push(d);
        });
        this.setState({
          params:{
            ...params,
            totalCount: res.data.total
          },tableData})
      }
    })
  }

  updateStatue = () => {
    const {RadioValue, selectUserData} = this.state;
    const params = {
        status: RadioValue,
        list: '',
    }

    if (selectUserData !== null){
        selectUserData.forEach(ele => {
            params.list = `${params.list},${ele.balanceId}`;
        })
       
       changeUserStatus(params).then(res => {
           if(res.status===200) {
              message.info("修改成功")
              this.ResSet();
            }
       })

      }else{
        Modal.error({
          title: '商户修改错误',
          content: '请先选择商户信息，再进行修改...',
        })
    }
  }

  ResSet = () =>{
    const {tableData} = this.state;
    tableData.data = [];
    this.setState({tableData});
  }

  handleSubmit = (values) => {
    const {params} = this.state;
    this.getData({
      ...params,
      ...values
    });
  }

  getCheckUser = (selectedRowKeys, selectedRows) => {
    this.setState({selectUserData: selectedRows});
  }

  onRadioGroup = (v) =>{
    this.setState({RadioValue:  v.target.value});
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { formData, tableData, params, buttonData, RadioValue} = this.state;
    const rowSelection = {
        onChange: this.getCheckUser
      };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch 
                formData={formData} 
                getData={this.getData}
                form={this.props.form} 
                handleSubmit={this.handleSubmit} 
                getFieldDecorator={getFieldDecorator} 
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.addButton}>
                <RadioGroup onChange={this.onRadioGroup} value={RadioValue}>
                  <Radio value={0}>未激活</Radio>
                  <Radio value={1}>正常</Radio>
                  <Radio value={2}>冻结</Radio>
                </RadioGroup>
                <HeadFootButton buttonData={buttonData} />
              </div>
            </Col>
          </Row>
        </Card>
        <Table2
          tableData={tableData}
          rowSelection={rowSelection}
          params={params}
          getData={this.getData}
          // scroll={{ x: 1200 }}
        />
        <WaterDetails ref={c => {this.WaterDetails = c}} />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;