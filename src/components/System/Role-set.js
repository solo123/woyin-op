import React from 'react';
import { Table, Modal } from 'antd';
import { formatMessage } from 'umi/locale';

const columns = [{
    title: formatMessage({id : 'system.role-set-cloum1'}),
    dataIndex: 'name',
    key: 'name',
    width: '50%',
  }, {
    title: formatMessage({id : 'system.role-set-cloum2'}),
    dataIndex: 'age',
    key: 'age',
    width: '50%',
  }];
  const data = [{
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    children: [{
      key: 11,
      name: 'John Brown',
      age: 42,
    }, {
      key: 12,
      name: 'John Brown jr.',
      age: 30,
    }],
  }, {
    key: 2,
    name: 'Joe Black',
    age: 32,
  }];
class RoleSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: false
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

    render () {
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
        const {visible} = this.state
        return (
          <Modal
            title={`${formatMessage({ id : 'system.role-add-role'})}`}
            transparent
            width={800}
            style={{ top: 200 }}
            maskClosable={false}
            visible={visible}
            onCancel={this.onClose}
            onOk={this.handleOk}
          >
            <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
          </Modal>
        )
    }

}

export default RoleSet