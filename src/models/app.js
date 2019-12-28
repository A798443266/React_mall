import * as services from './services'
import { routerRedux } from 'dva/router'
export default {
  namespace: 'app',
  state: {
    username: ''
  },
  reducers: {
    saveUser(state, { payload: { username } }) {
      return { ...state, username }
    },
  },
  effects: {
    * login({ payload: { data } }, { call, put }) {
      const result = yield call(services.login, data) || {}
      const { code, extend: user = {}, msg } = result
      if (code === 200) {
        yield put({
          type: 'saveUser',
          payload: { username: user.name },
        })
      }
      return { code: code || 500, msg, user }
    },
    // 路由跳转
    * redirect({ payload: { path, query } }, { put }) {
      yield put(routerRedux.push({ pathname: path, query }));
    },
  },
}
