<template>
  <div class="container">
    <canvas
      class="cover-preview"
      canvas-id="cover-preview"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd">
    </canvas>
    <ChoosePhotoTip></ChoosePhotoTip>
    <cover-view class="btns-wrap">
      <cover-view class="tip">可以拖动、放大操作图片</cover-view>
      <cover-view class="btns">
        <cover-view class="btn cancel-btn" @click="handelCancle">重选</cover-view>
        <cover-view class="btn comfirm-btn" @click="handelUploadImg">完成</cover-view>
      </cover-view>
    </cover-view>
  </div>
</template>

<script>

import ChoosePhotoTip from '@/components/ChoosePhotoTip'

const ctx = wx.createCanvasContext('cover-preview');
let start_position = {};//移动图片时手指起始坐标
let tempWidth;//图片初始宽度
let tempHeight;//图片初始高度
let old_x = 0;//图片初始x坐标
let old_y = 0;//图片初始y坐标
let _touches = 1;//触屏的手指数
let old_scale = 1;//原始放大倍数
let new_scale = 1;//新的放大倍数
let is_move = false;//是否移动

export default {
  data(){
    return {
      imageSrc: ''
    }
  },
  mounted(){
    this.imageSrc = this.$root.$mp.query.url
    this.setCanvas()
  },
  components: {
    ChoosePhotoTip
  },
  methods: {

    setCanvas(){
      const self = this
      wx.getImageInfo({
        src: this.imageSrc,
        success: function (res) {
          console.log(res.width)
          console.log(res.height)
          tempWidth = res.width;
          tempHeight = res.height;
          ctx.drawImage(self.imageSrc, 0, 0, 375, res.height / res.width * 375);
          ctx.draw();
        }
      })
    },
    //监听手指触摸事件，并判断是移动还是缩放，并记录初始状态
    handleTouchStart (e){
      console.log('canvasStart', e)
      const touches = e.touches.length;
      if(touches == 1){
        _touches = 1;
        start_position = { x: e.touches[0].x, y: e.touches[0].y, timeStamp:e.timeStamp}
        console.log('touches == 1', start_position)
      }else if(touches == 2){
        _touches = 2;
        start_position = { x: e.touches[0].x, y: e.touches[0].y,x1: e.touches[1].x, y1: e.touches[1].y, timeStamp: e.timeStamp }
        console.log('touches == 2', start_position)
      }else{
        _touches = 1;
      }
    },
    //监听手指移动事件，并做出相应调整
    handleTouchMove (e) {
      console.log('canvasMove', e)
      var touches = e.touches.length;
      if (_touches == 1 && e.timeStamp - start_position.timeStamp > 150) {
        ctx.drawImage(this.imageSrc, old_x + e.touches[0].x - start_position.x, old_y + e.touches[0].y - start_position.y, 375 * new_scale, tempHeight / tempWidth * 375 * new_scale);
        ctx.draw();
        is_move = true;
      } else if (_touches == 2 && e.timeStamp - start_position.timeStamp > 150) {
        var change_x = Math.abs(Math.abs(e.touches[0].x - e.touches[1].x) - Math.abs(start_position.x - start_position.x1));
        var change_y = Math.abs(Math.abs(e.touches[0].y - e.touches[1].y) - Math.abs(start_position.y - start_position.y1));
        if(change_x - change_y > 10){
          old_scale = Math.abs(e.touches[0].x - e.touches[1].x) / Math.abs(start_position.x - start_position.x1);
        }else{
          old_scale = Math.abs(e.touches[0].y - e.touches[1].y) / Math.abs(start_position.y - start_position.y1);
        }
        ctx.drawImage(this.imageSrc, old_x, old_y, 375 * old_scale * new_scale, tempHeight / tempWidth * 375 * old_scale * new_scale);
        ctx.draw();
        is_move = true;
      }else{
        is_move = false;
      }
    },
    //监听手指离开动作，并保存当前状态数据
    handleTouchEnd (e) {
      console.log('canvasEnd'+_touches)
      console.log('======e=======', e)

      if (_touches == 1 && is_move) {
         console.log(333)
        old_x = old_x + e.mp.changedTouches[0].x - start_position.x;
        old_y = old_y + e.mp.changedTouches[0].y - start_position.y;
      } else if (_touches == 2 && is_move) {
        console.log('old_scale:', old_scale)
        console.log('new_scale1:', new_scale)
        new_scale = old_scale * new_scale;
        console.log('new_scale2:', new_scale)
      }
    },
    handelUploadImg() {
      const screenWidth = wx.getSystemInfoSync().screenWidth;
      // console.log(screenWidth);
      wx.canvasToTempFilePath({
        x: 0,
        y: screenWidth / 750 * (250 + 190),
        width: screenWidth,
        height: screenWidth / 750 * 50,
        destWidth: screenWidth,
        screenHeight: screenWidth / 750 * 50,
        quality: 1,
        canvasId: 'cover-preview',
        success: function (res) {
          //res.tempFilePath即为生成的图片路径
          const tempFilePath = res.tempFilePath
          wx.navigateTo({
            url: `../detail/main?url=${tempFilePath}`
          })
        }
      })
    }
  }
}
</script>


<style lang="scss">
.container{
  width: 750rpx;
  height: 100vh;
  position: relative;
  .cover-preview{
    width: 100%;
    height: 100%;
    background: #000;
  }
  .tip-wrap{
    position: absolute;
    top: 100rpx;
  }
  .btns-wrap{
    position: absolute;
    bottom: 0;
    height: 190rpx;
    background: rgba(0, 0, 0, .8);
    color: #fff;
    width: 100%;
    font-size: 28rpx;
    text-align: center;
    .tip{
      line-height: 80rpx;
    }
    .btn{
      display: inline-block;
      line-height: 70rpx;
      height: 70rpx;
      width: 280rpx;
      background: #ee7c88;
      border-radius: 35rpx;
      margin: 0 30rpx;
    }
  }
}
</style>

