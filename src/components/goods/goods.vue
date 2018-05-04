<template>
<div>
  <div class='goods'>
      <div class='menu-wrapper'>
        <ul>
          <li v-for='(item,index) in goods' class='menu-item'
           :class="{'current': (currentIndex===index)}" :key='item.id' @click='selectMenu(index)'>
            <span class='menu-text border-1px'>
              <span v-show='item.type > 0' class='menu-icon' :class='classMap[item.type]'></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class='foods-wrapper' ref='foodWrapper'>
        <ul>
          <li v-for='item in goods' class='foods-info foods-info-hook' :key='item.id'>
            <div class='foods-name'>{{item.name}}</div>
            <div @click='selectFood(item1)' class='foods-detail border-1px' v-for='item1 in item.foods' :key='item1.id'>
              <div class='avatar'>
                <img :src="item1.image" alt="" width='54' height='54'>
              </div>
              <div class='detail-info'>
                <div class='title'>{{item1.name}}</div>
                <div v-show='item1.description' class='description'>
                  {{item1.description}}
                </div>
                <div class='cRating'>
                  <span class='count'>月售{{item1.sellCount}}份</span>
                  <span class='rating' v-show='item1.rating'>好评率{{item1.rating}}%</span>
                </div>
                <div class='price'>
                  <span class='newPrice'>￥{{item1.price}}</span>
                  <span class='oldPrice' v-show='item1.oldPrice'>￥{{item1.oldPrice}}</span>
                </div>
                <div class='cartcontrol-wrapper'>
                  <cartcontrol :food='item1' v-on:addCount='drop'></cartcontrol>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <shopcart ref='shopCart' :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice' :selectedFoods='selectedFoods'>
      </shopcart>
  </div>
  <food :food='selectedFood' ref='food' v-on:addCount='drop'></food>
</div>
</template>
<script type='text/ecmascript-6'>
  import shopcart from '../../components/shopcart/shopcart';
  import food from '../../components/food/food';
  import cartcontrol from '../../components/cartcontrol/cartcontrol';
     export default {
       props: {
         seller: {
           type: Object
         }
       },
       data () {
         return {
           goods: [],
           listHeight: [],
           scrollDis: 0,
           selectedFood: {}
         };
       },
      computed: {
         selectedFoods () {
           let foods = [];
           this.goods.forEach((good) => {
             good.foods.forEach((food) => {
               if (food.count) {
                 foods.push(food);
               }
             });
           });
           return foods;
         },
         currentIndex () {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (!height2 || (this.scrollDis >= height1 &&
            this.scrollDis < height2)) {
            return i;
            }
           }
           return 0;
         }
       },
       methods: {
         selectFood (food, event) {
           this.selectedFood = food;
          //  console.log(food);
            this.$refs.food.show();
         },
         selectMenu (index) {
          //  console.log(index);
          let el = this.$refs.foodWrapper;
        //  console.log(this.listHeight[index]);
          el.scrollTop = this.listHeight[index];
         },
         drop (target) {
          //  console.log(event.target);
          // 因为加号按钮同时有两个动画，为了优化，异步执行下落动画
           this.$nextTick(() => {
              this.$refs.shopCart.drop(target);
           });
         }
       },
       created () {
        this.classMap = ['decrease', 'discount', 'special',
         'invoice', 'guarantee'];
        this.$http.get('/api/goods').then((response) => {
            response = response.body;
            if (response.errno === 0) {
                this.goods = response.data;
                this.$nextTick(() => {
                  let lists = this.$refs.foodWrapper.getElementsByClassName('foods-info-hook');
                  // 生成各部分的offsetTop的数组
                  for (let i = 0; i < lists.length; i++) {
                     let height = lists[i].offsetTop;
                     this.listHeight.push(height);
                    //  console.log(this.listHeight);
                  }
                  let el = this.$refs.foodWrapper;
                  let that = this;
                  // 注匿名函数的this不再指向实例，而是el；获取当前的滚动距离
                  el.onscroll = function () {
                  // console.log(that);
                  that.scrollDis = Math.round(el.scrollTop);
                  //  console.log(that.scrollDis);
                  };
                });
            }
         });
       },
       components: {
         shopcart,
         food,
         cartcontrol
       }
     };
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin'
.goods
  display: flex
  position: absolute
  top: 174px
  bottom: 46px
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: rgba(7,17,27,0.1)
    overflow: auto
    &::-webkit-scrollbar
      display: none
    .menu-item
      display: table
      height: 54px
      line-height: 14px
      width: 56px
      padding: 0 12px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        font-weight: 700
        .menu-text
          border-none()
      .menu-text
        display: table-cell
        width: 56px
        border-1px(rgba(7,17,27,0.1))
        vertical-align: middle
        font-size: 12px
        .menu-icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
              bg-image('decrease_3')
          &.discount
              bg-image('discount_3')
          &.invoice
              bg-image('invoice_3')
          &.guarantee
              bg-image('guarantee_3')
          &.special
              bg-image('special_3')
  .foods-wrapper
    flex: 1
    overflow: auto
    &::-webkit-scrollbar
      display: none
    .foods-info
      width: 100%
      .foods-name
        height: 26px
        padding-left: 14px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-weight: 700
        background: #f3f5f7
        font-size: 12px
        color: rgb(147,153,159)
      .foods-detail
        display: flex
        margin: 18px
        border-1px(rgba(7,17,27,0.1))
        font-size: 0
        &.last-child
          border: none
        .avatar
          display: inline-block
          margin-right: 10px
          vertical-align: top
        .detail-info
          flex: 1
          display: inline-block
          padding-top: 2px
          .title
            line-height: 14px
            margin-bottom: 8px
            font-size: 14px
            color: rgb(7,17,27)
          .description,.cRating
            line-height: 12px
            font-size: 10px
            color: rgb(147,153,159)
            margin-bottom: 8px
          .cRating
            margin-bottom: 0
          .price
            .newPrice
              line-height: 24px
              margin-right: 8px
              font-weight: 700
              font-size: 14px
              color: red
            .oldPrice
              line-height: 24px
              font-weight: 700
              text-decoration: line-through
              font-size: 10px
              color: rgb(147,153,159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: -5px
</style>
