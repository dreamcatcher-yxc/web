<template>
    <div>
        <h1 v-text="msg"></h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg : 'hello world!!!'
            }
        }
    }
</script>

<style scoped>
    h1 { color: red }
</style>