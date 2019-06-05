import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from '@/router.js'
import '@/common/styles/common.less'
import '@/common/fonts/fonts.css'
import '@/utils/interceptor'
import store from '@/vuex/store'
import '@/utils/filters'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
