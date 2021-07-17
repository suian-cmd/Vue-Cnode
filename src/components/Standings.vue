<template>
  <div>
    <div id="standings">
      <div class="avatar">
        <div class="topStandings" v-for="author in topAuthor" :key="author.id">
          <router-link :to="`/pc/user/${author.loginname}`"
            ><img :src="author.avatar_url" alt="" />
          </router-link>
        </div>
      </div>
      <p class="describe">Top10 积分榜</p>
    </div>
  </div>
</template>

<script>
let topAuthor = [
  {
    id: 1,
    avatar_url: "https://avatars3.githubusercontent.com/u/3118295?v=4&s=120",
    loginname: "i5ting"
  },
  {
    id: 2,
    avatar_url: "https://avatars1.githubusercontent.com/u/1147375?v=4&s=120",
    loginname: "alsotang"
  },
  {
    id: 3,
    avatar_url: " https://avatars1.githubusercontent.com/u/4295945?v=3&s=120",
    loginname: "leapon"
  },
  {
    id: 4,
    avatar_url: " https://avatars2.githubusercontent.com/u/227713?v=4&s=120",
    loginname: "atian25"
  },
  {
    id: 5,
    avatar_url: " https://avatars0.githubusercontent.com/u/449224?v=4&s=120",
    loginname: "jiyinyiyong"
  },
  {
    id: 6,
    avatar_url: "https://avatars3.githubusercontent.com/u/6591466?v=4&s=120",
    loginname: "yakczh"
  },
  {
    id: 7,
    avatar_url: "https://avatars1.githubusercontent.com/u/12947399?v=4&s=120",
    loginname: "im-here"
  },
  {
    id: 8,
    avatar_url: " https://avatars1.githubusercontent.com/u/5300023?v=4&s=120",
    loginname: "DevinXian"
  },
  {
    id: 9,
    avatar_url: "https://avatars0.githubusercontent.com/u/9590859?v=4&s=120",
    loginname: "chapgaga"
  },
  {
    id: 10,
    avatar_url: "https://avatars3.githubusercontent.com/u/4067115?v=4&s=120",
    loginname: "magicdawn"
  }
];
export default {
  data() {
    return {
      topAuthor: topAuthor
    };
  }
};
</script>

<style lang="scss" scoped>
#standings {
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #121212;
  > .avatar {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 15px;
    padding-bottom: 6px;
    > .topStandings {
      margin: 8px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>
