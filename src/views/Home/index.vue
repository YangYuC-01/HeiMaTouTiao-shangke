<template>
  <div class="home-content">
    <van-nav-bar :fixed="true">
      <template #title>
        <van-button type="default" icon="search" class="search-btn" @click="$router.push({path:'/search'})"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in myChannelsList" :key="item.id">
        <ArticleList :channelId="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>

    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '85%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :channelList="myChannelsList"
        :active="active"
        @handoff="active=$event"
        @j="btn"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import ChannelPanel from './components/ChannelPanel.vue'
export default {
  name: 'Home',
  created () {
    this.getMyChannelsList()
  },
  data () {
    return {
      active: 0,
      myChannelsList: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    async getMyChannelsList () {
      try {
        const { data } = await getMyChannels()
        // console.log(data)
        this.myChannelsList = data.data.channels
      } catch (err) {
        console.log('获取我的频道列表', err)
      }
    },
    btn () {
      console.log(2)
      this.active -= 1
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang="less">
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  border: unset;
  color: #ffffff;
  .van-icon {
    color: #fff;
  }
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  border-radius: 3px;
  background-color: #3296fa;
}
/deep/.van-tab {
  color: #777;
  &.van-tab--active {
    color: #333;
  }
}
.menu {
  position: fixed;
  right: 0;
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  right: 0;
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  width: 750px;
  z-index: 1;
  position: fixed;
  top: 92px;
}
.home-content {
  padding-top: 181px;
  padding-bottom: 100px;
}
</style>
