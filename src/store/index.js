// В файле store.js
import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    markersData: []
  },
  mutations: {
    SET_MARKERS_DATA(state, data) {
      state.markersData = data;
    }
  },
  actions: {
    fetchMarkersData({ commit }) {
      axios.get('https://surgut.ritm3.ru/edu/objects')
        .then(response => {
          const markersData = response.data;
          commit('SET_MARKERS_DATA', markersData);
        })
        .catch(error => {
          console.error('Ошибка при получении данных с сервера:', error);
        });
    }
  },
  getters: {
    markersData: state => state.markersData
  }
})


