<template>
  <v-navigation-drawer
    :value="drawer"
    color="primary"
    right
    fixed
    clipped
    temporary
    height="100%"
  >
      <v-card class="pb-5 pt-5" color="primary">
        <div class="ml-10">
          <v-icon v-if="!$store.state.user.image" class="white--text mr-5 ml-5">
            mdi-account
          </v-icon>

          <v-avatar
            v-else 
          >
            <v-img 
              :src="$store.state.user.image" 
            ></v-img>
          </v-avatar>
          <span class="white--text ma-1">
            {{ $store.state.user.name }}
          </span>
        </div>
      </v-card>
      <v-divider></v-divider>
      <v-row height="100%" align="end">
        <v-col cols=12 justify="start">
          <v-btn
            width="100%"
            height="100%"
            tile
            v-for="(item, i) in items" :key="i"
            class="white--text pt-3 pb-3" 
            color="primary"
            @click="item.action"
          >
            <v-icon class="white--text mr-5">
              {{ item.icon }}
            </v-icon>
            <span>
              {{ item.name }}
            </span>
          </v-btn>
        </v-col>
      </v-row>
  </v-navigation-drawer>
</template>

<script>
/* eslint-disable */

export default {
  props: ['drawer'],

  data() {
    return {
      items: [{
          name: 'Favorites',
          icon: 'mdi-star',
          action: () => {this.$router.push('/favorites');}
        }, {
          name: 'Wishes',
          icon: 'mdi-stairs',
          action: () => {}
        }, {
          name: 'Settings',
          icon: 'mdi-tune',
          action: () => {}
        }, {
          name: 'Account',
          icon: 'mdi-account',
          action: () => {this.$router.push('/account');}
        }, {
          name: 'Logout',
          icon: 'mdi-logout',
          action: () => {
            this.$store.commit('setToken', null);
            this.$store.commit('setUser', null);
            console.log(this.$store.state.token)
            this.$router.push('/login');
          }
        }],
    };
  },
  methods: {

  },
};
</script>
