import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import menus from './modules/menus'
import mutations from './mutations'
import actions from './actions'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state(){
    return {

    }
  },
  getters: {

  },
  actions: actions,
  mutations: mutations,
  modules: {
    user,
    menus
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})