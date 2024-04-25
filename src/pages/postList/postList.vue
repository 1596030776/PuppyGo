<template>
  <view class="post-list-title" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <view>
      帖子列表
    </view>
    <image src="../../static/tabs/newPost.png" style="width: 25px; height: 25px; margin-top: 10px;"></image>
  </view>
  <view class="post-list-container">
    <div class="test-component">
      <card v-for="postInfo in postData" :postInfo="postInfo"></card>
    </div>
  </view>
</template>

<script setup lang="ts">
  import type { PostInfo, PostList } from '@/types/post'
  import { reactive, ref } from 'vue';
  import card from '@/components/list-card/list-card.vue'
  const { safeAreaInsets } = uni.getSystemInfoSync()

  const postData = reactive([
    {
      id: 1,
      publisher_id: 1,
      publisher_name: "张三1",
      publisher_avatar: '../../static/images/1.png',
      image: '../../static/images/post-test.jpg',
      title: "爱狗人生",
      content: "内容这行代码使用了ES模块的导入语法，并指定了从@/types/post文件中导入PostInfo类型根据代码中的路径@/types/post，@通常是一个别名，代表项目根目录或者某个特定的目录。而/types/post表示在根目录或者指定目录下的types/post目录。所以，这行代码的意思是从@/types/post模块中导入PostInfo类型。具体的PostInfo类型的定义和结构将取决于@/types/post模块的实现。你需要查看@/types/post模块的代码或文档来了解PostInfo类型的具体定义和用途。",
      createTime: "2020-02-01",
      likeNum: "200",
    },
    {
      id: 2,
      publisher_id: 2,
      publisher_name: "张三2",
      publisher_avatar: '../../static/images/1.png',
      image: '../../static/images/post-test.jpg',
      title: "爱狗人生2",
      content: " 内容",
      createTime: "2020-02-01",
      likeNum: "200",
    },
    {
      id: 3,
      publisher_id: 3,
      publisher_name: "张三3",
      publisher_avatar: '../../static/images/1.png',
      image: '../../static/images/post-test.jpg',
      title: "爱狗人生3",
      content: " 内容",
      createTime: "2020-02-01",
      likeNum: "200",
    },
  ])
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
