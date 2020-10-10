<template>
  <div class="mdui-container">
    <div class="mdui-typo">
      <h1>
        应用安装
        <small>应用ID和密钥</small>
      </h1>
    </div>

    <div class="mdui-typo">
      <h4 class="doc-article-title">填入<code>client_id</code>和<code>client_secret</code></h4>
    </div>

    <form>
      <label for="account_type" class="mdui-textfield-label"
        ><i class="mdui-icon material-icons">info</i>&nbsp; &nbsp;账户类型</label
      >
      <select id="account_type" name="account_type" class="mdui-select" mdui-select="{position: 'bottom'}">
        <option value="">选择账户类型</option>
        <option value="cn">国内版（世纪互联）</option>
        <option value="com" selected>国际版</option>
      </select>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <i class="mdui-icon material-icons">https</i>
        <label class="mdui-textfield-label" for="client_secret">应用 机密(client secret)</label>
        <input id="client_secret" type="text" class="mdui-textfield-input" name="client_secret" required value="" />
        <div class="mdui-textfield-error">应用机密不能为空</div>
      </div>
      <br />
      <div class="mdui-textfield mdui-textfield-floating-label">
        <i class="mdui-icon material-icons">apps</i>
        <label class="mdui-textfield-label" for="client_id">应用 ID(client_id)</label>
        <input id="client_id" type="text" class="mdui-textfield-input" name="client_id" required value="" />
        <div class="mdui-textfield-error">应用 ID不能为空</div>
      </div>
      <br />

      <div class="mdui-textfield mdui-textfield-floating-label">
        <i class="mdui-icon material-icons">link</i>
        <label class="mdui-textfield-label" for="redirect_uri">回调地址(redirect_uri)</label>
        <input
          id="redirect_uri"
          type="text"
          name="redirect_uri"
          class="mdui-textfield-input"
          value="https://olaindex.ningkai.wang"
          required
        />
        <div class="mdui-textfield-error">
          回调地址不能为空,确保回调地址格式为此形式
          http(s)://you.domain/oauth，使用中转域名无需https协议（注意：如果通过CDN开启HTTPS而非配置SSL证书，部分回调CDN会跳转http地址，从而导致申请失败）
        </div>
      </div>
      <br />
      <button class="mdui-btn mdui-color-theme-accent mdui-ripple mdui-float-right" type="submit">下一步</button>
    </form>
  </div>
</template>
<script>
import {defineComponent, reactive, toRefs, onMounted} from 'vue'
import mdui from 'mdui'
export default defineComponent({
  name: 'Install',
  setup() {
    const data = reactive({})
    onMounted(() => {
      mdui.mutation()
    })
    return {...toRefs(data)}
  },
})
</script>
