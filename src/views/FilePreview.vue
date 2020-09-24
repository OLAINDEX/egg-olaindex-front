<template>
  <div class="box container">
    <p class="title is-6"><i class="fas fa-file" aria-hidden="true"></i> {{ item.name }}</p>
    <div class="columns">
      <div class="column">文件名：{{ item.name }}</div>
      <div class="column">大小：{{ item.size }}</div>
      <div class="column">最后修改时间：{{ item.time }}</div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="buttons">
          <router-link class="button is-primary" :to="{name: 'file-list', query: {query: parentDirectoryPath}}"
            ><i class="fas fa-arrow-left" aria-hidden="true"></i>&nbsp;&nbsp;返回</router-link
          >
          <a class="button is-link" :class="{'is-loading': loading}" :href="item.url" target="_blank"
            ><i class="fas fa-download" aria-hidden="true"></i>&nbsp;&nbsp;下载</a
          >
        </div>
      </div>
    </div>
    <div class="content">
      <div v-if="content" class="block">
        <CodePreview :language="getExtByName(item.name)" :code="content"></CodePreview>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, computed, watch, onMounted, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import share from '../api/share'
import {defaultValue, trim} from '../utils/index'
import CodePreview from '../components/CodePreview.vue'
export default defineComponent({
  name: 'FilePreview',
  components: {CodePreview},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const file = computed(() => defaultValue(route.query.path, ''))
    const parentDirectoryPath = computed(() => {
      let query = defaultValue(route.query.path, '')
      return query.split('/').slice(0, -1).join('/')
    })
    const state = reactive({
      loading: false,
      item: [],
      content: '',
    })
    const fetchItem = async () => {
      await share
        .fetchItem({
          path: file.value,
        })
        .then((res) => {
          state.item = res.data
        })
    }
    const fetchContent = async () => {
      await share
        .fetchItem({
          path: file.value,
          preview: true,
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
    const getExtByName = (filename) => {
      return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
    }
    watch(
      () => route.query.path,
      (path) => {
        console.log('watch:', path)
        if (defaultValue(path, false) !== false) {
          render()
        }
      },
    )
    onMounted(() => {
      render()
    })

    return {...toRefs(state), file, parentDirectoryPath, getExtByName}
  },
})
</script>
