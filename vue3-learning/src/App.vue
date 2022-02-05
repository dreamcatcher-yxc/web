<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <hr />
  <Demo01 msg="hello world!" />

  <hr />
  <Demo02 msg="hello world!" />

  <hr />
  <Demo03 />

  <hr />
  <Demo04 name="aaa" />

  <hr />
  <Demo05 />

  <hr />
  <Demo06 />

  <hr />
  <Demo07 />

  <hr />
  <Demo08 />

  <hr />
  <Demo09 />

  <hr />
  <Demo10 />

  <hr />
  <Demo11 />

  <hr />
  <Demo12 foo="this is foo property" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Demo01 from './components/Demo01.vue'
import Demo02 from './components/Demo02.vue'
import Demo03 from './components/Demo03.vue'
import Demo04 from './components/Demo04.vue'
import Demo05 from './components/Demo05.vue'
import Demo06 from './components/Demo06.vue'
import Demo07 from './components/Demo07.vue'
import Demo08 from './components/Demo08.vue'
import Demo09 from './components/Demo09.vue'
import Demo10 from './components/Demo10.vue'
import Demo11 from './components/Demo11.vue'
import Demo12 from './components/Demo12.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Demo01,
    Demo02,
    Demo03,
    Demo04,
    Demo05,
    Demo06,
    Demo07,
    Demo08,
    Demo09,
    Demo10,
    Demo11,
    Demo12
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

.container {
  position: relative;
  height: 400px;
  border: 1px solid red;
  overflow: hidden;
}
</style>
