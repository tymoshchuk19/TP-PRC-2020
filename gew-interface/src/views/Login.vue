<template>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="username"
                    type="text"
                    v-model="username"
                  />

                  <v-text-field
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <router-link to="/register">Register</router-link>
                <v-btn 
                  class="ml-2"
                  color="primary" 
                  @click="login()"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import axios from 'axios'
import qs from 'querystring'
  export default {
    data: () => ({
      username: null,
      password: null
    }),
    methods: {
      login(){
        axios.post('http://192.168.1.160:1919/users/authenticate', qs.stringify({
          username: this.username,
          password: this.password,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            if(data.data.token) {
              this.$store.commit('setToken', data.data.token);
              this.$store.commit('setUsername', this.username);
              this.$router.push('/');
            } else {
              alert('Credenciais inválidas' )
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }
</script>
