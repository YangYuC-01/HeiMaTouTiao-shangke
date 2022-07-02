<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="deleteShow">
        <span @click="$store.commit('deleteAllSearchHistoryList', [])"
          >全部删除
        </span>
        <span @click="deleteShow = false">完成 </span>
      </template>
      <van-icon name="delete" v-else @click="deleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in $store.state.searchHistoryList"
      :key="index"
      :title="item"
      @click="$emit('searchClick',item)"
    >
      <van-icon
        name="close"
        v-if="deleteShow"
        @click="$store.commit('deleteSearchHistoryList', index)"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      deleteShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
