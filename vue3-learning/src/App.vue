<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <hr />
  <Demo01 msg="hello world!" />

  <hr />
  <Demo02 msg="hello world!" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Demo01 from './components/Demo01.vue'
import Demo02 from './components/Demo02.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Demo01,
    Demo02
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
