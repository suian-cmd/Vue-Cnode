<template>
  <div>
    <div class="getstart">
      <MemberGuide></MemberGuide>
      <!-- <div class="side">
        <Standings></Standings>
        <Noreply class="noReply"></Noreply>
        <Adside></Adside>
      </div> -->
    </div>
  </div>
</template>

<script>
// import Standings from "@/components/Standings.vue";
// import Noreply from "@/components/Noreply.vue";
// import Adside from "@/components/Adside.vue";
import MemberGuide from "@/components/MemberGuide.vue";
export default {
  components: {
    // Standings,
    // Noreply,
    // Adside,
    MemberGuide
  }
};
</script>

<style lang="scss" scoped>
.getstart {
  display: flex;
  justify-content: center;
  // margin: 0 20px;

  > .side {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    > .noReply {
      margin: 20px 0;
    }
  }
}

</style>
