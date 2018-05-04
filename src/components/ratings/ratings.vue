<template>
<div class='rating'>
  <div class="rating-wrapper">
      <div class='seller-rating'>
        <div class='left'>
          <div class='score'>{{seller.score}}</div>
          <div class='score-desc'>综合评分</div>
          <div class='score-compare'>高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class='right'>
          <div class='service-score'>
            <span class='title'>服务评分</span>
            <span class='star-wrapper'><star :size='36' :score='seller.serviceScore'></star></span>
            <span class='score'>{{seller.serviceScore}}</span>
          </div>
          <div class='food-score'>
            <span class='title'>食物评分</span>
            <span class='star-wrapper'><star :size='36' :score='seller.foodScore'></star></span>
            <span class='score'>{{seller.foodScore}}</span>
          </div>
          <div class='delivery-time'>
            <span class='title'>送达时间</span>
            <span class='time'>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect v-on:select='select' v-on:toggleContent='toggleContent' :ratings='ratings' :selectType='selectType' :onlyContent='onlyContent'>
      </ratingSelect>
      <div class='rating-detail'>
        <ul>
          <li v-show='needShow(item.rateType,item.text)' class='rating-content border-1px' v-for='item in ratings' :key='item.id'>
            <div class='left'>
              <img class='avatar' :src="item.avatar" alt="" width='56' height='56'>
            </div>
            <div class='right'>
              <div class='username'>{{item.username}}</div>
              <div class='score-time'>
                <span class='score'><star :size='24' :score='item.score'></star></span>
                <span class='time'>{{item.deliveryTime}}分钟送达</span>
              </div>
              <div class='text'>
                {{item.text}}
              </div>
              <div class='recomand-wrapper'>
                <span class='icon' :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}">
                </span>
                <div class='recomand'>
                  <span class='recomand-item' v-for='item1 in item.recommend' :key='item1.id'>
                 {{item1}}
                  </span>
                </div>
              </div>
              <div class='rate-time'>{{item.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</div>
</template>
<script type='text/ecmascript-6'>
import star from '../../components/star/star';
import split from '../../components/split/split';
import ratingSelect from '../../components/ratingSelect/ratingSelect';
// import shopcart from '../../components/shopcart/shopcart';
import {formatDate} from '../../common/js/date.js';
    // const POSITIVE = 0;
    // const NEGATIVE = 1;
    const ALL = 2;
    export default {
       props: {
         seller: {
           type: Object
         }
       },
       data () {
         return {
           ratings: [],
           selectType: ALL,
           onlyContent: false
         };
       },
       methods: {
         select (selectType) {
           this.selectType = selectType;
         },
         toggleContent (onlyContent) {
           this.onlyContent = onlyContent;
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
       created () {
            this.$http.get('/api/ratings').then(
                (response) => {
                    response = response.body;
                    // console.log(response);
                    if (response.errno === 0) {
                        this.ratings = response.data;
                        // console.log(this.seller);
                    }
                }
            );
        },
        filters: {
          formatDate (time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd h:mm');
          }
        },
       components: {
         star,
         split,
         ratingSelect
        //  shopcart
       }
     };
</script>
<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixin.styl';
  .rating-wrapper
    position: absolute
    top: 174px
    bottom: 0px
    width: 100%
    overflow: auto
    &::-webkit-scrollbar
      display: none
    .seller-rating
      display: flex
      align-items: center
      // width: 100%
      padding : 18px 0
      font-size: 0
      .left
        flex: 0 0 137px
        width: 137px
        padding: 6px 0
        border-right: 1px solid rgba(7,17,27,0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 95px
          width: 95px
         @media only screen and (min-width: 321px) and (max-width: 376px)
          flex: 0 0 120px
          width: 120px
        .score,.score-desc,.score-compare
          display: block
        .score
          line-height: 28px
          font-size: 24px
          color: rgb(255,153,0)
        .score-desc
          line-height: 12px
          margin: 6px 0 8px 0
          font-size: 12px
          color: rgb(7,17,27)
        .score-compare
          line-height: 10px
          font-size: 10px
          color: rgba(7,17,27,0.5)
      .right
        flex: 1
        padding: 0 24px
        @media only screen and (max-width: 320px)
          padding: 0 4px
        @media only screen and (min-width: 321px) and (max-width: 376px)
          padding: 0 10px
        .service-score,.food-score,.delivery-time
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            vertical-align: top
            line-height: 18px
            margin-right: 6px
            font-size: 12px
            color: rgb(7,17,27)
          .star-wrapper .star
            display: inline-block
            line-height: 18px
            vertical-align: top
            margin-right: 6px
          .score
            display: inline-block
            vertical-align: top
            line-height: 18px
            font-size: 12px
            color: rgb(255,153,0)
        .delivery-time
          margin-bottom: 0px
          .time
            line-height: 18px
            font-size: 12px
            color: rgb(147,153,159)
    .rating-detail
      .rating-content
        display: flex
        padding: 18px
        // padding-bottom: 18px
        border-1px(rgba(7,17,27,0.2))
        .left
          flex: 0 0 56px
          width: 56px
          height: 56px
          margin-right: 12px
          .avatar
            border-radius: 50%
        .right
          flex: 1
          position: relative
          .username
            line-height: 12px
            font-size: 10px
            color: rgb(7,17,27)
          .score-time
            font-size: 0
            margin: 4px 0 6px 0
            .score .star
              display: inline-block
              vertical-align: top
              margin-right: 6px
            .time
              line-height: 12px
              font-size: 10px
              color: rgb(147,153,159)
          .text
              line-height: 18px
              font-size: 12px
              color: rgb(7,17,27)
              margin-bottom: 8px
          .recomand-wrapper
            display: flex
            line-height: 16px
            font-size: 0
            .icon
              margin-right: 8px
              vertical-align: top
              &.icon-thumb_up
                font-size: 12px
                color: rgb(0,160,220)
              &.icon-thumb_down
                font-size: 12px
                color: rgb(183,187,191)
            .recomand
              display: inline-block
              font-size: 0
              .recomand-item
                display: inline-block
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                width: 40px
                text-align: center
                padding: 0 6px
                margin-right: 8px
                border: 1px solid rgba(7,17,27,0.1)
                border-radius: 1px
                font-size: 9px
                color: rgb(147,153,159)
          .rate-time
            position: absolute
            right: 0
            top: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147,153,159)

</style>
