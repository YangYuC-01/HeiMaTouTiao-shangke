<template>
  <div class="my-content">
    <!-- 头部 -->
    <div class="header header-login" v-if="user ? false :true">
      <img src="@/assets/mobile.png" alt />
      <span @click="$router.push({name:'login'})">登录 / 注册</span>
    </div>
    <div class="header header-nologin" v-else>
      <div class="top">
        <div class="left">
          <van-image class="img" cover round :src="userInfo.photo" />
          <span>黑马头条号</span>
        </div>
        <div class="right">
          <van-button round size="small">编辑资料</van-button>
        </div>
      </div>
      <div class="bottom">
        <div>
          <span>{{userInfo.art_count}}</span>
          <span>头条</span>
        </div>
        <div>
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div>
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div>
          <span>{{userInfo.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>

    <!-- 收藏  历史 -->
    <div class="content">
      <div class="collection">
        <van-icon name="star-o" color="#eb5253" />
        <span>收藏</span>
      </div>
      <div class="history">
        <van-icon name="clock-o" color="#ff9d1d" />
        <span>历史</span>
      </div>
    </div>

    <!-- 消息通知 小智同学 -->
    <div class="message">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>

    <!-- 退出按钮 -->
    <van-button size="large" @click="quitBtn" v-if="user ? true:false">退出登录</van-button>
  </div>
</template>

<script>
import { userInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      userInfo: ''
    }
  },
  methods: {
    async getUserInfo () {
      if (this.user && this.user.token) {
        try {
          const { data } = await userInfo()
          console.log(data)
          this.userInfo = data.data
        } catch (err) {
          console.log(err)
        }
      } else {
        this.$toast('请先登录')
      }
    },
    quitBtn () {
      this.$dialog.confirm({
        title: '确认退出'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {

        })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background: #3296fa url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header.header-login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 28px;
  color: #fff;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
}

.header-nologin {
  padding-top: 116px;
  box-sizing: border-box;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 0 22px;
    margin-bottom: 18px;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: #fff;
      .img {
        width: 132px;
        height: 132px;
        margin-right: 22px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-items: center;
      .van-button {
        height: 33px;
        width: 135px;
        line-height: 33px;
        /deep/.van-button__text {
          font-size: 20px;
          color: #666666;
        }
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 135px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #fff;
      font-size: 23px;
    }
    div span:first-child {
      font-size: 36px;
    }
  }
}

.content {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 22px 0;
  height: 141px;
  margin-bottom: 9px;
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    flex: 1;
    font-size: 28px;
    .van-icon {
      font-size: 45px;
    }
  }
  .collection {
    border-right: 1px solid #edeff3;
  }
}

.message {
  background-color: #fff;
  margin-bottom: 9px;
  padding: 0 32px;
  .van-cell {
    padding-left: 0;
    padding-right: 0;
    font-size: 30px;
    .van-icon {
      font-size: 21px;
    }
  }
}
.message .van-cell:first-child {
  border-bottom: 1px solid #edeff3;
}
.van-button__text {
  color: #d86262;
  font-size: 30px;
}
.van-button {
  border: none;
}
</style>
