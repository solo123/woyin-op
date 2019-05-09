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
import {ProductAddAndUpdate, ProductUpdate} from '@/components/Product';
import {ProductListApi, ProductDeleApi, ProductClassApi} from '@/services/api';
import {Table2} from '@/components/TableList/TableListPage';
import {timeChangData} from '@/utils/utils';
import {statuesRend} from '@/utils/renderUtils';
import styles from './ProductInfo.less';

@connect()
class ProductList extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: '1',label: '正在销售'}, 
      {value: '2',label: '停止销售'}
    ];
    const productClass = [{value: '1',label: '正在销售'}];
    const productClass1 = [];
    const productClass2 = [];
    const headForm = {
      formData:  [
        {type: 'SelectCompone' ,label: '产品类型1',name: 'q_productCategoryId_eq', handChang: this.handChang1,  style:{width:'196px'}, ruless:[], options: productClass},
        {type: 'SelectCompone' ,label: '产品类型2',name: 'q_productCategoryId_eq2',handChang: this.handChang2, style:{width:'196px'}, ruless:[], options: productClass1},
        {type: 'SelectCompone' ,label: '产品类型3',name: 'q_productCategoryId_eq3',handChang: this.handChang3, style:{width:'196px'}, ruless:[], options: productClass2},
        {type: 'SelectCompone', label: '状态：',name: 'q_status_eq' ,style: {width: '193px'}, options: option},
        {type: 'InputIcon', label:'产品名称', name:'q_productName_like',ruless:[], placeholder: '产品名称', typeIco: 'user'},
        {type: 'SelectDateRang' ,label: '创建时间', name: 'rechargeTime', ruless:[] , placeholder: '创建时间', typeIco: 'book'}
      ],
      buttonData: [
        {type: 'primary', ico: 'edit', hangClick: this.handAdd, labe: '添加'},
        {type: 'primary', ico: 'edit', hangClick: this.handDele, labe: '删除'}]
    };
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
        {title: '序号', dataIndex: 'xh', key: 'xh'},
        {title: '产品编号', dataIndex: 'productId', key: 'productId'},
        {title: '产品类型', dataIndex: 'productCategoryName', key: 'productCategoryName'},
        {title: '产品名称', dataIndex: 'productName', key: 'productName'},
        {title: '价值', dataIndex: 'cost', key: 'cost'},
        {title: '进货价', dataIndex: 'purchasePrice', key: 'purchasePrice'},
        {title: '销售价', dataIndex: 'salesPrice', key: 'salesPrice'},
        {title: '产品状态', dataIndex: 'status', key: 'status',render: status => (statuesRend(status, PRODUCTSTATUE))},
        {title: '是否支持退款', dataIndex: 'canRefund', key: 'canRefund',render: canRefund => (statuesRend(canRefund, PRODUCTCAN))},
        {title: '创建日期', dataIndex: 'createdAt', key: 'createdAt', },
        {title: '操作', dataIndex: 'action', key: 'action',
         render: (texts, record) => (
           <span>
             <a href="javascript:void(0)" onClick={()=> {this.handUpdate(texts, record)}}>修改</a>
           </span>)},
     ],
     data:[]
    };
    const params = {
      // productName: '',
      // status: '',
      // startTime: '',
      // endTime: '' ,
      page_size: 20,
      page: 1
    }
    this.state = {
      tableDatas,
      headForm,
      params,
      selectedRows: []
    }
  }
  
  componentWillMount () {
    this.getClassData(0, 0)
    const {params} = this.state;
    this.getData(params);
  }

  getClassData = (classId, index) => {
    const {headForm} = this.state;
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
        headForm.formData[index].options = productClass;
        this.setState({
          headForm
        })
      }
    })
  }

  handChang1 = (v) => {this.getClassData(v, 1)}

  handChang2 = (v) => {this.getClassData(v, 2)}

  handChang3 = (v) => {}

  handAdd = (e) => {
    e.preventDefault();
    this.ProductAddAndUpdate.showModal();
  }

  handDele = (e) => {
    e.preventDefault();
    const {selectedRows} = this.state;
    if(selectedRows.length === 0) {
      Modal.info({
        title: '信息提醒',
        content: '请选择要删除的产品。',
      })
      return;
    }

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
    this.Reset();
    message.info(`删除成功`);
    
  }

  handUpdate = (texts, record) => {
    this.ProductUpdate.init(record);
    this.ProductUpdate.showModal();
  }

  handleSubmit = (value) => {
    const params = value;
    if(typeof params.rechargeTime !== 'undefined'){
      params.q_createdAt_gte = timeChangData(params.rechargeTime[0].toDate());
      params.q_createdAt_lte = timeChangData(params.rechargeTime[1].toDate());
    }
        
    params['q_productCategoryId_eq'] = params.q_productCategoryId_eq2 ? params.q_productCategoryId_eq2 : params.q_productCategoryId_eq;
    params['q_productCategoryId_eq'] = params.q_productCategoryId_eq3 ? params.q_productCategoryId_eq3 : params['q_productCategoryId_eq'];
   
    delete params.rechargeTime;
    this.getData(params);
  }

  onHandSelectRow =  (selectedRowKeys, selectedRows) => {
    this.setState({selectedRows})
  }

  Reset = () => {
    const params = {
      page_size: 20,
      page: 1
    };

    this.getData(params);
    
  };

  getData = (params)=>{
    const {tableDatas} =  this.state;
    tableDatas.data = [];
    let i = 0;
    const param = {
      ...params,
      limit: params.pageSize
    }
    if(typeof param.cost === 'undefined' && param.cost===null){
      delete  param.cost
    }

    ProductListApi(param).then(res => {
   
      try {
        if(res.status===200 && res.data.count){
          res.data.products.forEach(elem => {
            i+=1;
           const data = {
             ...elem,
             xh: i,
             key: elem.productId
           }
           tableDatas.data.push(data);
          })
        }
        
        this.setState({
          tableDatas,
          params: {
            ...params,
            totalCount: res.data.count
          }
        })
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
                getData={this.getData} 
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
        <Table2
          tableData={tableDatas}
          rowSelection={rowSelection}
          params={params}
          getData={this.getData}
          // scroll={{ x: 1300 }}
        />
        <ProductAddAndUpdate ref={c => { this.ProductAddAndUpdate = c}} Reset={this.Reset} />
        <ProductUpdate ref={c => {this.ProductUpdate = c}} Reset={this.Reset} />
      </PageHeaderWrapper>
    )
  }
}
const ProductLists = Form.create({ name: 'list' })(ProductList);
export default ProductLists;