<template>
  <scroll-view
    class="viewport"
    scroll-y
    enable-back-to-top
    :style="{ height: screenHeight + 'px' }"
  >
    <view class="title">请填写宠物详细信息</view>
    <view class="form">
      <view class="form-content">
        <view class="form-item">
          <view class="avatar-content">
            <text class="text">宠物照片</text>
            <image @tap="onChoosePhone" class="image" :src="filePath" mode="aspectFill" />
          </view>
        </view>
        <view class="form-item">
          <text class="label">宠物名：</text>
          <input class="input item-content" type="text" v-model="petInfo!.name" />
        </view>
        <view class="form-item">
          <text class="label">宠物种类：</text>
          <input class="input item-content" type="text" v-model="petInfo!.kind" />
        </view>
        <view class="form-item">
          <text class="label">宠物品种：</text>
          <input class="input item-content" type="text" v-model="petInfo.description" />
        </view>
        <view class="form-item">
          <text class="label">宠物性别：</text>
          <radio-group @change="onSexChange" class="item-content select">
            <label class="radio">
              <radio value="公" color="#27ba" :checked="petInfo.sex === '公'" />
              公
            </label>
            <label class="radio">
              <radio value="母" color="#27ba" :checked="petInfo.sex === '母'" />
              母
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">领养日期：</text>
          <picker
            class="picker item-content"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="petInfo.adoptDate"
            @change="onAdoptDateChange"
          >
            <view v-if="petInfo.adoptDate">{{ petInfo.adoptDate }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">出生日期：</text>
          <picker
            class="picker item-content"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="petInfo.birthDate"
            @change="onBirthDateChange"
          >
            <view v-if="petInfo.birthDate">{{ petInfo.birthDate }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">宠物体重：</text>
          <input class="input item-content" type="text" v-model="petInfo.weight" />
        </view>

        <view class="form-item">
          <text class="label">是否接种狂犬疫苗：</text>
          <radio-group @change="onInoculationChange" class="item-content select">
            <label class="radio">
              <radio value="是" color="#27ba" :checked="petInfo.inoculation === '是'" />
              是
            </label>
            <label class="radio">
              <radio value="否" color="#27ba" :checked="petInfo.inoculation === '否'" />
              否
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">是否绝育：</text>
          <radio-group class="item-content select">
            <label class="radio">
              <radio value="是" color="#27ba" :checked="petInfo.sterilization === '是'" />
              是
            </label>
            <label class="radio">
              <radio value="否" color="#27ba" :checked="petInfo.sterilization === '否'" />
              否
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">日常活动水平：</text>
          <input class="input item-content" type="text" v-model="petInfo.activityTime" />
        </view>
        <view class="form-item">
          <text class="label">近期食物过敏或不适反应：</text>
          <input class="input item-content" type="text" v-model="petInfo.allergy" />
        </view>
        <view class="form-item">
          <text class="label">近期健康状况：</text>
          <input class="input item-content" type="text" v-model="petInfo.health" />
        </view>
        <view class="form-item">
          <text class="label">上次除虫时间：</text>
          <picker
            class="picker item-content"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="petInfo.disinfectTime"
            @change="onDisinfectTimeChange"
          >
            <view v-if="petInfo.disinfectTime">{{ petInfo.disinfectTime }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
      </view>
      <!-- 提交按钮 -->

      <button class="btn-grad" hover-class="btn-grad-hover" role="button" @tap="onSubmit">
        + 提交宠物信息
      </button>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { getMemberProfileAPI, putMemberProfileAPI } from '@/services/profile'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { ProfileDetail } from '@/types/member'
import type { PetParams } from '@/types/pet'
import { usePetStore } from '@/stores/modules/pet'
const screenHeight = uni.getSystemInfoSync().windowHeight
const { safeAreaInsets } = uni.getSystemInfoSync()
//获取个人信息
const profile = ref<ProfileDetail>({} as ProfileDetail)
const getMemberProfileData = async () => {
  const result = await getMemberProfileAPI()
  profile.value = result.result
}
const petStore = usePetStore()
const filePath = ref('../../static/images/select-picture.png')
const petInfo = ref<PetParams>({} as PetParams)

const goBack = () => {
  uni.navigateBack({
    delta: 1, //返回层数，2则上上页
  })
}
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
    },
  })
}

const onBirthDateChange: UniHelper.DatePickerOnChange = (ev) => {
  petInfo.value.birthDate = ev.detail.value
}

const onAdoptDateChange: UniHelper.DatePickerOnChange = (ev) => {
  petInfo.value.adoptDate = ev.detail.value
}

const onDisinfectTimeChange: UniHelper.DatePickerOnChange = (ev) => {
  petInfo.value.disinfectTime = ev.detail.value
}

// 修改性别
const onSexChange: UniHelper.RadioGroupOnChange = (ev) => {
  petInfo.value.sex = ev.detail.value
}
// 修改性别
const onInoculationChange: UniHelper.RadioGroupOnChange = (ev) => {
  petInfo.value.inoculation = ev.detail.value
}

const onSubmit = () => {
  // 创建宠物
  uni.uploadFile({
    url: 'http://8.140.57.220:8889/puppygo/pet',
    name: 'file', // 后端数据字段名
    filePath: filePath.value, // 宠物图片
    formData: {
      name: petInfo.value.name,
      description: petInfo.value.description,
      sex: petInfo.value.sex,
      adoptDate: petInfo.value.adoptDate,
      birthDate: petInfo.value.birthDate,
      weight: petInfo.value.weight,
      kind: petInfo.value.kind,
      inoculation: petInfo.value.inoculation,
      sterilization: petInfo.value.sterilization,
      activityTime: petInfo.value.activityTime,
      allergy: petInfo.value.allergy,
      health: petInfo.value.health,
      disinfectTime: petInfo.value.disinfectTime,
    },
    success: (res) => {
      // 判断状态码是否上传成功
      if (res.statusCode === 200) {
        uni.showToast({ icon: 'success', title: '更新成功' })
        console.log('更新成功返回的信息为')
        petStore.petsInfo = JSON.parse(res.data).result.pets
        console.log(petStore.petsInfo)
        console.log(res)
      } else {
        uni.showToast({ icon: 'error', title: '出现错误' })
        console.log('出现错误的返回信息为：')
        console.log(res)
      }
      goBack()
    },
  })
}

onLoad(() => {
  getMemberProfileData()
})
</script>

<style scoped>
.title {
  margin: 40rpx;
  font-family: sans-serif;
  color: rgb(183, 183, 183);
}
.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-size: auto;
  display: flex;
  background-color: rgb(248, 248, 248);
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
  margin-bottom: 30rpx;
}
.image {
  height: 100rpx;
  width: 100rpx;
  border-radius: 10rpx;
}
.select {
  display: flex;
  justify-content: space-around;
}
.btn-grad {
  background-image: linear-gradient(to right, #fdfc47 0%, #24fe41 51%, #fdfc47 100%);
  padding: 12px 25px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  font-family: sans-serif;
  font-size: 32rpx;
  font-weight: bold;
}

.btn-grad-hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>
