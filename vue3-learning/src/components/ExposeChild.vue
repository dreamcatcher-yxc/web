<template>
  <div>
    <p>{{ 'This is ExposeChild Component' }}</p>
  </div>
</template>

<script>
export default {
  name: 'ExposeChild',
  setup (props, { expose }) {
    function sayHello () {
      console.log('hello world!')
    }

    expose({
      sayHello
    })

    // return {
    //   sayHello
    // }
  }
}
</script>

<style scoped>
span {
  color: red;
}
</style>
