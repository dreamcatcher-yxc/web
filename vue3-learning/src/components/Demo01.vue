<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ counter }}</h2>
    <button @click="suspend">
      {{ isSuspend.value ? '继续' : '暂停' }}
    </button>
  </div>
</template>

<script>
import { toRefs, ref, reactive, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'Demo01',
  props: {
    msg: String
  },
  setup (props) {
    const { msg } = toRefs(props)
    const counter = ref(0)
    let timer = -1, isSuspend = reactive({ value: false })
    console.log(isSuspend)

    const suspend = () => {
      if(isSuspend.value) {
        isSuspend.value = false
        timer = setInterval(() => counter.value++, 1000)
      } else {
        isSuspend.value = true
        clearInterval(timer)
      }
    }
    
    onMounted(() => {
      timer = setInterval(() => counter.value++, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(timer)
    })

    console.log(msg)

    return {
      counter,
      suspend,
      isSuspend
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
