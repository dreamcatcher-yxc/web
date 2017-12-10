<style scoped lang="less">
    .container {
        margin-top: 10px;
        .col {
            background-color: #2b85e4;
        }
    }
</style>
<template>
    <div class="container">
        <Row :gutter="16">
            <i-col v-for="i in [1, 2, 3, 4]" span="6">
                <div class="col">col-6</div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {

    }
</script>