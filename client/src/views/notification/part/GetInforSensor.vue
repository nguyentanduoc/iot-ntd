<template>
<div id="get-infor-sensor">
  <b-card class="text-white bg-danger">
    <div class="h1 text-muted text-right mb-4">
      {{value}}
      <i :class="getIcon(sensor.dataType)"></i>
    </div>
    <div class="h4 mb-0">{{sensor.name}}</div>
    <!-- <small class="text-muted text-uppercase font-weight-bold">{{sensor.name}}</small> -->
  </b-card>
</div>
</template>
<script>
import Sensor from '@/services/Sensor.js'
export default {
  name: "get-infor-sensor",
  props: {
    idSensor: String
  },
  data: () => ({
    sensor: {},
    value: ''
  }),
  methods: {
    getSensor() {
      Sensor.findById({
          id: this.idSensor
        })
        .then(res => {
          if (res.data.data) {
            this.sensor = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getIcon(dataType) {
      return dataType == 1 ? 'fa fa-thermometer-half' :
        status == 2 ? '' : 'fa fa-fire'
    }
  },
  created() {
    this.getSensor();
  },
  mqtt: {
    'ESP8266/SENDDATA'(data) {
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(parseInt(data[i]));
      }
      var obj = JSON.parse(str);
      if (obj.sensor._id === this.sensor._id) {
        this.value = obj.value;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
