<template>
  <div class="container">
    <div class="circle-list">
      <div class="circle-list-item">
        <div class="circle-title">2018年10月8日 - 2018年10月30日</div>
        <div class="paper-list">

          <div class="paper-daily-list">
            <div class="date-info">
              <div class="date">15</div>
              <div>
                <span class="month">8月</span>
                <span class="tip">第9天</span>
              </div>
            </div>
            <div class="paper-items">
              <div class="paper">
                <span class="time">下午4:11</span>
                <div class="img">
                  <img src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg">
                </div>
                <div class="info" :style="{background:'#fbdbe6'}">LH 0 无</div>
              </div>
              <div class="paper">
                <span class="time">下午4:11</span>
                <div class="img">
                  <img src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg">
                </div>
                <div class="info" :style="{background:'#fbdbe6'}">LH 5 无</div>
              </div>
            </div>
          </div>

          <div class="paper-daily-list">
            <div class="date-info">
              <div class="date">15</div>
              <div>
                <span class="month">8月</span>
                <span class="tip">第9天</span>
              </div>
            </div>
            <div class="paper-items">
              <div class="paper">
                <span class="time">下午4:11</span>
                <div class="img">
                  <img src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg">
                </div>
                <div class="info" :style="{background:'#fcbdd2'}">LH 10 阴性</div>
              </div>
              <div class="paper">
                <span class="time">下午4:11</span>
                <div class="img">
                  <img src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg">
                </div>
                <div class="info" :style="{background:'#fe99bb'}">LH 25 阳性</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="circle-list-item">
        <div class="circle-title">2018年10月8日 - 2018年10月30日</div>
        <div class="paper-list">

          <div class="paper-daily-list">
            <div class="date-info">
              <div class="date">15</div>
              <div>
                <span class="month">12月</span>
                <span class="tip">第19天</span>
              </div>
            </div>
            <div class="paper-items">
              <div class="paper">
                <span class="time">下午4:11</span>
                <div class="img">
                  <img src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg">
                </div>
                <div class="info" :style="{background:'#ff6287'}">LH 45 强阳</div>
              </div>
            </div>
          </div>

          <div class="paper-daily-list">
            <div class="date-info">
              <div class="date">15</div>
              <div>
                <span class="month">8月</span>
                <span class="tip">无周期</span>
              </div>
            </div>
            <div class="paper-items">
              <div class="paper">
                <span class="time">下午4:11</span>
                <div class="img">
                  <img src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg">
                </div>
                <div class="info" :style="{background:'#ff6287'}">LH 65 强阳</div>
              </div>
              <div class="paper">
                <span class="time">下午4:11</span>
                <div class="img">
                  <img src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg">
                </div>
                <div class="info" :style="{background:'#ff6287'}">LH 65 强阳</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="camera-btn iconfont icon-camera1" @click="toggleBtn"></div>
    <div class="btns" :animation="animationSlide">
      <div class="photo-btns">
        <div class="photo-btn" @click="handleTakePhoto">拍照</div>
        <div class="photo-btn" @click="handleChoosePhoto">从相册选取</div>
      </div>
      <div class="cancle-btn" @click="toggleBtn">取消</div>
    </div>
    <div class="modal" :animation="animationFade" @click="hideModal"></div>
  </div>
</template>

<script>
import { get, showModal, getElementHeight } from "@/utils/utils";
import config from '@/config'
export default {
  data() {
    return {
      btnShow: false,
      btnHeight: 0,
      animationFade: "",
      animationSlide: ""
    };
  },
  mounted(){
    this.getList()
  },
  onShow(){
    this.btnShow = false
  },
  onReady() {
    const self = this
    getElementHeight("btns", function(height) {
      self.btnHeight = height
    })
  },
  methods: {
    async getList(){
      console.log(config.getListUrl)
      // const pagerList = await get(config.getListUrl);
    },
    // 照相按钮切换
    toggleBtn() {
      if (!this.btnShow) {
        this.slideUp()
        this.fadeIn()
      } else {
        this.slideDown()
        this.fadeOut()
      }
      this.btnShow = !this.btnShow
    },
    hideModal() {
      if (this.btnShow) {
        this.toggleBtn()
      }
    },
    fadeIn() {
      const animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      animation.opacity(1).step()
      this.animationFade = animation.export()
    },
    fadeOut() {
      const animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      animation.opacity(0).step()
      this.animationFade = animation.export()
    },
    slideUp() {
      const animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      animation.translateY(0).step()
      this.animationSlide = animation.export()
    },
    slideDown() {
      const animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      animation.translateY(this.btnHeight).step()
      this.animationSlide = animation.export()
    },
    // 从相册选取照片
    handleChoosePhoto() {
      const self = this
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success(res) {
          const tempFilePaths = res.tempFilePaths
          wx.navigateTo({
            url: `../choosephoto/main?url=${tempFilePaths}`
          })
        }
      })
      this.toggleBtn()
    },
    // 照相
    handleTakePhoto() {
      wx.navigateTo({
        url: "../takephoto/main"
      })
      this.toggleBtn()
    }
  }
}
</script>

<style lang="scss" scoped>

.circle-list {
  background: #ccc;
  .circle-title {
    font-size: 32rpx;
    padding: 0 20rpx;
    height: 70rpx;
    line-height: 70rpx;
  }
  .paper-list {
    background: #fff;
    .paper-daily-list {
      border-bottom: 1px solid #ddd;
      display: flex;
      &:last-child{
        border: none;
      }
      .date-info {
        width: 170rpx;
        display: flex;
        text-align: center;
        margin: 0 10rpx;
        justify-content: space-between;
        span {
          display: block;
        }
        .date {
          width: 80rpx;
          font-size: 60rpx;
          font-weight: bold;
        }
        .month {
          font-size: 24rpx;
          margin-top: 10rpx;
        }
        .tip {
          font-size: 20rpx;
          color: #a5a4a4;
        }
      }
      .paper-items {
        width: 580rpx;
        background: #5c5b5b;
        .paper {
          position: relative;
          display: flex;
          height: 100rpx;
          border-bottom: 1px solid #fff;
          &:last-child{
            border: none;
          }
          .time {
            position: absolute;
            top: 0;
            left: 0;
            width: 100rpx;
            background: rgba(0, 0, 0, .7);
            line-height: 100rpx;
            font-size: 24rpx;
            color: #fff;
            text-align: center;
            display: block;
          }
          .img {
            height: 50rpx;
            margin-top: 25rpx;
            overflow: hidden;
            width: 480rpx;
          }
          .info {
            width: 100rpx;
            font-size: 28rpx;
            color: #fff;
            background: #ff9797;
            text-align: center;
            padding-top: 15rpx;
            line-height: 36rpx;
          }
        }
      }
    }
  }
}

.camera-btn {
  position: fixed;
  bottom: 20rpx;
  right: 20rpx;
  background: linear-gradient(to right top, #ff777f, #ff846c);
  color: #fff;
  width: 120rpx;
  height: 120rpx;
  line-height: 120rpx;
  border-radius: 50%;
  text-align: center;
  font-size: 48rpx;
  z-index: 99;
}
.btns {
  position: fixed;
  bottom: 0;
  padding: 10rpx;
  width: 750rpx;
  box-sizing: border-box;
  z-index: 100;
  transform: translateY(100%);
  color: #ff7486;
  .photo-btns {
    border-radius: 10rpx;
    overflow: hidden;
    margin-bottom: 10rpx;
    .photo-btn {
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      display: block;
      text-align: center;
      background: #fff;
      &:first-child {
        border-bottom: 1px solid #dadade;
      }
    }
  }
  .cancle-btn {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    display: block;
    text-align: center;
    background: #fff;
    border-radius: 10rpx;
  }
}
.modal {
  width: 750rpx;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>

