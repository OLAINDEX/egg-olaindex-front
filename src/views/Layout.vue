<template>
  <nav class="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <span class="is-size-5">LA-24</span>
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          :class="{ 'is-active': state.isActive}"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarItems"
          @click="toggleActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarItems" class="navbar-menu" :class="{ 'is-active': state.isActive}">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/list" class="navbar-item">List</router-link>
        </div>
      </div>
    </div>
  </nav>

  <section class="section">
    <router-view />
  </section>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Powered</strong> by
        <a href="https://imwnk.cm">IMWNK</a>.
      </p>
    </div>
  </footer>
</template>
<script>
import {reactive, defineComponent} from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      isActive: false,
    })
    const toggleActive = () => {
      state.isActive = !state.isActive
    }
    return {state, toggleActive}
  },
})
</script>
