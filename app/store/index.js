import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import axios from 'axios';
const store = new Vuex.Store({
  state: {
    chartData: [],
  },
  getters: {
    chartData: state => {
      return state.chartData;
    },
  },
  actions: {
    fetchChartData({ commit }) {
      axios.get('https://fe-task.getsandbox.com/performance')
        .then(response => response.data)
        .then(chartData => {
          commit('SET_Data', chartData);
        });
    },
  },
  mutations: {
    SET_Data(state, chartData) {
      state.chartData = chartData;
    },
  },
});
export default store;
