<template src="./CheckStatusScreen.html"></template>
<script>
import Arduino from '@/services/Arduino.js'
import Sensor from './part/Sensor.vue'
export default {
  name: 'check-status',
  components: {
    Sensor
  },
  data() {
    return {
      dataList: []
    }
  },
  methods: {
    getList() {
      Arduino.getList()
        .then(res => {
          if (res.data.arduinoList) {
            this.dataList = res.data.arduinoList;
          }
        })
        .catch(err => {
          this.showAlertListData = true;
          this.msg = err;
        })
    }
  },
  created() {
    this.getList();
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.table-responsive-sm table tbody tr:hover {
  color: #2185d0;
  cursor: pointer;
}
</style>
