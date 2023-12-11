<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync()
const now = new Date()
const weekInfo = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
</script>

<template>
  <view class="container">
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }"></view>
    <view class="navbar">
      <!-- logo文字 -->
      <view class="top-date">
        <view class="date"
          >{{ now.getMonth() + 1 }}月{{ now.getDate() }}日 {{ weekInfo[now.getDay() - 1] }}</view
        >
        <view class="today">宠物新闻</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@font-face {
  font-family: '阿里妈妈刀隶体 Regular';
  font-weight: 400;
  src: url('//at.alicdn.com/wf/webfont/9edW9TPe7adf/nSsvIQ90FwF9.woff2') format('woff2'),
    url('//at.alicdn.com/wf/webfont/9edW9TPe7adf/BhJYLrMOaAhY.woff') format('woff');
  font-display: swap;
}

@font-face {
  font-family: '阿里妈妈东方大楷 Regular';
  font-weight: 400;
  src: url('//at.alicdn.com/wf/webfont/9edW9TPe7adf/75iyijn15s6K.woff2') format('woff2'),
    url('//at.alicdn.com/wf/webfont/9edW9TPe7adf/D6aEx30EIe3p.woff') format('woff');
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
        font-family: '阿里妈妈东方大楷 Regular';
      }
      .today {
        font-size: 68rpx;
        font-family: '阿里妈妈东方大楷 Regular';
      }
    }
  }
}
</style>
