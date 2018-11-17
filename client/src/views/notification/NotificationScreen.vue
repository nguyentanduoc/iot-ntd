<template src="./NotificationScreen.html"></template>
<script>
import SocialBoxChartExample from '../dashboard/SocialBoxChartExample'
import GetInforSensor from './part/GetInforSensor.vue';
export default {
  name: 'notification-screen',
  components: {
    SocialBoxChartExample,
    GetInforSensor
  },
  data: () => ({
    sensor: [],
    inforSensor: []
  }),
  methods: {},
  mounted() {
    this.sensor = this.$store.getters.getWarning;
  }
}
</script>
<style lang="scss" scoped>
</style>
