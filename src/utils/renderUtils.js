import React from 'react';
import {
    Tag
}from 'antd'

/**
 * 渲染状态块
 * @param {*} status 状态码
 * @param {*} items 状态数组结构
 *  const STATUSITEMS = [
 *   {key: 0, describe: ['green', '未激活']},
 *  ]
 */
export const statuesRend = (status, STATUSITEMS) => {
    const len = STATUSITEMS.length
    for(let i = 0; i < len; i+=1){
      if(status === STATUSITEMS[i].key){
        return (
          <Tag color={STATUSITEMS[i].describe[0]}>{STATUSITEMS[i].describe[1]}</Tag>
        )
      }
    }
    return null
}

/**
 * 渲染按键
 */
export const hreRend = (hreData, texts, record) =>{
  return(
    <span>
      {hreData.map(ref => (<a href="javascript:void(0)" key={ref.label} onClick={()=> { ref.onClick(texts, record)}}>{ref.label}</a>))}
    </span>
  )
}

export const test = ()=> {
    return null
}