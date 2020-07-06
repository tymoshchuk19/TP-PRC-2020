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
            console.log(state.user.favorites)
            if (state.user.favorites === undefined)
                state.user.favorites= [game];
            else if (state.user.favorites.filter(e => e.name === game.name).length == 0)
                    state.user.favorites.push(game); 
        },
        setWishes(state, game){ 
            if (state.user.wishes === undefined)
                state.user.wishes = [game];
            else if (state.user.wishes.filter(e => e.name === game.name).length == 0)
                        state.user.wishes.push(game);
        },
        rmFavorites(state, game){ 
            state.user.favorites.splice(state.user.favorites.findIndex(item => item.fav === game.fav), 1)

        },
        rmWishes(state, game){ 
            state.user.wishes.splice(state.user.wishes.findIndex(item => item.wish === game.wish), 1)
        },
        setToken(state, token){ 
            state.token = token;
        },
        setUser(state, user){
            state.user = user;
        }
    }
})