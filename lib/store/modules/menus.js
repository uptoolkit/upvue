import {useUp} from "../../core/UpVue";

const state = () => ({
  menus: null,
  loading: false
})

// getters
const getters = {}

// actions
const actions = {
  async getMenus ({ commit }) {
    const data = await useUp().api.get('menus');
    commit('setMenus', data)
  }
}

// mutations
const mutations = {
  setMenus(state, data) {
    state.menus = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}