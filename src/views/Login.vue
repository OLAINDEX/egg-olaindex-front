<template>
  <div class="mdui-container">
    <div class="mdui-card mdui-shadow-0">
      <div class="mdui-card-content">
        <div class="mdui-col-md-6 mdui-col-offset-md-3">
          <h4 class="mdui-typo-headline-opacity mdui-text-center">登录</h4>
          <form action="" method="post">
            <div class="mdui-textfield mdui-textfield-floating-label">
              <i class="mdui-icon material-icons">face</i>
              <label class="mdui-textfield-label" for="name">用户名</label>
              <input id="username" name="username" class="mdui-textfield-input" type="text" required />
            </div>
            <div class="mdui-textfield mdui-textfield-floating-label">
              <i class="mdui-icon material-icons">https</i>
              <label class="mdui-textfield-label" for="password">请输入密码</label>
              <input id="password" name="password" class="mdui-textfield-input" type="password" required />
            </div>
            <br />
            <button type="submit" class="mdui-center mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme">
              <i class="mdui-icon material-icons">fingerprint</i>
              登录
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
