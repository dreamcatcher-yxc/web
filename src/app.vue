<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div id="app">
        <p>
            <router-link v-for="path in paths" to="/">index</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
