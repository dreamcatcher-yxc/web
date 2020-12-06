<template>
  <div>
    hello vue!!
  </div>
  <div v-bind="$attrs">
    hello world!
  </div>
</template>

<script>
export default {
  name: 'Demo04'
}
</script>

<style scoped>
.container {
  position: relative;
  height: 400px;
  border: 1px solid red;
  overflow: hidden;
}

.modal {
  display: inline-block;
  position: absolute;
  z-index: 20;
}
</style>
