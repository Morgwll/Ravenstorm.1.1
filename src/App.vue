<template>
  <div id="app">
    <app-main-menu></app-main-menu>
    <router-view></router-view>
    <signin-login></signin-login>
  </div>
</template>

<script>
import appMainMenu from "./components/menus/MainMenu.vue";
import signinLogin from "./components/SigninLogin.vue";
export default {
  name: "app",
  components: {
    appMainMenu,
    signinLogin
  }
};
</script>
 