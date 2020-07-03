import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null,
        user: null
    },
    mutations: {
        setToken(state, token){ 
            state.token = token;
        },
        setUser(state, user){ 
            state.user = user;
        }
    }
})