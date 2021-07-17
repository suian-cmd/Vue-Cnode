<template>
  <div>
    <transition name="fade">
      <div v-if="isLoading" class="loading">
        <my-loading></my-loading>
      </div>
    </transition>

    <div id="user" v-if="!isLoading">
      <div>
        <div class="userInfo"></div>
        <div class="recentTopics" v-if="recentTopics[0]">
          <p class="tab-bar">近期发表</p>
          <div class="topic_item" v-for="topic in recentTopics" :key="topic.id">
            <div class="avatar">
              <router-link :to="`/PC/user/${topic.author.loginname}`"
                ><img :src="topic.author.avatar_url" alt=""
              /></router-link>
            </div>
            <div class="topicInfo">
              <h3>
                <router-link class="underline" :to="`/pc/detail/${topic.id}`">{{
                  ellipsis(topic.title, 35)
                }}</router-link>
              </h3>
              <p>{{ topic.author.loginname }}</p>
              <div class="disscussPeople">
                <div v-for="reply in topic.replies" class="disscussImgWrapper" :key="reply.id">
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
        </div>
        <div class="recentTopics" v-else>
          <p class="tab-bar">您还没有发表过文章</p>
        </div>
        <div class="recentReplies" v-if="recentReplies[0]">
          <p class="tab-bar">近期回复</p>
          <div class="topic_item" v-for="topic in recentReplies" :key="topic.id">
            <div class="avatar">
              <router-link :to="`/PC/user/${topic.author.loginname}`"
                ><img :src="topic.author.avatar_url" alt=""
              /></router-link>
            </div>
            <div class="topicInfo">
              <h3>
                <router-link class="underline" :to="`/pc/detail/${topic.id}`">{{
                  ellipsis(topic.title, 35)
                }}</router-link>
              </h3>
              <p>{{ topic.author.loginname }}</p>
              <div class="disscussPeople">
                <div v-for="reply in topic.replies" class="disscussImgWrapper" :key="reply.id">
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
        </div>
        <div class="recentReplies" v-else>
          <p class="tab-bar">您还没有回复过文章</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/api/user.js";
import Icon from "./Icon";
import topic from "@/api/topic.js";
import Loading from "./Loading";

export default {
  data() {
    return {
      isLoading: true,
      authorInfo: null,
      score: null,
      recentTopics: [],
      recentReplies: [],
      loginname: ""
    };
  },
  components: {
    "my-loading": Loading,
    "my-icon": Icon
  },
  created() {
    this.loginname = this.$route.params.loginname;
    if (this.loginname) {
      this.getUserByName(this.loginname);
    }
  },
  methods: {
    getUserByName(loginname) {
      if (this.loginname) {
        user.getUserByName({ loginname }).then(res => {
          this.authorInfo = res.data.data;
          this.score = res.data.data.score;
          this.recentTopics = res.data.data.recent_topics;
          this.getCount(this.recentTopics);
          this.recentReplies = res.data.data.recent_replies;
          this.getCount(this.recentReplies);
          this.isLoading = false;
        });
      }
    },
    getCount(array) {
      if (array && array.length > 0) {
        array.forEach(item => {
          topic.getTopicById({ id: item.id }).then(res => {
            this.$set(item, "replies", res.data.data.replies);
            if (item.replies && item.replies.length > 3) {
              item.replies.splice(3);
            }
            this.$set(item, "reply_count", res.data.data.reply_count);
            this.$set(item, "visit_count", res.data.data.visit_count);
          });
        });
      }
    }
  },
  watch: {
    $route() {
      this.loginname = this.$route.params.loginname;
      if (this.loginname) {
        this.getUserByName(this.loginname);
      }
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
  margin-right: 20px;
}

.recentTopics,
.recentReplies {
  font-size: 16px;
  background-color: #fff;
  width: 760px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  // margin-right: 20px;

  > .tab-bar {
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
  }
  > .topic_item {
    display: flex;
    padding: 10px;
    position: relative;
    &:not(:last-child) {
      border-bottom: 1px solid #e8e8e8;
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
      > h3 {
        font-size: 17px;
        white-space: nowrap;
        font-weight: 500;
        color: $black;
        margin-top: 6px;
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
        > span {
          font-size: 13px;
          color: $lightestGray;
          margin-left: 4px;
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .recentTopics,
  .recentReplies {
    width: 80vw;
    .topic_item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

@media screen and (max-width: 480px) {
  #user {
    height: 100%;
    width: 100vw;

    .topic_item {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
