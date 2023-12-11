<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import MyPetList from './components/MyPetList.vue'

const list = [
  {
    image: 'https://f.chongwunet.com/chongwunet/202312/0f/4b35ec7438b783.png',
    title: '点指名犬——你所不知道的彭布罗克威尔士柯基',
  },
  {
    image: 'https://f.chongwunet.com/chongwunet/202312/8a/27d1c38426d140.png',
    title: '为什么说章鱼是外星生物？读完你就服了！',
  },
  {
    image: 'https://f.chongwunet.com/chongwunet/202312/5c/cbcb79d3d50a4e.png',
    title: '家养蜥蜴饲养小技巧',
  },
]
</script>
<template>
  <CustomNavbar></CustomNavbar>
  <view class="wrap">
    <u-swiper
      title="true"
      bg-color="#fff"
      height="400"
      :list="list"
      border-radius="22"
      :effect3d="true"
    ></u-swiper>
  </view>
  <MyPetList></MyPetList>
</template>
<style lang="scss">
//
</style>
