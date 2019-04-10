import { query as queryUsers } from '@/services/user';

export default {
  namespace: 'ModalAction',

  state: {
    ModalVisi:{
        SystemRole: false
    },
  },

  effects: {
    *Open({payload}, { call, put }){
        yield put({
            type: 'ModalStatue',
            payload: {
                ...payload
            },
        });
    },
    *Close({payload}, { call, put }){
        yield put({
            type: 'ModalStatue',
            payload: {
               ...payload
            },
        });
    }
  },

  reducers: {
    ModalStatue(state, action) {
        return {
            ...state,
            ModalVisi:{
                ...action.payload
            }
        };
    },
  },
};
