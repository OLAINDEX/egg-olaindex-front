<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': state.isActive}"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': state.isActive}">
      <div class="navbar-start">
        <a class="navbar-item">Home</a>

        <a class="navbar-item">Documentation</a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            <a class="navbar-item">About</a>
            <a class="navbar-item">Jobs</a>
            <a class="navbar-item">Contact</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
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
