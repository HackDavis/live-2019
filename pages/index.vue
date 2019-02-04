<template>
  <section class="container">
    <h3>Schedule</h3>
    <div class="d-flex">
      <button class="btn btn-primary">
        All
      </button>
      <button class="btn btn-primary">
        Fun
      </button>
      <button class="btn btn-primary">
        Food
      </button>
      <button class="btn btn-primary">
        Workshops
      </button>
      <button class="btn btn-primary">
        Important
      </button>
    </div>
    <div class="schedule-grid">
      <div v-for="item in schedule" :key="item.id" class="schedule-row">
        <div class="schedule-time">
          {{ timeToString(item.startTime) }} - {{ timeToString(item.endTime) }}
        </div>
        <div class="schedule-name">
          {{ item.name }}
        </div>
        <div class="schedule-description">
          {{ item.description }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
async function getSchedule($axios) {
  const response = await $axios.$get(
    'https://hackdavisapp.herokuapp.com/parse/classes/Schedule',
    {
      headers: {
        'X-Parse-Application-Id': 'hackdavis2019'
      },
      params: {
        include: 'tags'
      }
    }
  )
  return {
    schedule: response.results.map(item => {
      return {
        id: item.objectId,
        name: item.name,
        startTime: new Date(item.startTime.iso),
        endTime: new Date(item.endTime.iso),
        description: item.description,
        tags: item.tags
      }
    })
  }
}
export default {
  async asyncData({ $axios }) {
    const result = await getSchedule($axios)
    return result
  },
  methods: {
    timeToString(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      return hours + ':' + minutes + ' ' + ampm;
    }
  }
}
</script>

<style lang="scss">
.schedule-grid {
  display: block;
  padding-left: 0;
  padding-right: 0;
  max-height: 500px;
  overflow-y: scroll;
}
.schedule-row {
  display: flex;
  align-items: center;
}
.schedule-time {
  padding: 15px;
  flex-shrink: 0;
  flex-basis: 12rem;
}
.schedule-name {
  flex-basis: 15em;
}
</style>
