<template>
<div class="app flex-row align-items-center">
  <div class="container">
    <b-row class="justify-content-center">
      <b-col md="4">
        <b-card-group>
          <b-card no-body class="p-4">
            <b-card-body>
              <b-form @submit="login">
                <h1>Đăng nhập</h1> <br>
                <b-alert :show="error" variant="danger">{{errorMsg}}</b-alert>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="email" type="email" class="form-control" placeholder="example@gmail.com" autocomplete="username email" required />
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input v-model="password" type="password" class="form-control" placeholder="Password" autocomplete="current-password" required />
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button @keyup.enter="login" variant="primary" class="px-4" type="submit">Đăng nhập</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-card-body>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthService.js'
import Sensor from '@/services/Sensor.js'
export default {
  name: 'Login',
  data() {
    return {
      password: '',
      email: '',
      errorMsg: '',
      error: false
    };
  },
  methods: {
    getSensorForChart() {
      Sensor.getSensorForChart()
        .then((res) => {
          if (res.data.sensors) {
            this.$store.dispatch('setSensorForChart', res.data.sensors);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(evt) {
      evt.preventDefault();
      AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.status == 201 && response.data) {
            this.$store.dispatch('setToken', response.data.token);
            this.$store.dispatch('setUser', response.data.user);
            this.getSensorForChart();
            this.$store.getters.isUserLoggedIn;
            this.$router.push({
              name: 'Dashboard'
            });
          }
        })
        .catch(error => {
          console.error(error);
          this.error = true;
          if (error.response) {
            this.errorMsg = error.response.data.error;
          } else {
            this.errorMsg = `Can't not connect to server!`;
          }
        });
    }
  }
}
</script>
