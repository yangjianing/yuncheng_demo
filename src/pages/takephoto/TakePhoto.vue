<template>
  <div class="container">
    <div class="camera-wrap">
      <camera device-position="back" binderror="error" :flash="cameraFlash" style="width: 750rpx;height: 75vh">
        <ChoosePhotoTip :toTop="toTop"></ChoosePhotoTip>
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
      <div class="takephoto-btn iconfont icon-ico1" @click="takePhoto"></div>
      <div class="cancle-btn" @click="handleCancle">取消</div>
      <div class="flash-btn iconfont" @click="toggleFlashBtn" :class="cameraFlash==='on' ? 'icon-shanguangdengdakai' : 'icon-shanguangdengguanbi'"></div>
    </div>
  </div>
</template>

<script>

import ChoosePhotoTip from '@/components/ChoosePhotoTip'
import { uploadImg } from '@/utils/utils'

export default {
  data () {
    return {
      imageSrc: '',
      cameraFlash: 'on',
      isCreatedCanvas: false,
      toTop: 250
    }
  },
  components: {
    ChoosePhotoTip
  },
  methods: {
    takePhoto(){
      const ctx = wx.createCameraContext('cover-preview')
      const self = this
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          self.isCreatedCanvas = true
          self.imageSrc = res.tempImagePath
          self.setCanvas()
        }
      })
    },
    toggleFlashBtn() {
      if (this.cameraFlash === 'on') {
        this.cameraFlash = 'off'
      }else {
        this.cameraFlash = 'on'
      }
    },
    setCanvas(){
      const ctx = wx.createCanvasContext('cover-preview')
      const self = this
      wx.getImageInfo({
        src: self.imageSrc,
        success: function (res) {
          ctx.drawImage(self.imageSrc, 0, 0, 375, res.height / res.width * 375);
          ctx.draw(false, () => {
            uploadImg('cover-preview')
          });
        }
      })
    },
    handleCancle(){
      wx.navigateBack()
    }
  },
  onHide(){
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
  line-height: 25vh;
  width: 750rpx;
  background: #000;
  position: relative;
  .takephoto-btn{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 150rpx;
    color: #fff;
  }
  .flash-btn{
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 100rpx;
    font-size: 60rpx;
    color: #fff;
  }
  .cancle-btn{
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 100rpx;
    font-size: 30rpx;
    color: #fff;
  }
}
</style>

