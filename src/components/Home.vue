<template>
  <div>
    <div class="mainBanner">
      <img :src="pageBanner.image">
      <div class="bannerText">
        <h1>{{ pageBanner.h1 }}</h1>
        <h3>{{ pageBanner.h3 }}</h3>
      </div>
      <div class="mainWrapper contentText" v-html="mainPageText"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageBanner: this.$store.state.mainPageBanner,
      mainPageText: this.$store.state.mainPageText
    };
  }
};
</script>