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
      <v-card class="pb-8 pt-8" color="primary">
          <v-icon class="white--text mr-5 ml-5">
            mdi-account
          </v-icon>
          <span class="white--text">
            {{ $store.state.username }}
          </span>
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
          icon: 'mdi-star'
        }, {
          name: 'Settings',
          icon: 'mdi-tune'
        }, {
          name: 'Logout',
          icon: 'mdi-logout'
        }],
    };
  },
  methods: {

  },
};
</script>
