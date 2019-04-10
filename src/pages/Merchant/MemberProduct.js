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
import {ProductListApi, ProductDeleApi, ProductClassApi} from '@/services/api';
import {timeChangData} from '@/utils/utils';
import {statuesRend} from '@/utils/renderUtils';
import styles from './MemberProduct.less';

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
    const productClass = [{
      value: '1',
      label: '正在销售',
    }]
    const headForm = {
      formData:  [
        {type: 'SelectCompone' ,label: '产品类型',style:{width:'196px'}, placeholder: '退款编号', name: 'productCategoryId', ruless:[], options: productClass},
        {type: 'SelectCompone', label: '状态：',style: {width: '193px'}, name: 'status', options: option},
        {type: 'InputIcon', label:'产品名称', name:'productName',ruless:[], placeholder: '产品名称', typeIco: 'user'},
        {type: 'SelectDateRang' ,label: '创建时间', name: 'rechargeTime', ruless:[] , placeholder: '创建时间', typeIco: 'book'}
      ],
      buttonData: [
        {type: 'primary', ico: 'edit', hangClick: this.handAdd, labe: '添加'},
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
        {title: '产品类型', dataIndex: 'parentCategoryName', key: 'parentCategoryName'},
        {title: '运营商', dataIndex: 'productName', key: 'productName'},
        {title: '产品名称', dataIndex: 'cost', key: 'cost'},
        {title: '价值', dataIndex: 'purchasePrice', key: 'purchasePrice'},
        {title: '进货价', dataIndex: 'salesPrice', key: 'salesPrice'},
        {title: '销售价', dataIndex: 'salesPrice', key: 'salesPrice'},
        {title: '产品状态', dataIndex: 'status', key: 'status',render: status => (statuesRend(status, PRODUCTSTATUE))},
        {title: '是否支持退款', dataIndex: 'canRefund', key: 'canRefund',render: canRefund => (statuesRend(canRefund, PRODUCTCAN))},
        {title: '创建日期', dataIndex: 'createTime', key: 'createTime', },
        {title: '折扣', dataIndex: 'createTime', key: 'createTime', },
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
      startTime: '',
      endTime: '' ,
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
    console.log(this.props.location.params);
    const {headForm} = this.state;
    const productClass = [];
    ProductClassApi(0, {}).then(res => {
      if(res.status === 200){
        res.data.result.forEach(element => {
          const po = {
            value: element.productCategoryId,
            label: element.productCategoryName,
          }
          productClass.push(po);
        });
        headForm.formData[0].options = productClass;
        this.setState({
          headForm
        })
        console.log(res);
      }
    })
    const {params} = this.state;
    this.getData(params);
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
    let value = null;
    this.props.form.validateFields((err, values) => {
      value = values;
      if(typeof values.rechargeTime !== 'undefined'){
        value.startTime = timeChangData(values.rechargeTime[0].toDate());
        value.endTime = timeChangData(values.rechargeTime[1].toDate());
      }
      delete value.rechargeTime;
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