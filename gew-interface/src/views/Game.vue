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
        <v-row>
          <v-col cols=1 >
            <v-icon @click="
                addWished()
                conf( name + ' added to Wishes')
              " 
              color="primary" 
              class="btn-border white--text mr-5"
            >
              mdi-stairs
            </v-icon>
          </v-col>   
          <v-col cols=1>
            <v-icon 
              @click="
                addFavorite();
                conf( name + ' added to Favorites')
              " 
              color="primary" 
              class="btn-border white--text mr-5"
            >
              mdi-star
            </v-icon>
          </v-col>
          <v-col cols=10>
            <v-textarea
              autocomplete="name"
              label="Name"
              rows="1"
              :value="name"
              disabled
            >
            </v-textarea>
          </v-col>
        </v-row>
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
        <v-card
          class="mx-auto"
          max-width="300"
          tile
        >
          <v-list 
            rounded
            disabled
            >
            <v-subheader>Developers</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in developers"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols=6>
        <v-card
          class="mx-auto"
          max-width="300"
          tile
        >
          <v-list rounded>
            <v-subheader>Platforms</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in platforms"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
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
    conf( txt ) {
        alert( txt )
    },
    addFavorite () {
      axios.get(`http://localhost:1919/users/favorites/${this.game.slug}`,{
        headers: {
          Authorization: this.$store.state.token 
        }
      })
        .then(data => {
          this.$store.commit('setFavorites', this.game);
          console.log(data.data);
        })
        .catch(error => console.log(error));
    },
    addWished () {
      axios.get(`http://localhost:1919/users/wishes/${this.game.slug}`,{
        headers: {
          Authorization: this.$store.state.token 
        }
      })
        .then(data => {
          this.$store.commit('setWishes', this.game);
          console.log(data.data);
        })
        .catch(error => console.log(error));
    },
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
          this.developers = response.data.developers
          this.platforms = response.data.platforms
          this.background_image = response.data.background_image
          this.game = {
            slug: this.slug,
            name: this.name,
            background_image: this.background_image,
            rating: this.rating,
          }
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
        game: null,
        name: null,
        screenshots: [],
        description: null,
        release: null,
        rating: null,
        developers: [],
        platforms: [],
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
