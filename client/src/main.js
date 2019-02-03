import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

Vue.use(Vue2TouchEvents);