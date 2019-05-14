import { stringify } from 'qs';
import request from '@/utils/request';
import {Dev} from '../defaultSettings';

const serverApi = Dev ? '' : '/server/api';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function fakeAccountLogin(params) {
  return request( `${serverApi}/api/admin_login`, {
    method: 'POST',
    body: params,
  });
}

const getMerchantListApi = async function getMerchantListApi (params) {
  return request(`${serverApi}/api/op/merchants?${stringify(params)}`);
}

const getMerchantPlayApi = async function getMerchantPlayApi (merchantId) {
  return request(`${serverApi}/api/op/merchants/${merchantId}/users`);
}

const getMerchantAccApi = async function getMerchantAccApi ({merchantId}) {
  return request(`${serverApi}/api/op/merchants/${merchantId}/accounts`);
}

const addMerchantApi = async function addMerchantApi (params) {
  return request(`${serverApi}/api/op/merchants`, {
    method: 'POST',
    body: params,
  })
}

const RechargeGetMerList = async function RechargeGetMerList (params) {
  return request(`${serverApi}/api/op/merchants?${stringify(params)}`);
}

const RechargMerchantRecharges = async function RechargMerchantRecharges (params){
  return request(`${serverApi}/api/op/rechargeOrder`, {
    method: 'POST',
    body: params,
  })
}

const RechargMerchantRechargesPOST = async function RechargMerchantRechargesPOST (params, orderId){
  return request(`${serverApi}/api/op/rechargeOrder/${orderId}`, {
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

const GetMerchInterGetExel = async function GetMerchInterGetExel (params) {
  return request(`${serverApi}/api/op/excels/rechargeOrders?${stringify(params)}`);
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
  return request(`${serverApi}/api/op/send_points/batch?${stringify(params)}`);
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
  return request(`${serverApi}/api/op/products?${stringify(params)}`);
}

const ProductAddApi = async function ProductAddApi(params) {
  return request(`${serverApi}/api/op/products`, {
    method: 'POST',
    body: params,
  })
}

const ProductDeleApi = async function ProductDeleApi(params) {
  return request(`${serverApi}/api/op/products/${params}`, {
    method: 'DELETE',
    body: params,
  })
}

const ProductClassApi = async function ProductClassApi(fatherId,params){
  return request(`${serverApi}/api/op/product_category/${fatherId}/child?${stringify(params)}`);
}

const ProductEditApi = async function ProductEditApi(productId,params){
  return request(`${serverApi}/api/op/products/${productId}`, {
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
  return request(`${serverApi}/api/op/merchant_product/${categoryId}`, {
    method: 'DELETE',
  })
}

const MemberProductZEdit = async function MemberProductZEdit(params,id){
  return request(`${serverApi}/api/op/merchant_product/${id}`, {
    method: 'PUT',
    body: params,
  })
}

const GetUserLogoListApi = async function GetUserLogoListApi(params){
  return request(`${serverApi}/api/op/permit/user?${stringify(params)}`);
}

const GetOrderForBuyLisApi = async function GetOrderForBuyLisApi(params){
  return request(`${serverApi}/api/op/buyOrders?${stringify(params)}`);
}

const GetTransferOrderApi = async function GetTransferOrderApi(params){
  return request(`${serverApi}/api/op/transferOrders?${stringify(params)}`);
}

const GetUserWaterApi = async function GetUserWaterApi(params){
  return request(`${serverApi}/api/op/users/accounts?${stringify(params)}`);
}

const GetvouchersListById = async function GetvouchersListById(params){
  return request(`${serverApi}/api/op/balances/${params.balance_id}/history/merchant?${stringify(params)}`);
}

const GetVouchersDetails = async function GetVouchersDetails(id){
  return request(`${serverApi}/api/op/balances_history/${id}`);
}

const BalanceDateList = async function BalanceDateList(params){
  return request(`${serverApi}/api/op/balanceDate?${stringify(params)}`);
}

const MecharAddRate = async function MecharAddRate(params, merchantId){
  return request(`${serverApi}/api/op/merchants/${merchantId}/poundage`, {
    method: 'POST',
    body: params,
  })
}

const RoleResources = async function RoleResources(params){
  return request(`${serverApi}/api/op/permit/resources?${stringify(params)}`);
}

const GetRoleList = async function GetRoleList(params){
  return request(`${serverApi}/api/op/permit/roles?${stringify(params)}`);
}

const AddRoles = async function AddRoles (params){
  return request(`${serverApi}/api/op/permit/roles`, {
    method: 'POST',
    body: params,
  })
}

const InactiveUserList = async function InactiveUserList(params){
  return request(`${serverApi}/api/op/InactiveUserList?${stringify(params)}`);
}

const changeUserStatus = async function changeUserStatus(params){
  return request(`${serverApi}/api/op/changeUserStatus`, {
    method: 'PUT',
    body: params,
  })
}

const getUserByRole = async function getUserByRole(roleId){
  return request(`${serverApi}/api/op/permit/roles/${roleId}/users`);
}

const RoleDele = async function RoleDele(roleId) {
  return request(`${serverApi}/api/op/permit/roles/${roleId}`, {
    method: 'DELETE',
  })
}

const uploadRecPointsFile = async function uploadRecPointsFile (params) {
  return request(`${serverApi}/api/op/recover_points/upload`, {
    method: 'POST',
    body: params,
  })
}

const GetUploadRecPointsLoing = async function GetUploadRecPointsLoing(params){
  return request(`${serverApi}/api/op/recover_points/total?${stringify(params)}`);
}

const GetUploadRecPintData = async function GetUploadRecPintData(params){
  return request(`${serverApi}/api/op/recover_points?${stringify(params)}`);
}

const DeleDataSubmitRecPoints = async function DeleDataSubmitRecPoints (params) {
  return request(`${serverApi}/api/op/recover_points`, {
    method: 'DELETE',
    body: params,
  })
}

const SubmitRecPoints = async function SubmitRecPoints (params) {
  return request(`${serverApi}/api/op/recover_points`, {
    method: 'PUT',
    body: params,
  })
}

const AddUserByRole = async function AddUserByRole(params){
  return request(`${serverApi}/api/op/permit/user`, {
    method: 'POST',
    body: params,
  })
}

const repayOrdersList = async function repayOrdersList (params) {
  return request(`${serverApi}/api/op/repayOrders?${stringify(params)}`);
}

const repayOrdersAction = async function repayOrdersAction (params, orderId) {
  return request(`${serverApi}/api/op/repayOrders/${orderId}`, {
    method: 'PUT',
    body: params,
  })
}

const repayOrdersHistory = async function repayOrdersHistory (orderId) {
  return request(`${serverApi}/api/op/rechargeOrders/${orderId}/repayOrders`);
}

const FeezeMerchant  = async function FeezeMerchant (params, merchantId) {
  return request(`${serverApi}/api/op/merchants/${merchantId}`, {
    method: 'PUT',
    body: params,
  })
}

const MerchantAccountsWall = async function MerchantAccountsWall (params, merchantId) {
  return request(`${serverApi}/api/op/merchants/${merchantId}/accounts`, {
    method: 'PUT',
    body: params,
  })
}



const OrderTotals = async function OrderTotals (params, type){
  return request(`${serverApi}/api/op/orders/total/${type}?${stringify(params)}`);
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
  MemberProductZEdit, // 折扣修改MemberProductEdit
  GetUserLogoListApi, // 获取帐户列表
  GetOrderForBuyLisApi, // 用户购买订单
  GetTransferOrderApi, // 转增订单
  GetUserWaterApi, // 获取商户流水
  GetvouchersListById, // 获取流水
  GetVouchersDetails, // 流水详情
  BalanceDateList, // 凌晨余额成员额度
  MecharAddRate, // 增加费率
  GetRoleList, // 获取角色列表
  RoleResources, // 获取角色权限列表
  AddRoles, // 增加角色
  InactiveUserList, // 获取非活跃用户
  changeUserStatus, // 更改用户状态
  getUserByRole, // 获取角色列表
  RoleDele, // 删除角色
  uploadRecPointsFile, // 批量删除积分
  GetUploadRecPointsLoing, // 上传扣除积分情况
  GetUploadRecPintData, // 查看导入情况
  DeleDataSubmitRecPoints, // 删除数据
  SubmitRecPoints,  // 导入扣分的提交
  AddUserByRole, // 添加系统用户
  repayOrdersList, // 查看还款订单
  repayOrdersAction, // 还款订单操作
  repayOrdersHistory, // 还款订单
  FeezeMerchant, // 商户冻结/解结
  MerchantAccountsWall, // 商户帐户钱包操作
  OrderTotals, // 分数统计
  GetMerchInterGetExel, // exel文件导出
}