<template>
<div class='wrapper'>
  <div class='shopcart'>
    <div class='content'>
      <div class='content-left' @click='toggleList'>
        <div class='logo-wrapper'>
          <div class='logo' :class="{'highlight':totalCount>0}">
            <span class='icon-shopping_cart' :class="{'highlight':totalCount>0}"></span>
          </div>
          <div class='food-count' v-show='totalCount>0'>{{totalCount}}</div>
        </div>
        <div class='price'  :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class='desc'>另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class='content-right'>
        <div class='mini-pay' :class="{'enough':(enough===true)}">{{payDesc}}</div>
      </div>
    </div>
    <div class='ball-container'>
        <transition v-for='item in balls' name='drop' v-bind:key='item.id'
        v-on:before-enter='beforeEnter'
        v-on:enter='enter'
        v-on:after-enter='afterEnter'>
          <div v-show='item.show' class='ball'>
             <div class='inner inner-hook'></div>
          </div>
        </transition>
    </div>
    <transition name='fold'>
    <div class='shopcart-list' v-show='listShow'>
      <div class='list-header'>
        <h1 class='title'>购物车</h1>
        <span class='list-clear' @click='clearList'>清空</span>
      </div>
      <div class='list-content'>
        <ul>
          <li class='food' v-for='food in selectedFoods' :key='food.id'>
            <span class='name'>{{food.name}}</span>
            <div class='price'>
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class='cartcontrol-wrapper'>
              <cartcontrol :food='food'>tfrttyf</cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
  <transition name='fade'>
    <div class='list-mask' @click='hideList' v-show='listShow'>
    </div>
  </transition>
</div>
</template>
<script type='text/ecmascript-6'>
   import cartcontrol from '../../components/cartcontrol/cartcontrol';
    export default {
      props: {
        selectedFoods: {
          type: Array,
          default () {
            return [];
          }
        },
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number,
          default: 0
        }
      },
      data () {
        return {
          balls: [{
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
          ],
          dropBall: [],
          fold: true
        };
      },
      methods: {
        drop (el) {
          // console.log(el);
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) {
              ball.show = true;
              ball.el = el;
              this.dropBall.push(ball);
              return;
            }
          }
        },
        beforeEnter: function (el) {
          //  这里的el是指下落的球
          // console.log(this.dropBall.length);
          for (let i = 0; i < this.dropBall.length; i++) {
            let ball = this.dropBall[i];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              // el.style.display = '';
              el.style.webkitTransform = `translateY(${y}px)`;
              el.style.transform = `translateY(${y}px)`;
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translateX(${x}px)`;
              inner.style.transform = `translateX(${x}px)`;
       }
          }
        },
        enter: function (el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight;
          this.$nextTick(() => {
              el.style.webkitTransform = 'translateY(0)';
              el.style.transform = 'translateY(0)';
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = 'translateX(0)';
              inner.style.transform = 'translateX(0)';
          });
        },
        afterEnter: function (el) {
          let ball = this.dropBall.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
          // 两种方法亦可
        //   for (let i = 0; i < this.balls.length; i++) {
        //     let ball = this.balls[i];
        //     // console.log(ball.show);
        //     if (ball.show) {
        //       ball.show = false;
        //       el.style.display = 'none';
        //     }
        // }
      },
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
        // console.log(this.fold);
      },
      clearList () {
        this.selectedFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList () {
        this.fold = true;
      }
      },
      computed: {
        totalPrice () {
          let total = 0;
          this.selectedFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        totalCount () {
          let count = 0;
          this.selectedFoods.forEach((food) => {
            count += food.count;
          });
          return count;
        },
        payDesc () {
          if (this.totalPrice === 0) {
            return `￥${this.minPrice}起送`;
          } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice;
            return `还差￥${diff}元起送`;
          } else {
            return '去结算';
          }
        },
        enough () {
          if (this.totalPrice >= this.minPrice) {
           return true;
          } else {
            return false;
          }
        },
        listShow () {
          if (!this.totalCount) {
            // this.fold = true;
            return false;
          }
          let show = !this.fold;
            // console.log(this.show);
            return show;
        }
      },
      components: {
        cartcontrol
      }
    };
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin'
.shopcart
  position: fixed
  left: 0
  bottom :0
  z-index: 50
  width: 100%
  height: 48px
  .content
    display: flex
    background: #141d27
    font-size: 0
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        vertical-align: top
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        border-radius: 50%
        background: #141d27
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          background: #2b343c
          text-align: center
          &.highlight
            background: rgb(0,160,220)
          .icon-shopping_cart
            line-height: 44px
            font-size: 24px
            color: #80858a
            &.highlight
              color: #fff
        .food-count
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 12px
          font-size: 9px
          font-weight: 700
          color: #ffffff
          background: rgb(240,20,20)
          box-shadow: 0 4px 8px rgba(0,0,0,0.4)
      .price
        display: inline-block
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px
        padding-right: 12px
        border-right: 1px solid rgba(255,255,255,0.1)
        color: rgba(255,255,255,0.4)
        font-size: 16px
        font-weight: 700
        &.highlight
          color: #fff
      .desc
        display: inline-block
        vertical-align: top
        margin: 12px 0 0 12px
        line-height: 24px
        color: rgba(255,255,255,0.4)
        font-size: 10px
    .content-right
      width: 105px
      flex: 0 0 105px
      .mini-pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        color: rgba(255,255,255,0.4)
        font-weight: 700
        background: #2b333b
        &.enough
          background: #00b43c
          color: #fff
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0,160,220)
        transition: all 0.4s linear
  .shopcart-list
    position: absolute
    left: 0
    bottom: 100%
    z-index: -1
    width: 100%
    transition: all 0.5s ease
    &.fold-enter,&.fold-leave-to
     opacity: 0
     transform: translateY(100%)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7,17,27,0.1)
      .title
        float: left
        font-size: 14px
        color: rgb(7,17,27)
      .list-clear
        float: right
        font-size: 12px
        color: rgb(0,160,220)
    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: auto
      background: #ffffff
      &::-webkit-scrollbar
        display: none
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        border-1px(rgba(7,17,27,0.1))
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7,17,27)
        .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            color: rgb(240,20,20)
            font-weight: 700
        .cartcontrol-wrapper
            position: absolute
            right: 0px
            bottom: 6px
.list-mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 40
  backdrop-filter: blur(10px)
  transition: all 0.4s
  opacity: 1
  background: rgba(7,17,27,0.6)
  &.fade-enter, &.fade-&.fold-leave-to
    opacity: 0
    background: rgba(7,17,27,0)
</style>
