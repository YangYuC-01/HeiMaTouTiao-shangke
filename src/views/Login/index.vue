<template>
  <div class="login-content">
    <van-nav-bar title="登录">
      <template #left>
        <i class="toutiao toutiao-guanbi"></i>
      </template>
    </van-nav-bar>

    <van-form ref="form" @submit="onSubmit">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' },{pattern: /^(?:(?:\+|00)86)?1\d{10}$/,message:'手机号格式不正确'}]"
      >
        <i slot="label" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        name="code"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入验证码' },{pattern: /^\d{6}$/,message:'验证码格式不正确'}]"
      >
        <i slot="label" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button
            size="small"
            type="primary"
            class="yzm"
            color="#ededed"
            native-type="button"
            @click="sendSms"
            :disabled="isCountDownShow"
          >
            <van-count-down :time="time" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow = false"/>
            <span v-else>发送验证码</span>
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block class="login-btn" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      time: 60000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (value) {
      try {
        const { data } = await login(value)
        // console.log(data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败，请稍后重试')
        console.log(err)
      }
    },
    async sendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)

          this.$toast.success('验证码已发送')
        } catch (err) {
          this.$toast.fail('验证码发送失败')
          console.log(err)
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-content {
  background-color: #f5f7f9;
  .van-nav-bar {
    color: #fff;
  }
  .van-form {
    .van-cell {
      /deep/.van-cell__title {
        width: 39px;
        .toutiao {
          font-size: 37px !important;
        }
      }
    }
  }

  .yzm {
    width: 160px;
    height: 46px;
    border-radius: 23px;
    font-size: 22px;
    .van-button__text {
      color: #666;
    }
  }
  .login-btn {
    width: 694px;
    height: 88px;
    background-color: #6db4fb;
    border-radius: 10px;
    .van-button__text {
      color: #fff;
    }
  }
}
</style>
