<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex flex-column sidebar-content">
      <button class="btn btn-light submit-button">
        Submit
      </button>
      <ul class="nav flex-column">
        <li class="nav-item">
          <nuxt-link class="nav-link" active-class="active" to="/">
            Schedule
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/map">
            Map
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/prizes">
            APIs &amp; Prizes
          </nuxt-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://help.hackdavis.io/">
            Mentors
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://hardware.mlh.io/">
            Hardware
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://devpost.com/">
            Devpost
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const hackathonEnd = new Date(2019, 2, 10, 12)

export default {
  data() {
    const delta = this.getTimeDelta()
    return {
      hours: Math.floor(delta / 3600000),
      minutes: Math.floor(delta / 60000) % 60,
      seconds: Math.floor(delta / 1000) % 60
    }
  },
  beforeMount() {
    this.timer = setInterval(this.setTime, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    getTimeDelta() {
      const now = Date.now()
      return hackathonEnd - now
    },
    setTime() {
      const delta = this.getTimeDelta()
      this.hours = Math.floor(delta / 3600000)
      this.minutes = Math.floor(delta / 60000) % 60
      this.seconds = Math.floor(delta / 1000) % 60
    }
  }
}
</script>

<style lang="scss">
.sidebar-content {
  height: 100vh;
  min-width: 200px;
}
.sidebar-content .nav-link {
  color: white;
  padding-left: 0;
}
.sidebar-content .nav-link:hover {
  color: lightblue;
}
.submit-button {
  width: 100%;
}
</style>
