import React from 'react';
import {Table, InputNumber} from 'antd';

/**
 * table模块 ，封装分页在里面
 * @param {*} tableData 
 * @param {*} rowSelection 
 * @param {*} params 
 * @param {*} getData 
 */
export const Table2 = ({tableData ,rowSelection, params, getData, scroll}) =>{
    let pageSize = 0;

    const onChangePage = (page) => {
       const param = {
           ...params,
           page
       }
       getData(param);
    }

    function onChange(value) {pageSize = value;}

    function onBlur(){
      getData({
        ...params,
        page_size: pageSize
      })
    }

    return(
      <Table
        columns={tableData.columns}
        dataSource={tableData.data} 
        bordered
        size="middle"
        rowSelection={rowSelection}
        scroll={scroll}
        pagination={{
          pageSize: params.page_size,
          total: params.totalCount,
          onChange: onChangePage,
          showTotal: (total, range) => (
            <div style={{height: '20px'}}>
              <div style={{float:'left', lineHeight: '25px', marginRight: '20px'}}>总共：{total}条</div>
              <div style={{float:'left'}}>单页：
                <InputNumber
                  min={0}
                  step={1}
                  size="small" 
                  defaultValue={params.page_size}
                  precision={0}
                  onChange={onChange}
                  onBlur={onBlur}
                />条
              </div>
            </div>)
        }}
    
      />
    )
  }

  export default {

  }