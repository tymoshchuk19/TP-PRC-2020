<template>
  <v-card
    max-width="450"
    class="ma-3"
    color="primary"
  >
    <div class="headline font-weight-bold white--text ma-2">
      {{label}}
    </div>
    <v-card 
      class="ma-1"  
      v-for="item in items"
      :key="item.name"
      >
      
      <v-row>
        <v-col @click="getGameURL(item)" cols=4>
          <v-img class="ma-1" :src="item.background_image" :aspect-ratio="1/1"></v-img>
        </v-col>
        <v-col cols=8>
          <v-textarea
            autocomplete="name"
            label="Name"
            rows="1"
            :value="item.name"
            disabled
          ></v-textarea>

          <v-row>
            <v-col cols=6>
              <div class="headline font-weight-bold blue--text">
                {{item.rating.split('E')[0]}}
                <v-icon class="font-weight-bold yellow--text">mdi-star</v-icon>
              </div>
            </v-col>
            <v-col cols=6>
              <div @click="del(item)" class="headline font-weight-bold blue--text">
                <v-icon class="font-weight-bold red--text">mdi-delete</v-icon>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import axios from "axios"
  export default {
    props: ['label'],
    methods: {
      async del(item){
        await this.remove(item);
        this.getItems()
      },
    remove(game) {
      if(this.label == 'Favorites'){ 
        axios.delete(`http://localhost:1919/users/favorites/${(game.fav||game.slug).split('#')[1]}`,{
          headers: {
            Authorization: this.$store.state.token 
          }
        })
          .then(data => {
            console.log(game)
            this.$store.commit('rmFavorites', game);
            console.log(data.data);
          })
          .catch(error => console.log(error));
      }
      if(this.label == 'Wishes') {
        axios.delete(`http://localhost:1919/users/wishes/${(game.wish||game.slug).split('#')[1]}`,{
          headers: {
            Authorization: this.$store.state.token 
          }
        })
          .then(data => {
            this.$store.commit('rmWishes', game);
            console.log(data.data);
          })
          .catch(error => console.log(error));
      }
    },
    getGameURL(item) {
      console.log(item)
      if(this.label == 'Favorites')
        this.$router.push(`/game/${(item.fav||item.slug).split('#')[1]}`)
      if(this.label == 'Wishes')
        this.$router.push(`/game/${(item.wish||item.slug).split('#')[1]}`)
    },
    getItems () {
      if(this.label == 'Favorites')
        this.items = this.$store.state.user.favorites
      if(this.label == 'Wishes')
        this.items = this.$store.state.user.wishes
      }
    },
    mounted() {
      this.getItems()
    },
    data: () => ({
      items: [{
        name: 'Test',
        rating: "5.0",
        background_image: 'https://media.contentapi.ea.com/content/dam/gin/images/2018/06/command-and-conquer-rivals-key-art.jpg.adapt.crop1x1.767p.jpg'
      }],
    }),
  }
</script>


