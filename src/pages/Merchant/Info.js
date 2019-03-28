import React, { Component } from 'react';
import { connect } from 'dva';
import { 
  Table,
  Row, 
  Col,
  Card
} from 'antd';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {getMerchantListApi} from '@/services/api';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Info.less';

@connect()
class SearchList extends Component {
  constructor(props){
    super(props);
    const option = [{
      value: '1',
      label: '正常',
    }, {
      value: '0',
      label: '禁用',
    }];
    const formDatas = [
      {type: 'InputIcon' ,label: '商户登录帐户', name: 'userAccount', ruless:[] , placeholder: '商户登录帐户', typeIco: 'user'},
      {type: 'InputIcon' ,label: '商户名称', name: 'merchantName', ruless:[] , placeholder: '角商户名称色编码', typeIco: 'book'},
      {type: 'InputIcon' ,label: '用户手机号码', name: 'merchantName', ruless:[] , placeholder: '角商户名称色编码', typeIco: 'book'},
      {type: 'InputIcon' ,label: '用户名称', name: 'merchantName', ruless:[] , placeholder: '角商户名称色编码', typeIco: 'book'},
      // {type: 'InputIcon' ,label: '手机号', name: 'phoneNum', ruless:[] , placeholder: '手机号', typeIco: 'book'},
      // {type: 'SelectCompone', label: '状态：', name: 'status', options: option}
    ];
    const buttonDatas = [
      {type: 'primary', ico: 'plus', hangClick: this.handAdd, labe: '添加'},
      // {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '修改'},
      // {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '冻结/解冻'},
    ];
    const tableData = {
      columns: [
        {title: '用户名', dataIndex: 'logo', key: 'logo'},
        {title: '用户手机号码', dataIndex: 'name', key: 'name'},
        {title: '用户昵称', dataIndex: 'site', key: 'site'},
        {title: '用户备注', dataIndex: 'linkman', key: 'linkman'},
        {title: '用户冻结时间', dataIndex: 'phone', key: 'phone'},
        {title: '用户更新时间', dataIndex: 'telephone', key: 'telephone'},
        {title: '状态', dataIndex: 'statue', key: 'statue'},
        {title: '用户组创建时间', dataIndex: 'creatertime', key: 'creatertime'},
    //     {title: '冻结时间', dataIndex: 'freezing', key: 'freezing'},
    //     {title: '解冻时间', dataIndex: 'unfreezing', key: 'unfreezing'},
    //     {title: '详情', dataIndex: 'find', key: 'find', render: (texts, record) => (<a href="javascript:void(0)" onClick={()=> {this.onHangeDetails(texts, record)}}>详情</a>)},
    //     {title: '操作', dataIndex: 'action', key: 'action',fixed: 'right', 
    //      render: (texts, record) => (
    //        <span>
    //          <a href="javascript:void(0)" onClick={()=> {this.onHangInter(texts, record)}}>上传会员积分</a> | 
    //          <a href="javascript:void(0)" onClick={()=> {this.onHangApplayData(texts, record)}}>上传数据审核</a> | 
    //          <a href="javascript:void(0)" onClick={()=> {this.onHangApplayInter(texts, record)}}>会员发分审核</a>
    //        </span>)},
      ],
     data: []
    }
    this.state = {
      formData: formDatas,
      buttonData: buttonDatas,
      tableData,
      selectUserData: null,
      limit: 10,
      count: 0,
      param: {
        userAccount: '',
        merchantName: '',
        phoneNum: '',
        status: '',
      }
    }
  }

  componentWillMount() {
    // To disabled submit button at the beginning.
  }

  handleSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  onChange(value) {
    console.log(value);
  }

  render() {
    const { getFieldDecorator } = this.props.form; 
    const {tableData} = this.state;
    const { formData, buttonData, limit, count } = this.state;
    const rowSelection = {
      type: 'radio',
      onChange: this.getCheckUser
    };
    return (
      
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch formData={formData} handleSubmit={this.handleSubmit} form={this.props.form} getFieldDecorator={getFieldDecorator} />
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
          scroll={{ x: 1600 }}
          pagination={{
            pageSize: limit ,// 每页的条数
            total: count,
            onChange: this.onChangePage
           }}
        />
       
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
