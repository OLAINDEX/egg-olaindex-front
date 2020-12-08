<template>
  <div class="mdui-container mdui-m-y-5"></div>
</template>
<script>
import {defineComponent, reactive, toRefs} from 'vue'
export default defineComponent({
  name: 'Image',
  setup() {
    const data = reactive({})
    return {...toRefs(data)}
  },
})
</script>
