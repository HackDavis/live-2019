<template>
  <div class="d-flex flex-column sidebar-content">
    <Countdown />
      <a target="_blank" href="https://hackdavis2020.devpost.com/">
        <button class="btn btn-light submit-button" type="button">
          Submit on Devpost
        </button>
      </a>
    <ul class="nav flex-column">
      <li class="nav-item">
        <nuxt-link :active-class="'active'" exact class="nav-link" to="/">
          Schedule
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link :active-class="'active'" exact class="nav-link" to="/map">
          Map
        </nuxt-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" target="_blank" href="https://hackdavis2020.devpost.com/">
          APIs &amp; Prizes
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target="_blank" href="https://help.hackdavis.io/">
          Mentors
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target="_blank" href="http://hardware.mlh.io/">
          Hardware
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target="_blank" href="http://hackdavis2020.slack.com/">
          Slack
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import Countdown from './Countdown'

export default {
  components: {
    Countdown
  },
}
</script>

<style lang="scss">
.sidebar-content {
  min-width: 200px;
  flex-shrink: 0;
}
.sidebar-content .nav-link {
  color: #c6c6c6;
  padding-left: 0;
  &.active {
    color: white;
  }
}
.nav {
  margin-top: 1rem;
}
.sidebar-content .nav-link:hover {
  color: lightblue;
}
.submit-button {
  width: 100%;
  margin-top: 1rem;
  border-radius: 500px;
}
.submit-button, .nav-link {
  font-weight: 600;
}
</style>
