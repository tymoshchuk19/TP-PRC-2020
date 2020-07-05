import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null,
        user: null
    },
    mutations: {

        setFavorites(state, game){ 
            if (state.user.favorites.filter(e => e.name === game.name).length == 0)
                state.user.favorites.push(game);
        },
        setWishes(state, game){ 
            if (state.user.wishes.filter(e => e.name === game.name).length == 0)
                state.user.wishes.push(game);
        },
        setToken(state, token){ 
            state.token = token;
        },
        setUser(state, user){
            state.user = user;
        }
    }
})