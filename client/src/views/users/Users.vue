<template>
<b-row>
  <b-col cols="12" xl="6">
    <transition name="slide">
      <b-card :header="caption">
        <b-alert :show="getListErr" variant="danger">{{getListMgs}}</b-alert>
        <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="users" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
          <template slot="name" slot-scope="data">
            <strong>{{data.item.name}}</strong>
          </template>
          <template slot="status" slot-scope="data">
            <b-badge :variant="getBadge(data.item.status)">{{getBadgeMgs(data.item.status)}}</b-badge>
          </template>
          <template slot="create_date" slot-scope="data">
            {{customFormatter(data.item.date_create)}}
          </template>
          <template slot="is_admin" slot-scope="data">
            {{getRole(data.item.is_admin)}}
          </template>
        </b-table>
        <nav>
          <b-pagination size="sm" :total-rows="getRowCount(users)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons />
        </nav>
      </b-card>
    </transition>
  </b-col>
  <b-col cols="12" xl="6">
    <b-card class="mx-4">
      <b-card-body class="p-4">
        <b-form @submit="create">
          <h1>Tạo tại khoản</h1>
          <p class="text-muted">Tạo tài khoản người dùng</p>
          <b-alert v-if="error" :show="notification" variant="danger">{{message}}</b-alert>
          <b-alert v-else :show="notification" variant="primary">{{message}}</b-alert>
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-user"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="name" type="text" class="form-control" placeholder="Tên tài khoản" autocomplete="username" required />
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>@</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="email" type="email" class="form-control" placeholder="Email" autocomplete="email" required />
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
            </b-input-group-prepend>
            <b-form-input v-model="password" type="password" class="form-control" placeholder="Mật khẩu" autocomplete="password" required />
          </b-input-group>
          <b-button type="submit" variant="success" block>Tạo</b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </b-col>
</b-row>
</template>

<script>
import moment from 'moment'
import AuthService from '@/services/AuthService.js'
import usersData from './UsersData'
export default {
  name: 'Users',
  props: {
    caption: {
      type: String,
      default: 'Users'
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      users: [],
      fields: [{
          key: 'name',
          label: 'Tên'
        },
        {
          key: 'create_date',
          label: 'Ngày Tạo'
        },
        {
          key: 'is_admin',
          label: 'Quyền'
        },
        {
          key: 'status',
          label: 'Trạng Thái'
        }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      name: '',
      email: '',
      password: '',
      notification: false,
      error: true,
      message: '',
      getListErr: false,
      getListMgs: ''
    }
  },
  computed: {},
  methods: {
    getBadge(status) {
      return status == '1' ? 'success' : 'secondary'
    },
    getBadgeMgs(status) {
      return status == '1' ? 'Hoạt động' : 'Ngừng'
    },
    getRowCount(users) {
      return users.length
    },
    userLink(id) {
      return `users/${id.toString()}`
    },
    rowClicked(item) {
      const userLink = this.userLink(item._id)
      this.$router.push({
        path: userLink
      })
    },
    create(evt) {
      evt.preventDefault();
      AuthService.create({
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then((res) => {
          if (res.status == 201 && res.data) {
            this.notification = true;
            this.error = false;
            this.message = 'Tạo tài khoản thành công';
            setTimeout(() => {
              this.notification = false;
            }, 4000);
          }
        })
        .catch((error) => {
          this.notification = true;
          this.error = true;
          if (error.response.data.message) {
            this.message = error.response.data.message;
          }
        });
    },
    getListUser() {
      AuthService.getListUser({})
        .then((res) => {
          this.users = res.data.users;
        })
        .catch((err) => {
          this.getListErr = true;
          this.getListMgs = err;
        });
    },
    customFormatter(date) {
      moment.locale('vi');
      return moment(date).format('L');
    },
    getRole(dataRole) {
      return dataRole == 1 ? 'Quản Trị' : 'Người Dùng'
    }
  },
  created() {
    this.getListUser();
  }
}
</script>

<style scoped>
.card-body>>>table>tbody>tr>td {
  cursor: pointer;
}
</style>
