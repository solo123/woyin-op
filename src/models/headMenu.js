import { query as queryUsers } from '@/services/user';

export default {
  namespace: 'headMenu',

  state: {
    list: [
        {name: 'xxxx', linke: 'xxxxxx'}
    ],
  },

  effects: {
    *fetch({payload} , { call, put }) {
    //    const response = yield call(queryUsers);
       yield put({
         type: 'save',
         payload,
       });
    }
  },

  reducers: {
    save(state, action) {
      state.list.push(action.payload);
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
