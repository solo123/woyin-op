import React from 'react';
import { 
    Modal,
    Row,
    Col,
    InputNumber,
    message
  } from 'antd';

import {MemberProductZAddApi} from '@/services/api';
import styles from './MemberProducZ.less'

class MemberProducZ extends React.Component {

  constructor(props) {
    super(props);
    const prodInfo = [
        {label: '产品名称', value: '老白干'},
        {label: '价值', value: '30'},
        {label: '进货价', value: '1000'},
        {label: '销售价', value: '1200'},
        {label: '产品类型', value: '话费'},
        {label: '运营商', value:'中国移动'},
        {label: '产品状态', value: '可能'},
        {label: '是否支持退款', value:'支持'},
        {label: '产品编号', value:'333333'}
    ];
    this.state = {
        visible: false,
        prodInfo,
        params: {
            value:0.00,
        }
    }
  }

  onChange = value => {
    const {params} = this.state;
    this.setState({
        params: {
            ...params,
            discount: value
        }
    })
  }

  showModal = (params) => {
    const {prodInfo} = this.state;
    prodInfo[0].value = params.productName;
    prodInfo[1].value = params.cost;
    prodInfo[2].value = params.purchasePrice;
    prodInfo[3].value = params.salesPrice;
    prodInfo[4].value = params.fatherName;
    prodInfo[5].value = params.childName;
    prodInfo[6].value = params.status;
    prodInfo[7].value = params.canRefund;
    prodInfo[8].value = params.productId;
    this.setState({
      visible: true,
      prodInfo,
      statue: params.discount ==='-' ? 'add' : 'update',
      params:{
          ...params,
          discount: params.discount ==='-' ? 0 : params.discount
      }
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }

  handleSubmit = () =>{
    const {params,statue} = this.state;
    if(statue === 'add'){
        MemberProductZAddApi(params).then(res =>{
            if(res.status === 200){
                message.info('添加折扣成功');
                this.onClose();
            }else{
                message.info('添加折扣失败');
            }
        })
    }



  }
  
  render() {
    const {visible, prodInfo, params } = this.state;
    return (
      <Modal
        title='编辑产品折扣'
        transparent
        style={{ top: 100 }}
        maskClosable={false}
        visible={visible}
        onCancel={this.onClose}
        onOk={this.handleSubmit}
      >
        <Row gutter={32}>
          {prodInfo.map(res=>( 
            <Col key={res.label} className={`gutter-row ${  styles.inforow}`} span={12}>
              <div className="gutter-box">
                <span className={styles.label}>{res.label}:</span>{res.value}
              </div>
            </Col>)) }
          <Col className={`gutter-row ${  styles.inforow}`} span={12}>
            <span className={styles.label}>折扣：</span>
            <InputNumber
              defaultValue={params.discount}
              formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={this.onChange}
            />
          </Col>
        </Row>

      </Modal>
    )
  }
}

export default MemberProducZ;