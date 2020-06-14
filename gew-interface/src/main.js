import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import theme from './themes/standard';
import { store } from './store/store'

Vue.config.productionTip = false

new Vue({
  theme,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
