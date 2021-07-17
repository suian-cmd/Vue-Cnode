<template>
  <div>
    <div id="noReply">
      <div class="noReplyTopics">
        <p v-for="topic in noReplyTopics" :key="topic.id">
          {{ ellipsis(topic.title, 21) }}
        </p>
      </div>
      <p class="describe">无人回复的话题</p>
    </div>
  </div>
</template>

<script>
let noReplyTopics = [
  {
    id: 1,
    title: "Koa socket 泄露的问题"
  },
  {
    id: 2,
    title: "众测图数据库 Nebula Graph | 捉虫计划已开启，这项有礼"
  },
  {
    id: 3,
    title: "实现API管理系统的几个重要关键词"
  },
  {
    id: 4,
    title: "分享一门课程《Vue.js源码全方位深入解析》 真的不错——分享推荐"
  },
  {
    id: 5,
    title: "分享一门非常好的react课程《React源码深度解析 高级前端工程师必备技"
  }
];

export default {
  data() {
    return {
      noReplyTopics: noReplyTopics
    };
  }
};
</script>

<style lang="scss" scoped>
#noReply {
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #121212;

  > .noReplyTopics {
    white-space: nowrap;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 15px;
    overflow: hidden;
    > p {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }

  > .describe {
    align-self: center;
    margin-top: 15px;
  }
}
</style>