<template>
  <router-view />
</template>

<script>
import {defineComponent, watchEffect} from 'vue'
import {useRoute, useRouter} from 'vue-router'
export default defineComponent({
  name: 'Layout',
  setup() {
    const router = useRouter()
    const route = useRoute()
    watchEffect(() => {
      console.log(route.path)
      if (route.path.startsWith('/admin')) {
        document.getElementsByTagName('body')[0].classList.add('mdui-drawer-body-left')
      } else {
        document.getElementsByTagName('body')[0].classList.remove('mdui-drawer-body-left')
      }
    })
  },
})
</script>
