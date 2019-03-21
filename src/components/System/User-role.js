import React from 'react';
import { Modal } from 'antd';
import TabelList from '@/components/TableList/TableList';

class UserRole extends React.Component {
    constructor(props) {
        super(props);
        const ColumnDatas = {data: 
            [
              {title: '角色名称', dataIndex: 'info', key: 'info'},
              {title: '角色编码', dataIndex: 'code', key: 'describe'},
              {title: '角色描述', dataIndex: 'describe', key: 'describe'}
           ],  
           dataEnd: {}
        };
        const datas =  [
            {key: '1', info: 'John', code: '11', describe: 'New York No. 1 Lake Park'}, 
            {key: '2', info: 'Jim', code: '12', describe: 'London No. 1 Lake Park'}, 
            {key: '3', info: 'Joe', code : '13', describe: 'Sidney No. 1 Lake Park'}
          ];
          this.state = {
            visible: false,
            ColumnData: ColumnDatas,
            data: datas
          }
    }

    onClose = () => {
        this.setState({
            visible: false
        });
    }

    onShow = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = () => {

    }

    render (){
        const {visible, ColumnData, data} = this.state
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
            title='角色列表'
            transparent
            width={800}
            style={{ top: 200 }}
            maskClosable={false}
            visible={visible}
            onCancel={this.onClose}
            onOk={this.handleOk}
          >
            <TabelList ColumnData={ColumnData} data={data} rowSelection={rowSelection} />
          </Modal>
        )
    }
}

export default UserRole;