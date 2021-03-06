import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

config.autoAddCss = false

library.add(faTwitter, faBars, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)