<template>
  <div class="home">
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
      :grow="grow"
      :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
      :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
      :icons-and-text="icons"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        v-for="(t,i) in titles"
        :key="i"
        :href="`#tab-${i}`"
        @click="activetab = i"
      >
        {{ t }}
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>

      <v-tab-item
        v-for="(t,i) in titles"
        :key="i"
        :value="'tab-' + i"
      >
        <v-row>
          <v-col>
            <v-overflow-btn
              class="my-2"
              :items="genres"
              label="Genre"
              editable
              item-value="text"
              v-model="genre"
            ></v-overflow-btn>
          </v-col>

          <v-col>
            <v-overflow-btn
              class="my-2"
              :items="developers"
              label="Developer"
              editable
              item-value="text"
              v-model="developer"
            ></v-overflow-btn>
          </v-col>

          <v-col>
            <v-overflow-btn
              class="my-2"
              :items="platforms"
              label="Platform"
              editable
              item-value="text"
              v-model="platform"
            ></v-overflow-btn>
          </v-col>
        </v-row>

        <v-card
          flat
          tile
        >
          <TimeLine 
            :genre="genre" 
            :developer="developer" 
            :platform="platform" 
            :ntab="i" :act="activetab" 
            :ss="scrolledToBottom" 
            @scroll="scrolledToBottom = false"/>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import TimeLine from '@/components/TimeLine.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    TimeLine
  },
  methods: {
    scroll () {
        window.onscroll = () => {
          let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

          if (bottomOfWindow) {
            this.scrolledToBottom = true // replace it with your code;
          }
        }
      },

      getGenres () {
        axios.get(`http://localhost:1919/genres`,{
          headers: {
            Authorization: this.$store.state.token 
          }
        })
          .then(data => {
            this.genres = data.data;
          })
          .catch(error => console.log(error));
      },

      getDevelopers () {
        axios.get(`http://localhost:1919/developers`,{
          headers: {
            Authorization: this.$store.state.token 
          }
        })
          .then(data => {
            this.developers = data.data;
          })
          .catch(error => console.log(error));
      },

      getPlatforms () {
        axios.get(`http://localhost:1919/platforms`,{
          headers: {
            Authorization: this.$store.state.token 
          }
        })
          .then(data => {
            this.platforms = data.data;
          })
          .catch(error => console.log(error));
      }
  },
  mounted() {
      this.scroll();
      this.getGenres();
      this.getDevelopers();
      this.getPlatforms()
  },
  data () {
      return {
        tab: null,
        titles: ['Launched', 'Upcoming', 'TBA'],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        icons: false,
        grow: true,
        prevIcon: false,
        nextIcon: false,
        activetab: 0,
        scrolledToBottom: false,
        genres: [],
        developers: [],
        platforms: [],
        genre: '',
        developer: '',
        platform: ''
      }
    }
}
</script>
