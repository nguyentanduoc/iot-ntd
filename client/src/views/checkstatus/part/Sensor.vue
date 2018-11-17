<template>
<div id="sensor-check">
  <b-card border-variant="secondary" header-border-variant="secondary">
    <b-row>
      <b-col>Tên sensor</b-col>
      <b-col>{{arduino.name}}</b-col>
    </b-row>
    <b-row>
      <b-col>Vị Trí</b-col>
      <b-col>{{arduino.location}}</b-col>
    </b-row>
    <b-row>
      <b-col>Tình trạng</b-col>
      <b-col>
        <b-badge :variant="getClass(pingData)">
          <i :class="getIcon(pingData)"></i>
        </b-badge>
      </b-col>
    </b-row>
    <div class="float-right">
      <b-button class="ml-1" size="sm" block variant="success" @click="ping">Ping</b-button>
    </div>
  </b-card>
</div>
</template>
<script>
export default {
  name: "sensor-check",
  props: {
    arduino: {
      type: Object
    }
  },
  data: () => ({
    pingData: ''
  }),
  methods: {
    ping() {
      this.$mqtt.publish('VUEJS/CHECK_STATUS/' +
        this.arduino._id, `0`);
    },
    getClass(value) {
      return value == 1 ? 'success' : 'danger'
    },
    getIcon(value) {
      return value == 1 ? 'fa fa-check' : 'fa fa-circle-o'
    }
  },
  mqtt: {
    'ESP8266/CHECK_STATUS'(data) {
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(parseInt(data[i]));
      }
      var obj = JSON.parse(str);
      console.log(obj);
      if (obj.arduino == this.arduino._id) {
        this.pingData = 1;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
