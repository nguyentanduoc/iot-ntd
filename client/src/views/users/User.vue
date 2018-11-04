<template>
<b-row>
  <b-col cols="6" lg="6">
    <b-card>
      <div slot="header">
        Chi tiết <strong>Người dùng</strong>
        <div class="float-right">
          <b-button @click="restPsw" class="mr-1" variant="warning" size="sm">Mật khẩu mặt định</b-button>
        </div>
      </div>
      <b-form>
        <b-alert :show="err && notification" variant="danger">{{msg}}</b-alert>
        <b-alert :show="!err && notification" variant="success">{{msg}}</b-alert>
        <b-form-group label="Mã Tài Khoản" label-for="id" :label-cols="4" :horizontal="true">
          <b-form-input id="_id" name="_id" type="text" v-model="user._id" :disabled="true"></b-form-input>
        </b-form-group>
        <b-form-group label="Tên tài khoản" label-for="id" :label-cols="4" :horizontal="true">
          <b-form-input id="name" name="name" type="text" v-model="user.name" :disabled="!isEdit"></b-form-input>
        </b-form-group>
        <b-form-group label="Email" label-for="id" :label-cols="4" :horizontal="true">
          <b-form-input id="email" name="email" type="text" v-model="user.email" :disabled="true"></b-form-input>
        </b-form-group>
        <b-form-group label="Ngày Tạo" label-for="date_create" :label-cols="4" :horizontal="true">
          <datepicker :bootstrapStyling="true" :format="customFormatter" id="create_date" :disabled="true" v-model="user.create_date"></datepicker>
        </b-form-group>
        <b-form-group label="Ngày Cập Nhật" label-for="basicName" :label-cols="4" :horizontal="true">
          <datepicker :bootstrapStyling="true" :format="customFormatter" id="dateUpdate" :disabled="true" v-model="user.update_date"></datepicker>
        </b-form-group>
        <b-form-group label="Tình Trạng" label-for="staus" :label-cols="4" :horizontal="true">
          <b-form-radio-group id="staus" name="staus" v-model="user.status">
            <b-form-radio :disabled="!isEdit" value="1">Hoạt động</b-form-radio>
            <b-form-radio :disabled="!isEdit" value="2">Ngừng hoạt động</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-form>
      <div slot="footer">
        <b-button @click="goBack">Trở lại</b-button>
        <div class="float-right">
          <b-button @click="edit" variant="primary" aria-pressed="true" v-if="!isEdit">Chỉnh Sửa</b-button>
          <b-button @click="save" class="mr-1" variant="primary" v-if="isEdit">Lưu</b-button>
          <b-button @click="cancel" class="mr-1" variant="danger" v-if="isEdit">Hủy</b-button>
        </div>
      </div>
    </b-card>
  </b-col>
  <b-col cols="6" lg="6">
    <b-card>
      <div slot="header">
        <strong>RFID</strong>
      </div>
      <b-form>
        <b-alert :show="arlert" :variant="color">{{msgRFID}}</b-alert>
        <b-form-group label="Mã Thẻ" label-for="id" :label-cols="4" :horizontal="true">
          <b-form-input id="valueRFID" name="valueRFID" type="text" v-model="valueRFID" :disabled="true"></b-form-input>
        </b-form-group>
      </b-form>
      <div slot="footer">
        <div class="float-right">
          <b-button @click="settingRFID" variant="primary" aria-pressed="true" v-if="!isSetting">Cài đặt</b-button>
          <b-button @click="saveRFID" class="mr-1" variant="primary" v-if="isSetting">Lưu</b-button>
          <b-button @click="cancelRFID" class="mr-1" variant="danger" v-if="isSetting">Hủy</b-button>
        </div>
      </div>
    </b-card>
  </b-col>
</b-row>
</template>

<script>
import AuthService from '@/services/AuthService.js'
import RFID from '@/services/RFID.js'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'User',
  components: {
    Datepicker
  },
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
      user: {
        _id: '',
        name: '',
        email: '',
        create_date: '',
        update_date: '',
        status: ''
      },
      notification: false,
      err: false,
      msg: '',
      isEdit: false,
      arlert: false,
      msgRFID: '',
      color: '',
      isSetting: false,
      valueRFID: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    getUser() {
      AuthService.getUser({
          _id: this.$route.params.id
        })
        .then((res) => {
          if (res.data) {
            this.user = res.data.user
          }
        })
        .catch((err) => {
          err = true;
          this.errMgs = err;
        })
    },
    customFormatter(date) {
      moment.locale('vi');
      return moment(date).format('L');
    },
    edit() {
      this.isEdit = true;
    },
    cancel() {
      this.isEdit = false;
    },
    save() {
      AuthService.updateUser({
          user: this.user
        }).then(res => {
          this.notification = true;
          err: false;
          if (res.data.msg) {
            this.msg = res.data.msg;
          }
          setTimeout(() => {
            this.notification = false;
          }, 2000);
          this.isEdit = false;
        })
        .catch(err => {
          this.notification = true;
          err: true;
          this.msg = err;
        })
    },
    restPsw() {
      AuthService.restPsw({
        _id: this.user._id
      }).then(res => {
        this.notification = true;
        err: false;
        if (res.data.msg) {
          this.msg = res.data.msg;
        }
        setTimeout(() => {
          this.notification = false;
        }, 2000);
        this.isEdit = false;
      }).catch(err => {
        this.notification = true;
        err: true;
        this.msg = err;
      })
    },
    settingRFID() {
      this.isSetting = true;
      this.arlert = true;
      this.color = 'warning';
      this.msgRFID = 'Chờ chèn thẻ...';
      this.$mqtt.publish('VUEJS/FRID', `0`);
    },
    saveRFID() {
      RFID.create({
          userId: this.user._id,
          rfidValue: this.valueRFID
        })
        .then((res) => {
          if (res.status == 200) {
            this.color = 'success';
            this.msgRFID = 'Cài đặt thành công';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelRFID() {
      this.isSetting = false;
      this.arlert = false;
      this.color = 'warning';
    }
  },
  created() {
    this.getUser();
  },
  mqtt: {
    'ESP8266/GET_UID_FOR_SETUP'(data) {
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(parseInt(data[i]));
      }
      var obj = JSON.parse(str);
      this.arlert = true;
      this.color = 'success';
      1
      this.msgRFID = 'Nhận thẻ thành công';
      this.valueRFID = obj.value;
    }
  }
}
</script>
