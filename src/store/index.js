import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
  },
  getters: {
    getIsRegisterd: (state) => {
      return state.user;
    },
  },
  mutations: {},
  actions: {
    setUser(state, user) {
      state.user = user;
    },
  },
  modules: {},
});
