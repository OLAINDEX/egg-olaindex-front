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
              <form @submit="login">
                <div class="field">
                  <label class="label">用户名</label>
                  <div class="control">
                    <input
                      v-model="state.form.username"
                      class="input"
                      type="text"
                      placeholder="用户名"
                      required
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">密码</label>
                  <div class="control">
                    <input
                      v-model="state.form.password"
                      class="input"
                      type="password"
                      placeholder="密码"
                      required
                    />
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link">登录</button>
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
import {reactive, defineComponent} from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      form: {
        username: '',
        password: '',
      },
    })
    const login = (e) => {
      e.preventDefault()
      console.log(state.form)
    }
    return {state, login}
  },
})
</script>
