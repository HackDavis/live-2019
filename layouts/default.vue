<template>
  <div class="container-fluid">
    <div class="row top-nav navbar-light">
      <button class="navbar-toggler" @click="toggleClosed" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="row">
        <div class="col-3 sidebar" :class="{hidden: closed}" id="nav_collapse">
          <side-bar />
        </div>
      <div class="col main">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '../components/Sidebar.vue'
export default {
  data() {
    let closed = false;
    if (typeof window !== 'undefined') {
      if(window.innerWidth <= 576) {
        closed = true
      }
    }
    return {
      closed: closed
    }
  },
  components: {
    'side-bar': Sidebar
  },
  methods: {
    toggleClosed() {
      this.closed = !this.closed;
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
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

.sidebar {
  background-color: purple;
  padding: 2rem;
  min-width: 250px;
  &.hidden {
    transform: translateX(-100%);
    position: absolute;
    z-index: 2;
  }
  transform: translateX(0);
  transition: transform ease-in-out 0.25s;
}

.main {
  padding: 2rem;
}

.top-nav {
  height: $top-nav-height;
  box-shadow: 0px 1px 3px grey;
}
</style>
