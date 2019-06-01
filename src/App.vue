<template>
  <div id="app">
    <app-main-menu></app-main-menu>
    <router-view></router-view>
    <footer-section></footer-section>
    <signin-login></signin-login>
  </div>
</template>

<script>
import appMainMenu from "./components/menus/MainMenu.vue";
import signinLogin from "./components/SigninLogin.vue";
import footerSection from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    appMainMenu,
    signinLogin,
    footerSection
  }
};
</script>
 