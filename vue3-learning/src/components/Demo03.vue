<template>
  <div>
    <div id="container" class="container"></div>

    <!-- 需要保证需要挂载的目标 dom 在挂载的时候已经存在，这里由于需要挂载到的目标 dom 元素和被关在的元素在同一个层级，所以需要使用初始化的时候不显示，
        然后使用 setTimeout 动态修改为 true
     -->
    <teleport v-if="isShow" to="#container">
      <div class="modal" :style="modalStyle">
        <h1>hello world!</h1>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'Demo03',
  data (){
    return {
      isShow: false
    } 
  },
  computed: {
    modalStyle () {
      return {
        top: '20px',
        left: '20px'
      }
    }
  },
  mounted() {
    setTimeout(() => this.isShow = true, 0)
  }
}
</script>

<style scoped>
.modal {
  display: inline-block;
  position: absolute;
  z-index: 20;
}
</style>
