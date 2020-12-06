<template>
  <div>
    <h1 ref="title">hello world!</h1>
    <p 
      ref="el1"
      class="color-red"
      v-bind="bindProps"
    >
      {{ el1ClassName }}
    </p>
    <p 
      ref="el2"
      v-bind="bindProps"
      class="color-red"
    >
      {{ el2ClassName }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Demo07',
  data () {
    return {
      bindProps: {
        class: 'color-green'
      },
      el1ClassName: '',
      el2ClassName: ''
    }
  },
  mounted () {
    this.el1ClassName = this.$refs.el1.className
    this.el2ClassName = this.$refs.el2.className
  }
}
</script>

<style scoped>
.color-red {
  color: red;
}
.color-green {
  color: green;
}
</style>
