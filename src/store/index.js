import { createStore } from "vuex";

export default createStore({
  state: {
    path: "",
  },
  mutations: {
    setPath(state, newPath) {
      state.path = newPath;
    },
  },
});
