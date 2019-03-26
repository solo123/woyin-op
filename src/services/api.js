import { stringify } from 'qs';
import request from '@/utils/request';
import {Dev} from '../defaultSettings';

const serverApi = Dev ? '' : '/server/api';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function fakeAccountLogin(params) {
  return request( `${serverApi}/admin_login`, {
    method: 'POST',
    body: params,
  });
}

const getMerchantListApi = async function getMerchantListApi (params) {
  return request(`${serverApi}/admin/merInfos?${stringify(params)}`);
}

const getMerchantPlayApi = async function getMerchantPlayApi (params) {
  return request(`${serverApi}/admin/merUsers?${stringify(params)}`);
}

const getMerchantAccApi = async function getMerchantAccApi (params) {
  return request(`${serverApi}/admin/merAccounts?${stringify(params)}`);
}

const addMerchantApi = async function addMerchantApi (params) {
  return request(`${serverApi}/admin/merchant`, {
    method: 'POST',
    body: params,
  })
}

const RechargeGetMerList = async function RechargeGetMerList (params) {
  return request(`${serverApi}/admin/merInfos?${stringify(params)}`);
}

const RechargMerchantRecharges = async function RechargMerchantRecharges (params){
  return request(`${serverApi}/admin/rechargeOrder`, {
    method: 'POST',
    body: params,
  })
}

const UploadInterView = async function UploadInterView (params){
  return request(`${serverApi}/temp_points?${stringify(params)}`);
}
 
const uploadIntegralFile = async function uploadIntegralFile (params) {
  return request(`${serverApi}/temp_points`, {
    method: 'POST',
    body: params,
  })
}

const findOrderInfo = async function findOrderInfo (params) {
  return request(`${serverApi}/admin/rechargeOrders?${stringify(params)}`);
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export {
  UploadInterView, // 上传积分查看
  findOrderInfo, // // 订单管理/查看订单信息
  uploadIntegralFile, // 上传积分文件
  RechargMerchantRecharges, // 商户直充/商户代充值积分
  RechargeGetMerList, // 商户直充/获取商户列表
  addMerchantApi, // 查询商户列表/增加商户信息
  getMerchantAccApi, // 商户其下所有帐户
  getMerchantPlayApi,  // 商户其下所有操作员
  getMerchantListApi, // 根据条件获取到列表
}