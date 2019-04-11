import { stringify } from 'qs';
import request from '@/utils/request';
import {Dev} from '../defaultSettings';

const serverApi = Dev ? '' : '/server';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function fakeAccountLogin(params) {
  return request( `${serverApi}/api/op/admin_login`, {
    method: 'POST',
    body: params,
  });
}

const getMerchantListApi = async function getMerchantListApi (params) {
  return request(`${serverApi}/api/op/merInfos?${stringify(params)}`);
}

const getMerchantPlayApi = async function getMerchantPlayApi (params) {
  return request(`${serverApi}/api/op/merUsers?${stringify(params)}`);
}

const getMerchantAccApi = async function getMerchantAccApi (params) {
  return request(`${serverApi}/api/op/merAccounts?${stringify(params)}`);
}

const addMerchantApi = async function addMerchantApi (params) {
  return request(`${serverApi}/api/op/merchant`, {
    method: 'POST',
    body: params,
  })
}

const RechargeGetMerList = async function RechargeGetMerList (params) {
  return request(`${serverApi}/api/op/merInfos?${stringify(params)}`);
}

const RechargMerchantRecharges = async function RechargMerchantRecharges (params){
  return request(`${serverApi}/api/op/rechargeOrder`, {
    method: 'POST',
    body: params,
  })
}

const RechargMerchantRechargesPOST = async function RechargMerchantRechargesPOST (params){
  return request(`${serverApi}/api/op/rechargeOrder`, {
    method: 'PUT',
    body: params,
  })
}

const UploadInterView = async function UploadInterView (params){
  return request(`${serverApi}/api/op/temp_points?${stringify(params)}`);
}
 
const uploadIntegralFile = async function uploadIntegralFile (params) {
  return request(`${serverApi}/api/op/temp_points`, {
    method: 'POST',
    body: params,
  })
}

const SubmintExcekData = async function SubmintExcekData (params) {
  return request(`${serverApi}/api/op/batch_points`, {
    method: 'PUT',
    body: params,
  })
}

const SubmintExceCancel = async function SubmintExceCancel (params) {
  return request(`${serverApi}/api/op/temp_points`, {
    method: 'DELETE',
    body: params,
  })
}

const GetBatchIdList = async function GetBatchIdList (params) {
  return request(`${serverApi}/api/op/batch_points?${stringify(params)}`);
}

const GetBatchMerchantList = async function GetBatchMerchantList (params) {
  return request(`${serverApi}/api/op/send_points?${stringify(params)}`);
}

const SendInterApplyOk = async function SendInterApplyOk (params) {
  return request(`${serverApi}/api/op/send_points`, {
    method: 'PUT',
    body: params,
  })
}

const SendInterApplyCancel = async function SendInterApplyCancel (params) {
  return request(`${serverApi}/api/op/send_points?${stringify(params)}`);
}

const findOrderInfo = async function findOrderInfo (params) {
  return request(`${serverApi}/api/op/rechargeOrders?${stringify(params)}`);
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

const withdrawList = async function withdrawList(params) {
  return request(`${serverApi}/api/op/withdrawal/withdrawalList?${stringify(params)}`);
}

const withdrawApplay = async function withdrawApplay(params) {
  return request(`${serverApi}/api/op/withdrawal/auditWithdrawal`, {
    method: 'POST',
    body: params,
  })
}

const gerMerchantHuiInfo = async function gerMerchantHuiInfo (params) {
  return request(`${serverApi}/api/op/users?${stringify(params)}`);
}

const GetOrderList = async function GetOrderList (params) {
  return request(`${serverApi}/api/op/withdrawal/withdrawalList?${stringify(params)}`);
}

const UploadInterCheckRate = async function UploadInterCheckRate(params){
  return request(`${serverApi}/api/op/temp_points/total?${stringify(params)}`);
}

const ProductListApi = async function ProductListApi(params){
  return request(`${serverApi}/api/op/product?${stringify(params)}`);
}

const ProductAddApi = async function ProductAddApi(params) {
  return request(`${serverApi}/api/op/product`, {
    method: 'POST',
    body: params,
  })
}

const ProductDeleApi = async function ProductDeleApi(params) {
  return request(`${serverApi}/api/op/product/${params}`, {
    method: 'DELETE',
    body: params,
  })
}

const ProductClassApi = async function ProductClassApi(fatherId,params){
  return request(`${serverApi}/api/op/product_category/${fatherId}/child?${stringify(params)}`);
}

const ProductEditApi = async function ProductEditApi(productId,params){
  return request(`${serverApi}/api/op/product/${productId}`, {
    method: 'PUT',
    body: params,
  })
}

const ProductClassDeleApi = async function ProductClassDeleApi(categoryId) {
  return request(`${serverApi}/api/op/product_category/${categoryId}`, {
    method: 'DELETE',
  })
}

const ProductClassAddApi = async function ProductClassAddApi(params){
  return request(`${serverApi}/api/op/product_category`, {
    method: 'POST',
    body: params,
  })
}

const ProductGetClassApi = async function ProductGetClassApi(fatherId){
  return request(`${serverApi}/api/op/product_category/${fatherId}`);
}

const MemberProductListApi = async function MemberProductListApi (params){
  return request(`${serverApi}/api/op/merchant_product?${stringify(params)}`);
}

const MemberProductZAddApi = async function MemberProductZAddApi(params){
  return request(`${serverApi}/api/op/merchant_product`, {
    method: 'POST',
    body: params,
  })
}

const MemberProductZDel = async function MemberProductZDel(categoryId) {
  return request(`${serverApi}/api/op/merchant_product//${categoryId}`, {
    method: 'DELETE',
  })
}


export {
  UploadInterView, // 上传积分查看
  findOrderInfo, // 订单管理/查看订单信息
  uploadIntegralFile, // 上传积分文件
  RechargMerchantRecharges, // 商户直充/商户代充值积分
  RechargeGetMerList, // 商户直充/获取商户列表
  addMerchantApi, // 查询商户列表/增加商户信息
  getMerchantAccApi, // 商户其下所有帐户
  getMerchantPlayApi,  // 商户其下所有操作员
  getMerchantListApi, // 根据条件获取到列表
  SubmintExcekData, // 提交表格数据确认后的数据
  SubmintExceCancel, // 取消提交上传的数据
  GetBatchIdList, // 查看批次号列表
  GetBatchMerchantList, // 获取批次号的成员
  SendInterApplyOk, // 发分审核通过
  SendInterApplyCancel, // 审核取消
  withdrawList, // 获取提现审核列表
  withdrawApplay, // 提现审核
  gerMerchantHuiInfo, // 获取商户下会员信息
  GetOrderList, // 获取订单列表
  UploadInterCheckRate, // 上传积分进度查询
  RechargMerchantRechargesPOST, // 商户充值积分审核
  ProductListApi, // 产品列表
  ProductAddApi,  // 产加产品
  ProductDeleApi, // 产品删除
  ProductClassApi, // 产品分类编号
  ProductEditApi, // 修改产品信息
  ProductClassDeleApi, // 删除产品分类
  ProductClassAddApi, // 增加产品分类
  ProductGetClassApi, // 获取单个分类的产品详情
  MemberProductListApi, // 商户产品管理
  MemberProductZAddApi, // 产品折扣
  MemberProductZDel, // 删除折扣
}