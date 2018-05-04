<template>
  <div class='cartcontrol'>
    <transition name='move'>
         <div class='descrease icon-remove_circle_outline' @click.stop='decreaseCount' v-show='food.count>0'></div>
    </transition>
    <div class='count' v-show='food.count>0'>{{food.count}}</div>
    <div class='increase icon-add_circle' @click.stop='addCount'></div>
  </div>
</template>
<script type='text/ecmascript-6'>
import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCount (event) {
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                    } else { this.food.count++; }
                //  console.log(event.target);
                this.$emit('addCount', event.target);
            },
            decreaseCount () {
                this.food.count--;
            }
        }
    };
</script>
<style lang='stylus' rel='stylesheet/stylus' >
    .cartcontrol
        font-size: 0
        .descrease,.increase
            display: inline-block
            vertical-align: top
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0,160,220)
        .descrease
            transition: all 0.4s linear
            &.move-enter,&.move-leave-to
                opacity: 0
                transform: translateX(24px)
                transform: rotate(180deg)
        .count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            text-align: center
            font-size: 10px
            line-height: 24px
            color: rgb(147,153,159)
</style>
