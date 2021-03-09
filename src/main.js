import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { api } from './axios/api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.config.productionTip = true;
Vue.prototype.$api = api;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
