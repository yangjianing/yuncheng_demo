<template>
  <img :src="imageSrc" alt="">
</template>

<script>
export default {
  data () {
    return {
      imageSrc: ''
    }

  },
  mounted(){
    console.log(this.$root.$mp.query.url)
    this.imageSrc = this.$root.$mp.query.url
    console.log(this.imageSrc)
  }
}
</script>

<style lang="scss">
img{
  width: 750rpx;
  height: 50rpx;
}
</style>
