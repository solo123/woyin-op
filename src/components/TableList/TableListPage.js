/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React from 'react';
import { Table, Select } from 'antd';

const { Option } = Select;
/**
 * table模块 ，封装分页在里面
 * @param {*} tableData
 * @param {*} rowSelection
 * @param {*} params
 * @param {*} getData
 */
export const Table2 = ({ tableData, rowSelection, params, loading, getData, scroll }) => {
  let pageSize = 20;
  let pageOption = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 500, label: '500' },
    { value: 1000, label: '1000' },
  ];

  const onChangePage = page => {
    const param = {
      ...params,
      page,
    };
    getData(param);
  };

  // const onChange = (value) => {
  //   pageSize = value;
  // }

  // function onBlur() {
  //   getData({
  //     ...params,
  //     page_size: pageSize,
  //   });
  // }

  function handleChange(value) {
    pageSize = value;
    getData({
      ...params,
      page_size: pageSize,
    });
  }

  return (
    <Table
      columns={tableData.columns}
      dataSource={tableData.data}
      bordered
      loading={loading}
      size="middle"
      rowSelection={rowSelection}
      scroll={scroll}
      pagination={{
        pageSize: params.page_size,
        total: params.totalCount,
        onChange: onChangePage,
        showTotal: (total, range) => (
          <div style={{ height: '20px' }}>
            <div style={{ float: 'left', lineHeight: '25px', marginRight: '20px' }}>
              总共：{total}条
            </div>
            <div style={{ float: 'left' }}>
              单页：
              {/* <InputNumber
                  min={0}
                  step={1}
                  size="small" 
                  defaultValue={params.page_size}
                  precision={0}
                  onChange={onChange}
                  onBlur={onBlur} 
                />条 */}
              <Select
                defaultValue={params.page_size}
                style={{ width: 120 }}
                size="small"
                onChange={handleChange}
              >
                {pageOption.map(ele => (
                  <Option key={ele.value} value={ele.value}>
                    {ele.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default {};
