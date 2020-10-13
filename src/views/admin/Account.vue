<template>
  <div class="mdui-container mdui-m-y-5">
    <div class="mdui-m-y-3">
      <button
        class="mdui-btn mdui-ripple mdui-color-theme-accent"
        mdui-dialog="{target: '#accountDialog', history: false}"
      >
        <i class="mdui-icon material-icons">add</i> 新建账号
      </button>
    </div>
    <div class="mdui-table-fluid">
      <table class="mdui-table mdui-table-hoverables">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td></td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="accountDialog" class="mdui-dialog">
      <div class="mdui-dialog-title">新建账号</div>
      <div class="mdui-dialog-content mdui-container">
        <form>
          <select v-model="type" class="mdui-select" mdui-select="{position: 'bottom'}">
            <option value="0">分享链接（无API）</option>
            <option value="1">世纪互联</option>
            <option value="2">通用版</option>
          </select>
          <div v-show="type >= 1" class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">apps</i>
            <label class="mdui-textfield-label" for="client_id">client_id</label>
            <input v-model="client_id" type="text" class="mdui-textfield-input" name="client_id" />
            <div class="mdui-textfield-error">账号不能为空</div>
          </div>
          <br />
          <div v-show="type >= 1" class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">https</i>
            <label class="mdui-textfield-label" for="client_secret">client_secret</label>
            <input v-model="client_secret" type="text" class="mdui-textfield-input" name="client_secret" />
            <div class="mdui-textfield-error">密码不能为空</div>
          </div>
          <br />
          <div v-show="type >= 1" class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">link</i>
            <label class="mdui-textfield-label" for="redirect_uri">redirect_uri</label>
            <input v-model="redirect_uri" type="text" name="redirect_uri" class="mdui-textfield-input" />
          </div>
          <br />
          <div v-show="type < 1" class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">link</i>
            <label class="mdui-textfield-label" for="redirect_uri">share_uri</label>
            <input v-model="share_uri" type="text" name="share_uri" class="mdui-textfield-input" />
          </div>
        </form>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>关闭</button>
        <button class="mdui-btn mdui-ripple" @click="handleSubmit()">提交认证</button>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, reactive, onMounted, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import mdui from 'mdui'
export default defineComponent({
  name: 'Account',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      type: '1',
      client_id: '',
      client_secret: '',
      redirect_uri: '',
      share_uri: '',
    })
    const handleSubmit = () => {}
    onMounted(() => {
      mdui.mutation()
      console.log(window.location.href)
    })
    return {...toRefs(data)}
  },
})
</script>
