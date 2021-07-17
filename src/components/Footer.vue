<template>
  <div>
    <div id="footer_main">
      <p>
        CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js
        的技术研究。
      </p>
      <p>
        服务器赞助商为
        <a
          href="http://www.ucloud.cn/?utm_source=zanzhu&amp;utm_campaign=cnodejs&amp;utm_medium=display&amp;utm_content=yejiao&amp;ytag=cnodejs_logo"
          target="_blank"
          class="sponsor_outlink"
          data-label="ucloud_bottom"
        >
          <img
            src="//static.cnodejs.org/FuIpEaM9bvsZKnQ3QfPtBHWQmLM9"
            title="ucloud"
            alt="ucloud"
            width="92px"
          />
        </a>
        ，存储赞助商为
        <a
          href="http://www.qiniu.com/?ref=cnode"
          target="_blank"
          class="sponsor_outlink"
          data-label="qiniu_bottom"
        >
          <img
            src="//static.cnodejs.org/Fg0jtDIcTqVC049oVu5-sn6Om4NX"
            title="七牛云存储"
            alt="七牛云存储"
            width="115px"
          />
        </a>
        ，由<a
          href="https://www.aliyun.com/product/nodejs?ref=cnode"
          target="_blank"
          class="sponsor_outlink"
          data-label="alinode_bottom"
        >
          <img
            src="//static.cnodejs.org/FpMZk31PDyxkC8yStmMQL4XroaGD"
            title="alinode"
            alt="alinode"
            height="54px"
            width="166px"
          /> </a
        >提供应用性能服务。
      </p>
      <p>
        新手搭建 Node.js 服务器，推荐使用无需备案的
        <a href="https://www.digitalocean.com/?refcode=eba02656eeb3"
          >DigitalOcean(https://www.digitalocean.com/)</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
#footer_main {
  color: $lightGray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 16px 72px;
  background-color: #fff;
  > p {
    margin: 8px 0;
    line-height: 20px;
    vertical-align: bottom;
  }
  img {
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }
}
</style>
