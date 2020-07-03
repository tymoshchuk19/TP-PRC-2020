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
        axios.post('http://localhost:1919/users/authenticate', qs.stringify({
          username: this.username,
          password: this.password,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            if(data.data.token) {
              data.data.user.image = 'https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-1/p320x320/45793319_921720691359428_2742517402259423232_o.jpg?_nc_cat=106&_nc_sid=dbb9e7&_nc_ohc=miK80xzVrEQAX-2M8dO&_nc_ht=scontent-mad1-1.xx&_nc_tp=6&oh=de84aa5695cbf271360548addd1c2ef1&oe=5F23FEB5'
              this.$store.commit('setToken', data.data.token);
              this.$store.commit('setUser', data.data.user);
              
              this.$router.push('/');
            } else {
              alert('Credenciais inválidas')
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }
</script>
