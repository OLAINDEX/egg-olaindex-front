<template>
  <div class="spring-spinner">
    <div class="spring-spinner-part top">
      <div class="spring-spinner-rotator"></div>
    </div>
    <div class="spring-spinner-part bottom">
      <div class="spring-spinner-rotator"></div>
    </div>
  </div>
</template>

<script>
import {reactive, defineComponent} from 'vue'
export default defineComponent({
  name: 'Spinner',
  setup(props, context) {
    return {}
  },
})
</script>

<style scoped>
.spring-spinner,
.spring-spinner * {
  box-sizing: border-box;
}

.spring-spinner {
  height: 3.75rem;
  width: 3.75rem;
}

.spring-spinner .spring-spinner-part {
  overflow: hidden;
  height: calc(3.75rem / 2);
  width: 3.75rem;
}

.spring-spinner .spring-spinner-part.bottom {
  transform: rotate(180deg) scale(-1, 1);
}

.spring-spinner .spring-spinner-rotator {
  width: 3.75rem;
  height: 3.75rem;
  border: calc(3.75rem / 7) solid transparent;
  border-right-color: #ccc;
  border-top-color: #ccc;
  border-radius: 50%;
  box-sizing: border-box;
  animation: spring-spinner-animation 3s ease-in-out infinite;
  transform: rotate(-200deg);
}

@keyframes spring-spinner-animation {
  0% {
    border-width: calc(3.75rem / 7);
  }
  25% {
    border-width: calc(3.75rem / 23.33);
  }
  50% {
    transform: rotate(115deg);
    border-width: calc(3.75rem / 7);
  }
  75% {
    border-width: calc(3.75rem / 23.33);
  }
  100% {
    border-width: calc(3.75rem / 7);
  }
}
</style>
