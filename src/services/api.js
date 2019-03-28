import { stringify } from 'qs';
import request from '@/utils/request';
import {Dev} from '../defaultSettings';

const serverApi = Dev ? '' : '/server/api';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function fakeAccountLogin(params) {
  return request( `${serverApi}/op/admin_login`, {
    method: 'POST',
    body: params,
  });
}

const getMerchantListApi = async function getMerchantListApi (params) {
  return request(`${serverApi}/op/admin/merInfos?${stringify(params)}`);
}

const getMerchantPlayApi = async function getMerchantPlayApi (params) {
  return request(`${serverApi}/op/admin/merUsers?${stringify(params)}`);
}

const getMerchantAccApi = async function getMerchantAccApi (params) {
  return request(`${serverApi}/op/admin/merAccounts?${stringify(params)}`);
}

const addMerchantApi = async function addMerchantApi (params) {
  return request(`${serverApi}/op/admin/merchant`, {
    method: 'POST',
    body: params,
  })
}

const RechargeGetMerList = async function RechargeGetMerList (params) {
  return request(`${serverApi}/op/admin/merInfos?${stringify(params)}`);
}

const RechargMerchantRecharges = async function RechargMerchantRecharges (params){
  return request(`${serverApi}/op/admin/rechargeOrder`, {
    method: 'POST',
    body: params,
  })
}

const UploadInterView = async function UploadInterView (params){
  return request(`${serverApi}/op/temp_points?${stringify(params)}`);
}
 
const uploadIntegralFile = async function uploadIntegralFile (params) {
  return request(`${serverApi}/op/temp_points`, {
    method: 'POST',
    body: params,
  })
}

const SubmintExcekData = async function SubmintExcekData (params) {
  return request(`${serverApi}/op/batch_points`, {
    method: 'PUT',
    body: params,
  })
}

const SubmintExceCancel = async function SubmintExceCancel (params) {
  return request(`${serverApi}/op/temp_points`, {
    method: 'DELETE',
    body: params,
  })
}

const GetBatchIdList = async function GetBatchIdList (params) {
  return request(`${serverApi}/op/batch_points?${stringify(params)}`);
}

const GetBatchMerchantList = async function GetBatchMerchantList (params) {
  return request(`${serverApi}/op/send_points?${stringify(params)}`);
}

const SendInterApplyOk = async function SendInterApplyOk (params) {
  return request(`${serverApi}/op/send_points`, {
    method: 'PUT',
    body: params,
  })
}

const SendInterApplyCancel = async function SendInterApplyCancel (params) {
  return request(`${serverApi}/op/send_points?${stringify(params)}`);
}

const findOrderInfo = async function findOrderInfo (params) {
  return request(`${serverApi}/op/admin/rechargeOrders?${stringify(params)}`);
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

const withdrawList = async function withdrawList(params) {
  return request(`${serverApi}/op/withdrawal/withdrawalList?${stringify(params)}`);
}

const withdrawApplay = async function withdrawApplay(params) {
  return request(`${serverApi}/op/withdrawal/auditWithdrawal`, {
    method: 'POST',
    body: params,
  })
}

const gerMerchantHuiInfo = async function gerMerchantHuiInfo (params) {
  return request(`${serverApi}/op/admin/users?${stringify(params)}`);
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
}