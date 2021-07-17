<template>
  <div>
    我是WAP
  </div>
</template>

<script>
export default {
  data() {
    return {
      isWeixin: null
    };
  },
  created() {
    // 判断是微信打开还是浏览器打开
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.isWeixin = true;
    } else {
      this.isWeixin = false;
    }
  },
  //配置移动端页面meta
  metaInfo() {
    return {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width,user-scalable = no  ,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>