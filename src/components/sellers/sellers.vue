<template>
  <div class='seller'>
     <div class='seller-detail'>
       <div class='detail-top border-1px'>
         <h1 class='title'>{{seller.name}}</h1>
         <div class='sell-detail'>
           <star :size='36' :score='seller.score'></star>
           <span class='rate-count'>({{seller.ratingCount}})</span>
           <span class='sell-count'>月售{{seller.sellCount}}单</span>
           <div class='favorite'>
             <span class='icon icon-favorite' :class="{'icon-favorite-on': favorite}" @click="toggleFavorite"></span>
             <div class='text'>{{favoriteText}}</div>
           </div>
         </div>
       </div>
       <div class='detail-bottom'>
         <div class='detail-bottom-item'>
           <h1 class='title'>起送价</h1>
           <div class='value'><span class='num'>{{seller.minPrice}}</span>元</div>
         </div>
          <div class='detail-bottom-item'>
           <div class='title'>商家配送</div>
           <div class='value'><span class='num'>{{seller.deliveryPrice}}</span>元</div>
         </div>
          <div class='detail-bottom-item'>
           <div class='title'>平均配送时间</div>
           <div class='value'><span class='num'>{{seller.deliveryTime}}</span>分钟</div>
         </div>
       </div>
     </div>
    <split></split>
    <div class='bulletin-activity'>
      <div class='bulletin-wrapper border-1px'>
        <h1 class='title'>公告与活动</h1>
        <p class='text'>{{seller.bulletin}}</p>
      </div>
      <ul class='activity'>
        <li class='activity-item border-1px' v-for='item in seller.supports' :key='item.id'>
          <span class='icon' :class='classMap[item.type]'></span>
          <span class='desc'>{{item.description}}</span>
        </li>
      </ul>
    </div>
    <split></split>
    <div class='seller-pic'>
      <h1 class='title'>商家实景</h1>
      <div class='pic-wrapper'>
        <ul class='pic-list'>
          <li class='pic-item' v-for='pic in seller.pics' :key='pic.id'>
            <img :src="pic" alt="" width='120' height='90'>
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class='seller-info'>
      <h1 class='title'>商家信息</h1>
      <ul class='content'>
        <li class='content-item' v-for='item in seller.infos' :key='item.id'>
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import star from '../../components/star/star';
import split from '../../components/split/split';
     export default {
       props: {
         seller: {
           type: Object
         }
       },
       data () {
         return {
           classMap: [],
           favorite: false
         };
       },
       methods: {
         toggleFavorite () {
           this.favorite = !this.favorite;
         }
       },
       computed: {
         favoriteText () {
           if (this.favorite) {
             return '已收藏';
             } else {
             return '收藏';
             }
         }
       },
       created () {
         this.classMap = ['decrease', 'discount', 'special',
         'invoice', 'guarantee'];
       },
       components: {
         star,
         split
       }
     };
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin'
  .seller
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    overflow: auto
    &::-webkit-scrollbar
      display: none
    .seller-detail
      box-sizing: border-box
      padding: 18px
      .detail-top
        position: relative
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        .title
          line-height: 14px
          margin-bottom 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7,17,27)
        .sell-detail
          font-size: 0
          .star
            display: inline-block
            vertical-align: top
          .rate-count,.sell-count
            line-height: 18px
            font-size: 10px
            // font-weight: 700
            color: rgb(77,85,93)
          .rate-count
            margin: 0 12px 0 8px
          .favorite
            position: absolute
            right: -10px
            top: 0px
            width: 50px
            text-align: center
            .icon-favorite
              line-height: 24px
              font-size: 24px
              color: rgba(7,17,27,0.2)
              &.icon-favorite-on
                color: rgb(240,20,20)
            .text
              line-height: 10px
              margin-top: 4px
              font-size: 10px
              color: rgb(77,85,93)
      .detail-bottom
        display: flex
        margin-top: 18px
        .detail-bottom-item
          flex: 1
          border-right: 1px solid rgba(7,17,27,0.1)
          &:last-child
            border-right: none
          .title
            line-height: 10px
            text-align: center
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147,153,159)
          .value
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(7,17,27)
            .num
              font-size: 24px
    .bulletin-activity
      padding: 18px 18px 0 18px
      .bulletin-wrapper
        padding-bottom: 16px
        border-1px(rgba(7,17,27,0.1))
        .title
          line-height: 14px
          margin-bottom 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7,17,27)
        .text
          padding: 0 12px
          line-height: 24px
          font-size: 12px
          color: rgb(240,20,20)
      .activity
        .activity-item
            padding: 16px 12px
            border-1px(rgba(7,17,27,0.1))
            line-height: 16px
            font-size: 0
            &:last-child
                border: none
            .icon
              display: inline-block
              width: 16px
              height: 16px
              vertical-align: top
              margin-right: 6px
              background-size: 16px 16px
              &.decrease
                  bg-image('decrease_4')
              &.discount
                  bg-image('discount_4')
              &.invoice
                  bg-image('invoice_4')
              &.guarantee
                  bg-image('guarantee_4')
              &.special
                  bg-image('special_4')
            .desc
              display: inline-block
              font-size: 12px
              color: rgb(7,17,27)
    .seller-pic
      padding: 18px
      .title
        line-height: 14px
        margin-bottom 12px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          overflow: auto
          &::-webkit-scrollbar
            display: none
          .pic-item
            display: inline-block
            margin-right: 6px
    .seller-info
      padding: 18px 18px 0 18px
      .title
        line-height: 14px
        padding-bottom 12px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
        border-1px(rgba(7,17,27,0.1))
      .content
        .content-item
            padding: 16px 12px
            line-height: 16px
            font-size: 12px
            color: rgb(7,17,27)
            border-1px(rgba(7,17,27,0.1))
            &:last-child
              border: none
</style>
