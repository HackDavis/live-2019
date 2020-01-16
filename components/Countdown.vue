<template>
  <div class="countdown-container">
    <div class="d-flex flex-column justify-content-center align-items-center time">
      <h1>{{hours}}</h1>
      <p>hrs</p>
      <h1>{{minutes}}</h1>
      <p>mins</p>
      <h1>{{seconds}}</h1>
      <p>secs</p>
    </div>
    <CountdownSVG />
  </div>
</template>

<script>
import CountdownSVG from '@/assets/countdown.svg'
// Why is this hardcoded? TODO: Read it from the schedule, no time to do now - Ben
const hackathonEnd = new Date("Sun, 19 Jan 2020 13:00:00 PST")

export default {
  data() {
    let delta = this.getTimeDelta()
    if (delta < 0) {delta = 0;}
    return {
      hours: Math.floor(delta / (1000 * 60 * 60)),
      minutes: Math.floor(delta / 60000) % 60,
      seconds: Math.floor(delta / 1000) % 60
    }
  },
  components: {
    CountdownSVG
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
      this.hours = Math.floor(delta / (1000 * 60 * 60))
      this.minutes = Math.floor(delta / 60000) % 60
      this.seconds = Math.floor(delta / 1000) % 60
    }
  }
}
</script>

<style lang="scss">
.countdown-container {
  position: relative;
}
.time {
  position: absolute;
  width: 100%;
  height: calc(100% + 10px);
  h1 {
    color: white;
    font-style: bold;
    font-size: 1.5rem;
    margin-bottom: 0;
  }
  p {
    margin-bottom: 1rem;
    color: #5cbebe;
  }
}
</style>
