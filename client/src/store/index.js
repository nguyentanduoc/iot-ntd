import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    arduinos: []
  },
  getters: {
    isUserLoggedIn: state => {
      return state.isUserLoggedIn;
    },
    getSensor: state => {
      return state.arduinos;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setSensorForChart(state, sensors){
      state.arduinos = sensors;
    }
  },
  actions: {
    setToken({
      commit
    }, token) {
      commit('setToken', token);
    },
    setUser({
      commit
    }, user) {
      commit('setUser', user);
    },
    setSensorForChart({commit}, sensors){
      commit('setSensorForChart', sensors);
    }
  }
});
