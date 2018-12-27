<template>
  <div class="container">
    <div class="wrap-box paper-info-wrap">
      <div class="title">试纸照片</div>
      <div class="pager-img">
        <img :src="imageSrc">
      </div>
      <div class="paper-info">
        <div class="result">LH参考结果：<span>{{result}}</span></div>
        <div class="tip">推测已排卵，建议同房一次，更准确的信息请参考其他测试结果</div>
      </div>
    </div>
    <div class="wrap-box slide-wrap">
      <div class="title">如果对结果不满意，可以拖动色卡修改</div>
      <div class="slide">
        <WxRange
          :height = "18"
          :progressBgColor = rangeConfig.progressBgColor
          :ProgressColor = rangeConfig.ProgressColor
          :value = "result"
          :min = 0
          :max = 100
          :btnWidth = 80
          :btnHeight = 100
          :step = 5
          :valueTips = rangeConfig.valueTips
          @rangeChanged = "rangeChanged" ></WxRange>
      </div>
    </div>
    <div class="wrap-box time-info-wrap">
      <div class="title">
        检测时间
        <span class="time">{{year}}年{{month}}月{{date}}日 {{time}}</span>
      </div>
    </div>
    <div class="save-btn" @click="handleSubmit">保存</div>
  </div>
</template>

<script>

import { post,showModal } from '@/utils/utils'
import WxRange from '@/components/WxRange'
import config from '@/config'

export default {
  data () {
    return {
      imageSrc: '',
      imgCode: null,
      result: 0,
      testTime: 0,
      rangeConfig: {
        progressBgColor: '#e8e8e8',
        ProgressColor: '#ff7486',
        valueTips: [{
          'result': 0,
          'color': '#f7f0f0'
        },{
          'result': 5,
          'color': '#fde1eb'
        },{
          'result': 10,
          'color': '#deb9ca'
        },{
          'result': 25,
          'color': '#c2859a'
        },{
          'result': 45,
          'color': '#a05e74'
        },
        {
          'result': 65,
          'color': '#894058'
        }]
      }
    }
  },
  mounted(){
    this.imageSrc = wx.getStorageSync('imgUrl')
    const self = this
    // 图片转码上传获取结果值
    this.convertImgurlToBase64(this.imageSrc, async data => {
      self.imgCode = data
      // 图片上传 返回 试纸数据
      const postData = {
        "appId": 501,
        "appVersion": "1.0",
        "deleted": 0,
        "file": data,
        "lhPaperId" : "621FC360-44AD-4427-9E67-064340B21B39",
        "lhTime" : "2018-09-10 17:48:26",
        "lhType" : 7,
        "lhValue" : "-1",
        "source" : "yuncheng",
        "userId" : "231501"
      }
      try {
        const result = await post(config.getResultUrl, postData)
        self.result = result.lhValue
      } catch (e) {
        showModal('失败', e.msg)
      }
    })
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    month () {
      return new Date().getMonth() + 1
    },
    date () {
      return new Date().getDate()
    },
    time() {
      const now = new Date();
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const time = `${hours >= 12 ? '下午' : '上午'}${hours > 12 ? hours -12 :hours}:${minutes < 10 ? '0' : ''}${minutes}`
      this.testTime = new Date().getTime();
      return time
    }
  },
  methods: {
    convertImgurlToBase64(imgUrl, callback){
      // 上传照片转base64编码
      wx.getFileSystemManager().readFile({
        filePath: imgUrl,
        encoding: 'base64',
        success: res => {
          callback(res.data)
        }
      })
    },
    rangeChanged (value) {
      this.result = value;
    },
    async handleSubmit(){
      const self = this;
      const postData = {
        imgCode: self.imgCode,
        resultValue: self.result,
        openId: 123123123,
        time: self.testTime
      }
      // todo
      console.log('submitData', postData)
      wx.navigateTo({
        url: '/pages/index/main'
      })
      // await post(config.submitUrl, postData);
      // try {
      //   const result = await post('/???/???', data)
      // } catch (e) {
      //   showModal('失败', e.msg)
      // }
    }
  },
  components: {
    WxRange
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: #ddd;
  padding-top: 20rpx;
  .wrap-box{
    background: #fff;
    margin-bottom: 20rpx;
    padding: 0 20rpx;
    .title{
      line-height: 100rpx;
      height: 100rpx;
      font-size: 36rpx;
    }
  }
  .paper-info-wrap{
    padding-bottom: 30rpx;
    .pager-img{
      width: 750rpx;
      margin: 0 -20rpx;
      height: 70rpx;
      background: #616161;
      img{
        height: 50rpx;
        margin-top: 10rpx;
        width: 100%;
      }
    }
    .paper-info{
      .result{
        font-size: 32rpx;
        line-height: 80rpx;
        height: 80rpx;
        span{
          color: #ff7486;
        }
      }
      .tip{
        font-size: 28rpx;
      }
    }
  }
  .time-info-wrap{
    position: relative;
    .time{
      color: #ff7486;
      position: absolute;
      right: 20rpx;
    }
  }
  .save-btn{
    position: fixed;
    bottom: 30rpx;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to right, #ff777f, #ff846c);
    border: none;
    border-radius: 50rpx;
    height: 85rpx;
    line-height: 85rpx;
    text-align: center;
    display: inline-block;
    width: 440rpx;
    color: #fff;
    font-size: 42rpx;
  }
  .slide-wrap{
    padding-bottom: 30rpx;
    .slide{
      margin: 0 10rpx;
    }
  }
}

</style>
