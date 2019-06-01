<template>
  <div class="footerSection">
    <div class="menuWrapper">
      <footer-menu></footer-menu>
    </div>
  </div>
</template>
<script>
import footerMenu from "./menus/FooterMenu.vue";
export default {
  components: {
    footerMenu
  }
};
</script>