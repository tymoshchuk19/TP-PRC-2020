<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn
        text
      >
        <span class="headline font-weight-bold mr-2 white--text">GEW</span>
        <v-icon class="secondary blue--text">mdi-gamepad</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        text
      >
        <span class="mr-2">Logout</span>
        <v-icon class="secondary blue--text">mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
