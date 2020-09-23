<template>
  <div class="box container">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="javascript:void(0)" @click="goBack(0)">
            <span class="icon is-small">
              <i class="fas fa-home" aria-hidden="true"></i>
            </span>
            Home
          </a>
        </li>
        <li v-for="pathItem in pathItems" :key="pathItem.index" :class="{'is-active': pathItems.slice(-1) == pathItem}">
          <a href="javascript:void(0)" @click="goBack(pathItem)">{{ pathItem }}</a>
        </li>
      </ul>
    </nav>
    <div class="table-container">
      <table class="table is-hoverable is-fullwidth is-completely-borderless">
        <thead>
          <tr>
            <th>文件</th>
            <th class="is-hidden-mobile">大小</th>
            <th class="is-hidden-mobile">时间</th>
            <th>更多</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colspan="4" class="has-text-grey-light" @click="refreshPage()">
              <span class="icon is-medium">
                <i class="fas fa-sync" :class="{'fa-spin': loading}" aria-hidden="true"></i>
              </span>
              刷新
            </td>
          </tr>
          <tr v-if="path !== '/'">
            <td colspan="4" class="has-text-grey-light" @click="goBack()">
              <span class="icon is-medium">
                <i class="fas fa-arrow-left" aria-hidden="true"></i>
              </span>
              返回上一级
            </td>
          </tr>

          <tr v-for="item in list" :key="item.index" @click="goTarget(item.name, item.type)">
            <td>
              <span class="icon is-small">
                <i
                  class="fas"
                  :class="{'fa-folder': item.type === 1, 'fa-file': item.type === 0}"
                  aria-hidden="true"
                ></i>
              </span>
              {{ item.name }}
            </td>
            <td class="is-hidden-mobile">{{ item.size }}</td>
            <td class="is-hidden-mobile">{{ item.time }}</td>
            <td>-</td>
          </tr>
          <tr>
            <td colspan="4">{{ item.childCount }} 个项目 {{ item.size }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="readme" class="box container">
    <p class="title is-6"><i class="fab fa-readme" aria-hidden="true"></i> README</p>
    <div class="columns">
      <div class="column markdown-body" v-html="readme"></div>
    </div>
  </div>
</template>
<script>
import 'github-markdown-css/github-markdown.css'
import {defineComponent, reactive, computed, watch, watchEffect, ref, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import share from '../api/share'
import {defaultValue, trim} from '../utils/index'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      loading: false,
      list: [],
      item: [],
      readme: '',
    })
    const path = computed(() => defaultValue(route.query.query, '/'))
    const pathItems = ref([])
    const fetchItem = () => {
      state.loading = true
      setTimeout(() => {
        share
          .fetchItem({
            params: {
              path: path.value,
            },
          })
          .then((res) => {
            state.list = res.data.list
            state.item = res.data.item
            state.loading = false
          })
      }, 500)
    }
    const fetchReadMe = () => {
      let pathItemArr = path.value.split('/')
      let readme = pathItemArr.concat(['README.md'])
      let doc = trim(readme.join('/'), '/')
      share
        .fetchItem({
          params: {
            path: doc,
            preview: true,
          },
        })
        .then((res) => {
          state.readme = res
        })
    }
    const refreshPage = () => {
      fetchItem()
      state.readme = ''
      fetchReadMe()
    }
    const goTarget = (name, type) => {
      if (type === 1) {
        // 非文件跳转
        let pathItemArr = path.value.split('/')
        pathItemArr.push(name)
        pathItemArr = pathItemArr.filter((e) => {
          return e.replace(/(\r\n|\n|\r)/gm, '')
        })
        router.push({name: 'file-list', query: {query: pathItemArr.join('/')}})
      }
    }
    const goBack = (name) => {
      let pathItemArr = path.value.split('/')
      if (typeof name === 'undefined') {
        pathItemArr.pop()
      } else if (name === 0) {
        pathItemArr = []
      } else {
        let index = pathItemArr.indexOf(name)
        pathItemArr = pathItemArr.slice(0, index + 1)
      }
      router.push({name: 'file-list', query: {query: pathItemArr.join('/')}})
    }
    watch(
      () => route.query.query,
      (query, prevQuery) => {
        query = defaultValue(query, '/')
        refreshPage()
      },
    )
    watchEffect(() => {
      const query = defaultValue(route.query.query, '/')
      let arr = query.split('/')
      arr = arr.filter((e) => {
        return e.replace(/(\r\n|\n|\r)/gm, '')
      })
      pathItems.value = arr
      console.log('req_query:', query)
      console.log('req_path:', path.value)
      console.log('req_arr:', pathItems.value)
      refreshPage()
    })
    return {...toRefs(state), path, pathItems, refreshPage, goTarget, goBack}
  },
})
</script>
