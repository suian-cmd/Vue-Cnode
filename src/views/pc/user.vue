<template>
  <div id="user">
    <UserInfo></UserInfo>
    <div class="side">
      <DetailSideBar class="adSide"></DetailSideBar>
      <Adside class="adSide"></Adside>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import DetailSideBar from "@/components/DetailSideBar.vue";
import Adside from "@/components/Adside.vue";

export default {
  components: {
    UserInfo,
    DetailSideBar,
    Adside
  }
};
</script>

<style lang="scss" scoped>
#user {
  display: flex;
  justify-content: center;
  margin: 0 20px;
}
.adSide{
  margin-left: 20px;
}


@media screen and (max-width: 480px) {
  #user {
     margin: 0 2%;
  }
}

</style>
