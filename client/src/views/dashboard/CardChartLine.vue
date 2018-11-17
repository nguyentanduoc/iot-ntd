<template>
<b-card>
  <h5 id="traffic" class="card-title">{{name}}</h5>
  <main-chart-example :chart-data="datacollection" chartId="main-chart-01" class="chart-wrapper" style="height:200px;margin-top:20px;" height="300"></main-chart-example>
</b-card>
</template>

<script>
import MainChartExample from './MainChartExample'

import {
  Callout
} from '@coreui/vue'
import moment from 'moment'
export default {
  name: 'card-chart-line',
  props: {
    id: String,
    name: String
  },
  components: {
    Callout,
    MainChartExample
  },
  data: function() {
    return {
      count: 0,
      datacollection: null,
      labels: [],
      temp_data: [],
      currentDate: '',
    }
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.labels,
        datasets: [{
          label: "Nhiệt Độ",
          borderColor: "#f87979",
          data: this.temp_data,
          fill: false
        }]
      };
    }
  },
  mqtt: {
    'ESP8266/SENDDATA'(data) {
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(parseInt(data[i]));
      }
      var obj = JSON.parse(str);
      if (obj && obj.sensor._id == this.id) {
        if (this.count > 10) {
          this.labels.shift();
          this.temp_data.shift();
        }
        moment.locale('vn');
        this.labels.push(moment().format('HH:mm'));
        this.temp_data.push(obj.value);
        this.count++;
        this.fillData();
      }
    }
  }
}
</script>

<style>
</style>
