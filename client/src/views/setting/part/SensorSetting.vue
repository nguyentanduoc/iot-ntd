<template src="./templates/SensorSetting.html">
</template>
<script>
import Setting from '@/services/Setting.js'
import {
  Switch as cSwitch
} from '@coreui/vue'
export default {
  name: 'sensor-setting',
  components: {
    cSwitch
  },
  props: {
    idSensor: String,
    name: String
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
      min: '',
      date_create: '',
      date_update: '',
      status: ''
    },
    isEdit: false,
    showAlert: false,
    colorAlert: '',
    msg: ''
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
    },
    update(evt) {
      evt.preventDefault();
      Setting.create({
          setting: this.setting,
          sensor: this.idSensor
        })
        .then(res => {
          this.showAlert = true;
          this.colorAlert = 'primary';
          this.msg = 'Cài đặt thành công';
          this.isEdit = false;
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
        })
        .catch(err => {
          this.showAlert = true;
          this.colorAlert = 'danger';
          this.msg = 'Cài đặt thất bại';
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
