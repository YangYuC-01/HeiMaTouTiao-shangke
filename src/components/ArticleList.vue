<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in articleList" :key="index">
          <template #title>
            <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
          </template>

          <template #label>
            <div v-if="item.cover.type === 3" class="cover-warp">
              <div v-for="(img,index) in item.cover.images" :key="index" class="cover-item">
                <van-image fit="cover" :src="img" class="cover-image" />
              </div>
            </div>
            <div class="label-info-warp">
              <span>{{item.aut_name}}</span>
              <span>评论{{item.comm_count}}</span>
              <span>{{item.pubdate | dataFormat}}</span>
            </div>
          </template>

          <van-image
            v-if="item.cover.type === 1"
            :src="item.cover.images[0]"
            slot="default"
            class="right-cover"
            fit="cover"
          />
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/home'
export default {
  name: 'ArticleList',
  created () {
  },
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async onLoad () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const { data } = await getArticles({
          channel_id: this.channelId,
          timestamp: this.timestamp
        })
        // console.log(data)
        this.timestamp = data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...data.data.results)
        this.loading = false
      } catch (err) {
        console.log('获取文章列表失败', err)
      }
    },
    onRefresh () {
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.timestamp = Date.now()
      this.onLoad()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  /deep/.right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-warp span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-warp {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      /deep/.cover-image {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
