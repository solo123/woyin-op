/* eslint-disable no-script-url */
import React, { Component } from 'react';
import { connect } from 'dva';
import { 
  Row, 
  Col,
  Card,
  Form,
  message,
  Modal
} from 'antd';

import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table2} from '@/components/TableList/TableListPage';
import RoleSet from '@/components/System/Role-set';
import RoleUser from '@/components/System/Role-user';
import {GetRoleList, RoleDele} from '@/services/api';
import RoleAdds from '@/components/System/RoleAdd';
import UserList from '@/components/System/UserList';
import styles from './Role.less';

const component = {};
let buttonData = null;
let formData = null;
@connect(({ ModalStatue}) => ({
  ModalStatue,
}))
class SearchList extends Component {
  constructor(props) {
    super(props);
    const tableData = {
      columns: [
        // {title: '商户登录帐户', dataIndex: 'MerchantId', key: 'MerchantId'},
        {title: '角色编号', dataIndex: 'RoleId', key: 'RoleId'},
        {title: '角色名称', dataIndex: 'RoleName', key: 'RoleName'},
        {title: '创建日期', dataIndex: 'CreatedAt', key: 'CreatedAt'},
        {title: '操作', dataIndex: 'find', key: 'find', render: (texts, record) => (
          <span>
            <a href="javascript:void(0)" onClick={()=> {this.onHangRoleUser(texts, record)}}>成员</a>  ｜ 
            <a href="javascript:void(0)" onClick={()=> {this.onHangeEdit(texts, record)}}>权限</a>
          </span>
          )},
      ],
      data: []
    }
    const option = [
      {value: '1',label: '正常'}, 
      {value: '0',label: '禁用'}
    ];
    formData = [
      {type: 'InputIcon' ,label: '角色编号', name: 'ResourceId', ruless:[] , placeholder: '角色名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '角色名称', name: 'ResourceName', ruless:[] , placeholder: '角色名称', typeIco: 'user'},
      {type: 'InputIcon' ,label: '创建日期', name: 'CreatedAt', ruless:[] , placeholder: '创建日期', typeIco: 'book'},
     
    ];
    buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddRole, labe: '添加'},
      {type: 'primary', ico: 'edit', hangClick: this.onHangeDele, labe: '删除'},
    ]
    this.state = {
      tableData,
      param: {
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

  componentDidMount() {

  }

  onHangeEdit = (e) =>{
    this.RoleSet.onShow();
    console.log('编辑');
  }

  handRoleAdd = () =>{

  }

  onHangRoleUser = (texts, record) =>{
    this.RoleUser.onShow(record);
  }

  handDele = (e) => {
    
  }

  handRoleSet = (texts, record) => {
    this.RoleSet.onShow();
  }

  onHangeDele = () => {
    const {selectUserData} = this.state;
   
    if (selectUserData !== null){
      selectUserData.forEach(item => {
        RoleDele(item.RoleId).then(res => {
          message.info('删除数据成功');
          this.Reset();
          })
      })
    }else{
      Modal.error({
        title: '错误',
        content: '请先选择信息，再进行删除！',
      })
    }
  }

  Reset = ()=>{
    const params = {};
    this.getData(params);
  }

  handRoleUser = () => {
    this.RoleUser.onShow();
  }

  handAddRole = (e) => {
    e.preventDefault();
    this.roleAdds.onShow();
  }

  getData = (params) => {
    const {tableData} = this.state;
    const param = {
      ...params,
      page_size: params.page_size,
    }
    tableData.data = [];
    GetRoleList(param).then(res=>{
      
        if(res.status === 200 && res.data){
          const merchantList = [];
          for(let i = 0; i <  res.data.length; i+=1){
            const merch = {
              ... res.data[i],
              key: res.data[i].RoleId
            };
            merchantList.push(merch);
          }
          tableData.data = merchantList;
        }
    
        this.setState({
          tableData,
          param: {
            ...params,
            totalCount: res.data.total
          }
        }
        );
    });
  }

  handEdit = (e) => {
    e.preventDefault();
  }

  Reset = () => {
    const {param} = this.state;
    this.getData(param);
  }

  getCheckUser = (selectedRowKeys, selectedRows) => {
    this.setState({selectUserData: selectedRows});
  }

  render() {
    // const { match, children, location } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {tableData, param} = this.state;

    const rowSelection = {
      onChange: this.getCheckUser,
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // eslint-disable-next-line react/destructuring-assignment
      this.props.form.validateFields((err, values) => {
        if(!err){
          console.log('Received values of form: ', values);
        }
      })
    }
 
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          {/* <Row>
            <Col>
              <HeadFormSearch formData={formData} handleSubmit={handleSubmit} getFieldDecorator={getFieldDecorator} />
            </Col>
          </Row> */}
          <Row>
            <Col>
              <div>
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
          // scroll={{ x: 1300 }}
        />
        <RoleAdds ref={(c) => {this.roleAdds = c;}} Reset={this.Reset} form={this.props.form} />
        {/* <RoleAddOrUpdate ref={(c) => {this.RoleAddOrUpdate = c}} /> */}
        <RoleSet ref={(c) => { this.RoleSet = c; }} />
        <RoleUser ref={(c) => {this.RoleUser = c;}} />

      </PageHeaderWrapper>
      
    );
  }
}
const SearchLists = Form.create({ name: 'SearchList' })(SearchList);
export default SearchLists;
