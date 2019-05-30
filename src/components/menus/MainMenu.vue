<template>
  <div class="mainWrapper">
    <ul class="mainNav">
      <router-link
        tag="li"
        class="menuLink"
        :to="menu.route"
        v-for="(menu, index) in mainmenu"
        :key="index"
      >{{ menu.name }}</router-link>
      <div class="menuLink" @click="loadLogin()">Login/Register</div>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainmenu: [
        { name: "Home", route: "/" },
        { name: "Game", route: "/game" },
        { name: "Contact", route: "/contact" },
        { name: "About", route: "/about" }
      ]
    };
  },
  methods: {
    loadLogin() {
      let modal = document.getElementById("loginModal");
      setTimeout(() => {
        modal.classList.add("revealed");
      }, 2000);
    }
  }
};
</script>