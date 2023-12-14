<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import MyPetList from './components/MyPetList.vue'
import { usePetStore } from '@/stores/modules/pet'

// const navigateOut = (index: number) => {
//   uni.navigateTo({ url: petStore.newsList![index].newsUrl })
// }
const petStore = usePetStore()
</script>
<template>
  <scroll-view class="viewport" scroll-y enable-back-to-top>
    <CustomNavbar></CustomNavbar>
    <view class="wrap">
      <u-swiper
        title="true"
        bg-color="#fff"
        height="700"
        :list="petStore.newsList"
        border-radius="22"
        :effect3d="true"
      ></u-swiper>
    </view>
    <view class="bar">
      <view class="link-top"></view>
    </view>
    <view class="my-pet">我的宠物</view>
    <MyPetList></MyPetList>
  </scroll-view>
</template>
<style lang="scss">
@font-face {
  font-family: '阿里妈妈东方大楷 Regular';
  font-weight: 400;
  src: url('//at.alicdn.com/wf/webfont/9edW9TPe7adf/HeqZ4L2P0112.woff2') format('woff2'),
    url('//at.alicdn.com/wf/webfont/9edW9TPe7adf/vxeZ094J2OLz.woff') format('woff');
  font-display: swap;
}
.wrap {
  margin-bottom: 40rpx;
}
.bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-top {
  width: 80%;

  border-top: solid #a1bcdd 3px;
  border-radius: 30rpx;
}
.my-pet {
  font-family: '阿里妈妈东方大楷 Regular';
  margin: 40rpx;
  font-size: 50rpx;
}
.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-size: auto;
  display: flex;
  background-color: rgb(248, 248, 248);
}
</style>
