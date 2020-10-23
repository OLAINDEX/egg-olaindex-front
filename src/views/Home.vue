<template>
  <div class="mdui-container">
    <div class="breadcrumb mdui-p-x-2">
      <div class="mdui-chip" mdui-menu="{target: '#choose_user', subMenuTrigger: 'hover'}">
        <span class="mdui-chip-icon">
          <i class="mdui-icon material-icons">account_circle</i>
        </span>
        <span class="mdui-chip-title">{{ main.remark }}</span>
      </div>
      <ul id="choose_user" class="mdui-menu">
        <template v-for="block in blocks" :key="block.id">
          <li class="mdui-menu-item">
            <router-link :to="{name: 'List', params: {id: block.id}}" class="mdui-ripple">{{
              block.remark
            }}</router-link>
          </li>
        </template>
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
        <template v-if="is404">
          <div class="mdui-card-content">
            <p>此目录或文件不存在</p>
          </div>
        </template>
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
                      <button class="mdui-btn mdui-btn-icon" @click="load()">
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
                      <i class="mdui-icon material-icons">{{
                        file.type === 1 ? `folder_open` : `insert_drive_file`
                      }}</i>
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
                <li
                  v-if="!isEmpty(meta.nextPageParams)"
                  id="loadMore"
                  class="mdui-list-item mdui-ripple"
                  @click="more()"
                >
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
                <img class="mdui-img-fluid" :src="item.url" :alt="item.name" />
              </div>
              <div v-else-if="in_array(item.ext, fileExtension.video)">
                <Player :source="item.url" type="video" :poster="item.thumb.large.url"></Player>
              </div>
              <div v-else-if="in_array(item.ext, fileExtension.audio)">
                <Player :source="item.url" type="audio"></Player>
              </div>
              <div v-else>
                <p>此目录或文件暂不支持显示</p>
              </div>
            </div>
            <a v-if="item.name" :href="item.url" class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent"
              ><i class="mdui-icon material-icons">file_download</i></a
            >
          </template>
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
import Spinner from '/@/components/Spinner.vue'
import CodeViewer from '/@/components/CodeViewer.vue'
import Player from '/@/components/Player.vue'
import {defaultValue, trim, isEmpty, fileExtension, in_array} from '/@/utils/index'
import {fetchItem} from '/@/api/share'
import {fetchBlocks} from '/@/api/home'

export default defineComponent({
  name: 'Home',
  components: {Spinner, CodeViewer, Player},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      main: [],
      blocks: [],
      list: [],
      item: {
        childCount: 0,
        size: '0 B',
        time: '',
      },
      meta: [],
      doc: '',
      isFolder: true,
      is404: false,
      isEncrypt: false,
      loading: false,
    })
    const path = computed(() => defaultValue(route.query.q, '/'))
    const pathList = ref([])
    const encryptPassword = ref('')
    const fetchList = async () => {
      data.loading = true
      await fetchItem({
        id: data.main.id,
        path: path.value,
        password: encryptPassword.value,
      }).then(async (res) => {
        data.isFolder = res.data.item.type
        data.isEncrypt = res.data.item.encrypt
        data.list = res.data.list
        data.item = res.data.item
        data.meta = res.data.meta
        if (data.isEncrypt) {
          mdui.prompt(
            '文件或文件夹已加密，输入密钥后访问',
            '提示',
            function (value) {
              encryptPassword.value = value
              setTimeout(async () => {
                await fetchList()
              }, 800)
            },
            function (value) {
              setTimeout(async () => {
                await fetchList()
              }, 800)
            },
          )
        }
        if (data.isFolder) {
          await fetchDoc()
        }
        if (isEmpty(res.data.item)) {
          data.is404 = true
        } else {
          data.is404 = false
        }
        data.loading = false
      })
    }
    const fetchDoc = async () => {
      let pathItemArr = path.value.split('/')
      let readme = pathItemArr.concat(['README.md'])
      let doc = trim(readme.join('/'), '/')
      await fetchItem({
        id: data.main.id,
        path: doc,
        preview: true,
        password: encryptPassword.value,
      }).then((res) => {
        data.doc = res.data.content
      })
    }
    const load = async () => {
      await fetchBlocks().then(async (res) => {
        const blocks = res.data
        const id = defaultValue(route.params.id, false)
        const query = defaultValue(route.query.q, '/')
        data.blocks = blocks
        for (let i in blocks) {
          if (blocks[i].isMain) {
            data.main = blocks[i]
          }
          if (typeof id !== 'undefined' && parseInt(id) === blocks[i].id) {
            data.main = blocks[i]
            break
          }
        }
        // 获取资源
        data.doc = ''
        let list = query.split('/')
        list = list.filter((e) => {
          return e.replace(/(\r\n|\n|\r)/gm, '')
        })
        pathList.value = list
        await fetchList()
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
      router.push({name: 'List', params: {id: data.main.id}, query: {q: pathItemArr.join('/')}})
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
      router.push({name: 'List', params: {id: data.main.id}, query: {q: pathItemArr.join('/')}})
    }
    const more = async () => {
      await fetchItem({
        id: data.main.id,
        path: path.value,
        params: data.meta.nextPageParams,
        password: encryptPassword.value,
      }).then((res) => {
        data.meta = res.data.meta
        data.list = data.list.concat(res.data.list)
      })
    }
    const download = async (name) => {
      let pathItemArr = path.value.split('/')
      pathItemArr.push(name)
      pathItemArr = pathItemArr.filter((e) => {
        return e.replace(/(\r\n|\n|\r)/gm, '')
      })
      let url = pathItemArr.join('/')
      await fetchItem({
        id: data.main.id,
        path: url,
        password: encryptPassword.value,
      }).then((res) => {
        window.open(res.data.item.url, '_blank')
      })
    }
    watch(
      () => route.query.q,
      async (query) => {
        if (defaultValue(query, false) !== false || query === '') {
          await load()
        }
      },
    )
    watch(
      () => route.params.id,
      async (query) => {
        if (defaultValue(query, false) !== false || query === '') {
          await load()
        }
      },
    )
    onMounted(async () => {
      await load()
    })
    return {...toRefs(data), path, pathList, load, go, back, more, download, trim, isEmpty, in_array, fileExtension}
  },
})
</script>
<style scoped>
.mdui-list-item,
.mdui-list-item:hover {
  border-radius: 1rem;
}
</style>
