import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null,
        username: null
    },
    mutations: {
        setToken(state, token){ 
            state.token = token;
        },
        setUsername(state, username){ 
            state.username = username;
        }
    }
})