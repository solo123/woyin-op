/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const { Column } = Table;

class TabelList extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    ColumnData: PropTypes.object,
    rowSelection: PropTypes.object,
  };

  static defaultProps = {
    data: [],
    ColumnData: {},
    rowSelection: () => {},
  };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render () {
      const {data, ColumnData, rowSelection, ExpandAllRows} = this.props;
      const ColumnInit = () => (
        ColumnData.data.map( (value)=> (
          <Column
            title={value.title}
            dataIndex={value.dataIndex}
            key={value.key}
          />
        ) 
      ));
      const ColumnEnd = () => {
        if (typeof(ColumnData.dataEnd.title) === 'undefined') return null;
        return (
          <Column
            title={ColumnData.dataEnd.title}
            key={ColumnData.dataEnd.key}
            render={(texts, record) => (
              <span>
                {(() => (
                ColumnData.dataEnd.onAction.map( (value) => (
                  <React.Fragment key={value.label}>
                    <a href="javascript:;" onClick={()=> {value.onClick(texts, record)}}> {value.label}</a>
                  </React.Fragment>
                ) )
              ))()}
              </span>
          )}
          />
        )
      }
      return (
        <Table 
          dataSource={data} 
          bordered
          rowSelection={rowSelection}
          defaultExpandAllRows={ExpandAllRows || false}
          scroll={ColumnData.data.length > 5 ? { x: 1500 } : {}}
        >
          {ColumnInit()}
          {ColumnEnd()}
        </Table>
      )
    }

}

export default TabelList