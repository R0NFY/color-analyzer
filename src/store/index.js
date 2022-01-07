import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    path: "",
  },
  mutations: {
    setPath(state, newPath) {
      state.path = newPath;
    },
  },
  plugins: [vuexLocal.plugin],
});
