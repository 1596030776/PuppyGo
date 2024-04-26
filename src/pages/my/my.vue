<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { usePetStore } from '@/stores/modules/pet'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const memberStore = useMemberStore()
const petStore = usePetStore()
</script>

<template>
  <scroll-view class="viewport" scroll-y enable-back-to-top>
    <!-- 个人资料 -->
    <view class="profile" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <view class="top-bar">个人资料</view>
      <!-- 情况1：已登录 -->
      <view class="overview" v-if="memberStore.profile">
        <navigator url="/pagesMember/profile/profile" hover-class="none">
          <image class="avatar" mode="aspectFill" :src="memberStore.profile.avatar"></image>
        </navigator>
        <view class="meta">
          <view class="nickname">{{
            memberStore.profile!.nickname || memberStore.profile.nikename
          }}</view>
        </view>
        <navigator class="extra" url="/pagesMember/profile/profile" hover-class="none">
          <text class="update">更新用户资料</text>
          <image class="bianji" src="../../static/images/编辑-线.png" mode="scaleToFill" />
        </navigator>
        <view class="button-bar">
          <view class="button-item">
            <image class="fake-button" src="../../static/images/pin-线.png" mode="scaleToFill" />
            管理
          </view>
          <a class="roll">|</a>
          <view class="button-item">
            <image class="fake-button" src="../../static/images/分享-线.png" mode="scaleToFill" />
            分享
          </view>
          <a class="roll">|</a>
          <navigator class="settings" url="/pagesMember/settings/settings" hover-class="none">
            <view class="button-item">
              <image class="fake-button" src="../../static/images/设置-线.png" mode="scaleToFill" />
              设置
            </view>
          </navigator>
        </view>
      </view>
      <!-- 情况2：未登录 -->
      <view class="overview" v-else>
        <navigator url="/pages/login/login" hover-class="none">
          <image
            class="avatar gray"
            mode="aspectFill"
            src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png"
          ></image>
        </navigator>
        <view class="meta">
          <navigator url="/pages/login/login" hover-class="none" class="nickname">
            未登录
          </navigator>
          <view class="extra">
            <text class="tips">点击登录账号</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 宠物列表 -->
    <view class="btn-grad">
      <navigator url="/pagesMember/logpet/logpet" hover-class="none"
        ><image class="add-logo" src="../../static/images/添加-线.png" mode="scaleToFill" />
        登记宠物
      </navigator></view
    >
    <view class="data-title">数据</view>
    <view class="sum-info">
      <view class="data-item">
        <image class="data-image" src="../../static/images/pet.png"> </image>
        <view class="data-data">{{ petStore.petsInfo?.length }}</view>
        <view class="data-danwei">只</view>
      </view>
      <view class="data-item">
        <image class="data-image" src="../../static/images/通知.png"> </image>
        <view class="data-data">23</view>
        <view class="data-danwei">次</view> </view
      ><view class="data-item">
        <image class="data-image" src="../../static/images/eye.png"> </image>
        <view class="data-data">26</view>
        <view class="data-danwei">天</view>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss">
.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-size: auto;
  display: flex;
  justify-content: center;
}

.top-bar {
  font-family: sans-serif;
  font-weight: bold;
  padding-top: 20rpx;
  padding-left: 50rpx;
}

/* 用户信息 */
.profile {
  .extra {
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    padding: 18rpx;
    border-radius: 70px;
    color: white;
    background-color: #518dfd;
    align-items: center;
    justify-content: center;
    .update {
      display: flex;
      align-items: center;
      letter-spacing: normal;
    }
    .bianji {
      width: 42rpx;
      height: 42rpx;
    }
  }
  .fake-button {
    width: 62rpx;
    height: 62rpx;
  }
  .button-item {
    padding: 42rpx;
    display: flex;
    flex-direction: column;
  }
  .button-item:first-child:before {
    display: none;
  }
  .button-bar {
    margin-top: 30rpx;
    font-family: sans-serif;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .roll {
    color: rgba(196, 196, 194, 0.874);
    font-size: 52rpx;
  }
  .avatar {
    width: 180rpx;
    height: 180rpx;
    margin-bottom: 20rpx;
    border-radius: 50%;
  }
  .overview {
    margin-top: 120rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

/* 我的宠物 */
.pets {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 50rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
}

.btn-grad {
  //background-image: linear-gradient(to right, #77a1d3 0%, #79cbca 51%, #77a1d3 100%);
  background-color: #518dfd;
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 7px;
  display: block;
}

.btn-grad-hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
.add-logo {
  height: 40rpx;
  width: 40rpx;
}
.data-title {
  margin-left: 50rpx;
  margin-bottom: 50rpx;
  margin-top: 40rpx;
  font-family: sans-serif;
  font-weight: bold;
}

.nickname {
  font-family: sans-serif;
  font-weight: bold;
}
.sum-info {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10rpx;
  display: flex;
  justify-content: space-around;
  width: 90%;
  border-radius: 8rpx;
  padding: 24rpx;
  box-shadow: rgba(237, 239, 243, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}
.data-image {
  height: 66rpx;
  width: 66rpx;
}
.data-item {
  font-family: sans-serif;
  font-weight: bold;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
}
</style>
