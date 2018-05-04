<template>
 <header>
     <div class='content-wrapper'>
         <div class='avatar'>
             <img :src="seller.avatar" alt="" width='64' height='64'>
         </div>
         <div class='content'>
             <div class='title'>
                <span class='brand'></span>
                <span class='name'>{{seller.name}}</span>
             </div>
             <div class='description'>
                 {{seller.description}}/{{seller.deliveryTime}}分钟送达
             </div>
             <div v-if='seller.supports' class='supports'>
                 <span class='icon' :class="classMap[seller.supports[0].type]"></span>
                 <span class='text'>{{seller.supports[0].description}}</span>
             </div>
         </div>
         <div v-if='seller.supports' class='support-count' @click='showDetail'>
             <span class='count'>{{seller.supports.length}}个</span>
             <span class='icon-keyboard_arrow_right'></span>
         </div>
     </div>
     <div class='bulletin-wrapper'>
         <span class='bulletin-title'></span><span class='bulletin-text'>{{seller.bulletin}}</span>
         <span class='icon-keyboard_arrow_right'  @click='showDetail'></span>
     </div>
     <div class='background'>
         <img :src="seller.avatar" alt="" width='100%' height='100%'>
     </div>
     <transition name='fade'>
        <div class='detail' v-show="detailShow">
            <div class='detail-wrapper'>
                <div class='detail-main'>
                    <h1 class='name'>{{seller.name}}</h1>
                    <div class='star-wrapper'>
                        <star :size='48' :score='seller.score'></star>
                    </div>
                    <div class='title'>
                        <div class='line'></div>
                        <div class='text'>优惠信息</div>
                        <div class='line'></div>
                    </div>
                    <div v-if='seller.supports' class='supports'>
                        <div class='supports-item' v-for='item in seller.supports' :key='item.id'>
                        <span class='icon' :class='classMap[item.type]'></span>
                        <span class='text'>{{item.description}}</span>
                        </div>
                    </div>
                    <div class='bulletin-title'>
                        <div class='line'></div>
                        <div class='text'>商家公告</div>
                        <div class='line'></div>
                    </div>
                    <div class='bulletin-content'>
                        <p>{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class='detail-close' @click='closeDetail'>
                <span class='icon-close'></span>
            </div>
        </div>
     </transition>
 </header>
</template>
<script type='text/ecmascript-6'>
    import star from '../../components/star/star';
    export default{
        props: {
            seller: {
            //    type: Object
            }
        },
        data () {
            return {
                detailShow: false
            };
        },
        methods: {
            showDetail () {
                this.detailShow = true;
            },
            closeDetail () {
                this.detailShow = false;
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice',
            'guarantee'];
        },

        components: {
            star
        }
    };

</script>
<style lang='stylus' rel='stylesheet/stylus' >
@import '../../common/stylus/mixin'
header
    position: relative
    overflow: hiddden
    color: #fff
    background: rgba(7,17,27,0.5)
    .content-wrapper
        position: relative
        padding: 24px 12px 18px 24px
        font-size: 0
        .avatar
            display: inline-block
            vertical-align:top
            img
                border-radius: 2px
        .content
            display: inline-block
            margin-left: 16px
            .title
                margin: 2px 0 8px 0
                .brand
                    display: inline-block
                    vertical-align: top
                    width: 30px
                    height: 18px
                    bg-image('brand')
                    background-size: 30px 18px
                    background-repeat: no-repeat
                .name
                    margin-left: 6px
                    font-size: 16px
                    line-height: 18px
                    font-weight: bold
            .description
                margin-bottom: 10px
                line-height: 12px
                font-size: 12px
            .supports
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 4px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                    &.guarantee
                        bg-image('guarantee_1')
                    &.invoice
                        bg-image('invoice_1')
                    &.special
                        bg-image('special_1')
                .text
                    line-height: 12px
                    font-size: 10px
        .support-count
            position: absolute
            right: 12px
            bottom: 16px
            height: 24px
            line-height: 24px
            padding: 0 8px
            border-radius: 14px
            background-color: rgba(0,0,0,0.2)
            text-align: center
            .count
                verical-align: top
                margin-right: 2px
                font-size: 10px
            .icon-keyboard_arrow_right
                font-size: 10px
                line-height: 24px
    .bulletin-wrapper
        position: relative
        height: 28px
        line-height: 28px
        padding: 0 22px 0 12px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        background-color: rgba(7,17,27,0.2)
        .bulletin-title
            display: inline-block
            vertical-align: top
            margin-top: 8px
            width: 22px
            height: 12px
            bg-image('bulletin')
            background-size: 22px 12px
            background-repeat: no-repeat
        .bulletin-text
            vertical-align: top
            margin: 0 4px
            font-size: 10px
        .icon-keyboard_arrow_right
            position: absolute
            right: 12px
            top: 9px
            font-size: 10px
    .background
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -1
        filter: blur(10px)
    .detail
        position: fixed
        top: 0
        left: 0
        overflow: auto
        &::-webkit-scrollbar
            display: none
            // width: 0
        z-index: 100
        width: 100%
        height: 100%
        background: rgba(7,17,27,0.8)
        transition: all 0.5s ease
        &.fade-enter,&.fade-leave-to
           opacity: 0
        .detail-wrapper
            min-height: 100%
            width: 100%
            overflow: auto
            .detail-main
                margin-top: 64px
                padding-bottom: 64px
               
                // &::-webkit-scrollbar
                //  display: none
                .name
                    line-height: 16px
                    text-align: center
                    height: 16px
                    font-weight: 350px
                    font-size: 16px
                .star-wrapper
                    margin-top: 18px
                    padding: 2px 0
                    text-align: center
                .title
                    display: flex
                    width: 80%
                    margin: 28px auto 24px auto
                    .line
                        flex: 1
                        position: relative
                        top: -8px
                        border-bottom: 1px solid rgba(255,255,255,0.2)
                    .text
                        padding: 0 12px
                        font-weight: 700
                .supports
                    width: 80%
                    margin: 0 auto
                    .supports-item
                        padding: 0 12px
                        margin-bottom: 12px
                        font-size: 0
                        &.last-child
                            margin-bottom: 0
                        .icon
                            display: inline-block
                            vertical-align: top
                            width: 16px
                            height: 16px
                            margin-right: 6px
                            background-repeat: no-repeat
                            background-size: 16px 16px
                            &.decrease
                                bg-image('decrease_2')
                            &.discount
                                bg-image('discount_2')
                            &.invoice
                                bg-image('invoice_2')
                            &.guarantee
                                bg-image('guarantee_2')
                            &.special
                                bg-image('special_2')
                        .text
                            line-height: 16px
                            font-size: 12px
                .bulletin-title
                    display: flex
                    width: 80%
                    margin: 28px auto 24px auto
                    .line
                        flex: 1
                        border-bottom: 1px solid rgba(255,255,255,0.2)
                    .text
                        padding: 0 12px
                        font-weight: 700
                .bulletin-content
                    width: 80%
                    padding: 0 12px
                    margin: 0 auto
                    &>p
                        font-size: 14px
                        line-height: 24px
        .detail-close
            position: relative
            width: 32px
            height: 32px
            margin: -64px auto 0 auto
            font-size: 32px
            clear: both

</style>
