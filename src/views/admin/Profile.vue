<template>
  <div class="mdui-container mdui-m-y-5">
    <div class="mdui-typo">
      <h1>用户信息</h1>
    </div>
    <form @submit.prevent="handleSubmit()">
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="username">用户名</label>
        <input id="username" v-model="user.username" type="text" class="mdui-textfield-input" name="username" />
      </div>
      <br />
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="password">请输入密码</label>
        <input id="password" v-model="user.password" type="password" class="mdui-textfield-input" name="password" />
      </div>
      <br />
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label" for="password_confirmation">请再次输入密码</label>
        <input
          id="password_confirmation"
          v-model="user.password_confirmation"
          type="password"
          class="mdui-textfield-input"
          name="password_confirmation"
        />
      </div>
      <br />

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
import {getInfo, updateInfo} from '/@/api/user'
import store from '/@/libs/store'
export default defineComponent({
  name: 'Setting',
  setup() {
    const data = reactive({
      user: {
        username: '',
      },
    })
    const handleSubmit = async () => {
      mdui.updateTextFields()
    }
    onMounted(async () => {
      await getInfo().then(() => {})
      mdui.mutation()
    })
    return {...toRefs(data), handleSubmit}
  },
})
</script>
