<template>
  <div class="mdui-container">
    <div class="breadcrumb mdui-p-x-2">
      <div class="mdui-chip" mdui-menu="{target: '#choose_user', subMenuTrigger: 'hover'}">
        <span class="mdui-chip-icon">
          <i class="mdui-icon material-icons">account_circle</i>
        </span>
        <span class="mdui-chip-title">24KB</span>
      </div>
      <ul id="choose_user" class="mdui-menu">
        <li class="mdui-menu-item"><a href="#" class="mdui-ripple">国际版</a></li>
        <li class="mdui-menu-item"><a href="#" class="mdui-ripple">国内版</a></li>
      </ul>
      <span class="breadcrumb-item" @click="back(0)">
        <i class="mdui-icon material-icons mdui-icon-dark mdui-m-a-0">chevron_right</i>
        <span class="mdui-chip">
          <span class="mdui-chip-title">/</span>
        </span>
      </span>
      <span v-for="pathItem in pathList" :key="pathItem.index" class="breadcrumb-item" @click="back(pathItem)">
        <i class="mdui-icon material-icons mdui-icon-dark mdui-m-a-0">chevron_right</i>
        <span class="mdui-chip">
          <span class="mdui-chip-title">{{ pathItem }}</span>
        </span>
      </span>
    </div>

    <div class="mdui-card mdui-shadow-0">
      <Spinner v-if="loading" color="mdui-color-blue-200"></Spinner>
      <template v-else>
        <template v-if="isFolder">
          <div class="mdui-card-content">
            <ul class="mdui-list">
              <li class="mdui-list-item">
                <div class="mdui-list-item-content">
                  <div class="mdui-list-item-title">
                    <button v-if="path !== '/'" class="mdui-btn mdui-btn-icon" @click="back()">
                      <i class="mdui-icon material-icons">arrow_back</i>
                    </button>
                    <button class="mdui-btn mdui-btn-icon" @click="reload()">
                      <i class="mdui-icon material-icons">refresh</i>
                    </button>
                  </div>
                </div>
              </li>
              <li
                v-for="file in list"
                :key="file.index"
                class="mdui-list-item mdui-ripple"
                @click="go(file.name, file.type)"
              >
                <div class="mdui-list-item-content">
                  <div class="mdui-list-item-title">
                    <i class="mdui-icon material-icons">{{ file.type === 1 ? `folder_open` : `insert_drive_file` }}</i>
                    {{ file.name }}
                    <i
                      v-if="file.type === 0"
                      class="mdui-float-right mdui-icon material-icons"
                      @click.stop="download(file.name)"
                      >file_download</i
                    >
                    <div v-if="file.type === 0" class="mdui-list-item-text mdui-list-item-one-line">
                      {{ file.size }} / {{ file.time }}
                    </div>
                  </div>
                </div>
              </li>
              <li v-if="!isEmpty(meta.nextPageParams)" id="loadMore" class="mdui-list-item mdui-ripple" @click="more()">
                <div class="mdui-list-item-content mdui-text-center">加载更多</div>
              </li>
              <li class="mdui-list-item mdui-ripple">{{ item.childCount }} 个项目 {{ item.size }}</li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div class="mdui-card-content">
            <div class="mdui-typo mdui-m-y-2">
              <div class="mdui-typo-title-opacity">{{ item.name }}</div>
              <div class="mdui-typo-subheading-opacity">{{ item.size }} / {{ item.time }}</div>
            </div>
          </div>
          <div class="mdui-card-media mdui-p-a-2">
            <div v-if="in_array(item.ext, fileExtension.txt)">
              <CodeViewer :language="item.ext" :code="content"></CodeViewer>
            </div>
            <div v-else-if="in_array(item.ext, fileExtension.image)">
              <img class="mdui-img-fluid" :src="item.thumb.large.url" :alt="item.name" />
            </div>
            <div v-else-if="in_array(item.ext, fileExtension.video)">
              <Player :source="item.url" type="video" :poster="item.thumb.large.url"></Player>
            </div>
            <div v-else-if="in_array(item.ext, fileExtension.audio)">
              <Player :source="item.url" type="audio"></Player>
            </div>
            <div v-else>
              <p>此文件暂不支持预览</p>
            </div>
          </div>
          <a :href="item.url" class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent"
            ><i class="mdui-icon material-icons">file_download</i></a
          >
        </template>
      </template>
    </div>
    <div v-if="isFolder && doc" class="mdui-card">
      <div class="mdui-card-header">
        <div class="mdui-chip">
          <span class="mdui-chip-icon"> <i class="mdui-icon material-icons">lightbulb_outline</i></span>
          <span class="mdui-chip-title">README</span>
        </div>
      </div>
      <div class="mdui-card-content markdown-body" v-html="doc"></div>
    </div>
  </div>
</template>
<script>
import 'github-markdown-css/github-markdown.css'
import {defineComponent, reactive, ref, computed, watch, onMounted, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import mdui from 'mdui'
import Spinner from '../components/Spinner.vue'
import CodeViewer from '../components/CodeViewer.vue'
import Player from '../components/Player.vue'
import {defaultValue, trim, isEmpty, fileExtension, in_array} from '../utils/index'
import {fetchItem} from '../api/share'

export default defineComponent({
  name: 'Home',
  components: {Spinner, CodeViewer, Player},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      list: [],
      item: {
        childCount: 0,
        size: '0 B',
      },
      meta: [],
      doc: '',
      isFolder: true,
      loading: false,
    })
    const path = computed(() => defaultValue(route.query.q, '/'))
    const pathList = ref([])
    const fetchDoc = async () => {
      data.doc = ''
      let pathItemArr = path.value.split('/')
      let readme = pathItemArr.concat(['README.md'])
      let doc = trim(readme.join('/'), '/')
      await fetchItem({
        path: doc,
        preview: true,
      }).then((res) => {
        data.doc = res
      })
    }
    const parseQuery = () => {
      const query = defaultValue(route.query.q, '/')
      let list = query.split('/')
      list = list.filter((e) => {
        return e.replace(/(\r\n|\n|\r)/gm, '')
      })
      pathList.value = list
    }
    const reload = async () => {
      // 获取资源
      parseQuery()
      fetchDoc()
      data.loading = true
      await fetchItem({
        path: path.value,
      }).then((res) => {
        data.loading = false
        data.list = res.data.list
        data.item = res.data.item
        data.isFolder = res.data.item.type
        data.meta = res.data.meta
      })
    }
    const go = (name, type) => {
      if (data.loading) {
        return false
      }
      let pathItemArr = path.value.split('/')
      pathItemArr.push(name)
      pathItemArr = pathItemArr.filter((e) => {
        return e.replace(/(\r\n|\n|\r)/gm, '')
      })
      router.push({name: 'Home', query: {q: pathItemArr.join('/')}})
    }
    const back = (name) => {
      if (data.loading) {
        return false
      }
      let pathItemArr = path.value.split('/')
      if (typeof name === 'undefined') {
        pathItemArr.pop()
      } else if (name === 0) {
        pathItemArr = []
      } else {
        let index = pathItemArr.indexOf(name)
        pathItemArr = pathItemArr.slice(0, index + 1)
      }
      router.push({name: 'Home', query: {q: pathItemArr.join('/')}})
    }
    const more = async () => {
      data.loading = true
      await fetchItem({
        path: path.value,
        params: data.meta.nextPageParams,
      }).then((res) => {
        data.meta = res.data.meta
        data.list = data.list.concat(res.data.list)
      })
      data.loading = false
    }
    const download = async (name) => {
      let pathItemArr = path.value.split('/')
      pathItemArr.push(name)
      pathItemArr = pathItemArr.filter((e) => {
        return e.replace(/(\r\n|\n|\r)/gm, '')
      })
      let url = pathItemArr.join('/')
      await fetchItem({
        path: url,
      }).then((res) => {
        window.open(res.data.item.url, '_blank')
      })
    }
    watch(
      () => route.query.q,
      (query) => {
        console.log('watch:', query)
        if (defaultValue(query, false) !== false || query === '') {
          reload()
        }
      },
    )
    onMounted(() => {
      reload()
    })
    return {...toRefs(data), path, pathList, reload, go, back, more, download, trim, isEmpty, in_array, fileExtension}
  },
})
</script>
<style scoped>
.mdui-list-item,
.mdui-list-item:hover {
  border-radius: 1rem;
}
</style>
