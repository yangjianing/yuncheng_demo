<template>
  <cover-view class="container">
    <cover-view class="top-tip">请对齐虚线</cover-view>
    <!-- <cover-image class="tip-img" src="/static/images/photo-tip-img.png"></cover-image> -->
    <cover-view class="croper-cover">试纸宽度 </cover-view>
  </cover-view>
</template>

<style lang="scss" scoped>
.container{
  width: 730rpx;
  height: 260rpx;
  position: absolute;
  box-sizing: border-box;
  margin: 0 10rpx;
  top: 250rpx;
  .top-tip{
    font-size: 42rpx;
    color: #eafa12;
    text-align: center;
  }
  .tip-img{
    position: absolute;
    width: 100%;
    height: 180rpx;
    top: 80rpx;
  }
  .croper-cover{
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #ff7587;
    height: 50rpx;
    line-height: 50rpx;
    text-align: right;
    color: #ff7587;
    position: absolute;
    top: 190rpx;
    box-sizing: border-box;
    font-size: 28rpx;
  }
}
</style>
