<template>
  <div class="Wrapper">

    <div id="topic">
      <div class="header">
        <router-link class="mainPage" to="/pc"><span>主页</span></router-link> <span class="addTopic">  / 发布文章</span>
      </div>
      <div class="selectedMod">
        <span>选择版块 : </span>
        <el-select v-model="selectedMod" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="title">
        <span>标题：</span>
        <el-input
            placeholder="请输入标题,不少于7个字符"
            v-model="title"
            minlength = '6'
        ></el-input>
      </div>
      <div class="contents">
        <el-input
            placeholder="请输入内容，不少于7个字符,支持markdown语法"
            type="textarea"
            v-model="contents"
            minlength = '6'
            :rows="18"
            resize = 'none'
        ></el-input>
      </div>
      <div class="btnWrap">
        <el-button class="btn" type="primary" @click="addTopic">发布</el-button>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import topic from "@/api/topic";
import {Message} from "element-ui";
export default {
  data() {
    return {
      title: "",
      contents:'',
      selectedMod : 'dev',
      options: [{
        value: 'good',
        label: '精华'
      }, {
        value: 'share',
        label: '分享'
      }, {
        value: 'ask',
        label: '问答'
      }, {
        value: 'job',
        label: '招聘'
      }, {
        value: 'dev',
        label: '测试'
      }],
      accesstoken:''
    };
  },
  computed: {
    ...mapGetters(["loginname", "isLogin"])
  },
  methods: {
    ...mapActions([
      "login", // 映射为 `this.$store.dispatch('login')`
      "logout"
    ]),
    addTopic() {
      this.accesstoken = this.$store.getters.accesstoken
      if(this.accesstoken && this.selectedMod &&
      this.title && this.title.trim().length >= 7
          && this.contents.trim()&& this.contents.trim().length > 7){
        topic.addTopic({
          accesstoken : this.accesstoken,
          title: this.title.trim(),
          tab: this.selectedMod,
          content: this.contents.trim()
        }).then(res => {
          if(res.data.success === true){
            Message.success('发表成功')
            this.$router.push('/pc/user/' + this.$store.getters.loginname)
          }else{
            Message.error('发表失败')
          }
        })
      }else{
        Message.error('请填入合法数据')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
.Wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#topic {
  font-size: 16px;
  background-color: #fff;
  width: 760px;

  border-radius: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  //align-items: center;
  //justify-content: center;
  > label {
    > span {
      font-weight: bold;
      color: $theme-color;
    }
  }
  > .header{
    padding: 10px;
    background-color: #e1e1e1;
    border-radius: 3px 3px 0 0;
    >.mainPage{
      color: #80bd01;
    }
    >.addTopic{
      color: #999;
      font-size: 14px;
    }
  }
  > .selectedMod{
    padding: 10px;
  }
  > .title {
    display: flex;
    align-items: center;
    width: 500px;
    margin: 5px 10px;
    white-space: nowrap ;
  }
  > .contents{
    padding: 10px;
  }
}
.btnWrap{
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  > .btn{
    width: 20%;
  }
}

</style>
