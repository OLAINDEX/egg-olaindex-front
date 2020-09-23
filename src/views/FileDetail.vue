<template>
  <div class="box container">
    <p class="title is-6"><i class="fas fa-file" aria-hidden="true"></i> {{ item.name }}</p>
    <div class="columns">
      <div class="column">文件名：{{ item.name }}</div>
      <div class="column">大小：{{ item.size }}</div>
      <div class="column">最后修改时间：{{ item.time }}</div>
    </div>
    <div class="columns">
      <div class="column preview-body" v-html="content"></div>
    </div>
    <div class="columns is-centered">
      <div class="column is-offset-one-quarter is-half">
        <a class="button is-primary" :href="item.url" target="_blank">下载</a>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, computed, watchEffect, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import share from '../api/share'
import {defaultValue, trim} from '../utils/index'
export default defineComponent({
  name: 'FileDetail',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const file = computed(() => defaultValue(route.query.query, ''))
    const state = reactive({
      loading: false,
      item: [],
      content: '',
    })
    const fetchItem = async () => {
      await share
        .fetchItem({
          params: {
            path: file.value,
          },
        })
        .then((res) => {
          state.item = res.data
        })
    }
    const fetchContent = async () => {
      await share
        .fetchItem({
          params: {
            path: file.value,
            preview: true,
          },
        })
        .then((res) => {
          state.content = res
        })
    }
    const render = () => {
      state.loading = true
      setTimeout(async () => {
        await fetchItem()
        state.content = ''
        await fetchContent()
        state.loading = false
      }, 500)
    }
    watchEffect(() => {
      const query = defaultValue(route.query.query, '')
      console.log('req_query:', query)
      render()
    })
    return {...toRefs(state), file}
  },
})
</script>
