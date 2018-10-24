<template>
<div class="animated fadeIn">
  <b-card>
    <b-row>
      <b-col sm="5">
        <h4 id="traffic" class="card-title mb-0">Nhiệt độ</h4>
        <div class="small text-muted"></div>
      </b-col>
    </b-row>
    <main-chart-example :chart-data="datacollection" chartId="main-chart-01" class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
  </b-card>
</div>
</template>

<script>
// import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
// import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
// import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
// import CardBarChartExample from './dashboard/CardBarChartExample'
import MainChartExample from './dashboard/MainChartExample'
// import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
// import CalloutChartExample from './dashboard/CalloutChartExample'
import {
  Callout
} from '@coreui/vue'
import moment from 'moment'
export default {
  name: 'dashboard',
  components: {
    Callout,
    // CardLine1ChartExample,
    // CardLine2ChartExample,
    // CardLine3ChartExample,
    // CardBarChartExample,
    MainChartExample,
    // SocialBoxChartExample,
    // CalloutChartExample
  },
  data: function() {
    return {
      count: 0,
      datacollection: null,
      labels: [],
      temp_data: [],
      currentDate: ''
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
      if (this.count > 10) {
        this.labels.shift();
        this.temp_data.shift();
      }
      moment.locale('vn');
      this.labels.push(moment().format('LTS'));
      this.temp_data.push(obj.value);
      this.count++;
      this.fillData();
    }
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
