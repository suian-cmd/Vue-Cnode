<template>
  <div>
    <transition name="fade">
      <div v-if="isLoading" class="loading">
        <my-loading></my-loading>
      </div>
    </transition>
    <div id="topicList" v-if="!isLoading">
      <div class="theme_nav">
        <template>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="all">全部</el-menu-item>
            <el-menu-item index="good">精华</el-menu-item>
            <el-menu-item index="share">分享</el-menu-item>
            <el-menu-item index="ask">问答</el-menu-item>
            <el-menu-item index="dev">测试</el-menu-item>
            <el-menu-item index="job">招聘</el-menu-item>
          </el-menu>
        </template>
      </div>
      <div class="topic_item" v-for="topic in topicList" :key="topic.id">
        <div class="avatar">
          <router-link :to="`PC/user/${topic.author.loginname}`"
            ><img :src="topic.author.avatar_url" alt=""
          /></router-link>
        </div>
        <div class="topicInfo">
          <div class="title">
            <div class="tabLabel">
              {{ topic.tabLabel }}
            </div>
            <h3>
              <router-link class="underline" :to="`/pc/detail/${topic.id}`">{{
                ellipsis(topic.title, 32)
              }}</router-link>
            </h3>
          </div>

          <p>{{ topic.author.loginname }}</p>
          <div class="disscussPeople">
            <div
              v-for="reply in topic.replies"
              :key="reply.id"
              class="disscussImgWrapper"
            >
              <router-link :to="`/pc/user/${reply.author.loginname}`">
                <img :src="reply.author.avatar_url" alt="" />
              </router-link>
            </div>

            <span>{{ friendlyDate(topic.last_reply_at) }}</span>
          </div>
        </div>
        <div class="replyAndVisit">
          <my-icon name="reply"></my-icon>
          <span>{{ topic.reply_count }}</span>
          <my-icon name="eye"></my-icon>
          <span>{{ topic.visit_count }}</span>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        :current-page="page"
        @current-change="onPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import topic from "@/api/topic.js";
import Icon from "./Icon";
import Loading from "./Loading";
// import {Message} from "element-ui";
export default {
  data() {
    return {
      isLoading: true,
      topicList: [],
      page: 1,
      activeIndex: this.$route.query.tab || 'all',
      tab: this.$route.query.tab || 'all',
      tabLabel: null,
      initPage: false
    };
  },
  components: {
    "my-icon": Icon,
    "my-loading": Loading
  },
  created() {
    this.getTopicAllInfo();
  },
  computed: {},
  methods: {
    getTopics() {
      if(this.initPage){
        this.page = 1
      }else{
        this.page = parseInt(this.$route.query.page || '1') || 1;
      }
      return topic
        .getTopics({ page: this.page, limit: 10, tab: this.tab })
        .then(res => {
          this.topicList = res.data.data;
          this.confirmTab(this.topicList);
          this.$router.push({
            path: "/pc",
            query: { page: this.page, tab: this.tab }
          });
        });
    },
    confirmTab(array) {
      array.forEach(item => {
        if (item.top) {
          item.tabLabel = "置顶";
        } else if (item.good) {
          item.tabLabel = "精华";
        } else if (item.tab === "share") {
          item.tabLabel = "分享";
        } else if (item.tab === "job") {
          item.tabLabel = "招聘";
        } else if (item.tab === "ask") {
          item.tabLabel = "问答";
        }else {
          item.tabLabel = "测试";
        }
      });
    },
    getTopicById(id) {
      return topic.getTopicById({ id });
    },
    getTopicAllInfo() {
      this.getTopics().then(() => {
        this.isLoading = false;
        this.topicList.forEach(topic => {
          this.getTopicById(topic.id).then(res => {
            this.$set(topic, "replies", res.data.data.replies);
            if (topic.replies && topic.replies.length > 3) {
              topic.replies.splice(3);
            }
          });
        });
      });
    },
    onPageChange(newPage) {
      topic
        .getTopics({ page: newPage, limit: 10, tab: this.tab })
        .then(res => {
          this.topicList = res.data.data;
          this.confirmTab(this.topicList);
          this.page = newPage;
          this.$router.push({
            path: "/pc",
            query: { page: this.page, tab: this.tab }
          });
        })
        .then(() => {
          this.topicList.forEach(topic => {
            this.getTopicById(topic.id).then(res => {
              this.$set(topic, "replies", res.data.data.replies);
              if (topic.replies && topic.replies.length > 3) {
                topic.replies.splice(3);
              }
            });
          });
        });
      document.scrollingElement.scrollTop = 0
    },
    handleSelect(key) {
      this.tab = key;
      this.activeIndex = key;
      this.initPage = true
      this.getTopicAllInfo();
      // Message.success({
      //   showClose: true,
      //   message: '这是一条消息提示',
      //   duration: 1000000
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
.loading {
  font-size: 16px;
  background-color: #fff;
  width: 40vw;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
#topicList {
  font-size: 16px;
  background-color: #fff;
  width: 760px;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  > .theme_nav {
    margin-bottom: 10px;
    margin-top: -4px;
  }

  > .el-pagination {
    align-self: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  > .topic_item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
    > .avatar {
      img {
        width: 80px;
        height: 80px;
        border: 1px solid $border-color;
        border-radius: 10px;
        margin-right: 15px;
      }
    }
    > .topicInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > .title {
        display: flex;
        align-items: flex-end;
        > .tabLabel {
          font-size: 14px;
          margin-right: 6px;
          background-color: $theme-color;
          color: #fff;
          padding: 1px 4px;
          border-radius: 4px;
          white-space: nowrap;
        }
       > h3 {
          font-size: 17px;

          font-weight: 500;
          color: $black;
          margin-top: 6px;
        }
      }

      p {
        color: $lightGray;
        font-size: 14px;
        margin-bottom: 4px;
      }
      > .disscussPeople {
        display: flex;
        align-items: center;
        > .disscussImgWrapper {
          &:not(:first-child) {
            margin-left: -6px;
          }
        }
        img {
          width: 22px;
          height: 22px;
          border: 1px solid $border-color;
          border-radius: 50%;
        }
        span {
          font-size: 13px;
          color: $lightestGray;
          margin-left: 4px;
        }
      }
    }

    > .replyAndVisit {
      position: absolute;
      bottom: 15px;
      right: -3px;
      display: flex;
      font-size: 13px;
      color: $lightestGray;
      height: 18px;
      > span {
        margin-right: 5px;
        margin-left: 1px;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  #topicList {
    width: 80vw;
  }
}

@media screen and (max-width: 860px) {
  #topicList {
    h3,
    .topic_item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

@media screen and (max-width: 640px) {
  #topicList {
    h3,
    .topic_item {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .topicInfo {
        > .title {
          > .tabLabel {
            font-size: 12px;
            margin-right: 6px;
            padding: 1px 4px;
            border-radius: 4px;
            white-space: nowrap;
          }
        }
        h3 {
          font-size: 15px;
          font-weight: 500;
          margin-top: 6px;
        }
        p {
          font-size: 12px;
          margin-bottom: 4px;
        }
        > .disscussPeople {
          > .disscussImgWrapper {
            &:not(:first-child) {
              margin-left: -6px;
            }
          }
          img {
            width: 22px;
            height: 22px;
          }
          span {
            font-size: 11px;
            margin-left: 4px;
          }
        }
      }

      > .replyAndVisit {
        font-size: 11px;
        > span {
          margin-right: 5px;
          margin-left: 1px;
        }
      }
    }
  }
}
@media screen and (max-width: 480px) {
  #topicList {
    height: 100%;
    width: 100%;
  }
}
</style>
