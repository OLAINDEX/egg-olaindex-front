<template>
  <div class="box container">
    <p class="title is-6"><i class="fab fa-readme" aria-hidden="true"></i> README</p>
    <div class="columns">
      <div class="column">文件名：</div>
      <div class="column">大小：</div>
      <div class="column">最后修改时间：</div>
    </div>
    <div class="columns">
      <div class="column preview-body"></div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      item: [],
    })
    return {...toRefs(state)}
  },
})
</script>
