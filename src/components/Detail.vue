<template>
  <div>
    <transition name="fade">
      <div v-if="isLoading" class="loading">
        <my-loading></my-loading>
      </div>
    </transition>
    <div class="detail-container" v-if="!isLoading">
      <div id="detail" v-if="!topicDetail[0] ">
        <h3 class="title">{{ topicDetail.title }}</h3>
        <div class="topicInfo">
          <router-link to="/pc"><span>回到主页 > </span></router-link>
          <span> 发布于{{ friendlyDate(topicDetail.create_at) }} * </span>
          <span>{{ topicDetail.visit_count }}次浏览 * </span>
          <span>来自{{ hashMap[topicDetail.tab] }}主题</span>
        </div>
        <el-divider class="noMargin"></el-divider>
        <div class="topicDetail">
<!--          <div class="avatar">-->
<!--            <router-link :to="`/pc/user/${loginname}`">-->
<!--              <img :src="avatar_url" alt="" />-->
<!--            </router-link>-->
<!--          </div>-->
          <div class="artical">
<!--            <div class="userName">-->
<!--              {{ loginname }}-->
<!--            </div>-->
            <div class="markdown-body" id="content" v-html="content"></div>
          </div>
        </div>
        <el-divider class="noMargin"></el-divider>
      </div>
      <div class="addComment" v-if="isLogin">
        <span class="title">添加评论 : </span>
        <div class="contents">
          <el-input
              placeholder="请输入内容，不少于7个字符,支持markdown语法"
              type="textarea"
              v-model="contents"
              minlength = '6'
              :rows="8"
              resize = 'none'
          ></el-input>
        </div>
        <div class="btnWrap">
          <el-button class="btn" type="primary" @click="addComment(topicDetail.id,topicDetail)">发布</el-button>
        </div>
      </div>

      <div class="replies" v-if="replies[0]">
        <div class="comment-count">{{ replies.length }} 条评论</div>
        <div
            class="comment-container"
            v-for="(reply, index) in replies"
            :key="reply.id"
        >
          <div class="avatar-name">
            <router-link :to="`/pc/user/${reply.author.loginname}`">
              <img :src="reply.author.avatar_url" alt="" />
            </router-link>

            <p class="name">{{ reply.author.loginname }}</p>
            <div class="comment-info">
              <span>{{ index + 1 }}楼</span>
              <span>{{ friendlyDate(reply.create_at) }} </span>
              <span v-if="isLogin && reply.author.loginname !== userName" class="reply">
                <label  @click="addPraise(reply.id)">
                  <my-icon v-if="reply.ups.indexOf(userId) > -1" class="pointer" name="praise"></my-icon>
                  <my-icon v-else class="pointer" name="noPraise"></my-icon>
                </label>&nbsp;{{ reply.ups.length || 0}}点赞&nbsp;
                <label @click="reply.showInput = !reply.showInput"><my-icon class="pointer" name="comment"></my-icon></label>&nbsp;回复
              </span>
              <span v-else class="reply">
                {{ reply.ups.length || 0}}点赞&nbsp;
              </span>
            </div>
          </div>
          <span class="comment content" v-html="reply.content.replace('/user','/pc/user')"></span>
          <div class="addReply noMargin" v-if="isLogin && reply.showInput">
            <div class="contents">
              <el-input
                  placeholder="请输入内容，不少于7个字符,支持markdown语法"
                  type="textarea"
                  v-model="contents"
                  minlength = '6'
                  :rows="8"
                  resize = 'none'
              ></el-input>
            </div>
            <div class="btnWrap">
              <el-button class="btn" type="primary" @click="addComment(topicDetail.id,reply)">发布</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topic from "@/api/topic.js";
import user from "@/api/user.js";
import Loading from "./Loading";
import {mapGetters} from "vuex";
import {Message} from "element-ui";
import Icon from "@/components/Icon";
export default {
  data() {
    return {
      isLoading: true,
      topicDetail: [],
      id: null,
      author: null,
      avatar_url: null,
      loginname: null,
      content: null,
      replies: [],
      authorInfo: [],
      score: null,
      recentTopics: [],
      hashMap:{
        all: '全部',
        good: '精华',
        share : '分享',
        ask : '问答',
        job : '招聘',
        dev : '测试'
      },
      contents : '',
      userName:this.$store.getters.loginname
    };
  },
  components: {
    "my-loading": Loading,
    "my-icon": Icon
  },
  created() {
    this.id = this.$route.params.id;
    this.getTopicById(this.id).then(() => {
      this.getUserByName(this.loginname);
      this.isLoading = false;
    });
  },
  computed:{
    ...mapGetters(['isLogin','accesstoken','userId']),
  },
  methods: {
    getTopicById(id) {
      return topic.getTopicById({ id }).then(res => {
        this.topicDetail = res.data.data;
        this.author = res.data.data.author;
        this.avatar_url = res.data.data.author.avatar_url;
        this.loginname = res.data.data.author.loginname;
        this.content = res.data.data.content;
        this.replies = res.data.data.replies;
        this.replies.forEach((reply) => {
          this.$set(reply, 'showInput', false)
        })
        // console.log(this.replies)
      });
    },
    getUserByName(loginname) {
      if (this.loginname) {
        user.getUserByName({ loginname }).then(res => {
          this.authorInfo = res.data.data;
          this.score = res.data.data.score;
          this.recentTopics = res.data.data.recent_topics;
          if (this.recentTopics && this.recentTopics.length >= 5) {
            this.recentTopics.splice(5);
          }
        });
      }
    },
    addComment(topicDetail_id,reply){
      if(this.isLogin && this.accesstoken && this.contents.trim().length >= 7){
        let str = ''
        if(topicDetail_id !== reply.id){
          str += '回复：'+reply.author.loginname+'&nbsp; : &nbsp;&nbsp;'
        }
        str += this.contents
        topic.addComment({
          topic_id : topicDetail_id,
          accesstoken : this.accesstoken,
          content : str,
          reply_id : reply.id
        }).then(res => {
          if(res.data.success === true){
            this.contents = ''
            if(reply.showInput){
              reply.showInput = false
            }
            this.getTopicById(this.id).then(() => {
              this.getUserByName(this.loginname);
              this.isLoading = false;
            });
            Message.success('发布成功')
          }
        })
      }else {
        Message.error('评论内容不能少于7小字符')
      }
    },
    addPraise(reply_id){
      if(this.isLogin && this.accesstoken && reply_id){
        topic.addPraise({
          accesstoken : this.accesstoken,
          reply_id : reply_id
        }).then(res => {
          if(res.data.success === true){
            this.getTopicById(this.id).then(() => {
              this.getUserByName(this.loginname);
              this.isLoading = false;
            });
          }
        })
      }else {
        Message.error('请登录后再点赞，稍后再试')
      }
    }
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getTopicById(this.id).then(() => {
        this.getUserByName(this.loginname);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
.noMargin{
  margin: 0;
}
.detail-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loading {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  width: 40vw;
  padding: 40px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.content{
  -webkit-text-size-adjust: 100%;
  color: #333;
  overflow: hidden;
  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;

}
.addComment{
  margin-top: 20px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 780px;
  padding: 20px;
  // margin-right: 20px;
  > .title {
    margin-bottom: 10px;
    font-weight: 700;
  }
  > .btnWrap{
    margin-top: 10px;
  }
}
.addReply{
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 20px;
  // margin-right: 20px;
  > .title {
    margin-bottom: 10px;
    font-weight: 700;
  }
  > .btnWrap{
    margin-top: 10px;
  }
}
.replies{
  margin-top: 20px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 780px;
  padding: 20px;
  .comment-count {
    font-size: 20px;
    font-weight: 700;
    color: $gray;
    margin: 30px 0;
  }
  .comment-container {
    margin-top: 20px;
    &:not(:last-child) {
      margin-bottom: 10px;
      border-bottom: 1px solid $border-color;
    }

    > .avatar-name {
      display: flex;
      align-items: flex-end;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 12px 16px;
      }

      > .comment-info {
        font-size: 14px;
        color: $lightestGray;
        display: flex;
        align-items: center;
        letter-spacing: 1px;
        margin-bottom: 16px;
        > span {
          margin-right: 4px;
        }
        > .reply{
          display: flex;
        }
        .pointer{
          cursor: pointer;
        }
      }
    }
    .comment {
      width: 85%;
      margin-left: 50px;
      margin-top: -10px;
    }
  }
}

#detail {
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 760px;
  padding: 30px;
  // margin-right: 20px;
  > .title {
    font-size: 32px;
  }
  > .topicInfo {
    font-size: 15px;
    margin-top: 12px;
    margin-bottom: 30px;
    color: $lightGray;
    span {
      margin-right: 6px;
    }
  }

  > .topicDetail {
    display: flex;
    > .avatar {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    > .artical {
      display: flex;
      flex-direction: column;
      > .userName {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        > span {
          font-size: 14px;
          font-weight: normal;
          color: $lightestGray;
        }
      }
    }
  }

  .markdown-text {
    >>> {
      margin: 10px;
    }
  }

  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 780px;
    margin: 0 auto;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 10px;
    }
  }
  .markdown-body img {
    width: 92% !important;
  }
  .comment-count {
    font-size: 20px;
    font-weight: 700;
    color: $gray;
    margin: 30px 0;
  }
  .comment-container {
    margin-top: 20px;
    &:not(:last-child) {
      margin-bottom: 10px;
      border-bottom: 1px solid $border-color;
    }

    > .avatar-name {
      display: flex;
      align-items: flex-end;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 12px;
        margin-bottom: 16px;
      }

      > .comment-info {
        font-size: 14px;
        color: $lightestGray;
        display: flex;
        align-items: center;
        letter-spacing: 1px;
        margin-bottom: 16px;
        > span {
          margin-right: 4px;
        }
      }
    }

    .comment {
      margin-left: 50px;
      margin-top: -10px;
    }
  }
}

@media screen and (max-width: 1060px) {
  .markdown-body {
    width: 70vw;
  }
  #detail {
    width: 80vw;
  }
}

@media screen and (max-width: 480px) {
  .markdown-body {
    width: 90vw;
  }
  #detail {
    height: 100%;
    width: 100vw;
    padding: 6%;
    font-size: 16px;

    > .title {
      font-size: 20px;
    }
    > .topicInfo {
      font-size: 13px;
      margin-top: 12px;
      margin-bottom: 15px;
      span {
        margin-right: 6px;
      }
    }

    > .topicDetail {
      > .avatar {
        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
      }
      > .artical {
        > .userName {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 8px;
          > span {
            font-size: 12px;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
