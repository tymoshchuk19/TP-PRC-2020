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
              v-if="item.released.split('T')[0]!='null'"
              :class="`headline font-weight-bold blue--text`"
              v-text="item.released.split('T')[0]"
            ></span>
            <span
              v-else
              :class="`headline font-weight-bold blue--text`"
              v-text="'tba'"
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
    props: ['ntab', 'act', 'ss'], 
    watch: {
      ss(nv) {
        if(this.act == this.tab) 
          if(nv){
            this.page += 1
            this.getGames()
          }
        else console.log('tab:', this.tab)
      } ,
    },
    methods: {
      getGames(){
        console.log('tab:', this.tab, 'page: ',this.page)
        axios.get(`http://localhost:1919/${this.tab}/${this.page}`)
          .then(data => {
            const array1 = this.items;
            this.items = [...array1, ...data.data];
            this.$emit('scroll', false)
          })
          .catch(error => console.log(error));
      }
    },
    mounted() {
      this.tab = this.ntab;
      this.getGames();
    },
    data: () => ({
      tab: 0,
      items: [],
      page: 0
    }),
  }
</script>