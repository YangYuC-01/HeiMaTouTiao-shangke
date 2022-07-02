<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in searchResultList" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      loading: false,
      finished: false,
      searchResultList: [],
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log(data)
        this.loading = false
        this.searchResultList.push(...data.data.results)
        // 判断是否还有数据
        if (data.data.results.length) {
          // 如果有，则重新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有，则将加载状态设置为结束
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
      // this.finished = true
    }
    // async onLoad () {
    //   // 请求获取数据
    //   try {
    //     const { data } = await getSearchResult({
    //       page: this.page,
    //       per_page: this.perPage,
    //       q: this.searchText
    //     })
    //     // console.log(data);

    //     // 将数据添加到数组列表中
    //     const { results } = data.data
    //     this.searchResultList.push(...results)

    //     // 将本次加载中的loading关闭
    //     this.loading = false

    //     // 判断是否还有数据
    //     if (results.length) {
    //       // 如果有，则重新获取下一个数据的页码
    //       this.page++
    //     } else {
    //       // 如果没有，则将加载状态设置为结束
    //       this.finished = true
    //     }
    //   } catch (err) {
    //     this.error = true
    //     this.loading = false
    //     this.$toast('数据获取失败，请稍后重试')
    //   }
    // },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
