import { createStore } from 'vuex';

const store = createStore({
    modules: {
        user: {
            namespaced: true,
            state: {
                user: null,
            },
            mutations: {
                setUser(state, user) {
                    state.user = user;
                },
                logoutUser(state) {
                    state.user = null;
                },
            },
    },
},});

export default store;