<template>
<transition name='move'>
    <div class='food-detail-wrapper' v-show='showFlag'>
        <div class='food-content'>
            <div class='image-header'>
                <img :src='food.image' alt="">
                <div class='back' @click='hide'>
                    <span class='icon-arrow_lift'></span>
                </div>
            </div>
            <div class='content'>
                <h1 class='title'>{{food.name}}</h1>
                <div class='detail'>
                    <span class='sell-count'>月售{{food.sellCount}}份</span>
                    <span class='rating' v-show='food.rating'>好评率{{food.rating}}%</span>
                </div>
                <div class='price'>
                    <span class='newPrice'>￥{{food.price}}</span>
                    <span class='oldPrice' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                </div>
                <div class='cartcontrol-wrapper'>
                    <cartcontrol :food='food' v-on:addCount='drop1'></cartcontrol>
                </div>
                <transition>
                    <div class='addCart' @click='addFirst' v-show='!food.count||food.count===0'>加入购物车</div>
                </transition>
            </div>
            <split v-show='food.info'></split>
            <div class='food-intro' v-show='food.info'>
                <h1 class='title'>商品信息</h1>
                <p class='text'>{{food.info}}</p>
            </div>
            <split></split>
            <div class='rating'>
                <h1 class='title'>商品评价</h1>
                <ratingSelect v-on:select='select' v-on:toggleContent='toggleContent' :selectType='selectType' :onlyContent='onlyContent' :desc='desc' :ratings='food.ratings'>
                </ratingSelect>
                <div class='rating-wrapper'>
                    <ul v-show='food.ratings&&food.ratings.length'>
                        <li v-show='needShow(rating.rateType,rating.text)' v-for='rating in food.ratings' :key='rating.id' class='rating-item border-1px'>
                            <div class='user'>
                                <span class='name'>{{rating.username}}</span>
                                <img :src="rating.avatar" alt="" width='12' height='12'>
                            </div>
                            <div class='time'>{{rating.rateTime | formatDate}}</div>
                            <p class='text'>
                                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}">
                                </span>
                                {{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class='no-rating' v-show='!food.ratings||!food.ratings.length'>暂无评价</div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>
<script type='text/ecmascript-6'>
import cartcontrol from '../../components/cartcontrol/cartcontrol';
import {formatDate} from '../../common/js/date.js';
import split from '../../components/split/split';
import ratingSelect from '../../components/ratingSelect/ratingSelect';
import Vue from 'vue';
//  const POSITIVE = 0;
//  const NEGATIVE = 1;
 const ALL = 2;
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data () {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: false,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        methods: {
            show () {
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = true; // 初始化数据，因为该组件被多次使用,每点一次都是默认值，而不是上次点击的状态
            },
            hide () {
                this.showFlag = false;
            },
            addFirst (event) {
                Vue.set(this.food, 'count', 1);
                this.$emit('addCount', event.target);
            },
             drop1 (target) {
                  this.$emit('addCount', target);// cartcontrol-food-goods-shocart
         },
            select (selectType) {
                  this.selectType = selectType;
         },
            toggleContent (contentOnly) {
                    this.onlyContent = contentOnly;
            },
            needShow (type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        filters: {
            formatDate (time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        components: {
            cartcontrol,
            split,
            ratingSelect
        }
    };
</script>
<style lang='stylus' rel='stylesheet/stylus' >
    @import '../../common/stylus/mixin.styl'
    .food-detail-wrapper
        position: fixed
        top: 0
        left: 0
        bottom: 48px
        width: 100%
        overflow: auto
        background: #fff
        z-index: 30
        transition: all 0.4s
        &::-webkit-scrollbar
             display: none
        &.move-enter,&.move-leave-to
            transform: translateX(100%)
        .food-content
            width: 100%
            .image-header
                position: relative
                width: 100%
                // max-height: 375px
                height: 0
                padding-top: 100%
                // border: 1px solid red
                img
                    position: absolute
                    top: 0
                    left: 0
                    width: 100%
                    height: 100%
                .back
                    position: absolute
                    top: 10px
                    left: 0
                    .icon-arrow_lift
                        padding: 10px
                        font-size: 20px
                        color: #fff
            .content
                position: relative
                padding: 18px
                background: #fff
                .title
                    line-height: 14px
                    font-size: 14px
                    font-weight: 700
                    color: rgb(7,17,27)
                .detail
                    margin: 8px 0 18px 0;
                    font-size: 0
                    .sell-count,.rating
                        display: inline-block
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147,153,159)
                    .sell-count
                        margin-right: 12px
                .price
                    .newPrice
                        margin-right: 10px
                        line-height: 24px
                        font-weight: 700
                        font-size: 14px
                        color: rgb(240,20,20)
                    .oldPrice
                        line-height: 24px
                        font-weight: 700
                        font-size: 10px
                        color: rgb(147,153,159)
                        text-decoration: line-through
                .cartcontrol-wrapper
                    position: absolute
                    right: 12px
                    bottom: 12px
                .addCart
                    position: absolute
                    right: 18px
                    bottom: 18px
                    z-index: 10
                    height: 24px
                    line-height: 24px
                    padding: 0 12px
                    box-sizing: border-box
                    border-radius: 12px
                    font-size: 10px
                    color: #ffffff
                    background: rgb(0,160,220)
                    transition: all 0.2s
                    //加延时以获取事件的正确处理位置
            .food-intro
                padding: 18px
                .title
                    line-height: 14px
                    margin-bottom: 6px
                    font-size: 14px
                    color: rgb(7,17,27)
                .text
                    line-height: 24px
                    padding: 0 8px
                    font-size: 12px
                    color: rgb(77,85,93)
            .rating
                padding-top: 18px
                .title
                    line-height: 14px
                    margin-left: 18px
                    font-size: 14px
                    color: rgb(7,17,27)
                .rating-wrapper
                    padding: 0 18px
                    .rating-item
                        position: relative
                        padding: 16px 0
                        border-1px(rgba(7,17,27,0.1))
                        .user
                            position: absolute
                            right: 0
                            top:16px
                            line-height: 12px
                            font-size: 0
                            .name
                                display: inline-block
                                vertical-align: top
                                margin-right: 6px
                                font-size: 10px
                                color: rgb(147,153,159)
                        .time
                            margin-bottom: 6px
                            line-height: 12px
                            font-size: 10px
                            color: rgb(147,153,159)
                        .text
                            line-height: 16px
                            font-size: 12px
                            color: rgb(7,17,27)
                            .icon-thumb_up,.icon-thumb_dowm
                                margin-right: 4px
                                line-height: 16px
                                font-size: 12px
                            .icon-thumb_up
                                color: rgb(0,160,220)
                            .icon-thumb_down
                                color: rgb(147,160,220)
                    .no-rating
                        padding: 16px 0
                        font-size: 12px
                        color: rgb(147,153,159)
</style>
