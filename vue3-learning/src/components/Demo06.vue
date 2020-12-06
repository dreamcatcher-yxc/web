<template>
  <div>
    <h1>Demo06</h1>
    <ul style="list-style: none;">
      <li>modelValue: {{ modelValue }}</li>
      <li>title: {{ title }}</li>
      <li>content: {{ content }}</li>
    </ul>
    <ChildComp 
      v-model.trim="modelValue"
      v-model:title.trim="title" 
      v-model:content.trim="content"  
    />
  </div>
</template>

<script>
export default {
  name: 'Demo06',
  components: {
    ChildComp: {
      name: 'ChildComp',
      template: `
        <div>
          <h1>this is child component</h1>
          <ul style="list-style: none;">
            <li>modelValue: {{ modelValue }}</li>
            <li>title: {{ title }}</li>
            <li>content: {{ content }}</li>
          </ul>
          <button @click="updateModelValue(new Date().getTime() + '')">更新modelValue</button>
          &nbsp;&nbsp;
          <button @click="updateTitle(new Date().getTime() + '')">更新title</button>
          &nbsp;&nbsp;
          <button @click="updateContent(new Date().getTime() + '')">更新content</button>
        </div>
      `,
      props: {
        modelValue: String,
        modelModifiers: {
          default: () => ({})
        },
        title: String,
        titleModifiers: {
          default: () => ({})
        },
        content: String,
        contentModifiers: {
          default: () => ({})
        }
      },
      methods: {
        updateModelValue (newModelValue) {
          console.log(this.modelModifiers)
          this.$emit('update:modelValue', newModelValue)
        },
        updateTitle (newTitle) {
          console.log(this.titleModifiers)
          this.$emit('update:title', newTitle)
        },
        updateContent (newContent) {
          console.log(this.contentModifiers)
          this.$emit('update:content', newContent)
        }
      }
    }
  },
  data () {
    return {
      color: 'red',
      modelValue: 'this is modelValue',
      title: 'title value',
      content: 'content value'
    }
  }
}
</script>

<style scoped vars="{ color }">
h1 {
  color: var(--color);
}
</style>
