// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import VueHighlightJS from 'vue-highlightjs'
import codemirror from 'vue-codemirror'

import App from './App'
import router from './router'

import $q from './request'

import store from './store'

import './library/matrix.min'
// 重置样式
import './common/styles/reset.css'

import 'iview/dist/styles/iview.css'

import 'highlight.js/styles/atom-one-dark.css'

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'

const mode = process.env.NODE_ENV !== 'production'

Vue.config.debug = mode
Vue.config.devtools = mode
Vue.config.productionTip = mode

Vue.prototype.$q = $q

Vue.use(iView)
Vue.use(VueHighlightJS)
Vue.use(codemirror, {
    options: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        indentUnit: 4
    }
})

router.beforeEach((to, from, next) => {
    next()
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
