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
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    type="text"
                    v-model="email"
                  />

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
                <router-link to="/login">Login</router-link>
                <v-btn 
                  class="ml-2"
                  color="primary" 
                  @click="register()"
                >
                  Register
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
      email: null,
      username: null,
      password: null
    }),
    methods: {
      register(){
        axios.post('http://localhost:1919/users/register', qs.stringify({
          email: this.email,
          username: this.username,
          password: this.password,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => alert('Utilizador registado: ' + data.data.username))
          .catch(() => alert('Impossivel registar!'));
      }
    }
  }
</script>
