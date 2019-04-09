/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {ProductAddAndUpdate, ProductUpdate} from '@/components/Product';
import {ProductListApi, ProductDeleApi} from '@/services/api';
import {statuesRend} from '@/utils/renderUtils';
import styles from './ProductInfo.less';

@connect()
class ProductList extends React.Component {
  constructor(props){
    super(props);
    const option = [{
      value: '1',
      label: '正在销售',
    }, {
      value: '2',
      label: '停止销售',
    }];
    const headForm = {
      formData:  [
        {type: 'InputIcon', label:'产品名称', name:'productName',ruless:[], placeholder: '产品名称', typeIco: 'user'},
        {type: 'InputIcon', label:'产品现价', name:'cost',ruless:[], placeholder: '产品现价', typeIco: 'book'},
        {type: 'SelectCompone', label: '产品状态：',style: {width: '193px'}, name: 'status', options: option}
      ],
      buttonData: [
        {type: 'primary', ico: 'edit', hangClick: this.handAdd, labe: '添加'},
        // {type: 'primary', ico: 'edit', hangClick: this.handUpdate, labe: '修改'},
        {type: 'primary', ico: 'edit', hangClick: this.handDele, labe: '删除'}
      ]
    }
    const PRODUCTSTATUE = [
      {key: 1, describe: ['green', '正在销售']},
      {key: 2, describe: ['green', '停止销售']},
    ];
    const PRODUCTCAN = [
      {key: 1, describe: ['green', '支持']},
      {key: 2, describe: ['green', '不支持']},
    ];
    const tableDatas = {columns:
      [
        {title: '产品编号', dataIndex: 'productId', key: 'productId'},
        {title: '产品类型', dataIndex: 'productCategoryId', key: 'productCategoryId'},
        {title: '产品名称', dataIndex: 'productName', key: 'productName'},
        {title: '价值', dataIndex: 'cost', key: 'cost'},
        {title: '进货价', dataIndex: 'purchasePrice', key: 'purchasePrice'},
        {title: '销售价', dataIndex: 'salesPrice', key: 'salesPrice'},
        {title: '产品状态', dataIndex: 'status', key: 'status',render: status => (statuesRend(status, PRODUCTSTATUE))},
        {title: '是否支持退款', dataIndex: 'canRefund', key: 'canRefund',render: canRefund => (statuesRend(canRefund, PRODUCTCAN))},
        {title: '创建日期', dataIndex: 'createTime', key: 'createTime', },
        {title: '操作', dataIndex: 'action', key: 'action',
         render: (texts, record) => (
           <span>
             <a href="javascript:void(0)" onClick={()=> {this.handUpdate(texts, record)}}>修改</a>
           </span>)},
     ],
     datas:[]
    };
    const params = {
      productName: '',
      status: '',
      limit: 10,
      page: 1
    }
    this.state = {
      tableDatas,
      headForm,
      params,
      selectedRows: {}
    }
  }
  
  componentWillMount () {
    const {params} = this.state;
    this.getData(params);
  }

  onClick = (texts, record) => {
    console.log('xxxx');
  }

  handAdd = (e) => {
    e.preventDefault();
    this.ProductAddAndUpdate.showModal();
  }

  handDele = (e) => {
    e.preventDefault();
    const {selectedRows} = this.state;
    let le = 0;
    let er = 0;
    selectedRows.forEach(elem => {
      ProductDeleApi(elem.productId).then(res => {
        const re = JSON.parse(res);
        if(re.status === 200){
          le=+1;
        }else{
          er=+1;
        }
      })
    });
    message.info(`删除成功`);
  }

  handUpdate = (texts, record) => {
    this.ProductUpdate.init(record);
    this.ProductUpdate.showModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let {params} = this.state;
    this.props.form.validateFields((err, values) => {
      if(!err){
        params = {
         ...values,
         limit: 10,
         page: 1
        }
        this.getData(params);
        this.setState({params});
      }
    })
  }

  onHandSelectRow =  (selectedRowKeys, selectedRows) => {
    this.setState({selectedRows})
  }

  onChangePage = (page) => {
    const {params} = this.state;
    params.page = page;
    this.getData(params);
  }

  Reset = () => {
    const params = {
      productName: '',
      cost: null,
      status: '',
      limit: 10,
      page: 1
    }
    this.getData(params);
  }

  getData = (params)=>{
    const {tableDatas} =  this.state;
    tableDatas.datas = [];
    const param = params;
    if(typeof param.cost === 'undefined' && param.cost===null){
      delete  param.cost
    }
    ProductListApi(param).then(res => {
      try {
        if(res.status===200){
          res.data.result.forEach(elem => {
           const data = {
             ...elem,
             key: elem.productId
           }
           tableDatas.datas.push(data);
          })
          this.setState({
            tableDatas,
            params: {
              count: res.data.count
            }
          })
        }
      } catch (error) {}
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { tableDatas, headForm, params} = this.state;
    const rowSelection = {
      onChange: this.onHandSelectRow
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col>
              <HeadFormSearch
                form={this.props.form} 
                Reset={this.Reset} 
                formData={headForm.formData} 
                handleSubmit={this.handleSubmit} 
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
        <Table
          columns={tableDatas.columns}
          dataSource={tableDatas.datas}
          bordered
          rowSelection={rowSelection}
          pagination={{
            pageSize: params.limit,
            total: params.count,
            onChange: this.onChangePage
          }}
        />
        <ProductAddAndUpdate ref={c => { this.ProductAddAndUpdate = c}} />
        <ProductUpdate ref={c => {this.ProductUpdate = c}} />
      </PageHeaderWrapper>
    )
  }
}
const ProductLists = Form.create({ name: 'list' })(ProductList);
export default ProductLists;