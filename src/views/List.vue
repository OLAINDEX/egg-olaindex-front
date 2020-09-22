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
        <li v-for="pathItem in pathArr" :key="pathItem.index" :class="{'is-active': pathArr.slice(-1) == pathItem}">
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
          <tr v-if="path">
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
import {defineComponent, reactive, computed, watch, watchEffect, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import share from '../api/share'
import {defaultValue, trim} from '../utils/index'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      pathArr: [],
      loading: false,
      list: [],
      item: [],
      readme: '',
    })
    const path = computed(() => trim(state.pathArr.join('/'), '/'))

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
      }, 1000)
    }
    const fetchReadMe = () => {
      let readme = state.pathArr.concat(['README.md'])
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
        state.pathArr.push(name)
        state.pathArr = state.pathArr.filter((e) => {
          return e.replace(/(\r\n|\n|\r)/gm, '')
        })
        console.log(path.value)
        router.push({name: 'query', params: {query: path.value}})
      }
    }
    const goBack = (name) => {
      if (typeof name === 'undefined') {
        state.pathArr.pop()
      } else if (name === 0) {
        state.pathArr = []
      } else {
        let index = state.pathArr.indexOf(name)
        state.pathArr = state.pathArr.slice(0, index + 1)
      }
      router.push({name: 'query', params: {query: path.value}})
    }
    watch(
      () => route.params.query,
      (query, prevQuery) => {
        query = defaultValue(query, [])
        console.log('watch:', query)
        state.pathArr = query
      },
    )
    watchEffect(() => {
      // watch 副作用函数 首次加载会触发,当值发生变化也会触发
      const query = defaultValue(route.params.query, [])
      console.log('watchEffect:', query)
      state.pathArr = query
      console.log('req_path:', path.value)
      console.log('req_arr:', state.pathArr)
      refreshPage()
    })

    return {...toRefs(state), path, refreshPage, goBack, goTarget}
  },
})
</script>
