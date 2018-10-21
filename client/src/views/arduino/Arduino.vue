<template>
<div class="animated fadeIn">
  <b-row>
    <b-col md="7">
      <b-card>
        <div slot="header">
          <strong>Aruino</strong> List
        </div>
        <b-alert :show="showAlertListData" :variant="colorAlert">{{msg}}</b-alert>
        <b-table responsive="sm" :items="dataList" :fields="fields" :fixed="true">
          <template slot="status" slot-scope="data">
            <!-- <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge> -->
          </template>
          <!-- <template slot="date_create" slot-scope="data">
            {{data.item.date_create | moment("DD-MM-YYYY")}}
          </template>
          <template slot="date_update" slot-scope="data">
            {{data.item.date_update | moment("DD-MM-YYYY")}}
          </template> -->
          <template slot="show_details" slot-scope="data">
            <b-button variant="info" size="sm" @click.stop="showDetail(data.item._id)" class="mr-2">Chi Tiết</b-button>
            <b-button variant="danger" size="sm" @click.stop="deleteArduino(data.item._id)" class="mr-2">Xóa</b-button>
          </template>
        </b-table>
        <nav>
          <!-- <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons /> -->
        </nav>
      </b-card>
    </b-col>
    <b-col md="5">
      <b-card>
        <div slot="header">
          <strong>Aruino</strong> Details
        </div>
        <b-form @submit="create">
          <b-alert :show="showAlert" :variant="colorAlert">{{msg}}</b-alert>
          <b-form-group label="Mã Arduino" label-for="id" :label-cols="4" :horizontal="true">
            <b-form-input id="name" name="id" type="text" v-model="arduino._id" :disabled="true"></b-form-input>
          </b-form-group>
          <b-form-group label="Tên Arduino" label-for="name" :label-cols="4" :horizontal="true">
            <b-form-input id="name" name="name" type="text" v-model="arduino.name" required></b-form-input>
          </b-form-group>
          <b-form-group label="Vị trí Arduino" label-for="location" :label-cols="4" :horizontal="true">
            <b-form-input id="location" name="location" type="text" v-model="arduino.location" required></b-form-input>
          </b-form-group>
          <b-form-group label="Ngày Tạo" label-for="basicName" :label-cols="4" :horizontal="true">
            <datepicker :bootstrapStyling="true" :format="customFormatter" id="dateCreate" :disabled="true" v-model="arduino.date_create"></datepicker>
          </b-form-group>
          <b-form-group label="Ngày Cập Nhật" label-for="basicName" :label-cols="4" :horizontal="true">
            <datepicker :bootstrapStyling="true" :format="customFormatter" id="dateUpdate" :disabled="true" v-model="arduino.date_update"></datepicker>
          </b-form-group>
          <b-form-group label="Tình Trạng" label-for="staus" :label-cols="4" :horizontal="true">
            <b-form-radio-group id="staus" name="staus">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" v-model="arduino.status" value="1" checked>
                <label class="custom-control-label" for="customRadioInline1">Hoạt động</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" v-model="arduino.status" value="2">
                <label class="custom-control-label" for="customRadioInline2">Ngừng hoạt động</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
          <div slot="footer">
            <b-button class="float-right" type="reset" size="md" variant="danger"><i class="fa fa-ban"></i> Hủy</b-button>
            <b-button class="float-right" type="submit" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i> Lưu</b-button>
          </div>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
  <!-- <b-modal title="Create Arduino" class="modal-primary" ref="createModal" ok-variant="success" hide-footer>
    <b-alert :show="showAlert" :variant="colorAlert">{{msg}}</b-alert>
    <b-form @submit="create">
      <b-form-group label="Arduino Name" label-for="arduinoName" description="Please enter Arduino Name." :label-cols="3" :horizontal="true">
        <b-form-input v-model="name" id="arduinoName" type="text" placeholder="Enter Arduino Name.." required></b-form-input>
      </b-form-group>
      <b-form-group label="Location" label-for="location" description="Please enter Arduino Location" :label-cols="3" :horizontal="true">
        <b-form-input v-model="location" id="location" type="text" placeholder="Enter Arduino Location.." required></b-form-input>
      </b-form-group>
      <div slot="footer">
        <b-button type="reset" size="sm" variant="danger" class="float-right"><i class="fa fa-ban"></i> Cancel</b-button>
        <b-button type="submit" size="sm" variant="primary" class="float-right"><i class="fa fa-dot-circle-o"></i> Create</b-button>
      </div>
    </b-form>
  </b-modal> -->
</div>
</template>
<script>
import Arduino from '@/services/Arduino.js'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'aruino',
  components: {
    Datepicker
  },
  data() {
    return {
      name: '',
      location: '',
      colorAlert: '',
      showAlert: false,
      showAlertListData: false,
      msg: '',
      dataList: [],
      arduino: {
        name: '',
        location: '',
        create_date: '',
        update_create: '',
        status: ''
      },
      fields: [{
          key: 'name'
        },
        {
          key: 'location'
        },
        // {
        //   key: 'date_create'
        // },
        // {
        //   key: 'date_update'
        // },
        {
          key: 'show_details'
        }
      ],
    }
  },
  methods: {
    create(evt) {
      evt.preventDefault();
      console.log(this.arduino.name);
      Arduino.create({
          arduino: this.arduino
        })
        .then(response => {
          if (response.status == 201) {
            this.colorAlert = 'success';
            this.showAlert = true;
            this.msg = response.data.message;
            this.getList();
          }
        })
        .catch(error => {
          this.colorAlert = 'danger';
          this.showAlert = true;
          if (error.response) {
            this.msg = error.response.data.message;
          } else {
            this.msg = error.response;
          }
        })
    },
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
    },
    showDetail(id) {
      Arduino.findById({
          id: id
        })
        .then(res => {
          this.arduino = res.data.arduino[0]
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteArduino(id) {
      Arduino.deleteArduino({
          id: id
        })
        .then(res => {
          if (res.data) {
            this.getList();
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    customFormatter(date) {
      moment.locale('vi');
      return moment(date).format('L');
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
</style>
