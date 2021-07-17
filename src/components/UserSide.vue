<template>
  <div>
      <div id="user-side">
        <div class="avatar">
          <img :src="authorInfo.avatar_url" alt="" />
        </div>
        <p class="userName">{{ authorInfo.loginname }}</p>
        <p>积分: {{ score }}</p>
        <p class="signature">
          “这家伙很懒，什么个性签名都没有留下。”
        </p>
      </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  
</style>