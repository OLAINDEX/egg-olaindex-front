<template>
  <div class="mdui-container mdui-m-t-5">
    <div class="mdui-typo mdui-text-center">
      <div class="mdui-typo-title">图床</div>
      <div class="mdui-typo-Subheading-opacity">您可以尝试文件拖拽或者点击虚线框进行文件上传，单张图片最大支持4MB.</div>
      <div ref="uploader"><input type="file" name="filepond" class="filepond" /></div>
    </div>
  </div>
</template>
<script>
import {defineComponent, reactive, ref, toRefs, onMounted} from 'vue'
import * as FilePond from 'filepond'
import 'filepond/dist/filepond.css'
import zh_cn from 'filepond/locale/zh-cn.js'
import Clipboard from 'clipboard'
export default defineComponent({
  name: 'Image',
  setup() {
    const data = reactive({
      uploading: false,
      finished: false,
      list: [],
    })
    const uploader = ref()
    const filepond = ref()
    const formatSize = (size) => {
      if (typeof size !== 'number') size = NaN
      let count = 0
      while (size >= 1024) {
        size /= 1024
        count++
      }
      size = size.toFixed(2)
      size += [' B', ' KB', ' MB', ' GB', ' TB'][count]
      return size
    }
    const copy = () => {
      const clipboard = new Clipboard('.clipboard')
      clipboard.on('success', (e) => {
        console.log('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        console.error('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    }
    const initPond = async () => {
      FilePond.setOptions(zh_cn)
      const pond_options = {
        credits: false,
        allowRevert: false,
        allowMultiple: true,
        server: {
          process: null,
          fetch: null,
          revert: null,
        },
      }
      const pond = FilePond.create(uploader.value, pond_options)
      filepond.value = pond
    }
    onMounted(async () => {
      await initPond()
    })
    return {...toRefs(data), uploader}
  },
})
</script>
