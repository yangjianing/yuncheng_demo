<template>
  <div class="container">
    试纸列表项试纸列表项试纸列表项试纸列表项试纸列表项试纸列表项试纸列表项试纸列表项试纸列表项试纸列表项
    <div class="camera-btn" @click="btnShow = !btnShow">拍照</div>
    <div class="btns animated" :class="{'slideInUp': btnShow}">
      <div class="photo-btns">
        <div class="photo-btn" @click="handleTakePhoto">拍照</div>
        <div class="photo-btn" @click="handleChoosePhoto">从相册选取</div>
      </div>
      <div class="cancle-btn" @click="btnShow = !btnShow">取消</div>
    </div>
    <div class="modal animated" @click="btnShow = !btnShow" :class="{'fadeIn': btnShow}"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      btnShow: false
    }
  },
  methods: {
    // 从相册选取照片
    handleChoosePhoto(){
      const self = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success (res) {
          const tempFilePaths = res.tempFilePaths
          wx.navigateTo({
            url: `../choosephoto/main?url=${tempFilePaths}`
          })
        }
      })
    },
    // 照相
    handleTakePhoto(){
      wx.navigateTo({
        url: '../takephoto/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.camera-btn{
  position: fixed;
  bottom: 20rpx;
  right: 20rpx;
  background: #dc5b69;
  color: #fff;
  width: 120rpx;
  height: 120rpx;
  line-height: 120rpx;
  border-radius: 50%;
  text-align: center;
  z-index: 99;
}
.btns{
  position: fixed;
  bottom: 0;
  padding: 10rpx;
  width: 750rpx;
  box-sizing: border-box;
  z-index: 100;
  transform: translate3d(0, 100%, 0);
  .photo-btns{
    border-radius: 10rpx;
    overflow: hidden;
    margin-bottom: 10rpx;
    .photo-btn{
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      display: block;
      color: #dc5b69;
      text-align: center;
      background: #fff;
      &:first-child{
        border-bottom: 1px solid #dadade;
      }
    }
  }
  .cancle-btn{
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    display: block;
    color: #dc5b69;
    text-align: center;
    background: #fff;
    border-radius: 10rpx;
  }
}
.modal{
  width: 750rpx;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
}

</style>

