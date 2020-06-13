<template>
  <v-timeline class="ma-10" :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      color="blue"
      icon="mdi-gamepad"
      fill-dot
    >
      <template v-slot:opposite>
        <v-row>
          <v-col>
            <span
              :class="`headline font-weight-bold blue--text`"
              v-text="item.released.split('T')[0]"
            ></span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span
              :class="`headline font-weight-bold blue--text`"
              v-text="item.rating.split('E')[0]"
            ></span>
            <v-icon class="font-weight-bold yellow--text">mdi-star</v-icon>
          </v-col>
        </v-row>
      </template>
      <v-card
        color="blue"
        dark
      >
        <v-card-title class="title">{{ item.name }}</v-card-title>
          <v-card-text class="white text--primary">
          <v-img :src="item.background_image" :aspect-ratio="16/9"></v-img>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import axios from 'axios'
  export default {
    props: ['tab'], 
    methods: {
      scroll () {
        window.onscroll = () => {
          let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

          if (bottomOfWindow) {
            this.scrolledToBottom = true // replace it with your code
            this.page += 1
            this.getGames()
          }
        }
      },
      getGames(){
        axios.get(`http://localhost:1919/${this.tab}/${this.page}`)
          .then(data => {
            const array1 = this.items;
            this.items = [...array1, ...data.data];
            this.scrolledToBottom = false
          })
          .catch(error => console.log(error));
      }
    },
    mounted() {
      this.getGames()
      this.scroll()
    },
    data: () => ({
      items: [],
      page: 0,
      scrolledToBottom: false
    }),
  }
</script>