<template>
  <div class="search">
    <form action="/">
      <van-search
        background="#3296fa"
        autofocus
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <SearchSuggest :searchText="searchText" v-else-if="searchText.length" @searchClick="onSearch"></SearchSuggest>
    <SearchHistory v-else @searchClick="onSearchHistory"></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'Search',
  created () { },
  data () {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  methods: {
    onSearch (str) {
      if (this.searchText === '') return
      this.searchText = str
      this.isResultShow = true
      this.$store.commit('setSearchHistoryList', str)
    },
    onSearchHistory (str) {
      this.searchText = str
      this.isResultShow = true
      this.$store.commit('setSearchHistoryList', str)
    },
    onCancel () {
      this.$router.go(-1)
    }
  },
  computed: {},
  watch: {
    searchText () {
      this.isResultShow = false
    }
  },
  filters: {},
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  }
}
</script>

<style scoped lang='less'>
.van-search {
  .van-search__action {
    color: #fff;
  }
  /deep/.van-icon-search {
    color: #9a9a9a;
  }
}
</style>
