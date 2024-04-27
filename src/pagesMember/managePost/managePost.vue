<template>
  <view class="container">
   <uni-nav-bar dark color="#000" :style="{ paddingTop: safeAreaInsets!.top + 'px' }" backgroundColor="#f5f5f5" left-icon="left" title="我的博客" :border="false" @clickLeft="goBack()"/>
    <view v-for="item in data.postList" :v-key="item.id" class="post-card">
      <view class="row1">
         <image class="post-image" :src="item.imageUrl" mode="aspectFill"></image>
         <view class="post-title">{{item.title}}</view>
      </view>
      <view class="row2">
        <view>{{item.content}}</view>
      </view>
      <view class="row3">
        <view class="date">2024-4-27</view>
        <u-icon name="trash" color="#999999" size="36" @click="deletePost(item.id)"></u-icon>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { useMemberStore } from '@/stores/modules/member'
import type { CreatePostInfo,PostList} from '@/types/post'
import { createPost, getAllPostsByUserAPI,deletePostByIdAPI } from '@/services/post'


const memberStore = useMemberStore()
const profile = memberStore.profile
const { safeAreaInsets } = uni.getSystemInfoSync()
const data = reactive({
  postList: [] as PostList
})

const getAllPostsByUser=async () => {
  const result = await getAllPostsByUserAPI(profile!.id);
  data.postList = result.result
  console.log("我获取数据了",data.postList)
}
const goBack = () => {
  uni.navigateBack({
    delta: 1
  })
}
const deletePost = (postId: number) => {
  deletePostByIdAPI(postId).then(() => {
    uni.showToast({ icon: 'none', title: '删除成功' })
    getAllPostsByUser()
  })
}
onLoad(() => {
  getAllPostsByUser()
})

</script>

<style scoped>
.container{
  background-color: #f5f5f5;
  height: 100%;
}

.post-card{
  display: flex;
  flex-direction: column;
  width:95%;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 32rpx;
  margin-top: 26rpx;
  padding:24rpx;
}
.row1{
  display: flex;
  align-items: center;
}
.post-title{
  margin-left: 20rpx;
  font-size: 38rpx;
  font-weight: 500;
  color: #333333;
  letter-spacing: 3rpx;
}
.row2{
  margin-top: 12rpx;
  font-size: 32rpx;
  font-weight: 400;
  color: #333333;
  overflow:hidden;
  text-overflow:ellipsis;
}
.post-image{
  height: 86rpx;
  width:86rpx;
  border-radius: 22rpx;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}

.row3{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.date{
  margin-top: 12rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #999999;
  letter-spacing: 3rpx;
}
</style>
