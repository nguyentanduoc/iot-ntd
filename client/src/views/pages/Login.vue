<template>
<div class="app flex-row align-items-center">
  <div class="container">
    <b-row class="justify-content-center">
      <b-col md="8">
        <b-card-group>
          <b-card no-body class="p-4">
            <b-card-body>
              <b-form @submit="login">
                <h1>Login</h1>
                <p class="text-muted">Login your account</p>
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
                    <b-button @keyup.enter="login" variant="primary" class="px-4" type="submit">Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Forgot password?</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-card-body>
          </b-card>
          <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
            <b-card-body class="text-center">
              <div>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <b-button variant="primary" class="active mt-3">Register Now!</b-button>
              </div>
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
