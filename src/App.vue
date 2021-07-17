<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  // mounted() {
  //   if (this._isMobile()) {
  //     console.log("手机端");
  //     this.$router.replace("/pc");
  //   } else {
  //     console.log("pc端");
  //     this.$router.replace("/pc");
  //   }
  // },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/css/init.scss";
@import "~@/assets/css/markdown-github.scss";
body {
  background-color: #f3f3f3;
}

@media screen and (max-width: 480px) {
 body {
  width: 130vw;
  height: 100vh;

}
}

.el-input__inner {
  height: 40px;
  font-size: 14px;
  box-shadow: none;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
}

.el-input__inner:hover {
  border-color: #80bd01;
}

.el-input__inner:focus {
  border-color: #80bd01;
  box-shadow: none;
  transition-duration: 0.5s;
}

.el-input__inner::-webkit-input-placeholder {
  line-height: 20px;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  margin: 0 5px;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #80bd01;
  color: #fff;
}

.el-pagination.is-background .el-pager li:not(.active):hover {
  color: #80bd01;
}

.el-menu-item {
  font-size: 17px;
  padding: 0 13px;
}

.el-menu--horizontal > .el-menu-item {
  height: 40px;
  line-height: 40px;
  &.is-active {
    border-bottom: 2px solid #80bd01;
    color: #121212;
  }
}

.el-button--primary {
  color: #fff;
  background-color: #80bd01;
  border-color: #80bd01;
  font-weight: 600;
  padding: 10px 16px;
}

.el-button--primary:hover {
  color: #fff;
  background-color: #2e7c32;
  border-color: #2e7c32;
}

.el-button--primary:focus {
  color: #fff;
  background-color: #2e7c32;
  border-color: #2e7c32;
}
</style>
