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
import {ProductAddAndUpdateClass, ProductEditClass} from '@/components/Product';
import {ProductClassApi, ProductClassDeleApi} from '@/services/api';
import {statuesRend} from '@/utils/renderUtils';
import styles from './ProductInfo.less';

@connect()
class ProductList extends React.Component {
  constructor(props){
    super(props);
    const formData = [
        {type: 'InputIcon' ,label: '产品类型名称', name: 'userAccount', ruless:[] , placeholder: '产品类型名称', typeIco: 'user'},
    ];
    const headForm = {
      buttonData: [
        {type: 'primary', ico: 'edit', hangClick: this.handAdd, labe: '添加'},
        {type: 'primary', ico: 'edit', hangClick: this.handDele, labe: '删除'}
      ]
    }
    const tableDatas = {columns:
      [
        {title: '分类编号', dataIndex: 'productCategoryId', key: 'productCategoryId'},
        {title: '分类名称', dataIndex: 'productCategoryName', key: 'productCategoryName'},
        {title: '操作', dataIndex: 'productCategoryIndex', key: 'productCategoryIndex',
        render: (texts, record) => (
          <span> 
            <a href="javascript:void(0)" onClick={()=> {this.onHangUpdate(texts, record)}}>查看运营商</a>
          </span>)
        },
     ],
     datas:[]
    };
    const params = {
      productName: '',
      cost: '',
      status: '',
      limit: 10,
      page: 1
    }
    this.state = {
      tableDatas,
      headForm,
      params,
      formData
    }
  }
  
  componentWillMount () {
    const {params} = this.state;
    this.getData(params);
  }

  handAdd = (e) => {
    e.preventDefault();
    this.ProductAddAndUpdateClass.showModal();
  }

  onHangUpdate = (texts, record) => {
    this.ProductEditClass.init(record);
    this.ProductEditClass.showModal();
  }

  handDele = (e) => {
    e.preventDefault();
    const {selectedRows} = this.state;
    const leng = selectedRows.length;
    if(leng > 0){
        selectedRows.forEach(element => {
            ProductClassDeleApi(element.productCategoryId, {}).then(res => {
            });
        });
        message.info('操作成功');
        this.Reset();
    }
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
    this.setState({
        selectedRows
    })
  }

  onChangePage = (page) => {
    const {params} = this.state;
    params.page = page;
    this.getData(params);
  }

  Reset = () => {
    const params = {
      limit: 10,
      page: 1
    }
    this.getData(params);
  }
  
  getData = (params)=>{
    const {tableDatas} =  this.state;
    tableDatas.datas = [];
    const param = params;
    if(typeof param.cost === 'undefined' || param.cost===null){
        delete param.columns;
    }
    ProductClassApi(0,param).then(res => {
      try {
        if(res.status===200){
            res.data.result = res.data.result;
            res.data.result.forEach(element => {
                const ne = element;
                ne.key = element.productCategoryId;
                tableDatas.datas.push(ne);
            });
            this.setState({
                tableDatas
            })
        }
      } catch (error) {}
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form; 
    const { tableDatas, headForm, params, formData} = this.state;
    const rowSelection = {
      onChange: this.onHandSelectRow
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
        <ProductEditClass ref={c=>{ this.ProductEditClass =c}} />
        <ProductAddAndUpdateClass ref={c => { this.ProductAddAndUpdateClass = c}} />
      </PageHeaderWrapper>
    )
  }
}
const ProductLists = Form.create({ name: 'list' })(ProductList);
export default ProductLists;