/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { 
    Modal,
    message,
    Table,
    Radio,
    Button
  } from 'antd';
import AddInfo from '../FormAdd/AddInfo';
import {isNumber} from '@/utils/validate'
import {MerchantAccountsWall, changeUserStatus} from '@/services/api'
import {statuesRend} from '@/utils/renderUtils';

const RadioGroup = Radio.Group;

class MerchantWall extends React.Component {
  constructor(props) {
    super(props);
    const option = [
        {value: '1',label: '冻结'}, 
        {value: '2',label: '解冻'}
    ];
    const STATUSITEMS = [
        {key: "0", describe: ['green', '未激活']},
        {key: "1", describe: ['green', '可用']},
        {key: "2", describe: ['red', '冻结']}
      ]
    const tableData = {
        columns:[
          { title: 'balanceId', dataIndex: 'balanceId'},
          { title: '帐户类型', dataIndex: 'currency'},
          {title: '帐户状态', dataIndex: 'balanceStatus', key: 'balanceStatus',render: balanceStatus => {return statuesRend(balanceStatus, STATUSITEMS)}},
        ],
        data: []
    }
    this.state = {
      tableData,
      visible: false,
      status: 1,
      selectedRows: null
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {status, selectedRows} = this.state;
    if (selectedRows !== null){
        let list = "";
        const params = new FormData();
      
        params.append("status", status);

        for(let i =0; i < selectedRows.length; i+=1){
          if(i === 0)
            list = `${selectedRows[i].balanceId}`;
          else
            list =  `${params.list},${selectedRows[i].balanceId}`;
        }
        params.append("list", list);
        changeUserStatus(params).then(res => {
            if(res.status===200) {
               message.info("修改成功")
               this.onClose();
             }else{
                 message.error(res.msg);
             }
        })
       
        }else{
          message.error('请先选择要操作的帐户！！');
      }
  }

  showModal = (account) => {
    const {tableData} = this.state;
    // formData[0].placeholder = account.MerchantId;
    // formData[1].placeholder = account.Amount;
    console.log(account);
    // Balances
    let i = 0;
    tableData.data = [];
    account.Balances.forEach(element => {
        i += 1;
        tableData.data.push({
            ...element,
            key: i
        })
    });
    this.setState({
      visible: true,
      account,
      tableData
    });
  }

  onClose = () => {
        this.setState({
        visible: false,
        });
    }


  onChangeRadioGroup = (value) => {
    this.setState({status: value.target.value})
  }


  render() {
    const {visible, tableData, status} = this.state;
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectedRows})
        },
      
      };
    return (
      <div>
        <Modal
          title='帐户列表'
          transparent
          style={{ top: 100 }}
          maskClosable={false}
          visible={visible}
          onCancel={this.onClose}
          onOk={this.handleSubmit}
        >
          <RadioGroup onChange={this.onChangeRadioGroup} defaultValue={status}>
            <Radio value={1}>可用</Radio>
            <Radio value={2}>冻结</Radio>
          </RadioGroup>
        
          <Table 
            rowSelection={rowSelection} 
            columns={tableData.columns} 
            dataSource={tableData.data} 
          />
        </Modal>
      </div>
    );
  }
}

export default MerchantWall;

