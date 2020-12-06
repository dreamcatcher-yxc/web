<template>
  <test />
</template>

<script>
import { defineAsyncComponent, h } from 'vue'

export default {
  name: 'Demo10',
  components: {
    test: defineAsyncComponent(() => Promise.resolve({
      name: 'test',
      render () {
        return h('h1', {}, 'test asynComponent')
      } 
    })) 
  }
}
</script>
