<template>
  <div>
    <h1 v-text="color"></h1>
    <br>
    <button @click="changeColor">更改颜色</button>
  </div>
</template>

<script>
export default {
  name: 'Demo05',
  data () {
    return {
      color: 'red'
    }
  },
  // computed: {
  //   style () {
  //     return {
  //       color: this.color
  //     }
  //   }
  // },
  methods: {
    changeColor () {
      this.color = this.color === 'red' ? 'green' : 'red'
    }
  }
}
</script>

<style scoped vars="{ color }">
h1 {
  color: var(--color);
}
</style>
