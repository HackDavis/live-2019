<template>
  <div class="container-fluid">
    <div class="row top-nav navbar-light">
      <button class="navbar-toggler" @click="toggleClosed" type="button">
        <font-awesome-icon size="lg" :icon="closed ? 'bars' : 'times'" />
      </button>
      <button class="btn btn-twitter" type="button" @click="closeTwitter = !closeTwitter">
        <font-awesome-icon size="lg" :icon="['fab', 'twitter']" />
      </button>
    </div>
    <div class="row">
        <div class="col-3 sidebar-left" :class="{hidden: closed, show: wasClosed}" id="nav_collapse">
          <side-bar />
        </div>
      <div class="col main">
        <nuxt />
      </div>
      <div class="col-3 sidebar-right" :class="{hidden: closeTwitter}">
        <timeline :id="'hack_davis'" :sourceType="'profile'" :options="{height: 600}"/>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '../components/Sidebar.vue'
import {Timeline} from 'vue-tweet-embed'
export default {
  data() {
    let closed = false;
    if (typeof window !== 'undefined') {
      if(window.innerWidth <= 768) {
        closed = true
      }
    }
    return {
      closed: closed,
      wasClosed: !closed, /* used to toggle show class, which toggles the open/close animation
                             false if it starts closed */
      closeTwitter: true
    }
  },
  components: {
    'side-bar': Sidebar,
    'timeline': Timeline
  },
  methods: {
    toggleClosed() {
      this.closed = !this.closed;
      this.wasClosed = true; // want animation whenever a button is clicked
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

html {
  font-family: 'Avenir Next', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.sidebar-left {
  background-color: #090617;
  padding: 2rem;
  min-width: 265px;
  flex-basis: 20%;
  max-width: 20%;
  min-height: calc(100vh - #{$top-nav-height});
  transform: translateX(0);
  &.hidden {
    transform: translateX(-100%);
    position: absolute;
    z-index: 3;
    display: none;
  }
  &.show {
    transition: transform ease-in-out 0.2s;
  }
  @media(max-width: 768px) {
    position: absolute;
    z-index: 3;
  }
}

.sidebar-right {
  padding: 2rem;
  min-width: 250px;
  flex-basis: 25%;
  max-width: 25%;
  background-color: white;
  &.hidden {
    transform: translateX(100%);
    position: absolute;
    right: 0;
    z-index: 3;
  }
  transform: translateX(0);
  transition: transform ease-in-out 0.25s;
  box-shadow: 0px 3px 5px grey;
  height: calc(100vh - #{$top-nav-height});
  @media(max-width: 768px) {
    position: absolute;
    right: 0;
    z-index: 3;
    padding: 1rem;
  }
}

.main {
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-image: linear-gradient(to bottom, #1B0B3E, #101010);
  height: calc(100vh - #{$top-nav-height});
  @media(min-width: 576px){
    .main {
      padding: 2rem;
    }
  }
}



.top-nav {
  height: $top-nav-height;
  box-shadow: 0px 1px 3px grey;
  justify-content: space-between;
  position: relative;
  background: #090617;
  z-index: 5;
}

.btn-twitter {
  font-size: 20px;
  margin-right: 10px;
  color: white;
  &:focus {
    box-shadow: none;
  }
}

.top-nav .navbar-toggler {
  border-color: transparent;
  color: white;
}

body {
  font-family: 'Avenir Next', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
  color: white;
}
</style>
