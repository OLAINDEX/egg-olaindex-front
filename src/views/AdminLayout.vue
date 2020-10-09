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
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
        <div class="mdui-list-item-content">Home</div>
      </li>

      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">dashboard</i>
        <div class="mdui-list-item-content">Dashboard</div>
      </li>

      <li class="mdui-collapse-item mdui-collapse-item-open">
        <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">people</i>
          <div class="mdui-list-item-content">Audience</div>
          <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
        </div>
        <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
          <li class="mdui-list-item mdui-ripple">Overview</li>
          <li class="mdui-list-item mdui-ripple">Language</li>
          <li class="mdui-list-item mdui-ripple">Location</li>
          <li class="mdui-list-item mdui-ripple">New vs Returning</li>
        </ul>
      </li>

      <li class="mdui-collapse-item">
        <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">device_hub</i>
          <div class="mdui-list-item-content">Acquisition</div>
          <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
        </div>
        <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
          <li class="mdui-list-item mdui-ripple">Overview</li>
          <li class="mdui-list-item mdui-ripple">All Traffic</li>
          <li class="mdui-list-item mdui-ripple">Direct Traffic</li>
          <li class="mdui-list-item mdui-ripple">Search Overview</li>
        </ul>
      </li>
    </ul>
  </div>
  <a id="anchor-top"></a>
  <router-view />
</template>
<script>
import {defineComponent, reactive, onMounted, toRefs} from 'vue'
import mdui from 'mdui'
export default defineComponent({
  name: 'Admin',
  setup() {
    const data = reactive({})
    onMounted(() => {
      document.getElementsByTagName('body')[0].classList.add('mdui-drawer-body-left')
      mdui.mutation()
    })
    return {...toRefs(data)}
  },
})
</script>
