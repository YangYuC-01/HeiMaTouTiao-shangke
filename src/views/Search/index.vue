<template>
<div class="search">
  <form action="/">
  <van-search
  background="#3296fa"
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
</div>
</template>

<script>
export default {
  name: 'Search',
  created () {},
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (val) {

    },
    onCancel () {

    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
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
