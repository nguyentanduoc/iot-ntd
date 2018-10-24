<template src="./templates/SensorSetting.html">
</template>
<script>
import Setting from '@/services/Setting.js'
export default {
  name: 'sensor-setting',
  props: {
    idSensor: String
  },
  data: () => ({
    showAlertListData: false,
    msg: '',
    setting: {
      _id: '',
      sensor: [{
        _id: '',
        name: ''
      }],
      max: '',
      min: ''
    },
    isEdit: false
  }),
  methods: {
    getSetting() {
      Setting.findByIdSensor({
          idSensor: this.idSensor
        })
        .then(res => {
          if (res.data.setting) {
            this.setting = res.data.setting;
          }
        })
        .catch(err => {
          this.showAlertListData = true;
          this.msg = err;
        });
    }
  },
  created() {
    this.getSetting();
  }
}
</script>
<style lang="scss" scoped>
</style>
