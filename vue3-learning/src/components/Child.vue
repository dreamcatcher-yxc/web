<template>
  <div>
    <p>
      {{ env }}
    </p>
    <p v-text="counter"></p>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'Child',
  props: {
    msg: String
  },
  setup () {
    const env = inject('env')
    const counter = inject('counter')

    return {
      env,
      counter
    }
  }
}
</script>

<style scoped>
span {
  color: red;
}
</style>
