<template>
  <div class="wx-range">

    <div class="wx-range-content"
        :style="{ 'height': height + 'rpx', 'border-radius': height/2 + 'rpx', 'background-color': progressBgColor, 'marginLeft': height + 'rpx', 'marginRight': height + 'rpx', 'marginTop': btnHeight + 'rpx'}"
       >
      <div class="wx-range-progress"
        :style="{ 'height': height + 'rpx', 'width': progress + '%','border-radius': height/2 + 'rpx', 'background-color': ProgressColor}"></div>
      <div class="drag-wrap"
        @touchstart = "sliderStart"
        @touchmove = "sliderChange"
        @touchend = "sliderEnd">
        <div class="wx-range-runway"
          :style="{ 'height': height * 2 + 'rpx','width': height * 2 + 'rpx','border-radius': height + 'rpx', 'background-color': ProgressColor, 'top': -height / 2 + 'rpx', 'marginLeft': -height + 'rpx', 'left': progress + '%' }"></div>
        <div class="wx-range-thumb"
          :style="{ 'left': progress + '%' , 'width': btnWidth + 'rpx', 'height': btnHeight + 'rpx', top: -(btnHeight+height) + 'rpx', 'marginLeft': -btnWidth / 2 + 'rpx'}"
          >
          T C
          <span class="btn-img"></span>
        </div>
      </div>
    </div>
    <div class="bottom-tip">
      <div class="tip-item" v-for="value in valueTips" :key="value">
        <span class="tip-icon" :style="{'background': value.color}"></span>
        {{value.result}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['height', 'value', 'min', 'max', 'btnWidth', 'btnHeight', 'step', 'valueTips', 'progressBgColor', 'ProgressColor'],
  data() {
    return {
      sliderStartX: 0,
      startValue: 0,
      sliderWidth: 0,
      rangeValue: 0
    }
  },
  computed: {
    progress(){
      return Math.floor((this.rangeValue - this.min) / (this.max - this.min) * 100)
    },
    stepCount(){
      return (this.max - this.min) / this.step;
    }
  },
  mounted() {

    this.getElementWidth('wx-range-content');

    const step = this.valueTips.findIndex((valuetip, index) => {
      return valuetip.result === this.value;
    });
    this.rangeValue = step * this.stepCount;
  },
  methods: {
    getElementWidth (className) {
      const query = wx.createSelectorQuery();
      query.select('.' + className).boundingClientRect(rect => {
        this.sliderWidth = rect.width
      }).exec();
    },
    sliderStart (e) {
      const changedTouches = e.mp.changedTouches[0];
      this.sliderStartX = changedTouches.pageX;
      this.startValue = this.rangeValue;
      // console.log('sliderStartX', this.sliderStartX)
      // console.log('startValue', this.startValue)
    },
    sliderChange (e) {
      const changedTouches = e.mp.changedTouches[0];
      const offsetValue = (changedTouches.pageX - this.sliderStartX) / this.sliderWidth * (this.max - this.min)
      let currentValue = offsetValue + this.startValue;
      if (currentValue > this.max) {
        currentValue = this.max;
      }
      if (currentValue < this.min) {
        currentValue = this.min;
      }
      this.rangeValue = currentValue;
    },
    sliderEnd (e) {
      let step;
      if ((this.progress % this.stepCount) <= (this.stepCount / 2)) {
        step = parseInt (this.progress / this.stepCount);
      }else if((this.progress % this.stepCount) > (this.stepCount / 2)){
        step = (parseInt (this.progress / this.stepCount) + 1);
      }
      this.rangeValue = step * this.stepCount;
      this.$emit('rangeChanged', this.valueTips[step].result)
    }
  }
}
</script>

<style lang="scss" scoped>
.wx-range{
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding-top: 20rpx;
}
.wx-range-content{
  position: relative;
}
.wx-range-runway{
  position: absolute;
}
.wx-range-progress{
  position: absolute;
  top: 0;
  width: 0;
}
.wx-range-thumb{
  position: absolute;
  z-index: 2;
  text-align: center;
  .btn-img{
    display: inline-block;
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    // background: url('/static/images/photo-tip-img.png') no-repeat;
  }
}
.bottom-tip{
  display: flex;
  justify-content: space-between;
  margin: 40rpx -5rpx 0 -5rpx;
  .tip-item{
    width: 50rpx;
    text-align: center;
    .tip-icon{
      display: block;
      width: 10rpx;
      height: 40rpx;
      margin: 0 auto;
    }
  }
}
</style>
