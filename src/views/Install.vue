<template>
  <div class="mdui-container">
    <div class="mdui-row">
      <div class="mdui-col-md-6 mdui-col-offset-md-3">
        <div class="mdui-typo">
          <h1>
            应用安装
            <small>后台用户创建</small>
          </h1>
        </div>

        <div class="mdui-typo">
          <h4 class="doc-article-title">输入<code>账号</code>和<code>密码</code></h4>
        </div>

        <form @submit.prevent="handleSubmit()">
          <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">account_circle</i>
            <label class="mdui-textfield-label" for="username">账号</label>
            <input v-model="username" type="text" class="mdui-textfield-input" name="username" required />
            <div class="mdui-textfield-error">账号不能为空</div>
          </div>
          <br />
          <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">https</i>
            <label class="mdui-textfield-label" for="password">密码</label>
            <input v-model="password" type="password" class="mdui-textfield-input" name="password" required />
            <div class="mdui-textfield-error">密码不能为空</div>
          </div>
          <br />

          <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">https</i>
            <label class="mdui-textfield-label" for="password_confirmation">确认密码</label>
            <input
              v-model="password_confirmation"
              type="password"
              name="password_confirmation"
              class="mdui-textfield-input"
              required
            />
          </div>
          <br />
          <button class="mdui-btn mdui-color-theme-accent mdui-ripple mdui-float-right" type="submit">下一步</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, reactive, toRefs, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {init} from '/@/api/init'
import mdui from 'mdui'
export default defineComponent({
  name: 'Install',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      username: '',
      password: '',
      password_confirmation: '',
    })
    const handleSubmit = async () => {
      if (data.password != data.password_confirmation) {
        mdui.snackbar({
          message: ':( 两次密码不一致哦！',
          timeout: 2000,
          position: 'right-top',
        })
        return false
      }
      await init({username: data.username, password: data.password}).then((res) => {
        const status = res.status
        if (!status) {
          mdui.snackbar({
            message: res.msg,
            timeout: 2000,
            position: 'right-top',
          })
        } else {
          setTimeout(() => {
            mdui.snackbar({
              message: ':) 初始化成功！',
              timeout: 2000,
              position: 'right-top',
            })
          }, 1000)
          router.push({name: 'Login'})
        }
      })
    }
    onMounted(() => {
      mdui.mutation()
    })
    return {...toRefs(data), handleSubmit}
  },
})
</script>
