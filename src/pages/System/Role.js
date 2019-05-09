/* eslint-disable no-script-url */
import React, { Component } from 'react';
import { connect } from 'dva';
import { 
  Row, 
  Col,
  Card,
  Form
} from 'antd';

import {RoleAddOrUpdate, RoleUser, RoleAdd} from '@/components/System';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table2} from '@/components/TableList/TableListPage';
import RoleSet from '@/components/System/Role-set';
import {GetRoleList} from '@/services/api';
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
      {type: 'InputIcon' ,label: '创建日期', name: 'CreatedAt', ruless:[] , placeholder: '创建日期', typeIco: 'book'}
    ];
    buttonData = [
      {type: 'primary', ico: 'plus', hangClick: this.handAddRole, labe: '添加'},
      // {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'},
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
    // To disabled submit button at the beginning.
   
    component.RoleSet  = this.RoleSet;
    component.RoleAddOrUpdate = this.RoleAddOrUpdate;
    component.RoleUser = this.RoleUser;
  }

  handRoleAdd = () =>{

  }

  handRoleSet = (texts, record) => {
    this.RoleSet.onShow();
  }

  handRoleUser = () => {
    this.RoleUser.onShow();
  }

  handAddRole = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: 'ModalAction/Open',
       payload: {
        SystemRole: true
       },
    });
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

  render() {
    // const { match, children, location } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {tableData, param} = this.state;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
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
              <div className={styles.addButton}>
                <HeadFootButton buttonData={buttonData} />
              </div>
            </Col>
          </Row>
        </Card>
        <Table2
          tableData={tableData}
          // rowSelection={rowSelection}
          params={param}
          getData={this.getData}
          // scroll={{ x: 1300 }}
        />
        {/* <RoleAddOrUpdate ref={(c) => {this.RoleAddOrUpdate = c}} />
        <RoleSet ref={(c) => { this.RoleSet = c; }} />
        <RoleUser ref={(c) => {this.RoleUser = c;}} /> */}
        <RoleAdd ref={(c) => {this.RoleAdds = c;}} />
      </PageHeaderWrapper>
    );
  }
}
const SearchLists = Form.create({ name: 'SearchList' })(SearchList);
export default SearchLists;
