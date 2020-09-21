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
        <li
          v-for="pathItem in pathArr"
          :key="pathItem.index"
          :class="{'is-active': pathArr.slice(-1) == pathItem}"
        >
          <a href="javascript:void(0)" @click="goBack(pathItem)">{{ pathItem }}</a>
        </li>
      </ul>
    </nav>
    <div class="table-container">
      <table class="table is-hoverable is-fullwidth is-completely-borderless">
        <thead>
          <tr>
            <th>文件</th>
            <th>大小</th>
            <th>时间</th>
            <th>更多</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colspan="4" class="has-text-grey-light" @click="fetchItem()">
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
            <td>{{ item.size }}</td>
            <td>{{ item.time }}</td>
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
    <p class="title is-6">
      <i class="fab fa-readme" aria-hidden="true"></i> README
    </p>
    <div class="columns">
      <div class="column markdown-body" v-html="readme"></div>
    </div>
  </div>
</template>
<script>
import 'github-markdown-css/github-markdown.css'
import {defineComponent, reactive, computed, watchEffect, toRefs} from 'vue'
import share from '../api/share'
import {trim} from '../utils/index'

export default defineComponent({
  setup() {
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
    const goTarget = (name, type) => {
      if (type === 1) {
        state.pathArr.push(name)
        state.pathArr = state.pathArr.filter((e) => {
          return e.replace(/(\r\n|\n|\r)/gm, '')
        })
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
    }
    watchEffect(() => {
      // watch 副作用函数 首次加载会触发,当值发生变化也会触发
      console.log('req_path:', path.value)
      console.log('req_arr:', state.pathArr)
      fetchItem()
      state.readme = ''
      fetchReadMe()
    })
    return {...toRefs(state), path, fetchItem, goBack, goTarget}
  },
})
</script>
