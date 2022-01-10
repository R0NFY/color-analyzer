import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    path: "",
    size: Number,
  },
  mutations: {
    setPath(state, newPath) {
      state.path = newPath;
    },
    setSize(state, newSize) {
      state.size = newSize;
    },
  },
  plugins: [vuexLocal.plugin],
});
