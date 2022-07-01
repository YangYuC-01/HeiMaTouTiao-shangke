<template>
  <div class="channel-panel">
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          @click="isEditShow = !isEditShow"
          >{{ isEditShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row gutter="10">
        <van-col span="6" v-for="(item, index) in channelList" :key="item.id">
          <div class="inner" :style="{ color: active === index ? 'red' : '' }" @click="editChannel(index,item.id)">
            {{ item.name }}
            <van-icon
              name="close"
              v-show="isEditShow && forbidList.indexOf(item.id) === -1"
            />
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row gutter="10">
        <van-col span="6" v-for="item in reList" :key="item.id">
          <div class="inner" @click="addChannel(item)">+{{ item.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllChannels, addChannel, deleteChannel } from '@/api/home'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelPanel',
  props: {
    channelList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllChannelsList()
  },
  data () {
    return {
      allChannelList: [], // 全部频道
      isEditShow: false,
      forbidList: [0] // 禁止删除的频道
    }
  },
  methods: {
    async getAllChannelsList () {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannelList = data.data.channels
      } catch (err) {
        console.log('失败', err)
      }
    },
    async editChannel (index, id) {
      if (index === 0) {
        return
      }
      if (this.isEditShow) {
        await deleteChannel(id)
        // eslint-disable-next-line no-unused-expressions
        this.active >= index ? this.$emit('j') : this.active
        // 编辑状态
        this.channelList.splice(index, 1)
      } else {
        // 点击切换
        this.$emit('handoff', index)
      }
    },
    async addChannel (item) {
      try {
        await addChannel(item)

        this.channelList.push(item)
        const index = this.reList.findIndex(obj => obj.id === item.id)
        this.reList.splice(index, 1)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    reList () {
      return this.allChannelList.filter((item) => {
        return !this.channelList.some((item1) => item1.id === item.id)
      })
    }
  },
  watch: {
    channelList: {
      deep: true,
      handler (newVal) {
        // eslint-disable-next-line no-empty
        if (this.$store.state.user && this.$store.state.user.token) {
        } else {
          setItem('CHANNELS', newVal)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.channel-panel {
  padding-top: 87px;
}

.channel-container {
  padding: 0 16px 0 22px;
  margin-bottom: 75px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
    h3 {
      font-family: MicrosoftYaHei;
      font-size: 32px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 36px;
      letter-spacing: 2px;
      color: #333333;
    }
    .van-button {
      width: 115px;
      height: 49px;
      border-radius: 20px;
      font-size: 13px;
    }
  }

  .van-row {
    .van-col {
      margin-bottom: 10px;
      .inner {
        position: relative;
        width: 160px;
        height: 86px;
        background-color: #f4f5f6;
        border-radius: 6px;
        font-size: 28px;
        font-weight: normal;
        color: #222222;
        text-align: center;
        line-height: 86px;

        .van-icon {
          position: absolute;
          top: -8px;
          right: -8px;
        }
      }
    }
  }
}
</style>
