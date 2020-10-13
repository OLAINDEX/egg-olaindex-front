<template>
  <router-view />
</template>

<script>
import {defineComponent, onMounted, watchEffect} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import mdui from 'mdui'
import {check} from '/@/api/init'
import store from '/@/libs/store'
export default defineComponent({
  name: 'Layout',
  setup() {
    const router = useRouter()
    const route = useRoute()
    watchEffect(() => {
      if (route.path.startsWith('/admin')) {
        document.getElementsByTagName('body')[0].classList.add('mdui-drawer-body-left')
      } else {
        document.getElementsByTagName('body')[0].classList.remove('mdui-drawer-body-left')
      }
    })
    onMounted(() => {
      let install = store.get('install')
      if (install) {
        return
      }
      check().then((res) => {
        install = res.data.install
        store.set('install', install)
        if (!install) {
          mdui.dialog({
            title: '安装提示',
            content: '未进行初始化，点击初始化',
            history: false,
            buttons: [
              {
                text: '初始化',
                onClick: function () {
                  router.push({path: '/install'})
                },
              },
            ],
          })
        }
      })
    })
  },
})
</script>
