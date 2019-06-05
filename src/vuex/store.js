
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import Mutations from './mutations.js'
import Actions from './actions.js'
import Getters from './getters.js'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: state,
  mutations: Mutations,
  actions: Actions,
  getters: Getters
})

export default store