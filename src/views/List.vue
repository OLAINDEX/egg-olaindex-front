<template>
  <div class="box container">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#">
            <span class="icon is-small">
              <i class="fas fa-home" aria-hidden="true"></i>
            </span>
            Home
          </a>
        </li>
        <li>
          <a href="#">Documentation</a>
        </li>
        <li>
          <a href="#">Components</a>
        </li>
        <li class="is-active">
          <a href="#" aria-current="page">Breadcrumb</a>
        </li>
      </ul>
    </nav>
    <div class="table-container">
      <table class="table is-hoverable is-fullwidth is-completely-borderless">
        <thead>
          <tr>
            <th>FILE</th>
            <th>SIZE</th>
            <th>DATE</th>
            <th>MORE</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colspan="4" class="has-text-grey-light" @click="fetchItem()">
              <span class="icon is-medium">
                <i class="fas fa-sync" :class="{'fa-spin':loading}" aria-hidden="true"></i>
              </span>
              刷新列表
            </td>
          </tr>
          <tr>
            <td colspan="4" class="has-text-grey-light" @click="goBack()">
              <span class="icon is-medium">
                <i class="fas fa-arrow-left" aria-hidden="true"></i>
              </span>
              返回上一级
            </td>
          </tr>

          <tr v-for="item in list" :key="item.name" @click="goTarget(item.name)">
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
            <td colspan="4">5 个项目 123 MB</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import {reactive, toRefs, watchEffect, defineComponent} from 'vue'
import share from '../api/share'
import {trim} from '../utils/index'
export default defineComponent({
  setup() {
    const state = reactive({
      path: '/',
      loading: false,
      list: [],
    })
    const fetchItem = () => {
      state.loading = true
      share
        .fetchItem({
          params: {
            path: state.path,
          },
        })
        .then((res) => {
          state.list = res.data.list
          state.loading = false
        })
    }
    const goTarget = (name) => {
      let arr = state.path.split('/')
      arr.push(name)
      state.path = trim(arr.join('/'), '/')
    }
    const goBack = () => {
      let arr = state.path.split('/')
      arr.pop()
      state.path = trim(arr.join('/'), '/')
    }
    watchEffect(() => {
      // watch 副作用函数 首次加载会触发,当值发生变化也会触发
      console.log('watch', state.path)
      fetchItem()
    })

    return {...toRefs(state), fetchItem, goBack, goTarget}
  },
})
</script>
