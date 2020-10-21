<template>
  <div class="mdui-container mdui-m-y-5">
    <div class="mdui-typo">
      <h1>基本设置</h1>
    </div>
    <form @submit.prevent="handleSubmit()">
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
import {fetchSetting, updateSetting} from '/@/api/setting'
import store from '/@/libs/store'
export default defineComponent({
  name: 'Setting',
  setup() {
    const data = reactive({
      config: {
        expires: 1800,
      },
    })
    const handleSubmit = async () => {
      await updateSetting({
        config: data.config,
      }).then((res) => {
        if (res.status) {
          mdui.snackbar({
            message: ':) 修改成功',
            timeout: 2000,
            position: 'right-top',
          })
          store.set('app', res.data)
        }
      })
      mdui.updateTextFields()
    }
    onMounted(async () => {
      await fetchSetting().then((res) => {
        data.config = res.data
      })
      mdui.mutation()
    })
    return {...toRefs(data), handleSubmit}
  },
})
</script>
