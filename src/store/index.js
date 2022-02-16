import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  state,
  mutations,
  actions,
  getters,
  modules: {
    ...modules
  }
})

export default store
