<template>
  <div class="mdui-container mdui-m-y-5">
    <div class="mdui-row-xs-3 mdui-row-sm-4 mdui-row-md-5 mdui-row-lg-6 mdui-row-xl-7 mdui-grid-list">
      <div class="mdui-col">
        <div class="mdui-grid-tile">
          <img src="https://api.prodless.com/avatar.png" />
        </div>
      </div>
      <div class="mdui-col">
        <div class="mdui-grid-tile">
          <img src="https://api.prodless.com/avatar.png" />
        </div>
      </div>
      <div class="mdui-col">
        <div class="mdui-grid-tile">
          <img src="https://api.prodless.com/avatar.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, reactive, toRefs} from 'vue'
export default defineComponent({
  name: 'Dashboard',
  setup() {
    const data = reactive({})
    return {...toRefs(data)}
  },
})
</script>
