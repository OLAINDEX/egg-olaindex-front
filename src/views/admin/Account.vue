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
            <th>备注</th>
            <th>类型</th>
            <th>过期时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <input v-model="item.remark" class="mdui-textfield-input" type="text" @change="handleRemark(item)" />
            </td>
            <td>{{ accountType(item.type) }}</td>
            <td>{{ item.expires_on ? new Date(item.expires_on * 1000).toLocaleString() : '-' }}</td>
            <td>
              <router-link
                :to="{name: 'AccountSetting', params: {id: item.id}}"
                class="mdui-btn mdui-ripple mdui-btn-dense mdui-color-indigo"
                >管理</router-link
              >
              <button class="mdui-btn mdui-ripple mdui-btn-dense mdui-color-theme-accent" @click="handleDelete(item)">
                删除
              </button>
              <button
                v-if="!item.isMain"
                class="mdui-btn mdui-ripple mdui-btn-dense mdui-color-blue-600"
                @click="handleSetMain(item)"
              >
                设为默认
              </button>
            </td>
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
          <div class="mdui-textfield mdui-textfield-floating-label">
            <i class="mdui-icon material-icons">flag</i>
            <label class="mdui-textfield-label" for="remark">账号标识</label>
            <input v-model="remark" type="text" class="mdui-textfield-input" name="remark" />
            <div class="mdui-textfield-error">账号不能为空</div>
          </div>
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
            <label class="mdui-textfield-label" for="share_uri">share_uri</label>
            <input v-model="share_uri" type="text" name="share_uri" class="mdui-textfield-input" />
          </div>
        </form>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>关闭</button>
        <button class="mdui-btn mdui-ripple" mdui-dialog-confirm @click="handleSubmit()">提交认证</button>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, reactive, onMounted, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import mdui from 'mdui'
import {init, fetchList, remove, update, setMain} from '/@/api/account'
export default defineComponent({
  name: 'Account',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      list: [],
      remark: '',
      type: '1',
      client_id: '',
      client_secret: '',
      redirect_uri: '',
      share_uri: '',
    })
    const accountType = (type) => {
      const map = {
        0: '分享版',
        1: '世纪互联',
        2: '通用版',
      }
      return map[type]
    }
    const fetchAccounts = async () => {
      await fetchList().then((res) => {
        data.list = res.data
      })
    }
    const handleSubmit = async () => {
      const current_uri = window.location.href
      await init({
        remark: data.remark,
        type: parseInt(data.type),
        client_id: data.client_id,
        client_secret: data.client_secret,
        redirect_uri: data.redirect_uri,
        share_uri: data.share_uri,
        origin_uri: current_uri,
      }).then(async (res) => {
        if (res.status) {
          if (parseInt(data.type) > 0) {
            window.location.href = res.data.redirect_uri
          } else {
            await fetchAccounts()
            data.client_id = ''
            data.client_secret = ''
            data.redirect_uri = ''
            data.share_uri = ''
            data.remark = ''
          }
        }
      })
    }
    const handleDelete = async (item) => {
      mdui.confirm(
        '确认删除吗？',
        '提示',
        async function () {
          await remove({id: item.id}).then(async (res) => {
            await fetchAccounts()
            mdui.snackbar({
              message: ':) 操作成功！',
              timeout: 2000,
              position: 'right-top',
            })
          })
        },
        function () {
          return
        },
      )
    }
    const handleRemark = async (item) => {
      await update({id: item.id, remark: item.remark}).then((res) => {
        mdui.snackbar({
          message: ':) 操作成功！',
          timeout: 2000,
          position: 'right-top',
        })
      })
    }
    const handleSetMain = async (item) => {
      await setMain({id: item.id}).then((res) => {
        fetchAccounts()
        mdui.snackbar({
          message: ':) 操作成功！',
          timeout: 2000,
          position: 'right-top',
        })
      })
    }
    onMounted(async () => {
      await fetchAccounts()
      mdui.mutation()
    })
    return {...toRefs(data), handleSubmit, handleDelete, handleRemark, handleSetMain, fetchAccounts, accountType}
  },
})
</script>
