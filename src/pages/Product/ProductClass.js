/* eslint-disable no-script-url */
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
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import {ProductAddAndUpdateClass, ProductEditClass} from '@/components/Product';
import {ProductClassApi, ProductClassDeleApi} from '@/services/api';
import {Table2} from '@/components/TableList/TableListPage';
import {statuesRend, hreRend} from '@/utils/renderUtils';
import styles from './ProductInfo.less';

@connect()
class ProductList extends React.Component {
  constructor(props){
    super(props);
    const productClass = [{value: '1',label: '正在销售'}];
    const productClass1 = [];
    const formData = [
      {type: 'SelectCompone' ,label: '产品类型1',name: 'categoryId1', handChang: this.handChang1,  style:{width:'196px'}, ruless: [], options: productClass},
      // {type: 'SelectCompone' ,label: '产品类型2',name: 'categoryId2',disabled: true, style:{width:'196px'}, ruless:[], options: productClass1},
      {type: 'InputIcon' ,label: '产品类型名称', name: 'q_productCategoryName_like', ruless:[] , placeholder: '产品类型名称', typeIco: 'user'},
    ];
    const headForm = {
      buttonData: [
        {type: 'primary', ico: 'edit', hangClick: this.handAdd, labe: '添加一级分类'},
        {type: 'primary', ico: 'edit', hangClick: this.handDele, labe: '删除'}
      ]
    }
    const hre = [
      {onClick: this.onHangUpdate, label: '分类操作'}
    ];
    const tableDatas = {columns:[
      {title: '分类编号', dataIndex: 'productCategoryId', key: 'productCategoryId'},
      {title: '分类名称', dataIndex: 'productCategoryName', key: 'productCategoryName'},
      {title: '创作时间', dataIndex: 'createdAt', key: 'createdAt'},
      {title: '操作', dataIndex: 'productCategoryIndex', key: 'productCategoryIndex',render:(texts, record)=>(hreRend(hre, texts, record)) },
    ],
      data:[]
    };
    const params = {
      productName: '',
      cost: '',
      status: '',
      limit: 10,
      page_size: 100,
      page: 1,
      totalCount: 0
    }
    this.state = {
      tableDatas,
      headForm,
      params,
      formData,
      selectedRows: []
    }
  }
  
  componentWillMount () {
    const {params} = this.state;
    this.getClassData(0, 0);
    this.getData(params);
  }

  handChang1 = (v) => {this.getClassData(v, 1)}

  getClassData = (classId, index) => {
    const {formData} = this.state;
    const productClass = [];
    ProductClassApi(classId, {}).then(res => {
      if(res.status === 200  && res.data.productCategories){
        res.data.productCategories.forEach(element => {
          const po = {
            value: element.productCategoryId,
            label: element.productCategoryName,
          }
          productClass.push(po);
        });
        formData[index].options = productClass;
        formData[index].disabled = false;
      }else{
        formData[index].disabled = true;
      }
      this.setState({
        formData
      })
    })
  }

  handAdd = (e) => {
    e.preventDefault();
    this.ProductAddAndUpdateClass.showModal();
  }

  onHangUpdate = (texts, record) => {
    const {params} = this.state;
    const fatherId = params.categoryId1 ?  params.categoryId1 : 0;
    
    this.ProductEditClass.init(fatherId, record);
    this.ProductEditClass.showModal();
  }

  handDele = (e) => {
    e.preventDefault();
    const {selectedRows} = this.state;
    const leng = selectedRows.length;
    if(leng > 0){
        selectedRows.forEach(element => {
          ProductClassDeleApi(element.productCategoryId, {}).then(re => {
            const res = JSON.parse(re);
              if(res.status===200){
                message.info('操作成功');
                this.Reset();
              }else{
                  message.error(res.data);
              }
          });
        });
    }else{
      Modal.info({
        title: '信息提醒',
        content: '请选择要删除的产品分类！',
      })
    }
  }

  handleSubmit = (value) => {
    const params = value;
      this.getData({
        ...params,
        page_size: 100,
        categoryId: params.categoryId2 ? params.categoryId2 : params.categoryId1,
        page: 1
      });
  }

  Reset = () =>{
    const params = {
      productName: '',
      cost: '',
      status: '',
      limit: 10,
      page_size: 100,
      page: 1,
      totalCount: 0
    }

    this.getData(params);
  }

  onHandSelectRow =  (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRows
    })
  }
  
  getData = (params)=>{
    const {tableDatas} =  this.state;
    tableDatas.data = [];
    const param = {
      ...params,
      limit: params.page_size
    }
    if(typeof param.cost === 'undefined' || param.cost===null){
      delete param.columns;
    }
   
    const fatherId = params.categoryId1 ?  params.categoryId1 : 0;
    delete param.categoryId;
    ProductClassApi(fatherId ,param).then(res => {
      if(res.status===200 && res.data.productCategories){
        res.data.productCategories.forEach(element => {
          const ne = element;
          ne.key = element.productCategoryId;
          tableDatas.data.push(ne);
        });
      }
      this.setState({
        tableDatas,
        params: {
          ...params,
          totalCount: res.data.count
        }
      })
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
              <HeadFormSearch 
                formData={formData} 
                getData={this.getData}
                handleSubmit={this.handleSubmit} 
                form={this.props.form} 
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
        <Table2
          tableData={tableDatas}
          rowSelection={rowSelection}
          params={params}
          getData={this.getData}
          // scroll={{ x: 1300 }}
        />
        <ProductEditClass ref={c=>{ this.ProductEditClass =c}} />
        <ProductAddAndUpdateClass ref={c => { this.ProductAddAndUpdateClass = c}} Reset={this.Reset} />
      </PageHeaderWrapper>
    )
  }
}
const ProductLists = Form.create({ name: 'list' })(ProductList);
export default ProductLists;