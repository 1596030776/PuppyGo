<template>
  <view class="post-list-title" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <view @click="newPost">
      帖子列表
    </view>
    <image src="../../static/tabs/newPost.png" style="width: 25px; height: 25px; margin-top: 10px;" @click="newPost"></image>
  </view>
  <view class="post-list-container">
    <div class="test-component">
      <card v-for="postInfo in postList" :postInfo="postInfo"></card>
    </div>
  </view>
</template>

<script setup lang="ts">
  import type { PostList } from '@/types/post'
  import { reactive, ref } from 'vue';
  import card from '@/components/list-card/list-card.vue'
  import { onLoad, onShow } from "@dcloudio/uni-app"
  import { getPostList } from '@/services/post'
  const { safeAreaInsets } = uni.getSystemInfoSync()

  const postList = ref<PostList>({} as PostList)
  const postData = reactive([])

  const newPost = () => {
    uni.navigateTo({
      url: "/pagesMember/newPost/newPost",
      animationType: 'pop-in',
      animationDuration: 300
    })
  }

  onShow(() => {
    getPostList().then((res)=>{
      postList.value = res.result
      console.log(postList.value)
    })

  })
</script>

<style>
  .post-list-title {
    font-family: sans-serif;
    font-weight: bold;
    padding-top: 20rpx;
    padding-left: 50rpx;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
  }

  .post-list-container {
    padding: 10px;
  }
</style>
