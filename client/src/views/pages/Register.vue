<template>
<div class="app flex-row align-items-center">
  <div class="container">
    <b-row class="justify-content-center">
      <b-col md="6" sm="8">
        <b-card no-body class="mx-4">
          <b-card-body class="p-4">
            <b-form @submit="register">
              <h1>Register</h1>
              <p class="text-muted">Create your account</p>
              <b-alert :show="error" variant="danger">{{errorMsg}}</b-alert>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input v-model="name" type="text" class="form-control" placeholder="Username" autocomplete="username" required />
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
                <b-form-input v-model="password" type="password" class="form-control" placeholder="Password" autocomplete="new-password" required />
              </b-input-group>

              <b-input-group class="mb-4">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input v-model="repeatPassword" type="password" class="form-control" placeholder="Repeat password" autocomplete="new-password" required />
              </b-input-group>
              <b-button type="submit" variant="success" block>Create Account</b-button>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthService.js'
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      errorMsg: '',
      error: false
    }
  },
  methods: {
    register(evt) {
      evt.preventDefault();
      if (this.password.length > 6) {
        this.errPws = false;
        if (this.password == this.repeatPassword) {
          this.errPwsConform = false;
          AuthenticationService.register({
              name: this.name,
              email: this.email,
              password: this.password
            })
            .then(response => {
              if (response.status == 201 && response.data) {
                this.$store.dispatch('setUser', response.data.createUser);
                this.$store.dispatch('setToken', response.data.token);
                this.$store.getters.isUserLoggedIn;
                this.$router.push({
                  name: 'Dashboard'
                });
              }
            })
            .catch(error => {
              this.error = true;
              if (error.response) {
                this.errorMsg = error.response.data.error;
              } else {
                this.errorMsg = error;
              }
            });
        } else {
          this.errPwsConform = true;
        }
      } else {
        this.errPws = true;
      }
    }
  }
}
</script>
