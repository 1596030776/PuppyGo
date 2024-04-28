<template class="box-body">
	<view class="box">
		<view class="father-box">
			<view class="header">
				<image class="img" :src="postInfo.avatar"></image>
				<view class="auth">{{postInfo.nickname}}</view>
<!-- 				<view class="leave">LV{{postInfo.leave}}</view>
				<view class="tag">{{postInfo.tag}}</view> -->
				<view class="time">{{postInfo.createTime}}</view>
			</view>

			<!-- <view class="content">{{postInfo.content}}....<view class="show">点击阅读详细</view>
			</view> -->
      <!-- <img :src="postInfo.image" alt="" /> -->
      <navigator url="/pagesMember/post/post" hover-class="none">
        <image :src="postInfo.imageUrl" style="width: 100%; height: 360upx;" mode="aspectFill" @click="openPost"/>
      </navigator>


			<view class="function">
        <view class="title">
          {{postInfo.title}}
        </view>
				<view class="good">
					<image class="icon-like" src="../../static/tabs/love.png"></image>
					<view style="font-size: 12px;">200</view>
				</view>
			</view>
		</view>
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
    if(props.postInfo != undefined) {
      props.postInfo.createTime = createTime.value
      postStore.setPostInfo(props.postInfo)
    }
  }
</script>

<style>
  .header {
    background-color: #2ea5ff;
    border-radius: 19px 19px 0 0;
    padding-bottom: 8px;
  }

	.low{
		margin-left: 5px;
	}

	.father-box {
		background-color: #FFFFFF;
		box-shadow: #C8C7CC;
		height: 580upx;
		width: 93%;
		margin: 20rpx auto;
		border: 1px solid #999999;
		border-radius: 20px;
	}

	.img {
		margin: 20upx 0px 20upx 50upx;
		height: 90upx;
		width: 90upx;
		border-radius: 90upx;
		border: 1px solid #007AFF;
		display: inline-flex;
	}

	.auth {
		font-weight: bolder;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 15px;
		margin-top: -100upx;
		margin-left: 170upx;
    color: white;
	}


  .title {
    font-weight: bolder;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
  }

  .function {
    display: flex;
    justify-content: space-between;
    margin-top: 20upx;
    padding: 0 18px;
  }

	.time {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 12px;
		display: inline-flex;
		margin-left: 170upx;
		margin-top: -20upx;
		color: white;
	}

	.leave {
		font-size: 12px;
		text-align: center;
		background: #4CD964;
		width: 75upx;
		text-align: center;
		height: 35upx;
		border-radius: 20upx;
		color: #F2F2F2;
		margin-left: 250upx;
		margin-top: -35upx;
	}

	.content {
		display: block;
		font-size: 14px;
		color: #24292E;
		font-style: italic;
		margin-left: 60upx;
		margin-right: 60upx;
		margin-top: 18upx;
		height: 250upx;
		text-indent: 1.5em;
	}

	.nbsp {
		margin-left: 25upx;
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

	.hr {
		width: 100%;
		margin: 25upx auto;
		margin-bottom: 0upx;
		color: #AAAAAA;
		border-color: #ececec;
		border: 0.2rpx solid #999999;
		height: 0.2px;
	}

	.show {
		color: #0081FF;
		margin-top: 12upx;
	}

	.tag {
		font-size: 12px;
		text-align: center;
		background: #36BBFF;
		width: 120upx;
		text-align: center;
		height: 35upx;
		border-radius: 10upx;
		color: #F2F2F2;
		margin-left: 340upx;
		margin-top: -33upx;
	}
</style>
