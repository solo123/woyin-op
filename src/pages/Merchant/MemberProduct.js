/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  message
} from 'antd';
import {MemberProductZDel, ProductClassApi, MemberProductListApi} from '@/services/api';
import {HeadFormSearch, HeadFootButton} from '@/components/HeadForm';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Table2} from '@/components/TableList/TableListPage';
import {MemberProducZ} from '@/components/Merchant';
import {statuesRend} from '@/utils/renderUtils';
import LocalStr from '@/utils/LocalStr';
import {timeChangData} from '@/utils/utils';
import styles from './MemberProduct.less';

@connect()
class ProductList extends React.Component {
  constructor(props){
    super(props);
    const option = [
      {value: '1',label: '正在销售'}, 
      {value: '2',label: '停止销售'}
    ];
    const productClass = [];
    const headForm = {
      formData:  [
        {type: 'SelectCompone' ,label: '一级分类',style:{width:'196px'}, handChang: this.handChang1 , name: 'q_cc.productCategoryId_eq', ruless:[], options: productClass},
        {type: 'SelectCompone' ,label: '二级分类',style:{width:'196px'}, handChang: this.handChang2 , name: 'q_cc.productCategoryId_eq1', ruless:[], options: productClass},
        {type: 'SelectCompone' ,label: '三级分类',style:{width:'196px'}, handChang: this.handChang3 , name: 'q_cc.productCategoryId_eq2', ruless:[], options: productClass},
        {type: 'SelectCompone', label: '状态：',style: {width: '193px'}, name: 'q_p.status_eq', options: option},
        {type: 'InputIcon', label:'产品名称', name:'q_productName_like',ruless:[], placeholder: '产品名称', typeIco: 'user'},
        {type: 'SelectDateRang' ,label: '创建时间', name: 'rechargeTime', ruless:[] , placeholder: '创建时间', typeIco: 'book'}
      ],
      buttonData: [
        // {type: 'primary', ico: 'edit', hangClick: this.handAdd, labe: '添加折扣'},
        {type: 'primary', ico: 'edit', hangClick: this.handDele, labe: '删除折扣'}
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
        {title: '序号', dataIndex: 'xh', key: 'xh'},
        {title: '产品编号', dataIndex: 'productId', key: 'productId'},
        // {title: '', dataIndex: 'discountId', key: 'discountId'},
        // {title: '产品类型', dataIndex: 'fatherName', key: 'fatherName'},
        // {title: '运营商', dataIndex: 'childName', key: 'childName'},
        {title: '产品名称', dataIndex: 'productName', key: 'productName'},
        {title: '价值', dataIndex: 'cost', key: 'cost'},
        {title: '进货价', dataIndex: 'purchasePrice', key: 'purchasePrice'},
        {title: '销售价', dataIndex: 'salesPrice', key: 'salesPrice'},
        {title: '定价', dataIndex: 'salesOkPrice', key: 'salesOkPrice'},
        {title: '产品状态', dataIndex: 'status', key: 'status',render: status => (statuesRend(status, PRODUCTSTATUE))},
        {title: '是否支持退款', dataIndex: 'canRefund', key: 'canRefund',render: canRefund => (statuesRend(canRefund, PRODUCTCAN))},
        {title: '创建日期', dataIndex: 'createdAt', key: 'createdAt', },
        {title: '折扣', dataIndex: 'discount', key: 'discount', },
        {title: '操作', dataIndex: 'action', key: 'action',
         render: (texts, record) => {
           if(record.discount > 0){
            return <a href="javascript:void(0)" onClick={()=> {this.handUpdate(texts, record)}}>编辑</a>
           }
            return <a href="javascript:void(0)" onClick={()=> {this.handAdd(texts, record)}}>添加</a>
        }},
     ],
     data:[]
    };
    const params = {
      merchantId: this.props.location.params,
      productName: '',
      cost: '',
      status: '',
      productCategoryId: '',
      startTime: '',
      endTime: '',
      page_size: 20,
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
    const param = {
      ...params,
        merchantId: LocalStr.get("merchantId")
    };
   
    this.getClassData(0, 0);
    this.setState({params});
    this.getData(param);
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


  handAdd = (texts, record) => {
    const {tableDatas, params} = this.state;
    const da = this.getDataByKey(tableDatas.data, record.productId);
    this.MemberProducZ.showModal(da,params.merchantId);
  }

  handUpdate = (texts, record) => {
    const {tableDatas, params} = this.state;
    const da = this.getDataByKey(tableDatas.data, record.productId);
    this.MemberProducZ.showModal(da, params.merchantId);
  }

  handDele = (e) => {
    e.preventDefault();
    const {selectedRows} = this.state;
    selectedRows.forEach(elem => {
      if(elem.discount==='-'){
        message.error('无法删除，没有折扣');
        return null
      }
      MemberProductZDel(elem.discountId).then(res => {
      const re = JSON.parse(res);
      if(re.status === 200){
        message.info('删除成功');
        this.Reset();
      }
      })
    });
  }

  getDataByKey = (data,key) => {
    const leng = data.length;
    for(let i = 0; i < leng; i+=1){
      if(data[i].productId === key){
        return data[i]
      }
    }
    return null;
  }

  handleSubmit = (values) => {
    const params = values;
    if(typeof params.rechargeTime !== 'undefined'){
        params['q_p.createdAt_gte'] = timeChangData(params.rechargeTime[0].toDate());
        params['q_p.createdAt_lte'] = timeChangData(params.rechargeTime[1].toDate());
    }
    // params['q_cc.productCategoryId_eq'] = values.q_cc.productCategoryId_eq;
    params['q_p.status_eq'] = values.q_p.status_eq;
    
    params['q_cc.productCategoryId'] = values.q_cc.productCategoryId_eq1 ? values.q_cc.productCategoryId_eq1 : values.q_cc.productCategoryId_eq;
    params['q_cc.productCategoryId'] = values.q_cc.productCategoryId_eq2 ? values.q_cc.productCategoryId_eq2 : params['q_cc.productCategoryId'];
   
    delete params.rechargeTime;
    params.page_size = 20;
    this.getData(params);
      
  }

  onHandSelectRow =  (selectedRowKeys, selectedRows) => {
    this.setState({selectedRows})
  }

  Reset = () => {
    const params = {
      page_size: 20,
      merchantId: this.state.params.merchantId
    };
    this.getData(params);
  }

  getData = (params)=>{
    const {tableDatas} =  this.state;
    tableDatas.data = [];
    const param = {
      ...params,
      limit: params.page_size
    };
    let  i = 0;
    MemberProductListApi(param).then(res => {
      try {
        if(res.status===200){

          res.data.merchantProductDiscounts.forEach(elem => {
            i+=1;
           const data = {
             ...elem,
             xh: i,
             key: elem.productId,
             salesOkPrice: elem.discount==="-" ? elem.salesPrice : (elem.salesPrice*elem.discount).toFixed(2)
           }
           tableDatas.data.push(data);
          })
          this.setState({
            tableDatas,
            params: {
              ...params,
              totalCount: res.data.count
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
      type: 'radio',
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
        <Table2
          tableData={tableDatas}
          // rowSelection={rowSelection}
          params={params}
          getData={this.getData}
          scroll={{ x: 1300 }}
        />
        <MemberProducZ ref={c => {this.MemberProducZ =  c}} Reset={this.Reset} />
      </PageHeaderWrapper>
    )
  }
}
const ProductLists = Form.create({ name: 'list' })(ProductList);
export default ProductLists;