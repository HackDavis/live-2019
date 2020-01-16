<template>
  <section class="container-fluid bound">
    <h3 class="title font-weight-bold">Map</h3>
    <div class="row">
      <div class="col">
        <div class="d-flex flex-column">
          <img class="map" src="https://hackdavis.io/assets/data/map.png" />
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@import '~/assets/variables.scss';

.card-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #707070;
}
.card-title {
  margin-bottom: 0;
}
.card {
  border: 1px solid #707070;
}
.card-body {
  .red {
    color: #c15a5a;
  }
  .purple {
    color: #8d73d3;
  }
  .yellow {
    color: #d6a83f;
  }
  .green {
    color: #409887;
  }
}
.title {
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0px 5px 5px -5px grey;
}
img.map {
  width: 100%;
  margin-bottom: 1.5rem;
}

.bound {
  overflow-y: auto;
  height: 100%;
}

.legend {
  margin-bottom: 3rem;
}
</style>

