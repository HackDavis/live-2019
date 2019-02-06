<template>
  <section class="container-fluid d-flex flex-column main-content">
    <div class="header">
      <h3 class="font-weight-bold">Schedule</h3>
      <div class="d-flex justify-content-between align-items-start selectors">
        <b-form-radio-group id="categories"
                          buttons
                          button-variant="outline-primary"
                          v-model="selector.selected"
                          :options="selector.options" />
        <b-form-radio-group id="date"
                          buttons
                          button-variant="outline-primary"
                          v-model="date.selected"
                          :options="date.options" />
      </div>
    </div>
    <div class="schedule-grid">
      <div v-for="item in activeItems" :key="item.id" class="schedule-row">
        <div class="schedule-color" :class="{ yellow: hasScheduleTag(item, 'Fun'), red: hasScheduleTag(item, 'Logistics'), green: hasScheduleTag(item, 'Workshops'), purple: hasScheduleTag(item, 'Meals') }">

        </div>
        <div class="schedule-time font-weight-bold d-flex flex-column justify-content-center">
          {{ timeToString(item.startTime) }} - {{ timeToString(item.endTime) }}
        </div>
        <div class="schedule-name font-weight-bold d-flex flex-column justify-content-center">
          {{ item.name }}
        </div>
        <div class="schedule-description font-weight-light d-flex flex-column justify-content-center">
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
  data () {
    return {
      selector: {
        selected: "all",
        options: [
          {text: "All", value: "all"},
          {text: "Workshops", value: 'Workshops'},
          {text: "Activities", value: 'Fun'},
          {text: "Logistics", value: "Logistics"},
          {text: "Food", value: "Meals"}
        ]
      },
      date: {
        selected: "",
        options: [
          {text: "Feb 9", value: "9"},
          {text: "Feb 10", value: '10'}
        ]
      }
    }
  },
  watch: {
    'selector.selected': function(val) {
      if(val === 'all') {
        this.date.selected = ''
      }
    },
    'date.selected': function(val) {
      if(this.selector.selected === 'all' && val !== '') {
        this.selector.selected = ''
      }
    }
  },
  computed: {
    activeItems() {
      if(this.selector.selected == "all") {
        return this.schedule;
      }
      let tags = this.schedule;
      if(this.selector.selected !== '') {
        tags = tags.filter(el => this.hasScheduleTag(el, this.selector.selected))
      }
      if(this.date.selected === '') {
        return tags;
      }
      else {
        return tags.filter(el => el.startTime.getUTCDate() == this.date.selected);
      }
    }
  },
  methods: {
    timeToString(date) {
      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      return hours + ':' + minutes + ' ' + ampm;
    },
    findScheduleTag(item, tag) {
      return item.tags.find(el => el.name == tag);
    },
    hasScheduleTag(item, tag) {
      return typeof this.findScheduleTag(item, tag) !== 'undefined'
    }
  }
}
</script>

<style lang="scss">
.schedule-grid {
  display: block;
  padding-left: 0;
  padding-right: 0;
  height: 100%;
  overflow-y: scroll;
}
.schedule-color {
  width: 0.5rem;
  flex-shrink: 0;
  flex-grow: 0;
}
.schedule-row {
  display: flex;
  align-items: stretch;
  border-radius: 5px;
  border: solid 1px #707070;
  margin-top: 1rem;
  background-color: #f5f5f5;
  overflow: auto;
  @media (max-width: 716px) {
    flex-wrap: wrap;
  }
}
.schedule-time {
  padding: 10px;
  flex-shrink: 0;
  flex-basis: 12rem;
  background-color: white;
  border-right: 1px solid #707070;
}
.schedule-name {
  flex-basis: 15em;
  padding-left: 1rem;
  flex-shrink: 0;
  @media (max-width: 892px) {
    flex-basis: 12em;
  }
}
.schedule-description {
  flex-grow: 1;
  padding-left: 1rem;
  word-wrap: break-word;
  padding: 0.5rem;
  @media (max-width: 716px) {
    padding: 1rem;
    border-top: 1px solid #053848;
  }
}
.schedule-color {
  &.red {
    background-color: #c15a5a;
  }
  &.yellow {
    background-color: #d6a83f;
  }
  &.purple {
    background-color: #8d73d3;
  }
  &.green {
    background-color: #409887;
  }
}
.selectors {
  flex-wrap: wrap;
}
#categories, #date { 
  label.btn {
    color: #053848;
    border-width: 2px;
    padding-left: 2.25em;
    padding-right: 2.25em;
    flex-grow: 0;
    flex-shrink: 0;
    margin-top: 2.5px;
    margin-bottom: 2.5px;
    &:hover, &.active {
      color: white;
      background-color: #007ba0;
    }
    border-color: #007ba0;
  }
  .btn-outline-primary {
    box-shadow: none;
  }
}
#categories {
  flex-wrap: wrap;
  border-radius: 5px;
  label.btn {
    &:nth-child(4) {
      &.active, &:hover {
        background-color: #c15a5a;
      }
      border-color: #c15a5a;
    }
    &:nth-child(3) {
      &.active, &:hover {
        background-color: #d6a83f;
      }
      border-color: #d6a83f;
    }
    &:nth-child(5) {
      &.active, &:hover {
        background-color: #8d73d3;
      }
      border-color: #8d73d3;
    }
    &:nth-child(2) {
      &.active, &:hover {
        background-color: #409887;
      }
      border-color: #409887;
    }
    &:not(:first-child) {
      margin-left: 3px;
    }
    &:not(:last-child) {
      margin-right: 3px;
    }
  }
  .btn-outline-primary {
    box-shadow: none;
  }
  & > .btn:not(:last-child):not(.dropdown-toggle), & > .btn-group:not(:last-child) > .btn {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  & > .btn:not(:first-child), & > .btn-group:not(:first-child) > .btn {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}

.main-content {
  height: 100%;
}

.header {
  padding-bottom: 1rem;
  box-shadow: 0px 5px 5px -5px grey;
}
</style>
