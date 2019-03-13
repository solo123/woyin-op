import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
    namespace: 'resPassword',

    state: {
        status: undefined,
    },

    effects: {
      *resPassword({ payload }, {call, put}){
        console.log(payload);
        const response = yield call(fakeAccountLogin, payload);
        yield put({
            type: 'changePassword',
            payload: response,
        });
        if (response.status === 'ok') {
            reloadAuthorized();
            console.log('校验通过');
        }
      }
    },

    reducers: {
        changePassword(state, { payload }) {
          setAuthority(payload.currentAuthority);
          return {
            ...state,
            status: payload.status,
            type: payload.type,
          };
        },
      },
}