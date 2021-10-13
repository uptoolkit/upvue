import {useUp} from "../../core/UpVue";

const state = () => ({
  user: null,
  loading: false
})

// getters
const getters = {}

// actions
const actions = {
  async getUser({ commit }) {
    const data = await useUp().api.get('user');
    commit('setUser', data)
  },
  async login({ commit }, {email, password}) {
    const data = await useUp().api.get('login');
    commit('setUser', data)
  },
  async logout({ commit }) {
    const data = await useUp().api.get('logout');
    commit('setUser', null)
  }
}

// mutations
const mutations = {
  setUser (state, user) {
    state.user = user
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}