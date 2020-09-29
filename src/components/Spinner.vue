<template>
  <div class="spinner" :class="color"></div>
</template>
<script>
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'Spinner',
  props: {
    color: {
      type: String,
      default: 'mdui-color-blue-200',
    },
  },
  setup(props) {
    return {...props}
  },
})
</script>
<style scoped>
.spinner {
  width: 60px;
  height: 60px;
  margin: 100px auto;

  border-radius: 100%;
  -webkit-animation: scaleout 1s infinite ease-in-out;
  animation: scaleout 1s infinite ease-in-out;
}

@-webkit-keyframes scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes scaleout {
  0% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}
</style>
