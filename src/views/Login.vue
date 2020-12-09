<template>
  <div class="mdui-container mdui-m-t-5">
    <div class="mdui-row">
      <div class="mdui-col-md-6 mdui-col-offset-md-3 mdui-p-a-3">
        <div class="mdui-typo">
          <div class="mdui-typo-title-opacity mdui-text-center">
            <i class="mdui-icon material-icons">account_circle</i> 登录
          </div>
        </div>
        <form @submit.prevent="handleUserLogin()">
          <div class="mdui-textfield">
            <i class="mdui-icon material-icons">face</i>
            <label class="mdui-textfield-label" for="name">用户名</label>
            <input id="username" v-model="username" name="username" class="mdui-textfield-input" type="text" required />
            <div class="mdui-textfield-error">用户名不能为空</div>
          </div>
          <div class="mdui-textfield">
            <i class="mdui-icon material-icons">https</i>
            <label class="mdui-textfield-label" for="password">请输入密码</label>
            <input
              id="password"
              v-model="password"
              name="password"
              class="mdui-textfield-input"
              type="password"
              required
            />
            <div class="mdui-textfield-error">密码不能为空</div>
          </div>
          <button type="submit" class="mdui-float-right mdui-btn mdui-ripple mdui-color-theme">
            <i class="mdui-icon material-icons">fingerprint</i>
            登录
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, reactive, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import mdui from 'mdui'
import {setToken} from '/@/utils/auth'
import {login} from '/@/api/user'
import store from '/@/libs/store'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      username: '',
      password: '',
      loading: false,
    })

    const handleUserLogin = async () => {
      data.loading = true
      await login({
        username: data.username,
        password: data.password,
      }).then((res) => {
        data.loading = false
        const status = res.status
        if (!status) {
          mdui.snackbar({
            message: ':( ' + res.msg,
            timeout: 2000,
            position: 'right-top',
          })
        } else {
          store.set('user', res.data)
          setToken(res.data.token)
          router.push({path: '/admin'})
          // 延迟 1 秒显示欢迎信息
          setTimeout(() => {
            mdui.snackbar({
              message: ':) 欢迎回来',
              timeout: 2000,
              position: 'right-top',
            })
          }, 1000)
        }
      })
    }

    return {...toRefs(data), handleUserLogin}
  },
})
</script>
