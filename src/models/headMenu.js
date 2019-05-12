/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { query as queryUsers } from '@/services/user';

export default {
  namespace: 'headMenu',

  state: {
    list: [
      // {label: 'xxxx', href: 'xxxxxx'}
    ],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      //    const response = yield call(queryUsers);
      // console.log('转递过来一次');
      // console.log(payload.menu);
      yield put({
        type: 'save',
        menu: payload.menu,
      });
    },

    // *dele({ payload }, { call, put }) {
    //   console.log('删除成功');
    // }
  },

  reducers: {
    save(state, action) {
      state.list.push(action.menu);
      return {
        ...state,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
