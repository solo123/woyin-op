import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { notification } from 'antd';
import { addMerchantApi, getMerchantListApi } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'merchant',

  // 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
  state: {
    status: undefined,
    visibe: false,
    list: [],
  },

  // Action 处理器，处理异步动作
  effects: {

    // 打开弹窗
    *opendMerchantAdd ({ payload },{ call, put }) {
        yield put({
            type: 'openMerchantAdd',
            payload: {
                visibe: true
            },
        });
    },

    // 关闭弹窗
    *closeMerchantAdd ({payload},{call, put}) {
        yield put({
            type: 'openMerchantAdd',
            payload: {
                visibe: false
            },
        });
    },

    // 增加商户
    *addMerchant ({payload},{call, put}) {
        const formData = new FormData();
        formData.append("merchantName", payload.merchantName);
        formData.append("merchantAddr", payload.merchantAddr);
        formData.append("contactMan", payload.contactMan);
        formData.append("phoneNum", payload.phoneNum);
        formData.append("telNum", payload.telNum);
        formData.append("password", payload.password);
        formData.append("userName", payload.userName);
        formData.append("transferRate", payload.transferRate);
        // formData.append("authority", payload.authority);
        formData.append("userAccount", payload.userAccount);
        const response = yield call(addMerchantApi, formData);
        if(response.result!== 'failure'){
            yield put({
                type: 'saveMerchantList',
                payload: {
                    visibe: false,
                }
            })
        }else{
            const args = {
                message: '错误',
                description: '增加失败,可能商户登陆名称已存在',
                duration: 2,
              };
              notification.error(args);
        }
    },

    // 获取商户列表
    *getMerchantList ({payload},{call, put}){
        const response = yield call(getMerchantListApi, payload)
        if(response.status === 200){
            yield put({
                type: 'saveMerchantList',
                payload: {
                    list: response.data
                }
            })
        }
    },

    *setMerchant({ payload }, { call, put }) {
      // 调用api请求数据
      const formData = new FormData();
      formData.append("merchantId", payload.userAccount);
      formData.append("merchantName", payload.password);
      formData.append("merchantAddr", payload.password);
      formData.append("contactMan", payload.password);
      formData.append("phoneNum", payload.password);
      formData.append("telNum", payload.password);
      formData.append("state", payload.password);
      // call执行异步函数
      const response = yield call(addMerchantApi, formData);
      if(response.status === 200){
        response.status = 'ok';
        response.currentAuthority = 'admin';
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.status === 'ok') {
        // 进行一次数据存入
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },


  },

  // 处理器，处理同步动作，用来算出最新的 State
  reducers: {
    openMerchantAdd(state,{payload}) {
        return {
            ...state,
            visibe: payload.visibe
        }
    },

    saveMerchantList(state,{payload}) {
        return {
            ...state,
           // visibe: payload.visibe,
            list: payload.list
        }
    },


    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
