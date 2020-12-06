<template>
  <div>
    <ul>
      <li 
        v-for="val in 3"
        :key="val"
        :ref="setItemRef"
      >
        {{ val }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Demo08',
  data () {
    return {
      itemRefs: []
    }
  },
  methods: {
    setItemRef (el) {
      this.itemRefs.push(el)
    }
  },
  mounted () {
    console.log(this.itemRefs)
  },
  beforeUpdate () {
    this.itemRefs = []
  },
  updated () {
    console.log(this.itemRefs)
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
