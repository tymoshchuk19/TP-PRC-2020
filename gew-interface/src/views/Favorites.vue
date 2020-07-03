<template>
  <v-card
    max-width="450"
    class="mx-auto"
  >
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.name"
          :key="item.name"
          v-text="item.name"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.name"
        >
          <v-list-item-avatar>
            <v-img :src="item.background_image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.image"></v-list-item-title>
            <v-list-item-subtitle v-html="item.rating.split('E')[0]"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'
  export default {
    methods: {
    getGenres () {
        axios.get(`http://localhost:1919/users/favorites/${this.$store.state.user.name}`)
          .then(data => {
            this.items = data.data;
          })
          .catch(error => console.log(error));
      }
    },
    data: () => ({
      items: [],
    }),
  }
</script>


