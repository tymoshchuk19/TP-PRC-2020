<template>
  <div class="Game">
    
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in screenshots"
        :key="i"
        :src="item.screenshot.split('#')[1]"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    
    <v-row>
      <v-col cols=12 class="ma-5">
        <v-textarea
          autocomplete="name"
          label="Name"
          rows="1"
          :value="name"
          disabled
        >
        </v-textarea>
        <v-textarea
          autocomplete="description"
          label="Description"
          :value="description"
          disabled
        ></v-textarea>
        <v-row>
          <v-col cols=6> 
            <v-textarea
              autocomplete="release"
              label="Release"
              rows="1"
              :value="release"
              disabled
            ></v-textarea>
          </v-col>
          <v-col cols=6> 
            <v-textarea
              autocomplete="rating"
              label="Rating"
              rows="1"
              :value="rating"
              disabled
            ></v-textarea>

          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols=6>
        <v-card>
          <v-img class="ma-1" :src="item.background_image" :aspect-ratio="1/1"></v-img>
        </v-card>
      </v-col>
      <v-col cols=6>
        <v-card>
          <div class="headline font-weight-bold blue--text">
            {{item.name}}
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-card
      class="ma-3"
      color="primary"
    >
      <div class="headline font-weight-bold white--text ma-2">
        Achievements
      </div>
      <v-row>
        <v-col cols=4 v-for="item in items" :key="item.name">
          <v-card class="pa-2 ma-2">
            <v-row>
              <v-col cols=4>
                <v-img class="ma-1" :src="item.background_image" :aspect-ratio="1/1"></v-img>
              </v-col>
              <v-col cols=8>
                <div class="headline font-weight-bold blue--text">
                  {{item.name}}
                </div>
              </v-col>
            </v-row>
            <v-textarea
              autocomplete="description"
              label="Description"
              rows="2"
              :value="item.description"
              disabled
            ></v-textarea>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Game',
  props: ['slug'],
  components: {
  },
  methods: {
    getGame(){
      axios.get(`http://localhost:1919/${this.slug}`, {
        headers: {
          'Content-Type': `multipart/form-data;`,
          Authorization: this.$store.state.token
        }
      })
        .then((response) => {
          console.log(response.data)
          this.name = response.data.name
          this.items = response.data.achievements
          this.screenshots = response.data.short_screenshots;
          this.description = response.data.description.replace(/<\/?[^>]+(>|$)/g, "");
          this.release = response.data.released.split('T')[0]
          this.rating = response.data.rating.split('E')[0]
        }).catch((error) => {
          console.log('FAILURE!!!\n' + error);
        });
    }
  },
  created() {
    this.getGame()
  },
  data () {
      return {
        name: null,
        screenshots: [],
        description: null,
        release: null,
        rating: null,
        items: [{
          name: 'Test',
          description: "Some description",
          background_image: 'https://media.contentapi.ea.com/content/dam/gin/images/2018/06/command-and-conquer-rivals-key-art.jpg.adapt.crop1x1.767p.jpg'
        }],
      }
    }
}
</script>
<style>
  .img-circle {
      border-radius: 50%;
  }
</style>
