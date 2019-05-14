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
      yield put({
        type: 'save',
        payload,
      });
    },
  },

  reducers: {
    save(state, action) {
      for (let i = 0; i < state.list.length; i += 1) {
        if (state.list[i].href === action.payload.menu.href) {
          state.list.splice(i, 1);
          if (action.payload.action === 'delete') {
            return {
              ...state,
            };
          }

          state.list.push(action.payload.menu);
          return {
            ...state,
          };
        }
      }
      state.list.push(action.payload.menu);
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
