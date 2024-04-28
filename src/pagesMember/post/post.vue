<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { usePostStore } from '@/stores/modules/post'
  import { useMemberStore } from '@/stores'
  import { onLoad, onShow } from "@dcloudio/uni-app"
  // 获取屏幕边界到安全区域距离
  const { safeAreaInsets } = uni.getSystemInfoSync()
  const postStore = usePostStore()
  const postInfo = postStore.postInfo
  const memberStore = useMemberStore()

  const detail = reactive({
    commentList: []
  })

  const comment = () => {
    console.log('-评论-')
  }

  const reply = (item) => {
    console.log('-回复-', item)
  }

  const newComment = ref(''); // 用户输入的评论内容

  const submitComment = () => {
    // 清空输入框
    const content = newComment.value;
    // 获取当前时间戳
    var timestamp = Date.now();
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从 0 开始，因此要加 1
    var day = ('0' + date.getDate()).slice(-2);
    var formattedDate = year + '-' + month + '-' + day;

    const comment = {
      id: 2,
      userId: memberStore.profile.userId,
      userName: memberStore.profile.nikename,
      portrait: memberStore.profile.avatar,
      time: "2024-4-28",
      content: content
    }
    detail.commentList.push(comment)
    newComment.value = '';
  }

  onShow(() => {
   console.log(postInfo)

  })
</script>

<template>
  <view :style="{ paddingTop: safeAreaInsets!.top + 'px' }"></view>
  <view class="header">
    <image class="img" :src="postInfo.avatar"></image>
    <view class="auth">{{postInfo.nickname}}</view>
    <view class="time">{{postInfo.createTime[0]}}年{{postInfo.createTime[1]}}月{{postInfo.createTime[2]}}日  {{postInfo.createTime[3]}}：{{postInfo.createTime[4]}}</view>
  </view>
  <view class="image">
    <image :src="postInfo.imageUrl" style="width: 100%; height: 450upx; margin-top: 8px;" mode="aspectFill" />
  </view>
  <view style="padding: 0 12px; margin-top: 8px;">
    <view class="title">
      {{postInfo.title}}
    </view>
    <view class="content">
      {{postInfo.content}}
    </view>
  </view>

 <view>
    <comment-list :detail="detail" @reply="reply" @comment="comment"></comment-list>
  </view>
  <view style="height: 100upx"></view>

  <view class="fixed-input">
    <input class="input-area" type="text" v-model="newComment" placeholder="请输入评论" />
    <button @click="submitComment" class="submit-btn">发送</button>
  </view>
</template>

<style lang="scss">
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
    font-size: 20px;
    margin-top: -100upx;
    margin-left: 170upx;
  }

  .time {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    display: inline-flex;
    margin-left: 170upx;
    margin-top: -20upx;
    color: #808080;
  }

  .title {
    font-weight: bolder;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 22px;
  }

  .content {
    display: block;
    font-size: 15px;
    color: #24292E;
    font-style: italic;
    margin-left: 10upx;
    margin-right: 10upx;
    margin-top: 10upx;
  }

  .fixed-input {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100upx;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .input-area {
    width: 75%;
    margin-left: 15px;
  }

  .submit-btn {
    background-color: #21a1f5;
    width: 20%;
    color: white
  }
</style>
