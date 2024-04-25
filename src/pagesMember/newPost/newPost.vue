<template>
  <view :style="{ paddingTop: safeAreaInsets!.top + 'px' }"></view>
  <view class="container">
    <u-form :model="form" ref="uForm">
      <u-form-item label="标题">
        <u-input v-model="form.title" placeholder="请输入标题" clearable />
      </u-form-item>
      <hr />
      <u-form-item label="图片"></u-form-item>
      <u-form-item>
        <view class="avatar-content">
          <image @tap="onChoosePhone" class="image" :src="form.filePath" mode="aspectFill" />
        </view>
      </u-form-item>
      <hr/>
      <u-form-item label="内容"></u-form-item>
      <u-form-item>
        <u-input v-model="form.content" type="textarea" placeholder="请输入内容" height="250" border />
      </u-form-item>
    </u-form>

    <view style="display: flex; justify-content: flex-end; padding-right: 10px">
      <u-button class="btn" @click="submit">发布</u-button>
    </view>
  </view>

</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  const { safeAreaInsets } = uni.getSystemInfoSync()
  const form = reactive({
    title: '',
    content: '',
    filePath: '../../static/images/image-fill.png'
  })

  const submit = () => {

  }

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
        form.filePath = tempFilePath.path
      },
    })
  }
</script>

<style scoped>
  .container {
    padding: 5px 15px
  }

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

  .u-hairline-border:after {
    border: none;
  }

  .image {
    height: 300rpx;
    width: 500rpx;
    border-radius: 10rpx;
    margin-top: -10rpx;
  }
</style>
