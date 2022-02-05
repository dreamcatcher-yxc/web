<template>
  <div class="hello">
    <h1>不可变属性: {{ message }}</h1>
    <h1>可变属性: {{ count }}</h1>
    <h1>props: {{ props.foo }}</h1>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const message = 1;
const count = ref(1);
const props = defineProps({
  foo: String
});

setTimeout(() => {
  count.value++;
}, 3000);

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
