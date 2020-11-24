<template>
  <span>
    <slot />
  </span>  
</template>

<script>
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'Parent',
  props: {
    msg: String
  },
  setup () {
    provide('env', 'development')
    const counter = ref(0)
    provide('counter', counter)

    let timer = -1

    onMounted(() => {
      timer = setInterval(() => {
        counter.value++
      }, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(timer)
    })
  }
}
</script>
