<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <span>
        <ul>
            <li v-for="path in paths" >
                <router-link :to="path"> {{ path }} </router-link>
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </span>
</template>
<script>
    export default {
        data () {
            return {
                paths : this.$store.state.paths
            }
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
