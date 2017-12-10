<style scope>
    @import 'styles/common.css';
</style>
<template>
    <div class="container-fluid">
        <transition name="fade" >
          <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        mounted() {
        },
        beforeDestroy () {

        },
        methods: {
        }
    }
</script>
