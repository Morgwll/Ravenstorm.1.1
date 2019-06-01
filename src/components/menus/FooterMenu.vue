<template>
  <div class="menuWrapper">
    <ul class="mainNav">
      <router-link
        tag="li"
        class="menuLink"
        :to="menu.route"
        v-for="(menu, index) in mainmenu"
        :key="index"
      >{{ menu.name }}</router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainmenu: [
        { name: "Contact", route: "/contact" },
        { name: "About", route: "/about" },
        { name: "Privacy Policy", route: "/privacy-policy" }
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