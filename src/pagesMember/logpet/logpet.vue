<template>
  <view>录入宠物信息</view>
  <view class="form">
    <view class="form-content">
      <view class="avatar">
        <view class="avatar-content" @tap="onChoosePhone">
          <text class="text">宠物照片</text>
          <image class="image" :src="filePath" mode="aspectFill" />
        </view>
      </view>
      <view class="form-item">
        <text class="label">宠物名：</text>
        <input class="input" type="text" placeholder="请填写宠物名" />
      </view>
      <view class="form-item">
        <text class="label">宠物品种：</text>
        <input class="input" type="text" placeholder="请填写宠物品种" />
      </view>
      <view class="form-item">
        <text class="label">宠物性别：</text>
        <radio-group>
          <label class="radio">
            <radio value="男" color="#27ba" :checked="profile.gender === '男'" />
            公
          </label>
          <label class="radio">
            <radio value="女" color="#27ba" :checked="profile.gender === '女'" />
            母
          </label>
        </radio-group>
      </view>
      <view class="form-item">
        <text class="label">领养日期：</text>
        <picker
          class="picker"
          mode="date"
          start="1900-01-01"
          :end="new Date()"
          :value="profile.birthday"
        >
          <view class="placeholder">请选择日期</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">出生日期：</text>
        <picker
          class="picker"
          mode="date"
          start="1900-01-01"
          :end="new Date()"
          :value="profile.birthday"
        >
          <view class="placeholder">请选择日期</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">宠物体重：</text>
        <input class="input" type="text" placeholder="请填写宠物体重" />
      </view>
      <view class="form-item">
        <text class="label">宠物品种：</text>
        <input class="input" type="text" placeholder="请填写宠物品种" />
      </view>
    </view>
    <view class="form-item">
      <text class="label">是否接种狂犬疫苗：</text>
      <radio-group>
        <label class="radio">
          <radio value="男" color="#27ba" :checked="profile.gender === '男'" />
          是
        </label>
        <label class="radio">
          <radio value="女" color="#27ba" :checked="profile.gender === '女'" />
          否
        </label>
      </radio-group>
    </view>
    <view class="form-item">
      <text class="label">是否绝育：</text>
      <radio-group>
        <label class="radio">
          <radio value="男" color="#27ba" :checked="profile.gender === '男'" />
          是
        </label>
        <label class="radio">
          <radio value="女" color="#27ba" :checked="profile.gender === '女'" />
          否
        </label>
      </radio-group>
    </view>
  </view>
  <view class="form-item">
    <text class="label">上次除虫时间：</text>
    <picker
      class="picker"
      mode="date"
      start="1900-01-01"
      :end="new Date()"
      :value="profile.birthday"
    >
      <view class="placeholder">请选择日期</view>
    </picker>
  </view>
  <!-- 提交按钮 -->
  <button class="form-button" @tap="onSubmit">保 存</button>
</template>

<script lang="ts" setup>
import { getMemberProfileAPI, putMemberProfileAPI } from '@/services/profile'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { ProfileDetail } from '@/types/member'
import { useMemberStore } from '@/stores'
import type { Gender } from '@/types/member'
//获取个人信息
const profile = ref<ProfileDetail>({} as ProfileDetail)
const getMemberProfileData = async () => {
  const result = await getMemberProfileAPI()
  profile.value = result.result
}
const memberStore = useMemberStore()
const filePath = ref('')

const onChoosePhone = () => {
  // 调用拍照/选择图片
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: (res) => {
      // 本地路径
      const { tempFilePath } = res.tempFiles[0]
      filePath.value = tempFilePath
      console.log(filePath.value)
    },
  })
}

const onSubmit = () => {
  // 文件上传
  uni.uploadFile({
    url: '/user/profile/avatar',
    name: 'file', // 后端数据字段名
    filePath: filePath.value, // 新头像
    success: (res) => {
      // 判断状态码是否上传成功
      if (res.statusCode === 200) {
        // 提取头像
        const { avatar } = JSON.parse(res.data).result
        // 当前页面更新头像
        profile.value!.avatar = avatar
        // 更新 Store 头像
        memberStore.profile!.avatar = avatar
        uni.showToast({ icon: 'success', title: '更新成功' })
      } else {
        uni.showToast({ icon: 'error', title: '出现错误' })
      }
    },
  })
}

onLoad(() => {
  getMemberProfileData()
})
</script>

<style scoped>
.form-item {
  display: flex;
}
.image {
  height: 100rpx;
  width: 100rpx;
  border-radius: 10rpx;
}
</style>
