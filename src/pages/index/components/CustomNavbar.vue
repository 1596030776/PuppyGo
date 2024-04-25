<script setup lang="ts">
import { usePetStore } from '@/stores/modules/pet'

const petStore = usePetStore()
const { safeAreaInsets } = uni.getSystemInfoSync()
const now = new Date()
const weekInfo = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
</script>

<template>
  <view class="container">
    <view class="top-section" :style="{ paddingTop: 50 + 'px' }"></view>
    <view class="navbar">
      <!-- logo文字 -->
      <view class="top-date">
        <view>
          <view class="date"
            >{{ now.getMonth() + 1 }}月{{ now.getDate() }}日 {{ weekInfo[now.getDay() - 1] }}</view
          >
          <view class="today">宠物新闻</view>
        </view>
        <view class="news-icon"></view>
      </view>
      <view class="wrap">
        <u-swiper
          title="true"
          height="630"
          :list="petStore.newsList"
          border-radius="22"
          :effect3d="true"
          bgColor="none"
        ></u-swiper>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
/* 自定义导航条 */
.container {
  height: 65vh;
  .indicator{
    top: 200rpx !important;
    margin-top: 200rpx;
    &__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;
      margin-top: 200rpx !important;
			&--active {
				background-color: #ffffff;
			}
		}
  }
  .top-section{
    background-color: #7DE2FC;
    height: 40vh;
    border-radius: 0 0 60px 60px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  }
  .navbar {
    top:-35vh;
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    .top-date {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 40rpx;
      margin-bottom: 60rpx;
      font-weight: 600;
      .date {
        color: rgba(0, 0, 0, 0.47);
      }
      .today {
        font-size: 50rpx;
        font-family: Monospace;
        font-weight: 510;
        letter-spacing: 5rpx;
        color: rgb(32, 32, 32);
      }
      .news-icon{
        margin-right: 42rpx;
        width: 82rpx;
        height: 82rpx;
        border-radius: 50%;
        background: url("../../..//static/images/news_hot.png") center center no-repeat;
        background-size: 26px 26px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
        background-color: white;
      }
    }
  }

}
</style>
