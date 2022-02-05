<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <ExposeChild ref="exposeChildRef" />
    <button @click="onInvoke">
      调用
    </button>
  </div>
</template>

<script>
import ExposeChild from './ExposeChild.vue';
import { toRefs, ref, reactive, onMounted } from 'vue'

export default {
  name: 'Demo11',
  components: {
    ExposeChild
  },
  props: {
    msg: String
  },
  setup (props) {
    const { msg: message } = toRefs(props)
    const exposeChildRef = ref(null)

    function onInvoke () {
      exposeChildRef.value.sayHello()
    }
    
    // onMounted(() => {
    // })

    console.log(message)

    return {
      // ExposeChild,
      message,
      onInvoke,
      exposeChildRef
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
