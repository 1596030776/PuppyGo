<template class="box-body">
  <view class="box">
    <view class="father-box">
      <view class="header">
        <view>
          <image class="img" :src="postInfo.avatar"></image>
        </view>
        <view class="auth">{{postInfo.nickname}}</view>
        <view class="time">{{postInfo.createTime[0]}}年{{postInfo.createTime[1]}}月{{postInfo.createTime[2]}}日
          {{postInfo.createTime[3]}}：{{postInfo.createTime[4]}}
        </view>
      </view>

      <navigator url="/pagesMember/post/post" hover-class="none" class="body" @click="openPost">
        <view class="text">
          <view class="title">
            {{postInfo.title}}
          </view>
          <view class="content">
            {{postInfo.content}}
          </view>
        </view>
        <view>
          <image :src="postInfo.imageUrl" style="width: 200upx; height: 200upx; border-radius: 10px" mode="aspectFill" />
        </view>
      </navigator>


      <!-- <view class="function">
				<view class="good">
					<image class="icon-like" src="../../static/tabs/love.png"></image>
					<view style="font-size: 12px;">0</view>
				</view>
			</view> -->
    </view>
    <hr />
  </view>
</template>

<script setup lang="ts">
  // import type { PostInfo } from '@/types/post'
  import { reactive, ref } from 'vue';
  import { usePostStore } from '@/stores/modules/post'
  const postStore = usePostStore()
  const props = defineProps({
    postInfo: Object
  })

  const openPost = () => {
    if (props.postInfo != undefined) {
      postStore.setPostInfo(props.postInfo)
    }
  }
</script>

<style>
  .header {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .body {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .father-box {
    background-color: #FFFFFF;
    box-shadow: #C8C7CC;
    width: 100%;
  }

  .img {
    margin: 10px 10px 10upx 10upx;
    height: 60upx;
    width: 60upx;
    border-radius: 90upx;
    border: 1px solid #007AFF;
    display: inline-flex;
  }

  .auth {
    font-weight: bolder;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
  }

  .time {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    display: inline-flex;
    margin-left: 10px;
  }

  .title {
    font-weight: bolder;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 17px;
    display: -webkit-box;
    width: 480upx;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content {
    display: block;
    font-size: 14px;
    color: #24292E;
    font-style: italic;
    text-indent: 1.5em;
    width: 480upx;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .function {
    display: flex;
    justify-content: space-between;
    margin-top: 20upx;
    padding: 0 18px;
  }

  .icon-like {
    height: 35upx;
    width: 35upx;
  }

  .good {
    display: flex;
    align-items: center;
  }

  .good view {
    font-size: 12px;
    margin-left: 20upx;
    color: #6D6D72;
    text-align: center;
  }
</style>
