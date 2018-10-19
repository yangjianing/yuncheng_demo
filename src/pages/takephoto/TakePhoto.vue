<template>
  <div class="container">
    <div class="camera-wrap">
      <camera device-position="back" binderror="error" style="width: 750rpx;height: 75vh">
        <!-- <cover-view class="tip-wrap"> -->
          <ChoosePhotoTip :toTop="toTop"></ChoosePhotoTip>
        <!-- </cover-view> -->
        <cover-view class="tip-text">为了避免试纸失效，请在15分钟以内拍照</cover-view>
        <canvas
          class="cover-preview"
          canvas-id="cover-preview"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          v-if="isCreatedCanvas">
        </canvas>
      </camera>
    </div>
    <div class="btns-wrap">
      <div class="takephoto-btn" @click="takePhoto"></div>
    </div>
  </div>
</template>

<script>

const ctx = wx.createCanvasContext('cover-preview');
import ChoosePhotoTip from '@/components/ChoosePhotoTip'

export default {
  data () {
    return {
      imageSrc: '',
      isCreatedCanvas: false,
      toTop: 250
    }
  },
  components: {
    ChoosePhotoTip
  },
  methods: {
    takePhoto(){
      const ctx = wx.createCameraContext()
      const self = this
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          self.isCreatedCanvas = true
          self.imageSrc = res.tempImagePath
          console.log(444444, self.imageSrc)
          this.setCanvas()
        }
      })
    },
    setCanvas(){
      const self = this
      wx.getImageInfo({
        src: this.imageSrc,
        success: function (res) {
          ctx.drawImage(self.imageSrc, 0, 0, 375, res.height / res.width * 375);
          ctx.draw(false, () => {
            self.handelUploadImg()
          });
        }
      })
    },
    handelUploadImg() {
      console.log('handelUploadImg')
      const screenWidth = wx.getSystemInfoSync().screenWidth;
      console.log(screenWidth);
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
          console.log('handelUploadImg-success')
          //res.tempFilePath即为生成的图片路径
          const tempFilePath = res.tempFilePath
          wx.navigateTo({
            url: `../detail/main?url=${tempFilePath}`
          })
        }
      })
    }
  },
  onHide(){
    console.log('onHide')
    this.isCreatedCanvas = false
  }
}

</script>


<style lang="scss">
.camera-wrap{
  position: relative;
  width: 750rpx;
  height: 75vh;
  .cover-preview{
    width: 100%;
    height: 100%;
    background: #000;
  }
  // .tip-wrap{
  //   position: absolute;
  //   top: 250rpx;
  //   width: 100%;
  // }
  .tip-text{
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    line-height: 100rpx;
    color: #fff;
    font-size: 32rpx;
    span{
      color: #f5ea4e;
      margin: 0 5rpx;
    }
  }
}
.btns-wrap{
  height: 25vh;
  line-height: 30vh;
  width: 750rpx;
  background: #000;
  position: relative;
  .takephoto-btn{
    display: inline-block;
    width: 120rpx;
    height: 120rpx;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
}
</style>

