<template>
  <pre>
    <code :class="`language-${language}`" >{{ code }}</code>
  </pre>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CodePreview',
  props: {
    language: {
      type: String,
      default: 'markup',
    },
    code: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    return {...props}
  },
})
</script>
