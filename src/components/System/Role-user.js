import React from 'react';
import { Modal, Table } from 'antd';
import TabelList from '@/components/TableList/TableList';
import {getUserByRole} from '@/services/api';

class RoleSet extends React.Component {
    constructor(props) {
        super(props);
        const tableData = {
          Column: [
            {title: '用户名', dataIndex: 'userName', key: 'userName'},
            {title: '手机号', dataIndex: 'mobile', key: 'mobile'},
            {title: '登陆帐户', dataIndex: 'userAccount', key: 'userAccount'}
         ], 
         data:  [
            {userName: '1', mobile: 'John', userAccount: 'New York No. 1 Lake Park'}, 
            {userName: '2', mobile: 'Jim', userAccount: 'London No. 1 Lake Park'}, 
            {userName: '3', mobile: 'Joe', userAccount: 'Sidney No. 1 Lake Park'}
         ]
        };

        this.state = {
          visible: false,
          tableData,
        }
    }

    onClose = () => {
        this.setState({
            visible: false
        });
    }

    onShow = (Role) => {
      this.setState({
        visible: true,
      })
    
      this.getData({
        roleId: Role.RoleId
      })
    }

    getData = (params) =>{
      const {tableData} = this.state;
      tableData.data = [];
      getUserByRole(params.roleId).then(res => {
        if(res.status === 200 && res.data){
          res.data.forEach(element => {
            const elem = {
              ...element,
              key: element.userId
            };
            tableData.data.push(elem);
          });
          this.setState({
            tableData,
            params
          })
        }
      })
    }

    handleOk = () => {

    }

    render () {
        const {visible, tableData} = this.state
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
              console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
              console.log(selected, selectedRows, changeRows);
            },
          };
        return (
          <Modal
            title="成员列表"
            transparent
            width={800}
            style={{ top: 200 }}
            maskClosable={false}
            visible={visible}
            onCancel={this.onClose}
            onOk={this.handleOk}
          >
            <Table 
              columns={tableData.Column} 
              dataSource={tableData.data} 
              // rowSelection={rowSelection} 
            />
          </Modal>
        )
    }
}

export default RoleSet