<template>
  <div class="mdui-container mdui-m-y-5">
    <div class="mdui-typo">
      <h1>控制台</h1>
    </div>
  </div>
</template>
<script>
import {defineComponent, reactive, toRefs} from 'vue'
export default defineComponent({
  name: 'Dashboard',
  setup() {
    const data = reactive({})
    return {...toRefs(data)}
  },
})
</script>
