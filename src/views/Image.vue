<template>
  <div class="mdui-container mdui-m-t-5">
    <div class="mdui-typo mdui-text-center">
      <div class="mdui-typo-title">图床</div>
      <div class="mdui-typo-Subheading-opacity">您可以尝试文件拖拽或者点击虚线框进行文件上传，单张图片最大支持4MB.</div>
    </div>
  </div>
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
