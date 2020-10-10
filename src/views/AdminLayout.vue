<template>
  <header class="mdui-appbar mdui-appbar-fixed">
    <div class="mdui-toolbar mdui-color-theme">
      <span
        class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"
        mdui-drawer="{target: '#main-drawer', swipe: true}"
        ><i class="mdui-icon material-icons">menu</i></span
      >
      <a href="javascript:void(0)" target="_blank" class="mdui-typo-headline mdui-hidden-xs">24KB</a>
      <div class="mdui-toolbar-spacer"></div>
      <router-link to="/" class="mdui-btn mdui-btn-icon">
        <i class="mdui-icon material-icons">home</i>
      </router-link>
      <a href="javascript:void(0)" class="mdui-btn mdui-btn-icon">
        <i class="mdui-icon material-icons">face</i>
      </a>
      <a href="javascript:void(0)" class="mdui-btn mdui-btn-icon"
        ><i class="mdui-icon material-icons">exit_to_app</i></a
      >
    </div>
  </header>
  <div id="main-drawer" class="mdui-drawer">
    <ul class="mdui-list" mdui-collapse="{accordion: true}">
      <router-link
        :to="{name: 'Dashboard'}"
        tag="li"
        exact-active-class="mdui-list-item-active"
        class="mdui-list-item mdui-ripple"
        exact
      >
        <i class="mdui-list-item-icon mdui-icon material-icons">dashboard</i>
        <div class="mdui-list-item-content">控制台</div>
      </router-link>
      <li class="mdui-collapse-item" :class="{'mdui-collapse-item-open': isSettingRoute()}">
        <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">settings</i>
          <div class="mdui-list-item-content">设置</div>
          <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
        </div>
        <ul class="mdui-collapse-item-body mdui-list mdui-list-dense" :style="{height: isSettingRoute() ? 'auto' : 0}">
          <router-link
            :to="{name: 'Setting'}"
            tag="li"
            exact
            exact-active-class="mdui-list-item-active"
            class="mdui-list-item mdui-ripple"
            >基础设置</router-link
          >
        </ul>
      </li>
      <li class="mdui-collapse-item">
        <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">face</i>
          <div class="mdui-list-item-content">账号管理</div>
          <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
        </div>
        <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
          <li class="mdui-list-item mdui-ripple">新增账号</li>
        </ul>
      </li>
    </ul>
  </div>
  <a id="anchor-top"></a>
  <router-view />
</template>
<script>
import {defineComponent, reactive, onBeforeMount, onMounted, watch, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import mdui from 'mdui'
import {in_array} from '../utils'
export default defineComponent({
  name: 'Admin',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({})
    const isSettingRoute = () => {
      return in_array(route.name, ['Setting'], false)
    }
    onBeforeMount(() => {
      document.getElementsByTagName('body')[0].classList.add('mdui-drawer-body-left')
    })
    onMounted(() => {
      mdui.mutation()
    })
    watch(
      () => route.name,
      (query) => {
        console.log('watch:', in_array(route.name, ['Setting'], false))
        mdui.mutation()
      },
    )
    return {...toRefs(data), isSettingRoute}
  },
})
</script>
