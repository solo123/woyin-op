import { stringify } from 'qs';
import request from '@/utils/request';
import {Dev} from '../defaultSettings';

const serverApi = Dev ? '' : '/server/api';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

// export async function queryActivities() {
//   return request('/api/activities');
// }

// export async function queryRule(params) {
//   return request(`/api/rule?${stringify(params)}`);
// }

// export async function removeRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'delete',
//     },
//   });
// }

// export async function addRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'post',
//     },
//   });
// }

// export async function updateRule(params = {}) {
//   return request(`/api/rule?${stringify(params.query)}`, {
//     method: 'POST',
//     body: {
//       ...params.body,
//       method: 'update',
//     },
//   });
// }

// export async function fakeSubmitForm(params) {
//   return request('/api/forms', {
//     method: 'POST',
//     body: params,
//   });
// }

// export async function fakeChartData() {
//   return request('/api/fake_chart_data');
// }

// export async function queryTags() {
//   return request('/api/tags');
// }

// export async function queryBasicProfile(id) {
//   return request(`/api/profile/basic?id=${id}`);
// }

// export async function queryAdvancedProfile() {
//   return request('/api/profile/advanced');
// }

// export async function queryFakeList(params) {
//   return request(`/api/fake_list?${stringify(params)}`);
// }

// export async function removeFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'delete',
//     },
//   });
// }

// export async function addFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'post',
//     },
//   });
// }

// export async function updateFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'update',
//     },
//   });
// }

export async function fakeAccountLogin(params) {
  return request( `${serverApi}/admin_login`, {
    method: 'POST',
    body: params,
  });
}

// 根据条件获取到列表
export async function getMerchantListApi (params) {
  return request(`${serverApi}/admin/getAll?${stringify(params)}`);
}

// 增加商户信息
export async function addMerchantApi (params) {
  return request(`${serverApi}/admin/setMerchant`, {
    method: 'POST',
    body: params,
  })
}
// export async function fakeAccountLogin(params) {
//   return request(`${serverApi}/api/admin/login`, {
//     method: 'POST',
//     body: params,
//   });
// }

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
