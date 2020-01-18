<template>
  <div class="countdown-container">
    <div class="d-flex flex-column justify-content-center align-items-center time">
      <div class='hd-logo'></div>
      <h1 class='countdown'>{{hours}}:{{minutes}}:{{seconds}}</h1>
      <h2>Until Hacking Ends</h2>
      <br>
    </div>
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
    const seconds = Math.floor(delta / 1000) % 60;
    return {
      hours: Math.floor(delta / (1000 * 60 * 60)),
      minutes: Math.floor(delta / 60000) % 60,
      seconds: `${seconds < 10 ? '0' : ''}${seconds}`
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
      this.hours = this.formatTime(Math.floor(delta / (1000 * 60 * 60)))
      this.minutes = this.formatTime(Math.floor(delta / 60000) % 60)
      this.seconds = this.formatTime(Math.floor(delta / 1000) % 60);
    },
    formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
  }
}
</script>

<style lang="scss">
.countdown-container {
  position: relative;
}
div.countdown-logo
{
    width: 4rem;
    height: 4rem;
    margin-bottom: 1.5rem;
    background-image: url("https://hackdavis.io/assets/img/icons/favicon-196x196.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.time {
  width: 100%;
  height: calc(100% + 10px);
  div.countdown {
    color: white;
    font-style: bold;
    font-size: 2.5rem;
    padding: 10px !important;
    margin-bottom: 0;
  }
  div.hd-logo
  {
      width: 6rem;
      height: 6rem;
      background-image: url("https://hackdavis.io/assets/img/icons/favicon-196x196.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 8px;
  }
  p {
    margin-bottom: 1rem;
    color: #5cbebe;
  }
  h2{
      text-align: center;
      font-size: 1rem;
  }
}
</style>
