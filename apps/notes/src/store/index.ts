import Vue from 'vue';
import Vuex, { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export const store = createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    accessToken: '',
  },
  mutations: {
    UPDATE_TOKEN(state, payload) {
      state.accessToken = payload;
    },
  },
  actions: {
    updateToken(context, payload) {
      context.commit('UPDATE_TOKEN', payload);
    },
  },
  getters: {
    getToken: (state) => {
      return state.accessToken;
    },
  },
});
