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
        <div class="schedule-color" :class="{ yellow: hasScheduleTag(item, 'Activities'), red: hasScheduleTag(item, 'Logistics'), green: hasScheduleTag(item, 'Workshops'), purple: hasScheduleTag(item, 'Meals') }">

        </div>
        <div class="schedule-day font-weight-bold d-flex flex-column justify-content-center">
          {{ timeToDay(item.startTime) }}
        </div>
        <div class="schedule-time font-weight-bold d-flex flex-column justify-content-center">
          {{ timeToString(item.startTime) }} - {{ timeToString(item.endTime, true) }}
        </div>
        <div class="schedule-name font-weight-bold d-flex flex-column justify-content-center">
          {{ item.name }}
            <div class="flex-column justify-content-center schedule-description">
            {{ item.description }}
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

let OBJECT_ID = 1;

async function getSchedule($axios) {

    const response = require("static/live_site_schedule.json")
    return {
        schedule: response.data.map(item => {
        return {
            id: OBJECT_ID++,
            name: item.name,
            startTime: new Date(item.startTime),
            endTime: new Date(item.endTime),
            description: item.description,
            tags: item.tags
        }
        }).sort((first, second) => first.startTime - second.startTime)
    }
}
export default {
  async asyncData({ $axios }) {
    const result = await getSchedule($axios)
    return result
  },
  created() {
    getSchedule(this.$axios).then((value) => {
      this.schedule = value.schedule;
    });
  },
  data () {
    return {
      selector: {
        selected: "All",
        options: [
          {text: "All", value: "All"},
          {text: "Workshops", value: 'Workshops'},
          {text: "Activities", value: 'Activities'},
          {text: "Logistics", value: "Logistics"},
          {text: "Food", value: "Meals"}
        ]
      },
      date: {
        selected: "",
        options: [
          {text: "Saturday", value: "18"},
          {text: "Sunday", value: '19'}
        ]
      }
    }
  },
  watch: {
    'selector.selected': function(val) {
      if(val === 'All') {
        this.date.selected = ''
      }
    },
    'date.selected': function(val) {
      if(this.selector.selected === 'All' && val !== '') {
        this.selector.selected = ''
      }
    }
  },
  computed: {
    activeItems() {
      if(this.selector.selected == "All") {
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
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      return hours + ':' + minutes + ' ' + ampm;
    },
    timeToDay(date) {
      return date.toLocaleDateString("en-us", { weekday: 'long' });
    },
    findScheduleTag(item, tag) {
      return item.tags.find(el => el == tag);
    },
    hasScheduleTag(item, tag) {
      return typeof this.findScheduleTag(item, tag) !== 'undefined';
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
  height: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.schedule-row {
    position: relative;
  display: flex;
  align-items: stretch;
  border-radius: 5px;
  border: solid 1px #707070;
  margin-top: 1rem;
  overflow: auto;
  @media (max-width: 716px) {
    flex-wrap: wrap;
  }
  transition: 0.2s ease-in-out background-color;
}
.schedule-row:hover
{
    background: rgba(255, 255, 255, 0.1);
}
.schedule-day {
    text-align: center;
  padding: 10px;
  padding-left: 1rem;
  flex-shrink: 0;
  flex-basis: 7rem;
  border-right: 1px solid #707070;
}
.schedule-time {
  padding: 10px;
  flex-shrink: 0;
  flex-basis: 12rem;
    text-align: center;
  border-right: 1px solid #707070;
}
.schedule-name {
  flex-basis: 50%;
  padding-left: 1rem;
  flex-shrink: 0;
  transition: 0.2s ease-in-out text-decoration;
  @media (max-width: 892px) {
    flex-basis: 100%;
  }
}
.schedule-name:hover
{
    cursor: pointer;
}
.schedule-description {
    display: none;
  font-weight: 300;
  transition: 0.2s ease-in-out all;
  @media (max-width: 716px) {
    padding: 1rem;
    border-top: 1px solid #053848;
  }
}
.schedule-name:hover .schedule-description
{
    display: block;
}
.schedule-color {
  &.red {
    background-color: #CA406E;
  }
  &.yellow {
    background-color: #EBB332;
  }
  &.purple {
    background-color: #422BE9;
  }
  &.green {
    background-color: #5EC0F3;
  }
}
.selectors {
  flex-wrap: wrap;
}
#categories, #date { 
  label.btn {
    color: white;
    border-width: 2px;
    padding-left: 2.25em;
    padding-right: 2.25em;
    flex-grow: 0;
    flex-shrink: 0;
    margin-top: 2.5px;
    margin-bottom: 2.5px;
    &:hover, &.active {
      color: black;
      background-color: white;
    }
    border-color: white;
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
        background-color: #CA406E;
      }
      border-color: #CA406E;
    }
    &:nth-child(3) {
      &.active, &:hover {
        background-color: #EBB332;
      }
      border-color: #EBB332;
    }
    &:nth-child(5) {
      &.active, &:hover {
        background-color: #422BE9;
      }
      border-color: #422BE9;
    }
    &:nth-child(2) {
      &.active, &:hover {
        background-color: #5EC0F3;
      }
      border-color: #5EC0F3;
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
  overflow: hidden;
}

.header {
  padding-bottom: 1rem;
  box-shadow: 0px 5px 5px -5px grey;
}
</style>