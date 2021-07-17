<template>
  <div class="container">
    <Header id="header"></Header>
    <div class="main">
      <router-view> </router-view>
    </div>
    <Footer id="footer_main"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  #header {
    margin-bottom: 20px;
  }
  .main {
    flex: 1;
    min-height: 650px;

  }
  #footer_main {
    margin-top: 20px;
    font-size: 10px;
  }
}

@media screen and (max-width: 480px) {
  .container {
    #footer_main {
      display: none;
    }
  }
  .main {
    margin-bottom: 30px;
  }
}
</style>
