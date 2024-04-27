<template>
  <view :style="{ paddingTop: safeAreaInsets!.top + 'px' }"></view>
  <view class="container">
    <view class="form">
      <view class="form-content">
        <view class="form-item">
          <text class="label">标题</text>
          <input class="input item-content" type="text" v-model="form.title" />
        </view>
        <view class="form-item">
          <view style="display: flex; flex-direction: column;">
            <text class="text">图片</text>
            <image @tap="onChoosePhone" class="image" :src="form.imageUrl" mode="aspectFill" />
          </view>
        </view>
        <view class="form-item">
            <text class="label">内容</text>
            <textarea v-model="form.content" cols="30" maxlength="1000" rows="6" class="input-area"></textarea>
        </view>
      </view>
    </view>

    <view style="display: flex; justify-content: flex-end; padding-right: 30px; margin-top: -20px;">
      <button class="btn" @click="submit">发布</button>
    </view>
  </view>

</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { onLoad } from "@dcloudio/uni-app"
  import { useMemberStore } from '@/stores/modules/member'
  import type { CreatePostInfo } from '@/types/post'
  import { createPost } from '@/services/post'
  const memberStore = useMemberStore()
  const profile = memberStore.profile

  const { safeAreaInsets } = uni.getSystemInfoSync()
  const form = ref<CreatePostInfo>({} as CreatePostInfo)

  function submit() {
    // console.log(form.value)
    // createPost(form.value).then((response) => {
    //   uni.navigateBack()
    // })

  uni.uploadFile({
    url: 'http://39.105.177.99:28081/puppygo/posts/publishPost',
    name: 'file', // 后端数据字段名
    filePath: form.value.imageUrl, // 宠物图片
    formData: {
      title: form.value.title,
      content: form.value.content
    },
    success: (res) => {
      // 判断状态码是否上传成功
      if (res.statusCode === 200) {
        console.log(res)
        uni.navigateBack()
      } else {
        uni.showToast({ icon: 'error', title: '出现错误' })
        console.log('出现错误的返回信息为：')
        console.log(res)
      }
    },
  })
  }

  onLoad((e) => {
    form.value.userId = profile!.id,
    form.value.nickname = profile!.nikename,
    form.value.avatar = profile!.avatar,
    form.value.imageUrl = '../../static/images/image-fill.png'
    console.log(profile)
  })

  const onChoosePhone = () => {
    // 调用拍照/选择图片
    uni.chooseImage({
      // 文件个数
      count: 1,
      // 压缩类型
      sizeType: ['original', 'compressed'],
      // 图片源 相册
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 本地路径
        const tempFilePath = res.tempFiles[0]
        form.value.imageUrl = tempFilePath.path
      },
    })
  }
</script>

<style scoped>

  .btn {
    width: 200rpx;
    height: 72rpx;
    border: 2rpx solid #005EF4;
    border-radius: 36rpx;
    margin: 0;
    background: transparent;
    font-size: 28rpx;
    line-height: 72rpx;
    color: #0268FA;
  }


  .btn:active {
    background: #005EF4;
    color: white;
  }

  .form {
    padding: 40rpx;
    margin: 40rpx;
    background-color: white;
    border-radius: 30rpx;
  }

  .item-content {
    margin-top: 18rpx;
    background-color: rgb(248, 248, 248);
    border-radius: 20rpx;
    height: 70rpx;
    display: flex;
    align-items: center;
    padding: 20rpx;
  }

  .form-item {
    font-family: sans-serif;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .image {
    height: 350rpx;
    width: 350rpx;
    border-radius: 10rpx;
  }

  .input-area {
    background-color: rgb(248, 248, 248);
    border-radius: 20rpx;
    padding: 20rpx;
    margin-top: 5px;
    height: 550rpx;
  }
</style>
