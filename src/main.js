import { createApp } from 'vue'
import './style.css'
import router from './router';
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './assets/tailwind.css'  // Import Tailwind CSS
import 'primeicons/primeicons.css'

import Tooltip from 'primevue/tooltip';

// TODO dùng sotre trưc tiếp để lấy url  sau chuyển ra modules
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      url: null
    }
  },
  mutations: {
     seturl(state, url) {
      state.url = url
    }
  },
  getters: {
    getUrl (state) {
      return state.url
    }
  }
})

const app = createApp(App)
.use(router);
app.use(store);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
});
app.directive('tooltip', Tooltip);


app.mount('#app')
