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
            <td colspan="4" class="has-text-grey-light" @click="refresh">
              <span class="icon is-medium">
                <i class="fas fa-sync" aria-hidden="true"></i>
              </span>
              刷新列表
            </td>
          </tr>
          <tr>
            <td colspan="4" class="has-text-grey-light" @click="goBack">
              <span class="icon is-medium">
                <i class="fas fa-arrow-left" aria-hidden="true"></i>
              </span>
              返回上一级
            </td>
          </tr>

          <tr v-for="item in state.list" :key="item.name">
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
import {reactive, defineComponent} from 'vue'
import share from '../api/share'
export default defineComponent({
  setup() {
    const state = reactive({
      list: [],
    })
    const refresh = () => {
      share
        .list({
          params: {
            path: '/Share',
          },
        })
        .then((res) => {
          state.list = res.data.list
        })
    }
    const goBack = () => {}
    refresh()

    return {state, refresh, goBack}
  },
})
</script>
