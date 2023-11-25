<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view class="container">
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }"></view>
    <view class="navbar">
      <!-- logo文字 -->
      <view class="top-date">
        <view class="date">11月25日 星期六</view>
        <view class="today">Today</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@font-face {
  font-family: '阿里巴巴普惠体 2.0 85 Bold';
  font-weight: 700;
  src: url('//at.alicdn.com/wf/webfont/9edW9TPe7adf/wlOQAJsxV9wl.woff2') format('woff2'),
    url('//at.alicdn.com/wf/webfont/9edW9TPe7adf/UeonckFyQWDy.woff') format('woff');
  font-display: swap;
}
/* 自定义导航条 */
.container {
  background-image: linear-gradient(to bottom, #72b8ee, #a5c7f4, #cbd7f7, #e8eafb, #ffffff);
  height: 300rpx;
  .navbar {
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    .top-date {
      margin-left: 40rpx;
      .date {
        color: #969696;
        font-family: '阿里巴巴普惠体 2.0 85 Bold';
      }
      .today {
        font-size: 82rpx;
        font-family: '阿里巴巴普惠体 2.0 85 Bold';
      }
    }
  }
}
</style>
