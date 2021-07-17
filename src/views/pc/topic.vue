<template>
  <div>
    <div class="topic">
      <Detail class="detail"></Detail>
      <div>
        <DetailSideBar  class="adSide" :loginname="loginname" v-if="loginname"></DetailSideBar>
        <Adside class="adSide"></Adside>
      </div>
    </div>
  </div>
</template>

<script>
import Detail from "@/components/Detail.vue";
import DetailSideBar from "@/components/DetailSideBar.vue";
import topic from "@/api/topic.js";
import Adside from "@/components/Adside.vue";

export default {
  data() {
    return {
      loginname: null
    };
  },
  components: {
    Detail,
    DetailSideBar,
    Adside
  },
  created() {
    this.id = this.$route.params.id;

    topic.getTopicById({ id: this.id }).then(res => {
      this.loginname = res.data.data.author.loginname;
    });
  }
};
</script>

<style lang="scss" scoped>
.topic {
  display: flex;
  justify-content: center;
  margin: 0 20px;
}
.adSide{
  margin-left: 20px;
}

@media screen and (max-width: 480px) {
  .topic {
    height: 100%;
    width: 100%;
    margin: 2%;
  }
}
</style>
