<template>
  <div>
    <v-header :seller='seller'></v-header>
    <div class='tab border-1px'>
        <div class='tab-item'>
            <router-link to='/goods'>商品</router-link>
        </div>
        <div class='tab-item'>
            <router-link to='/ratings'>评论</router-link>
        </div>
        <div class='tab-item'>
            <router-link to='/sellers'>商家</router-link>
        </div>
    </div>
    <!-- 加入keep-alive是避免每次点击时重新渲染，而是缓存组件状态 -->
    <keep-alive>
        <router-view :seller='seller'></router-view>
    </keep-alive>
  </div>
</template>
<script>
    import header from './components/header/header.vue';
    export default{
        data () {
            return {
                seller: {}
            };
        },
        created () {
            this.$http.get('/api/seller').then(
                (response) => {
                    response = response.body;
                    // console.log(response);
                    if (response.errno === 0) {
                        this.seller = response.data;
                        // console.log(this.seller);
                    }
                }
            );
        },
        components: { 'v-header': header }
    };
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './common/stylus/mixin.styl'
    .tab
        display:flex
        width:100%
        height:40px
        line-height :40px
        border-1px(rgba(7,17,27,0.2))
        // border-1px(rgba(255,17,27,1))
        .tab-item
            flex:1
            text-align:center
            &>a
                display:block
                font-size:14px
                color:rgb(77,85,93)
                &.router-link-active
                    color:rgb(240,20,20)
</style>
