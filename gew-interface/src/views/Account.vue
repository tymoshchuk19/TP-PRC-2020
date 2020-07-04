<template>
  <div class="Account">
    <v-row>
      <v-col cols=4 >
        <v-img
          class="img-circle" 
          :src="$store.state.user.image" 
        ></v-img>
        <v-row>
          <v-col cols=8>
            <v-file-input
              v-model="file"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
          </v-col>
          <v-col cols=4>
            <v-btn color="primary" class="img-circle" @click="addFile()"> 
              <v-icon>
                mdi-cloud-upload
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols=8>
        <v-textarea
          autocomplete="name"
          label="Name"
          rows="1"
          :value="$store.state.user.name"
          disabled
        ></v-textarea>
        <v-textarea
          autocomplete="email"
          label="Email"
          rows="1"
          :value="$store.state.user.email"
          disabled
        ></v-textarea>
        <v-row>
          <v-col cols=6>
            <List label="Favorites"/>
          </v-col>
          <v-col cols=6>
            <List label="Wishes"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import List from "@/components/List.vue";

export default {
  name: 'Account',
  components: {
    List
  },
  methods: {
    addFile(){
      let data = new FormData();
      data.append('newfile', this.file, this.file.fileName);
      axios.post('http://localhost:80/file', data, {
        headers: {
          'Content-Type': `multipart/form-data;`,
          Authorization: this.$store.state.token
        }
      })
        .then((response) => {
          console.log(response.data);
          this.getFiles();
        }).catch((error) => {
          console.log('FAILURE!!!\n' + error);
        });
    }
  },
  mounted() {
  },
  data () {
      return {
        file: null
      }
    }
}
</script>
<style>
  .img-circle {
      border-radius: 50%;
  }
</style>
