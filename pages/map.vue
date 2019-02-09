<template>
  <section class="container-fluid">
    <h3 class="title font-weight-bold">Map</h3>
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="card-header">
            <p class="card-title font-weight-bold">
              AREA KEY
            </p>
          </div>
          <div class="card-body">
            <h5 class="font-weight-bold red">Food and Drinks</h5>
            <h5 class="font-weight-bold green">Workshops</h5>
            <h5 class="font-weight-bold yellow">Ping Pong</h5>
            <h5 class="font-weight-bold yellow">Badminton</h5>
          </div>
        </div>
      </div>
      <div class="col">
        
      </div>
    </div>
  </section>
</template>
<style lang="scss">
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
  margin-bottom: 5rem;
  box-shadow: 0px 5px 5px -5px grey;
}
</style>

