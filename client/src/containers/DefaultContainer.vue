<template>
<div class="app">
  <AppHeader fixed>
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <b-link class="navbar-brand" to="#">
      <img class="navbar-brand-full" src="img/smart_thome_icon.jpg" height="40" alt="Smart Home">
      Smart Home
    </b-link>
    <SidebarToggler class="d-md-down-none" display="lg" />
    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3" to="/dashboard">Quan trắc</b-nav-item>
      <b-nav-item class="px-3" to="/users" exact>Người dùng</b-nav-item>
      <b-nav-item class="px-3" to="/setting">Cài đặt</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="d-md-down-none" to="/notification">
        <i class="icon-bell"></i>
        <b-badge pill variant="danger" v-if="coutWarning > 0">{{coutWarning}}</b-badge>
      </b-nav-item>
      <!-- <b-nav-item class="d-md-down-none">
        <i class="icon-list"></i>
      </b-nav-item> -->
      <!-- <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item> -->
      <DefaultHeaderDropdownAccnt />
    </b-navbar-nav>
    <!-- <AsideToggler class="d-none d-lg-block" /> -->
    <!--<AsideToggler class="d-lg-none" mobile />-->
  </AppHeader>
  <div class="app-body">
    <AppSidebar fixed>
      <SidebarHeader />
      <SidebarForm />
      <SidebarNav :navItems="nav"></SidebarNav>
      <SidebarFooter />
      <SidebarMinimizer />
    </AppSidebar>
    <main class="main">
      <Breadcrumb :list="list" />
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </main>
    <!-- <AppAside fixed> -->
    <!--aside-->
    <!-- <DefaultAside /> -->
    <!-- </AppAside> -->
  </div>
  <TheFooter>
    <!--footer-->
    <div>
      <a href="#">Smart Home</a>
      <span class="ml-1">&copy; 2018.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">NTDUOC</span>
    </div>
  </TheFooter>
</div>
</template>

<script>
import nav from '@/_nav'
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from '@coreui/vue'
//import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
export default {
  name: 'full',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    //DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data() {
    return {
      nav: nav.items,
      coutWarning: 0,
      sensor: '',
      audio: ''
    }
  },
  created() {
    this.coutWarning = this.$store.getters.getSensorWarnningCount;
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.matched.filter((route) => route.name || route.meta.label)
    }
  },
  mqtt: {
    'API/WARNING/#'(data) {
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(parseInt(data[i]));
      }
      var obj = JSON.parse(str);
      if (obj.warning == 1) {
        this.$store.dispatch('addWarning', obj.sensor);
        this.coutWarning = this.$store.getters.getSensorWarnningCount;
      } else {
        console.log(obj);
        this.$store.dispatch('subWarning', obj.sensor);
        this.coutWarning = this.$store.getters.getSensorWarnningCount;
      }
      //   if (obj.warning == 1) {
      //     if (this.sensorWarnning.indexOf(obj.sensor) == -1) {
      //       this.sensorWarnning.push(obj.sensor);
      //     }
      //   } else {
      //     if (this.sensorWarnning.indexOf(obj.sensor) == 0) {
      //       this.sensorWarnning.pop();
      //     }
      //   }
    }
  }
}
</script>
