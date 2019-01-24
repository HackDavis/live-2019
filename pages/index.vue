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
      <div class="schedule-row" v-for="item in schedule" :key="item.id">
        <div class="schedule-time">{{item.startTime}}</div>
        <div class="schedule-name">{{item.name}}</div>
        <div class="schedule-description">{{item.description}}</div>
      </div>
    </div>
  </section>
</template>

<script>
function getSchedule($axios) {
  return $axios
    .$get('https://hackdavisapp.herokuapp.com/parse/classes/Schedule', {
      headers: {
        'X-Parse-Application-Id': 'hackdavis2019'
      },
      params: {
        include: 'tags'
      }
    })
    .then(
      response => {
        console.log(response)
        return {
          schedule: response.results.map(item => {
            return {
              id: item.objectId,
              name: item.name,
              startTime: item.startTime.iso,
              endTime: item.endTime.iso,
              description: item.description,
              tags: item.tags
            }
          })
        }
      },
      error => console.error(error)
    )
}
export default {
  asyncData({ $axios }) {
    return getSchedule($axios)
  }
}
</script>

<style lang="scss">
.schedule-grid {
  display: block;
  padding-left: 0;
  padding-right: 0;
}
.schedule-row {
  display: flex;
  align-items: center;
}
.schedule-time {
  padding: 15px;
}
.schedule-name {
  flex-basis: 15em;
}
</style>
