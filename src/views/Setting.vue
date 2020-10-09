<template>
  <div class="mdui-container mdui-m-y-5">
    <div class="mdui-typo">
      <h1>基本设置</h1>
    </div>
    <form>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="name">站点名称</label>
        <input id="name" v-model="config.name" type="text" class="mdui-textfield-input" name="name" />
      </div>
      <br />
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="expires">缓存时间(秒)</label>
        <input id="expires" v-model="config.expires" type="text" class="mdui-textfield-input" name="expires" />
        <div class="mdui-textfield-helper">建议缓存时间小于60分钟，否则会导致缓存失效</div>
      </div>
      <button class="mdui-btn mdui-color-theme-accent mdui-ripple mdui-float-right" type="submit">
        <i class="mdui-icon material-icons">check</i> 保存
      </button>
    </form>
  </div>
</template>
<script>
import {defineComponent, reactive, onMounted, toRefs} from 'vue'
import mdui from 'mdui'
export default defineComponent({
  name: 'Setting',
  setup() {
    const data = reactive({
      config: [],
    })
    onMounted(() => {
      mdui.mutation()
    })
    return {...toRefs(data)}
  },
})
</script>
