import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    arduinos: [],
    sensorWarnning: []
  },
  getters: {
    isUserLoggedIn: state => {
      return state.isUserLoggedIn;
    },
    getSensor: state => {
      return state.arduinos;
    },
    getSensorWarnningCount: state => {
      return state.sensorWarnning.length;
    },
    getWarning: state => {
        return state.sensorWarnning;
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
    setSensorForChart(state, sensors) {
      state.arduinos = sensors;
    },
    addWarning(state, sensor) {
      if(state.sensorWarnning.indexOf(sensor) === -1) {
            state.sensorWarnning.push(sensor);
      }
    },
    subWarning(state, sensor) {
      var position = state.sensorWarnning.indexOf(sensor);
      state.sensorWarnning.splice(position,1);
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
    setSensorForChart({
      commit
    }, sensors) {
      commit('setSensorForChart', sensors);
    },
    addWarning({
      commit
    }, sensor) {
      commit('addWarning', sensor);
    },
    subWarning({
      commit
    }, sensor) {
      commit('subWarning', sensor);
    }
  }
});
