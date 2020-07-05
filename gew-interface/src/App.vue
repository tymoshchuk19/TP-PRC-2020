<template>
  <v-app>
    <v-app-bar
      height="90%"
      app
      color="primary"
      dark
    >
      <v-row class="mt-8 mb-2">
        <v-col cols=3>
          <v-btn
            text
            @click="() => this.$router.push('/')"
          >
            <span class="headline font-weight-bold mr-2 white--text">GEW</span>
            <v-icon class="secondary blue--text">mdi-gamepad</v-icon>
          </v-btn>
        </v-col>

        <v-col cols=5>
          <v-combobox
            :items="items"
            v-model="game"
            :rules="rules"
            item-text="name"
            outlined
            dense
            allow-overflow
            label="Find your favorite game."
          >
            <template v-slot:item="{ index, item }">
              <v-row @click="$router.push(`/game/${item.slug}`)">
                <v-col cols=4>
                  <v-img 
                    :src="item.background_image" 
                    :aspect-ratio="10/10"
                    ></v-img>
                </v-col>

                <v-col cols=8>
                  <v-row>
                    <v-col>
                      {{ item.name }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols=6>
                      {{ item.released.split('T')[0] }}
                    </v-col>
                    <v-col cols=6>
                      <v-icon class="font-weight-bold yellow--text">mdi-star</v-icon>
                      {{ item.rating }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
      
      <v-spacer></v-spacer>

      <div
        v-if="$store.state.user != null"
        text
        @click="drawAccount = !drawAccount"
      >
        <v-icon v-if="!$store.state.user.profile" class="white--text mr-5 ml-5">
          mdi-account
        </v-icon>

        <v-avatar
          v-else 
        >
          <v-img 
            :src="'http://localhost:1919/uploads/' + $store.state.user.profile" 
          ></v-img>
        </v-avatar>
        <span class="ma-3"> {{$store.state.user.name}} </span>
      </div>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon> mdi-arrow-up</v-icon>
    </v-btn>
    <Account 
      v-if="$store.state.user != null" 
      :drawer="drawAccount"
    />
  </v-app>
</template>

<script>
import axios from 'axios'
import Account from "@/components/OptionsDrawer.vue";

export default {
  name: 'App',

  components: {
    Account
  },
  watch: {
    game(nv){
      if (nv && nv.length>=2) this.getGames();
    }
  },
  methods:{
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    //Obter jogos para a procura
    getGames(){
      axios.get(`http://localhost:1919/search/${this.game}`)
        .then(data => {
          this.items = data.data;
        })
        .catch(error => console.log(error));
    }
  },
  data: () => ({
    game: '',
    drawAccount: false,
    fab: false,
    items: [],
    rules: [
        value => (value && value.length >= 0) || 'Min 2 characters',
      ],
  }),
};
</script>
