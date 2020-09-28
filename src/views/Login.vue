<template>
  <div class="columns is-centered">
    <div class="column is-one-third">
      <div class="container">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">登录</p>
          </div>
          <div class="card-content">
            <div class="content">
              <form @submit="handleUserLogin">
                <div class="field">
                  <label class="label">用户名</label>
                  <div class="control">
                    <input v-model="form.username" class="input" type="text" placeholder="用户名" required />
                  </div>
                </div>
                <div class="field">
                  <label class="label">密码</label>
                  <div class="control">
                    <input v-model="form.password" class="input" type="password" placeholder="密码" required />
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" :class="{'is-loading': loading}">登录</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, reactive, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {toast} from 'bulma-toast'
import {setToken} from '../utils/auth'
import {login} from '../api/user'
import Storage from '../libs/store'
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      form: {
        username: '',
        password: '',
      },
      loading: false,
    })
    const handleUserLogin = async (e) => {
      e.preventDefault()
      state.loading = true
      await login(state.form).then((res) => {
        state.loading = false
        const data = res.data
        const status = res.status
        if (!status) {
          toast({
            message: res.msg,
            type: 'is-danger',
            dismissible: true,
          })
        } else {
          Storage.set('user', data)
          setToken(data.token)
          router.push({path: '/'})
          // 延迟 1 秒显示欢迎信息
          setTimeout(() => {
            toast({
              message: '欢迎回来',
              type: 'is-success',
              dismissible: true,
            })
          }, 1000)
        }
      })
    }
    return {...toRefs(state), handleUserLogin}
  },
})
</script>
