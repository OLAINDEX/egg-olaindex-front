<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <p class="card-header-title">File List</p>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="table-container">
            <table class="table is-striped is-hoverable">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Size</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colspan="4" class="has-text-centered">返回上一级</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>123</td>
                  <td>2020</td>
                  <td>Download</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>123</td>
                  <td>2020</td>
                  <td>Download</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>123</td>
                  <td>2020</td>
                  <td>Download</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>123</td>
                  <td>2020</td>
                  <td>Download</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>123</td>
                  <td>2020</td>
                  <td>Download</td>
                </tr>
              </tbody>
            </table>
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
    const state = reactive({})

    return {state}
  },
})
</script>
