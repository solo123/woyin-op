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
import {ModalInfo} from '@/components/ModalInfo';
import {MemberUpdateStatue} from '@/components/Merchant';
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
    ];
    const buttonDatas = [
        {type: 'primary', ico: '', hangClick: this.updateStatue, labe: '更改状态'},
      ];
    const tableData = {columns:
      [
        {title: '序号', dataIndex: 'xh', key: 'xh'},
        {title: '商户名', dataIndex: 'MerchantName', key: 'MerchantName'},
        {title: '用户ID', dataIndex: 'UserId', key: 'UserId'},
        // {title: '用户balanceId', dataIndex: 'balanceId', key: 'balanceId'},
        {title: '用户名', dataIndex: 'UserName', key: 'UserName'},
        {title: '手机号', dataIndex: 'UserPhoneNo', key: 'UserPhoneNo'},
        {title: '状态', dataIndex: 'Status', key: 'Status',render: statue => {return statuesRend(statue, STATUSITEMS)}},
        // {title: '帐户状态', dataIndex: 'balanceStatus', key: 'balanceStatus',render: statue => {return statuesRend(statue, STATUSITEMS)}},
        {title: '创建时间', dataIndex: 'CreatedAt', key: 'CreatedAt'},
        // {title: '查看帐户', dataIndex: 'UserName', key: 'UserName'},
        {title: '详情', dataIndex: 'find', key: 'find', render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeBallertDetails(texts, record)}}>查看帐户</a>)},
      ],
      data:[]
    };
  
    this.state = {
      formData,
      buttonData: buttonDatas,
      tableData,
      selectUserData: null,
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

  onHangeBallertDetails = (texts, record) => {
    this.MemberUpdateStatue.showModal(record);
    // record.Balances
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
      let i = 0;
      if(res.status ===200 && res.data.total){
        res.data.data.forEach(element => {
          i+=1;
          const d = {
            ...element,
            balanceId: element.Balances[0].balanceId,
            key: element.UserId,
            xh: i
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
    const {selectUserData} = this.state;

    if (selectUserData !== null){
      const info = {};
     
      info.title = '你确认要修改以下成员状态为冻结？？';
      info.content = selectUserData.map(item => (<p>{item.UserName}</p>))

      this.ModalInfo.showModal(info);

      }else{
        Modal.error({
          title: '商户修改错误',
          content: '请先选择商户信息，再进行修改...',
        })
    }
  }

  updateStatueOk = () =>{
    const {selectUserData, RadioValue} = this.state;
    let list = "";
    const params = new FormData();
    params.append("status", RadioValue);


    for(let i =0; i < selectUserData.length; i+=1){
      if(i === 0)
        list = `${selectUserData[i].balanceId}`;
      else
      list =  `${params.list},${selectUserData[i].balanceId}`;
    }
    console.log(params);
    
    // selectUserData.forEach(ele => {
    //   params.list = `${params.list},${ele.balanceId}`;
    // })
    params.append("list", list);
    
    changeUserStatus(params).then(res => {
           if(res.status===200) {
              message.info("修改成功")
              this.ResSet();
            }
    })
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
          {/* <Row>
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
          </Row> */}
        </Card>
        <Table2
          tableData={tableData}
          rowSelection={rowSelection}
          params={params}
          getData={this.getData}
          // scroll={{ x: 1200 }}
        />
        <WaterDetails ref={c => {this.WaterDetails = c}} />
        <ModalInfo ref={c => {this.ModalInfo = c}} onOk={this.updateStatueOk} />
        <MemberUpdateStatue ref={c => {this.MemberUpdateStatue = c}} />
      </PageHeaderWrapper>
    )
  }
}
const Lists = Form.create({ name: 'list' })(List);
export default Lists;