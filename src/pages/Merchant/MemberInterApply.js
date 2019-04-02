import React from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Table,
  Cascader
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {HeadFootButton} from '@/components/HeadForm';

@connect()
class Recharge extends React.Component {
  constructor(props){
    super(props);
    const buttonDatas = [
        {type: 'primary', ico: 'plus', hangClick: this.handAdd, labe: '确认'},
        {type: 'primary', ico: 'edit', hangClick: this.handEdit, labe: '拒绝'},
      ];
    const tableDatas = {
        columns: [
            {title: '会员名称', dataIndex: 'name', key: 'name'},
            {title: '手机号', dataIndex: 'phone', key: 'phone'},
            {title: '金额', dataIndex: 'price', key: 'price'},
            {title: '凭证号', dataIndex: 'voucher', key: 'voucher'},
            {title: '标题', dataIndex: 'title', key: 'title'},
        ],
        data: [
            {
              key: '1',
              name: 'John2',
              phone: '322',
              price: 'New York No. 1 Lake Park',
              voucher: 'developer',
              title: '标题'
            },
        ]
    }
    this.state = {
      tableData: tableDatas,
      buttonData: buttonDatas
    }
  }
  
  componentWillMount () {

  }

  hangClick = (e) => {
    e.preventDefault();
  }

  render () {
    const { buttonData, tableData } = this.state;
    const options = [{
        value: 'zhejiang',
        label: 'Zhejiang',
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
      }];
      
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Cascader options={options} onChange={this.hangClick} placeholder="请选择批次号" />
            <HeadFootButton buttonData={buttonData} />
          </div>
        </Card>
        <Table
          columns={tableData.columns}
          dataSource={tableData.data}
          bordered
        />
      </PageHeaderWrapper>
    )
  }
}
const Recharges = Form.create({ name: 'list' })(Recharge);
export default Recharges;