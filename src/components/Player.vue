<template>
  <video v-if="type === 'video'" id="video-player" crossorigin playsinline controls poster="">
    <source :src="source" type="video/mp4" />
  </video>
  <audio v-else id="audio-player" crossorigin controls>
    <source :src="source" type="audio/mp3" />
    <source :src="source" type="audio/ogg" />
  </audio>
</template>
<script>
import {reactive, defineComponent, onMounted} from 'vue'
import Plyr from 'plyr/dist/plyr.polyfilled'
import 'plyr/dist/plyr.css'
export default defineComponent({
  name: 'Player',
  props: {
    source: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'video',
    },
  },
  setup(props) {
    onMounted(() => {
      let el
      if (props.type === 'video') {
        el = 'video-player'
      } else {
        el = 'audio-player'
      }

      const player = new Plyr(`#${el}`)
    })
    return {...props}
  },
})
</script>
