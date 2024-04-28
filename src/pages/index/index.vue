<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import MyPetList from './components/MyPetList.vue'

// const navigateOut = (index: number) => {
//   uni.navigateTo({ url: petStore.newsList![index].newsUrl })
// }
</script>
<template>
  <scroll-view class="viewport" scroll-y enable-back-to-top>
    <CustomNavbar></CustomNavbar>
    <view class="title pet-matter">
      近期事项
      <image mode="aspectFill" class="title-image" src="../../static/images/list.png"></image>
    </view>
    <view class="matter-cards">
      <view class="pet-matter-card">
        <view class="row-1">
          <view class="left">
            <view class="matter-name">去宠物店剪指甲</view>
            <view class="pet-name">毛毛</view>
          </view>
          <view class="right">
            <image mode="aspectFill" class="matter-image" src="../../static/images/logo_dog.png"></image>
          </view>
        </view>
        <view class="bar">
          <view class="link-top"></view>
        </view>
        <view class="row-2">
          <view class="matter-item matter-time">
            <image mode="aspectFill" class="side-image" src="../../static/images/Calander.png"></image>
            4月28日
          </view>
          <view class="matter-item matter-during">
            <image mode="aspectFill" class="side-image" src="../../static/images/alarm.png"></image>
            15-25 分钟
          </view>
          <view class="matter-item matter-time">
            <image mode="aspectFill" class="side-image" src="../../static/images/map.png"></image>
            洪山区宠物店
          </view>
        </view>
      </view>
    </view>
    <view class="bar">
      <view class="link-top"></view>
    </view>
    <view class="title my-pet">我的宠物<image mode="aspectFill" class="title-image" src="../../static/images/mypet.png"></image></view>
    <MyPetList></MyPetList>
  </scroll-view>
</template>
<style lang="scss">
.title{
  display: flex;
  align-items: center;
  margin: 20rpx 40rpx;
}
.title-image{
  margin-left: auto;
  display: flex;
  align-items: center;
  width: 52rpx;
  height: 52rpx;
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
  width: 95%;
  border-top: solid #f4f4f4 3rpx;
  border-radius: 30rpx;
  margin-bottom: 10rpx;
}
.my-pet {
  font-family: '阿里妈妈东方大楷 Regular';
  font-size: 50rpx;
  font-family: Monospace;
  font-weight: 510;
  letter-spacing: 5rpx;
  color: rgb(32, 32, 32);
}
.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-size: auto;
  display: flex;
  background-color: rgb(248, 248, 248);
}
/*宠物事项 */
.pet-matter{
  font-size: 50rpx;
  font-weight: 510;
  letter-spacing: 5rpx;
  margin-bottom: 20rpx;
  color: rgb(32, 32, 32);
}
.matter-cards{
  display: flex;
  align-items: center;
  justify-content: center;
}
.pet-matter-card{
  width:90%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 20rpx;
  background-color: white;
  padding: 28rpx;
}
.row-1{
  display: flex;
}
.matter-name{
  font-size: 40rpx;
  font-weight: 500;
}
.pet-name{
  font-size: 32rpx;
  color: #bfbfbf;
}
.right{
  margin-left: auto;
}
.matter-image{
  width: 120rpx;
  height: 120rpx;
}

.row-2{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.matter-item{
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 24rpx;
}
.side-image{
  width: 32rpx;
  height: 32rpx;
  margin-left: rpx;
  margin-right: 5rpx;
}
</style>
