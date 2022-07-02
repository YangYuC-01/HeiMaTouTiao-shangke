<template>
<div>
  <van-empty description="搜索结果为空" v-if="NothingShow" />
  <template v-else>
    <van-cell  icon="search" v-for="(item,index) in searchList" :key="index" @click="$emit('searchClick',item)">
      <template #title >
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </template>
</div>
</template>

<script>
import { getSearchSuggest } from '@/api/search'
let timer = null
export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {},
  data () {
    return {
      searchList: [],
      NothingShow: false
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      if (str) {
        return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
      }
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        this.NothingShow = false
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const { data } = await getSearchSuggest(newVal)
            console.log(data)
            if (data.data.options[0] === null) {
              this.NothingShow = true
            }
            this.searchList = data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 300)
      },
      immediate: true
    }

  },
  filters: {},
  components: {},
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang='less'>

</style>
