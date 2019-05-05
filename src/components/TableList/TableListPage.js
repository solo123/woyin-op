import React from 'react';
import {Table} from 'antd';


/**
 * table模块 ，封装分页在里面
 * @param {*} tableData 
 * @param {*} rowSelection 
 * @param {*} params 
 * @param {*} getData 
 */
export const Table2 = ({tableData, rowSelection, params, getData, scroll}) =>{
    const onChangePage = (page) => {
       const param = {
           ...params,
           page
       }
       getData(param);
    }
    return(
      <Table
        columns={tableData.columns}
        dataSource={tableData.data} 
        bordered
        rowSelection={rowSelection}
        scroll={scroll}
        pagination={{
          pageSize: params.pageSize,
          total: params.totalCount,
          onChange: onChangePage
        }}
      />
    )
  }

  export default {

  }