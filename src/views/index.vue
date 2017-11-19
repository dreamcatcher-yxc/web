<template scope>
    <h3>{{ msg }}</h3>
</template>

<script>
    export default {
        data () {
            return {
                msg: this.$route.params.msg
            }
        },
        watch : {
            $route(to, from) {
                this.msg = to.params.msg;
            }
        }
    }
</script>

<style scoped>

</style>