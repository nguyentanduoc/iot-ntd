<template>
<div class="animated fadeIn">
  <b-row>
    <b-col sm="6" md="6" v-for="sensor in sensors" :key="sensor._is">
      <card-chart-line :id="sensor._id" :name="sensor.name">
      </card-chart-line>
    </b-col>
  </b-row>
</div>
</template>

<script>
import CardChartLine from './dashboard/CardChartLine'
export default {
  name: 'dashboard',
  components: {
    CardChartLine,
  },
  data: function() {
    return {
      sensors: []
    }
  },
  methods: {},
  created() {
    this.sensors = this.$store.getters.getSensor;
  }
}
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
