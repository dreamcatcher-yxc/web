<style scope>

</style>
<template>
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li v-for="(pic, index) in pics" data-target="#carousel-example-generic" :data-slide-to="index" :class="index == 0 ? 'active' : ''"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
            <div v-for="(pic, index) in pics" :class="index == 0 ? 'item active' : 'item'">
                <img :src="pic" :alt="index + 1">
                <div class="carousel-caption">
                </div>
            </div>
        </div>

        <!-- Controls -->
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>
<script>
   import {mockBasePath} from 'config_c';

    export default {
        data () {
            return {
                pics : []
            }
        },
        created : function() {
            let that = this;
            this.axios.post('/pics').then(response => {
                that.pics = response.data.body.pics;
            });
        },
        mounted() {

        },
        beforeDestroy () {

        },
        methods: {
        }
    }
</script>
