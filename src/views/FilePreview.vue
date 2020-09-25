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
      <div v-if="in_array(item.ext, fileExtension.txt)" class="block">
        <CodePreview :language="item.ext" :code="content"></CodePreview>
      </div>
      <div v-else-if="in_array(item.ext, fileExtension.image)" class="block">
        <figure class="image">
          <img :src="item.thumb.large.url" :alt="item.name" />
        </figure>
      </div>
      <div v-else-if="in_array(item.ext, fileExtension.video)" class="block">
        <Player :source="item.url" type="video" :poster="item.thumb.large.url"></Player>
      </div>
      <div v-else-if="in_array(item.ext, fileExtension.audio)" class="block">
        <Player :source="item.url" type="audio"></Player>
      </div>
      <div v-else class="block">
        <p>此文件暂不支持预览</p>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, computed, watch, onMounted, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import share from '../api/share'
import {defaultValue, trim, fileExtension, in_array} from '../utils/index'
import CodePreview from '../components/CodePreview.vue'
import Player from '../components/Player.vue'
export default defineComponent({
  name: 'FilePreview',
  components: {CodePreview, Player},
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
        if (in_array(state.item.ext, fileExtension.txt)) {
          await fetchContent()
        }
        state.loading = false
      }, 500)
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

    return {...toRefs(state), file, parentDirectoryPath, fileExtension, in_array}
  },
})
</script>
